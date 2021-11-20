import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
// export const getCourse = createAsyncThunk('adminApp/course/getCourse', async params => {
// 	const response = await axios.get('https://localhost:3000/courses/byId/' + params.courseId, {'headers':{
// 		'Access-Control-Allow-Origin': '*',
// 		'Content-Type': 'application/json',
// 	  }});
// 	const data = await response.data.data;

// 	return data === undefined ? null : data;
// });

export const saveSection = createAsyncThunk('adminApp/saveSection', async (sectionData, { dispatch, getState }) => {
	const { section } = getState().adminApp
	const response = await axios.post('https://localhost:3000/sections/', section);
	const dataPost = await response.data;

	return data === undefined ? null : data;
}
);

export const removeSection = createAsyncThunk('adminApp/removeSection', async (sectionData, { dispatch, getState }) => {
		const { section } = getState().adminApp
		const response = await axios.delete('https://localhost:3000/sections/delete/' + section.id);
		const dataPost = await response.data;

		return data === undefined ? null : data;
	}
);

const sectionSlice = createSlice({
	name: 'adminApp/section',
	initialState: null,
	reducers: {
		resetSection: () => null,
		newSection: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: 0,
					courseId: 0,
					title: ''
				}
			})
		},
		setSection: {
			reducer: (state, action) => {
				state.id = action.payload.id || 0;
				state.courseId = action.payload.courseId;
				state.title = action.payload.title;
			},
			prepare: event => ({ payload: event })
		},
	},
	extraReducers: {
		// [getCourse.fulfilled]: (state, action) => action.payload,
		[saveSection.fulfilled]: (state, action) => action.payload,
		// [putCourse.fulfilled]: (state, action) => action.payload,
		// [removeCourse.fulfilled]: (state, action) => null
	}
});

export const { newSection, setSection, resetSection } = sectionSlice.actions;

export default sectionSlice.reducer;
