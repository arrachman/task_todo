import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('usersApp/users/getUsers', async (routeParams, { getState }) => {
	const response = await axios.get('https://localhost:3000/users', {'headers':{
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  }});
	const data = await response.data.data;

	return { data, routeParams };
});

const usersAdapter = createEntityAdapter({});
const usersSlice = createSlice({
	name: 'adminApp/users',
	initialState: usersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setUsersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => {
			state.data = action.payload.data;
		},
	}
});

export const { setUsersSearchText } = usersSlice.actions;

export default usersSlice.reducer;
