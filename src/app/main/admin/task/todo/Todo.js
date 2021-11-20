import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import React, { useRef, useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import reducer from '../store';
import LessonTab from './tabs/LessonTab';
import { useTheme } from '@material-ui/core/styles';
import { resetCourse, newCourse, getCourse, getCategoryList } from '../store/courseSlice';
import { getData } from '../store/todoSlice';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a course name')
		.min(5, 'The course name must be at least 5 characters')
});

let _category = []
let _categoryValue = []

function Todo(props) {
	const dispatch = useDispatch();
	const course = useSelector(({ adminApp }) => adminApp.course.data)
	
	const theme = useTheme();
	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [isEdit, setIsEdit] = useState(false);
	const [noCourse, setNoCourse] = useState(false);
	const history = useHistory();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState, getValues } = methods;
	// const { getValues } = useForm();
	const editor = useRef(null)
	// const { getValues } = _useFormContext.methods
	// console.log('getValues', getValues())
	const form = watch();

	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

	useDeepCompareEffect(() => {
		function updateCourseState() {
			const { courseId } = routeParams;

			if (courseId === 'new') {
				/**
				 * Create New Course data
				 */
				dispatch(newCourse());
			} else {
				setIsEdit(true)
				/**
				 * Get Course data
				 */
				dispatch(getCourse(routeParams)).then(action => {
					/**
					 * If the requested course is not exist show message
					 */
					if (!action.payload) {
						setNoCourse(true);
					}
				});
			}
		}

		dispatch(getData())
		updateCourseState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!course) {
			return;
		}
		/**
		 * Reset the form on course state changes
		 */
		const { courseId } = routeParams;

		reset(courseId === 'new' ? {id:0} : course[0]);
	}, [course, reset]);

	useEffect(() => {
		return () => {
			dispatch(resetCourse());
			setNoCourse(false);
		};
	}, [dispatch]);

	return (
		<div className="p-16 sm:p-24 max-w-2xl">
			<LessonTab />
		</div>
	);
}

export default withReducer('adminApp', reducer)(Todo);
