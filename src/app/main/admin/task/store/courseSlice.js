import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getCategoryList = createAsyncThunk('adminApp/category/getCategory', async params => {
	const response = await axios.get('https://localhost:3000/categorys/' , {'headers':{
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  }});
	const data = await response.data.data;

	return data === undefined ? null : data;
});

export const getCourse = createAsyncThunk('adminApp/course/getCourse', async params => {
	const response = await axios.get('https://localhost:3000/courses/byId/' + params.courseId, {'headers':{
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  }});
	const data = await response.data.data;

	return data === undefined ? null : data;
});


export const getMemberOrderCourses = createAsyncThunk('adminApp/course/getMemberOrderCourses', async params => {
	const response = await axios.get('https://localhost:3000/courses/memberOrderCourses/' + params.courseId, {'headers':{
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  }});
	const data = await response.data.data;

	return data === undefined ? null : data;
});

export const removeCourses = createAsyncThunk(
	'adminApp/courses/removeCourses',
	async (courseIds, { dispatch, getState }) => {
		const { course } = getState().adminApp;
		const { data } = course;

		await axios.delete('https://localhost:3000/courses/delete/' + data[0].id );

		return courseIds;
	}
);

export const saveCourse = createAsyncThunk(
	'adminApp/course/saveCourse',
	async (courseData, { dispatch, getState }) => {
		const { course } = getState().adminApp;

		console.log('courseData',{ ...course.data[0], ...courseData })
		const response = await axios.post('https://localhost:3000/courses/', { ...course.data[0], ...courseData });
		const data = await response.data;
		dispatch(showMessage({ message: 'Course Saved' }));

		return data;
	}
);

export const putCourse = createAsyncThunk(
	'adminApp/course/putCourse',
	async (courseData, { dispatch, getState }) => {
		const { course } = getState().adminApp;
		const { data } = course;

		const respons2e = await axios.put('https://localhost:3000/courses/' + data[0].id, { ...data[0], ...courseData });
		const res = await respons2e.data;

		const response = await axios.get('https://localhost:3000/courses/byId/' + data[0].id, {'headers':{
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		  }});
		const data2 = await response.data.data;
		dispatch(showMessage({ message: 'Course Updated' }));

		return dat2a === undefined ? null : data2;
	}
);

const courseSlice = createSlice({
	name: 'adminApp/course',
	initialState: {
		data: {id: 0},
		categoryList: []
	},
	reducers: {
		resetCourse: {
			reducer: (state, action) => {
				state = {
					data: [{id: 0}],
				}
			}
		},
		newCourse: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					data: [{
						id: 0,
						title: '',
						tagline: '',
						description: '',
						slug: '',
						categorys: [],
						paidCourse: true,
						price: 0,
						specialPrice: 9,
						image: "",
						status: 0,
						publish: 0,
						fileCourses: [],
						sections: []
					}],
					handle: '',
					description: '',
					categories: [],
					categorysId: [],
					tags: [],
					images: [],
					priceTaxExcl: 0,
					priceTaxIncl: 0,
					taxRate: 0,
					comparedPrice: 0,
					quantity: 0,
					sku: '',
					width: '',
					height: '',
					depth: '',
					weight: '',
					extraShippingFee: 0,
					active: true,
					categoryList: []
				}
			})
		},
		setValues: {
			reducer: (state, action) => {
				if(action && action.payload && state && state.data && state.data.length > 0)
				state.data[0][action.payload.field] = action.payload.value
			}
		},
	},
	extraReducers: {
		[getCourse.fulfilled]: (state, action) => {
			if(action && action.payload && state){
				state.data = action.payload;
				if(state.data[0]['categorysData']) {
					state.data[0]['categorysData'].map(data=>{
						// console.log('data', data)
					})

				}
			}
		},
		[getMemberOrderCourses.fulfilled]: (state, action) => {
			if(action && action.payload && state)
				state.memberOrders = action.payload;
		},
		[saveCourse.fulfilled]: (state, action) => {
			if(action && action.payload && state)
				state.data = action.payload;
		},
		[putCourse.fulfilled]: (state, action) => {
			if(action && action.payload && state)
				state.data = action.payload;
		},
		[getCategoryList.fulfilled]: (state, action) => {
			state.categoryList = action.payload;
		},
		// [removeCourse.fulfilled]: (state, action) => null
	}
});

export const { newCourse, resetCourse, setValues } = courseSlice.actions;

export default courseSlice.reducer;
