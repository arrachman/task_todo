import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useRef, useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import FreeText from './FreeText';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));


function Item(props) {
	const dispatch = useDispatch();

	const containerRef = useRef(null);
	const classes = useStyles(props);


	useDeepCompareEffect(() => {
	}, [dispatch]);

	return (
		<>
		<div className="flex flex-1 flex-auto flex-col w-full h-full relative" ref={containerRef}>
			<DialogTitle component="div" className="p-0">
				<AppBar position="static" color="primary" elevation={0}>
					<Toolbar className="flex items-center justify-between px-4 sm:px-24 h-48 sm:h-64 sm:h-96 container">
						<div className="flex flex-1 justify-center items-center">
							Add Content
							{/* <BoardTitle /> */}
						</div>
					</Toolbar>
				</AppBar>
			</DialogTitle>

			<DialogContent className="p-16 sm:p-24">
				<div className="flex flex-1 flex-auto flex-col w-full h-full relative">
					<FreeText />
				</div>
			</DialogContent>
		</div>
		</>
	);
}

export default Item
