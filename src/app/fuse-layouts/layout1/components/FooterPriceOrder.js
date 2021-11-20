import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PoweredByLinks from 'app/fuse-layouts/shared-components/PoweredByLinks';
import PurchaseButton from 'app/fuse-layouts/shared-components/PurchaseButton';
import DocumentationButton from 'app/fuse-layouts/shared-components/DocumentationButton';
import { memo } from 'react';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import { saveOrder, putOrder } from '../../../main/guest/academy/store/courseSlice'
import { useDispatch, useSelector } from 'react-redux';
import history from '@history';

function FooterPriceOrder(props) {
	const dispatch = useDispatch();
	const course = useSelector(({ academyApp }) => academyApp.course);
	const footerTheme = useSelector(selectFooterTheme);
	const routeParams = useParams();
	const step = routeParams.courseHandle
	const orderId = routeParams.orderId ? routeParams.orderId : course && course.order && course.order.orderId || ''

	let nextStep = parseInt(step) + 1

	function formatPrice(input){
		return input == 0 ? 0 : (input/1000).toFixed(3);
	}

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('relative z-20 guest-footer-height')}
				color="default"
				style={{ backgroundColor: '#f6f7f9', boxShadow: 'none' }}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 pt-10 flex items-center overflow-x-auto">
					{course && course.data && course.data.length > 0 && 
						step == 0 ? 
						<Button
							className="guest-footer-order-mulai-belajar whitespace-nowrap guest-footer-button margin-lr-auto"
							variant="contained"
							color="secondary"
							onClick={() => dispatch(saveOrder(course.data[0].email)).then(action => {
								history.push(`/order/${course.data[0].id}/${nextStep}/${action.payload.data.orderId}`)
							})}
						>
							<span className="flex">{step == 0 ? 'Lanjut' : 'Bayar'}</span>
						</Button>
						: step == 1 ?
						<Button
							className="guest-footer-order-mulai-belajar whitespace-nowrap guest-footer-button margin-lr-auto"
							variant="contained"
							color="secondary"
							onClick={() => dispatch(putOrder(course.data[0].email)).then(action => {
								history.push(`/order/${course.data[0].id}/${nextStep}/${orderId}`)
							})}
						>
							<span className="flex">{step == 0 ? 'Lanjut' : 'Bayar'}</span>
						</Button>
						: step == 2 ?
						<Button
							component={Link}
							to={`/order/${course.data[0].id}/${nextStep}/${orderId}`}
							className="guest-footer-order-mulai-belajar whitespace-nowrap guest-footer-button margin-lr-auto"
							variant="contained"
							color="secondary"
						>
							<span className="flex">Konfirmasi</span>
						</Button>
						: step == 3 ?
						<Button
							component={Link}
							to={`/order/${course.data[0].id}/${nextStep}/${orderId}`}
							className="guest-footer-order-mulai-belajar whitespace-nowrap guest-footer-button margin-lr-auto"
							variant="contained"
							color="secondary"
						>
							<span className="flex">Lanjut</span>
						</Button>
						: step == 4 &&
						<Button
							component={Link}
							to={`/`}
							className="guest-footer-order-mulai-belajar whitespace-nowrap guest-footer-button margin-lr-auto"
							variant="contained"
							color="secondary"
						>
							<span className="flex">Selesai</span>
						</Button>
					}

				</Toolbar>
			
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterPriceOrder);
