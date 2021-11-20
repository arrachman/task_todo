import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

class FuseAuthorization extends Component {
	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes
		};
	}

	componentDidMount() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.accessGranted !== this.state.accessGranted;
	}

	componentDidUpdate() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { location, userRole } = props;
		const { pathname } = location;

		let matched = matchRoutes(state.routes, pathname)[0];

		if(userRole == 'member')
			if(pathname == "/courses" || pathname.indexOf("/course") || pathname.indexOf("/order") || pathname.indexOf("/validasi")) 
				matched = pathname == '/login' ? matched : false

		return {
			accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true
		};
	}

	redirectRoute() {
		const { location, userRole, history } = this.props;
		const { pathname, state } = location;
		// console.log('state redrect', state)
		const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';

		/*
        User is guest
        Redirect to Login Page
        */
	   console.log('redirectUrlredirectUrl',redirectUrl)
		if (!userRole || userRole.length === 0) {
			history.push({
				pathname: '/courses',
				state: { redirectUrl: pathname }
			});
		} else {
			/*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
			history.push({
				pathname: redirectUrl
			});
		}
	}

	render() {
		// console.info('Fuse Authorization rendered', this.state.accessGranted);
		return this.state.accessGranted ? <>{this.props.children}</> : null;
	}
}

function mapStateToProps({ auth }) {
	return {
		userRole: auth.user.role
	};
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
