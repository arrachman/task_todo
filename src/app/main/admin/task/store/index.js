import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import course from './courseSlice';
import lesson from './lessonSlice';
import item from './itemSlice';
import todo from './todoSlice';

const reducer = combineReducers({
	todo,
	course,
	lesson,
	item,
});

export default reducer;