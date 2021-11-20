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
import Video from './Video';
import Audio from './Audio';
import { setItemType, closeCardDialog } from '../../../../store/itemSlice';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));


function Item(props) {
	const dispatch = useDispatch();

	const item = useSelector(({ adminApp }) => adminApp.item)
	const itemLesson = useSelector(({ adminApp }) => adminApp.itemLesson)
	const lessonId = useSelector(({ adminApp }) => adminApp.lesson.lessonId)
	const itemType = useSelector(({ adminApp }) => adminApp.item.itemType)
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
					{itemType == "freeText" && <FreeText />}
					{itemType == "video" && <Video />}
					{itemType == "audio" && <Audio />}
					{itemType == "default" && 
						<>
						<Card
							className={clsx(
								classes.card,
								'shadow-lg',
								'w-full mb-16 rounded-16 cursor-pointer border-1'
							)}
							onClick={()=>dispatch(setItemType('video'))}
						>
							<div className="p-16 pb-0">
								<div className="flex items-center mb-12 -mx-4">
									<div
										className={clsx(
											'flex items-center px-8 py-4 mx-4 rounded-16',
										)}
										style={{marginBottom: '10px'}}
									>
										<Icon className="text-16">ondemand_video</Icon>
									</div>
									<Typography className="font-medium mb-12">Video</Typography>
								</div>
							</div>
						</Card>
						<Card
							className={clsx(
								classes.card,
								'shadow-lg',
								'w-full mb-16 rounded-16 cursor-pointer border-1'
							)}
							onClick={()=>dispatch(setItemType('audio'))}
						>
							<div className="p-16 pb-0">
								<div className="flex items-center mb-12 -mx-4">
									<div
										className={clsx(
											'flex items-center px-8 py-4 mx-4 rounded-16',
										)}
										style={{marginBottom: '10px'}}
									>
										<Icon className="text-16">audiotrack</Icon>
									</div>
									<Typography className="font-medium mb-12">Audio</Typography>
								</div>
							</div>
						</Card>
						<Card
							className={clsx(
								classes.card,
								'shadow-lg',
								'w-full mb-16 rounded-16 cursor-pointer border-1'
							)}
							onClick={()=>dispatch(setItemType('freeText'))}
						>
							<div className="p-16 pb-0">
								<div className="flex items-center mb-12 -mx-4">
									<div
										className={clsx(
											'flex items-center px-8 py-4 mx-4 rounded-16',
										)}
										style={{marginBottom: '10px'}}
									>
										<Icon className="text-16">subject</Icon>
									</div>
									<Typography className="font-medium mb-12">Free Text</Typography>
								</div>
							</div>
						</Card>

						<div className="items-center justify-between p-20">
							<span class="freeTextButton">
								<Button
									className="whitespace-nowrap mx-4"
									variant="contained"
									color="secondary"
									onClick={() => dispatch(closeCardDialog())}
								>
									Cancel
								</Button>
							</span>
						</div>
						</>
					}
				</div>
			</DialogContent>
		</div>
		</>
	);
}

export default Item
