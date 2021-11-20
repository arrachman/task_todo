import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
// export const getCourse = createAsyncThunk('adminApp/course/getCourse', async params => {
// 	const response = await axios.get('https://localhost:3000/courses/byId/' + params.sectionId, {'headers':{
// 		'Access-Control-Allow-Origin': '*',
// 		'Content-Type': 'application/json',
// 	  }});
// 	const data = await response.data.data;

// 	return data === undefined ? null : data;
// });

export const saveLesson = createAsyncThunk('adminApp/saveLesson', async (lessonData, { dispatch, getState }) => {
		const { lesson } = getState().adminApp
		const response = await axios.post('https://localhost:3000/lessons/', lesson);
		const dataPost = await response.data;

		return data === undefined ? null : data;
	}
);

const lessonSlice = createSlice({
	name: 'adminApp/lesson',
	initialState: null,
	reducers: {
		resetLesson: () => null,
		newLesson: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					lessonId: 0,
					sectionId: 0,
					title: '',
					num: 0,
					openDialog: false
				}
			})
		},
		openCardDialog: {
			reducer: (state, action) => {
				state.lessonId = action.payload
				state.openDialog = true
			}
		},
		closeCardDialog: {
			reducer: (state) => {
				state.openDialog = false
			}
		},
		setLesson: {
			reducer: (state, action) => {
				state.sectionId = action && action.payload && action.payload.sectionId || 0;
				state.title = action.payload.title;
				state.num = action.payload.num;
			},
			prepare: event => ({ payload: event })
		},
	},
	extraReducers: {
		// [getCourse.fulfilled]: (state, action) => action.payload,
		[saveLesson.fulfilled]: (state, action) => action.payload,
		// [putCourse.fulfilled]: (state, action) => action.payload,
		// [removeCourse.fulfilled]: (state, action) => null
	}
});

export const { newLesson, setLesson, resetLesson, closeCardDialog, openCardDialog } = lessonSlice.actions;

export default lessonSlice.reducer;
