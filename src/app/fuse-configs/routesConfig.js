import FuseUtils from '@fuse/utils';
import adminConfigs from 'app/main/admin/adminConfigs';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...adminConfigs,
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, []),
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','mentor','member', 'onlyGuest', 'guest', ]),
	{
		path: '',
		exact: true,
		// component: () => <Redirect to="/login" />
		component: () => <Redirect to="/82" />
		// component: () => <Redirect to="/coming-soon" />
	},
	{
		component: () => <Redirect to="/error-404" />
	}
];

export default routes;
