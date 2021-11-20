import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
export const getItem = createAsyncThunk('adminApp/course/getItem', async params => {
	const response = await axios.get('https://localhost:3000/items/', {'headers':{
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  }});
	const data = await response.data.data;

	return data === undefined ? null : data;
});

export const saveLessonData = createAsyncThunk('adminApp/saveLesson', async (itemData, { dispatch, getState }) => {
	console.log('saveLessonData')
	const { lesson } = getState().adminApp.item
	console.log('item', lesson)
	const response = await axios.put('https://localhost:3000/lessons/' + lesson.id, {title: lesson.title, content: lesson.content});
	const dataPost = await response.data;

	return data === undefined ? null : data;
}
);

export const saveItemFreeText = createAsyncThunk('adminApp/saveItem', async (itemData, { dispatch, getState }) => {
	const { item } = getState().adminApp
	const response = await axios.post('https://localhost:3000/items/', {title: item.videoLink, category: 'video'});
	const dataPost = await response.data;

	return data === undefined ? null : data;
}
);

export const saveItemAudio = createAsyncThunk('adminApp/saveItem', async (itemData, { dispatch, getState }) => {
		const { item } = getState().adminApp
		const response = await axios.post('https://localhost:3000/items/', {title: item.videoLink, category: 'video'});
		const dataPost = await response.data;

		return data === undefined ? null : data;
	}
);

export const saveItemVideo = createAsyncThunk('adminApp/saveItem', async (itemData, { dispatch, getState }) => {
		const { item } = getState().adminApp
		const response = await axios.post('https://localhost:3000/items/', {title: item.videoLink, category: 'video'});
		const dataPost = await response.data;

		return data === undefined ? null : data;
	}
);

const itemSlice = createSlice({
	name: 'adminApp/item',
	initialState: null,
	reducers: {
		resetItem: () => null,
		newItem: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					sectionId: 0,
					title: '',
					num: 0,
					openDialog: false,
					list: [],
					itemType: 'freeText',
					freeText: '',
					audioLink: '',
					videoLink: ''
				}
			})
		},
		openCardDialog: {
			reducer: (state, action) => {
				state.lesson = action.payload
				state.itemType = 'freeText'
				state.openDialog = true
			},
		},
		closeCardDialog: {
			reducer: (state) => {
				state.lesson = {}
				state.openDialog = false
			}
		},
		setTitle: {
			reducer: (state, action) => {
				state.lesson.title = action.payload
			}
		},
		setContent: {
			reducer: (state, action) => {
				console.log('action', action)
				state.lesson.content = action.payload
			}
		},
		setItemType: {
			reducer: (state, action) => {
				state.itemType = action.payload
			}
		},
		setFreeText: {
			reducer: (state, action) => {
				state.lesson.content = action.payload
				state.freeText = action.payload
			}
		},
		setVideoLink: {
			reducer: (state, action) => {
				state.videoLink = action.payload
			}
		},
		setAudioLink: {
			reducer: (state, action) => {
				state.audioLink = action.payload
			}
		},
		setItem: {
			reducer: (state, action) => {
				state.sectionId = action && action.payload && action.payload.sectionId || 0;
				state.title = action.payload.title;
				state.num = action.payload.num;
			},
			prepare: event => ({ payload: event })
		},
	},
	extraReducers: {
		[getItem.fulfilled]: (state, action) => {state.list = action.payload},
		// [saveItem.fulfilled]: (state, action) => {state.list = action.payload},
		// [putCourse.fulfilled]: (state, action) => action.payload,
		// [removeCourse.fulfilled]: (state, action) => null
	}
});

export const { newItem, setTitle, setItem, resetItem, closeCardDialog, openCardDialog, setItemType, setContent, setFreeText, setVideoLink, setAudioLink } = itemSlice.actions;

export default itemSlice.reducer;
