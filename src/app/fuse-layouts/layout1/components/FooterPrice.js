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
import { Link } from 'react-router-dom';
import { createOrderPay } from '../../../main/guest/academy/store/courseSlice'
import { useDispatch, useSelector } from 'react-redux';
import history from '@history';

function FooterPrice(props) {
	const dispatch = useDispatch();
	const course = useSelector(({ academyApp }) => academyApp.course);
	const footerTheme = useSelector(selectFooterTheme);

	function formatPrice(input){
		return input == 0 ? 0 : (input/1000).toFixed(3);
	}
	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('relative z-20 shadow-md guest-footer-height', props.className)}
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper }}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 pt-10 flex items-center overflow-x-auto">
					<div className="guest-footer-left">
					{course && course.data && course.data.length > 0 && course.data[0].specialPrice > 0 ? (
						<>
							<del><span className="h4">Rp. {formatPrice(course.data[0].price)}</span></del>
							<br />
							<span className="h2 guest-footer-price">Rp. {formatPrice(course.data[0].specialPrice)}</span>
						</>
					) : 
						course && course.data && course.data.length > 0 && <span className="h2 guest-footer-price">Rp. {formatPrice(course.data[0].price)}</span>
					}
					</div>
					{course && course.data && course.data.length > 0 && 
					<div className="flex flex-grow flex-shrink-0 px-12 justify-end">
						<Button
							// component={Link}
							// to={urlDestination}
							className="guest-footer-mulai-belajar whitespace-nowrap guest-footer-button"
							variant="contained"
							color="secondary"
							onClick={() => {
								if(localStorage.getItem('guest_user') != null) {
									dispatch(createOrderPay(course.data[0].specialPrice > 0 ? course.data[0].specialPrice : course.data[0].price )).then(action => {
										history.push(`/order/${course.data[0].id}/0`)
									})
								} else history.push(`/validasi/${course.data[0].id}/${course.data[0].slug}`)
							}}
						>
							<span className="flex">Lanjut</span>
						</Button>
					</div>
					}

				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterPrice);
