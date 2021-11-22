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
		dispatch(getData())
	}, [dispatch, routeParams]);


	useEffect(() => {
		return () => {
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
