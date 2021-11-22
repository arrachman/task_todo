import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getData = createAsyncThunk('adminApp/category/getCategory', async params => {
	const response = await axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list' , {'headers':{
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  }});
	const data = await response.data;

	return data === undefined ? null : data;
});


const courseSlice = createSlice({
	name: 'adminApp/course',
	initialState: {
		data: [],
		openDialog: false,
		title: '',
		id: 0,
	},
	reducers: {
		add: {
			reducer: (state, action) => {
				// action.payload.concat(state.todo)
				state.todo = [action.payload, ...state.todo]
			}
		},
		remove: {
			reducer: (state, action) => {
				const id = action.payload
				let idIndex = 0;
				state.todo.map((data, idx) => {
					if(data.id == id)
						idIndex = idx
				})
				  
				state.todo.splice(idIndex, 1);
				// state.todo = todo
			}
		},
		check: {
			reducer: (state, action) => {
				const id = action.payload
				console.log(id, state.todo)
				state.todo.map((data, idx) => {
					if(data.id == id)
						data.status = data.status == 0 ? 1 : 0
				})
			}
		},
		edit: {
			reducer: (state, action) => {
				// action.payload.concat(state.todo)
				state.todo = [action.payload, ...state.todo]
			}
		},
		setTitle: {
			reducer: (state, action) => {
				// action.payload.concat(state.todo)
				state.title = action.payload
			}
		},
		editTask: {
			reducer: (state, action) => {
				state.todo.map((data, idx) => {
					if(data.id == state.id)
						data.title = state.title
				})
				state.id = 0
				state.title = ''
				state.openDialog = false
			}
		},
		openCardDialog: {
			reducer: (state, action) => {
				state.id = action.payload.id
				state.title = action.payload.title
				state.openDialog = true
			},
		},
		closeCardDialog: {
			reducer: (state) => {
				state.title = ''
				state.openDialog = false
			}
		},
	},
	extraReducers: {
		[getData.fulfilled]: (state, action) => {
			state.todo = action.payload;
		},
	}
});

export const { add, remove, edit, check, openCardDialog, closeCardDialog, setTitle, editTask } = courseSlice.actions;

export default courseSlice.reducer;
