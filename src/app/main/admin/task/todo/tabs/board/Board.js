import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BoardList from './BoardList';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useRef, useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { newItem, getItem, saveItem, setItem } from '../../../store/itemSlice';
import { getItemLessonByLesson, newItemLesson, setId, saveItemLesson } from '../../../store/itemLessonSlice';
import ItemDialog from './ItemDialog';

function Board() {
	const dispatch = useDispatch();

	const item = useSelector(({ adminApp }) => adminApp.item)
	const itemLesson = useSelector(({ adminApp }) => adminApp.itemLesson)
	const lessonId = useSelector(({ adminApp }) => adminApp.lesson.lessonId)

	const [ itemIds, setItemIds ] = useState()
	const [ itemIdsLesson, setItemIdsLesson ] = useState()
	const containerRef = useRef(null);

	useDeepCompareEffect(() => {
		dispatch(newItem())
		dispatch(getItem())
		dispatch(newItemLesson())
		dispatch(getItemLessonByLesson())
	}, [dispatch]);

	useEffect(() => {
		if(item) {
			let ids = []
			item && item.list && item.list.map && item.list.map(key => (
				ids.push("item_" + key.id)
			))
			setItemIds(ids)
		}
	}, [item]);

	useEffect(() => {
		if(itemLesson) {
			let ids = []
			itemLesson && itemLesson.list && itemLesson.list.map && itemLesson.list.map(key => (
				ids.push("lesson_" + key.id)
			))
			setItemIdsLesson(ids)
		}
	}, [itemLesson]);

	function onDragEnd(result) {
		const { source, destination } = result;
		const { draggableId } = result;
		const itemId = draggableId.replace("item_", "")

		// // dropped nowhere
		if (!destination) {
			return;
		}

		// // did not move anywhere - can bail early
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}

		if(draggableId.indexOf("lesson")) {
			dispatch(setId({itemId:parseInt(itemId), lessonId}))
			dispatch(saveItemLesson())
		} else {
			console.log('urut')
		}
		// // reordering list
		// if (result.type === 'list') {
		// 	dispatch(reorderList(result));
		// }

		// // reordering card
		// if (result.type === 'card') {
		// 	dispatch(reorderCard(result));
		// }
	}

	return (
		<div className="flex flex-1 flex-auto flex-col w-full h-full relative" ref={containerRef}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="list" type="list" direction="horizontal">
					{provided => (
						<>
						<div ref={provided.innerRef} className="flex container py-16 md:py-24 px-8 md:px-12">
							{/* {board.lists.map((list, index) => (
								<BoardList key={list.id} list={list} index={index} />
							))} */}
							{itemIdsLesson && <BoardList key={'56027cf5a2ca3839a5d36103'} list={{"id":"56027cf5a2ca3839a5d36103","name":"Content","idCards":itemIdsLesson}} index={0} />}
							{itemIds && <BoardList key={'lib01'} list={{"id":"lib01","name":"Library","idCards":itemIds}} index={1} />}
						</div>
						</>
					)}
				</Droppable>
			</DragDropContext>
			<ItemDialog />
		</div>
	);
}

export default Board
