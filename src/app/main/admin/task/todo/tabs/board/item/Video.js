import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { setItemType, saveItemVideo, setVideoLink } from '../../../../store/itemSlice';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));


function Video(props) {
	const dispatch = useDispatch();

	const item = useSelector(({ adminApp }) => adminApp.item)
	const itemLesson = useSelector(({ adminApp }) => adminApp.itemLesson)
	const lessonId = useSelector(({ adminApp }) => adminApp.lesson.lessonId)
	const videoLink = useSelector(({ adminApp }) => adminApp.item.videoLink)
	const containerRef = useRef(null);
	const classes = useStyles(props);

	console.log('videoLinkvideoLink',videoLink)

	useDeepCompareEffect(() => {
	}, [dispatch]);

	return (
		<>
		<TextField
			placeholder="Video Link"
			label="Video Link"
			variant="outlined"
			InputLabelProps={{
				shrink: true
			}}
			onChange={e => dispatch(setVideoLink(e.target.value))}
			/>

		<div className="items-center justify-between p-20">
			<span class="freeTextButton">
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					onClick={() => dispatch(setItemType('default'))}
				>
					Cancel
				</Button>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					disabled={videoLink == ''}
					onClick={()=>dispatch(saveItemVideo(videoLink))}
				>
					Save
				</Button>
			</span>
		</div>
		</>
	);
}

export default Video
