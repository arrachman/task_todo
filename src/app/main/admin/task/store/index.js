import { combineReducers } from '@reduxjs/toolkit';
import todo from './todoSlice';

const reducer = combineReducers({
	todo,
});

export default reducer;