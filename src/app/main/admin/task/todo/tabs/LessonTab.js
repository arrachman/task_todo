import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import { memo, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { add, remove, edit, check, openCardDialog } from '../../store/todoSlice';

import { useDeepCompareEffect } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import ItemDialog from './board/ItemDialog';

function LessonTab(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const todo = useSelector(({ adminApp }) => adminApp.todo)
	const [ task, setTask ] = useState('')


	function handleSave() {
		dispatch(add({id: todo.todo.length+1, title: task, status: 0}))
		setTask('')
	}

	function removeSectionAction(id){
		dispatch(remove(id))
	}

	return (
			<>
			<Paper className={`w-full mb-36`}>
				<div className="items-center justify-between p-20">
					<Typography className="text-14 font-small">To do List</Typography>
					<TextField
						className="mt-8 mb-16"
						label="To Do"
						autoFocus
						id="title"
						variant="outlined"
						fullWidth
						onChange={(e)=>setTask(e.target.value)}
						value={task}
					/>
					<Button
						className="whitespace-nowrap mx-4 float-right"
						variant="contained"
						color="secondary"
						// disabled={addSection == ''}
						onClick={()=>{handleSave()}}
					>
						Save
					</Button>
				</div>
			</Paper>

			{todo && todo.todo && todo.todo.map((data, num) => {
				return (
					<>
					<Paper className="w-full rounded-20 shadow h-48">
						<Checkbox type="checkbox" checked={data.status == 0 ? false : true} onChange={e=>dispatch(check(data.id))}/>
						{data.status == 0 &&
							<Icon color="action" style={{float: 'right', margin: '10px', cursor: 'pointer'}} onClick={()=>removeSectionAction(data.id)}>clear</Icon>
						}
						<Link className="cursor-pointer" variant="body2" style={{cursor: 'pointer'}} onClick={()=> dispatch(openCardDialog({id: data.id, title: data.title}))}>
							<Typography className="text-16 font-medium -mt-32" style={{marginLeft: '40px'}}>{data.title}</Typography>
						</Link>
					</Paper>
					<br/>
					</>
				)
			})}

			<ItemDialog />
		</>
	);
}

export default LessonTab;