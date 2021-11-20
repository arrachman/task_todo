import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import TextField from '@material-ui/core/TextField';
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { setItemType, setFreeText, closeCardDialog, setTitle, setContent, saveLessonData } from '../../../../store/itemSlice';
import { getCourse } from '../../../../store/courseSlice';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));


function FreeText(props) {
	const routeParams = useParams();
	const { courseId } = routeParams;
	const dispatch = useDispatch();
	const editor = useRef(null)
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	const item = useSelector(({ adminApp }) => adminApp.item)
	const lesson = useSelector(({ adminApp }) => adminApp.item.lesson)
	const [_content, _setContent] = useState(lesson && lesson.content);
	const itemLesson = useSelector(({ adminApp }) => adminApp.itemLesson)
	const lessonId = useSelector(({ adminApp }) => adminApp.lesson.lessonId)
	const freeText = useSelector(({ adminApp }) => adminApp.item.freeText)
	const containerRef = useRef(null);
	const classes = useStyles(props);

	useDeepCompareEffect(() => {
		_setContent(lesson.content)
		// _content = lesson && typeof lesson.content === 'string' && lesson.content || ''
	}, [lesson]);

	return (
		<>
		<TextField
			className="mt-8 mb-16"
			required
			label="Title"
			autoFocus
			id="title"
			variant="outlined"
			fullWidth
			onChange={(e)=>dispatch(setTitle(e.target.value))}
			value={lesson.title}
		/>
		{/*  */}
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
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					// disabled={freeText == ''}
					onClick={()=>dispatch(saveLessonData(_content)).then(action => {dispatch(getCourse(routeParams));dispatch(closeCardDialog())} )}
				>
					Save
				</Button>
			</span>
		</div>
		</>
	);
}

export default FreeText
