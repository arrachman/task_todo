import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import axios from 'axios';
import { setUserData } from './userSlice';

export const submitLogin =
	({ email, password }) =>
	async dispatch => {
		return jwtService
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				dispatch(setUserData(user));

				return dispatch(loginSuccess());
			})
			.catch(errors => {
				return dispatch(loginError(errors));
			});
	};

export const submitLoginWithFireBase =
	({ email, password }) =>
	async dispatch => {
		if (!firebaseService.auth) {
			console.warn("Firebase Service didn't initialize, check your configuration");

			return () => false;
		}
		return firebaseService.auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				return dispatch(loginSuccess());
			})
			.catch(error => {
				const emailErrorCodes = [
					'auth/email-already-in-use',
					'auth/invalid-email',
					'auth/operation-not-allowed',
					'auth/user-not-found',
					'auth/user-disabled'
				];
				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
				const response = [];

				if (emailErrorCodes.includes(error.code)) {
					response.push({
						type: 'email',
						message: error.message
					});
				}

				if (passwordErrorCodes.includes(error.code)) {
					response.push({
						type: 'password',
						message: error.message
					});
				}

				if (error.code === 'auth/invalid-api-key') {
					dispatch(showMessage({ message: error.message }));
				}

				return dispatch(loginError(response));
			});
	};

export const loginAPIGuest = createAsyncThunk(
	'auth/loginAPI',
	async (userData, { dispatch, getState }) => {
		const { email, password } = userData
		// delete axios.defaults.headers.common;
		const response = await axios.post('https://localhost:3000/users/login', { email, password  }, {'headers':{
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			}});
		const {user, token} = response.data
		localStorage.setItem('guest_user', JSON.stringify(user));
		localStorage.setItem('guest_token', token);
		// axios.defaults.headers.common.Authorization = access_token;  

		return dispatch(loginSuccess());
	}

);

export const loginAPI = createAsyncThunk(
	'auth/loginAPI',
	async (userData, { dispatch, getState }) => {
		const { email, password } = userData
		// delete axios.defaults.headers.common;
		const response = await axios.post('https://localhost:3000/users/login', { email, password  }, {'headers':{
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			}});
		const {user, token} = response.data
		dispatch(setUserData(user));
		if(user.role == 'member'){
			localStorage.setItem('guest_user', JSON.stringify(user));
			localStorage.setItem('guest_token', token);
		}
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('jwt_access_token', token);
		// axios.defaults.headers.common.Authorization = access_token;  

		return dispatch(loginSuccess());
	}

);

const initialState = {
	success: false,
	errors: []
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;