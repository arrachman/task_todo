import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardDialog } from '../../../store/itemSlice';
import Item from './item/Item';

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function ItemDialog(props) {
	const dispatch = useDispatch();
	const _cardDialogOpen = useSelector(({ adminApp }) => adminApp.item);
	const cardDialogOpen = _cardDialogOpen && _cardDialogOpen.openDialog ? _cardDialogOpen.openDialog : false || false;
	const classes = useStyles(props);

	return (
		<Dialog
			classes={{
				paper: clsx(classes.paper, 'max-w-lg w-full m-24')
			}}
			onClose={ev => dispatch(closeCardDialog())}
			open={cardDialogOpen}
		>
			<Item />
		</Dialog>
	);
}

export default ItemDialog;
