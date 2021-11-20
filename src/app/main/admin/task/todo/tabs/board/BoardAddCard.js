import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { newCard } from '../store/boardSlice';
import { openCardDialog } from '../../../store/itemSlice';

const defaultValues = {
	title: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

function BoardAddCard(props) {
	const dispatch = useDispatch();
	const _board = '{"id":"27cfcbe1","name":"ACME Backend Application","uri":"acme-backend-application","settings":{"color":"blue-grey","subscribed":false,"cardCoverImages":true},"lists":[{"id":"56027cf5a2ca3839a5d36103","name":"Content","idCards":["5603a2a3cab0c8300f6096b3"]},{"id":"56127cf2a2ca3539g7d36103","name":"Library","idCards":["5637273da9b93bb84743a0f9"]}],"cards":[{"id":"5603a2a3cab0c8300f6096b3","name":"Calendar App Design","description":"","idAttachmentCover":"56027cfcbe1b72ecf1fc452a","idMembers":["56027c1930450d8bf7b10758","36027j1930450d8bf7b10158"],"idLabels":["56027e4119ad3a5dc28b36cd","5640635e19ad3a5dc21416b2"],"attachments":[{"id":"56027cfcbe1b72ecf1fc452a","name":"calendar-app-design.jpg","src":"assets/images/scrumboard/calendar.jpg","time":1626154875,"type":"image"},{"id":"67027cahbe3b52ecf2dc631c","url":"assets/images/scrumboard/calendar.jpg","time":1626155475,"type":"link"}],"subscribed":true,"checklists":[{"id":"63021cfdbe1x72wcf1fc451v","name":"Checklist","checkItems":[{"id":1,"name":"Implement a calendar library","checked":false},{"id":2,"name":"Replace event colors with Material Design colors","checked":true},{"id":3,"name":"Replace icons with Material Design icons","checked":false},{"id":4,"name":"Use date-fns","checked":false}]},{"name":"Checklist 2","id":"74031cfdbe1x72wcz1dc166z","checkItems":[{"id":1,"name":"Replace event colors with Material Design colors","checked":true},{"id":2,"name":"Replace icons with Material Design icons","checked":false},{"id":3,"name":"Use date-fns","checked":false}]}],"activities":[{"id":1,"type":"comment","idMember":"56027c1930450d8bf7b10758","message":"We should be able to add date-fns without any problems","time":1626154875},{"id":2,"type":"comment","idMember":"36027j1930450d8bf7b10158","message":"I added a link for a page that might help us deciding the colors","time":1626154275},{"id":3,"type":"attachment","idMember":"36027j1930450d8bf7b10158","message":"attached a link","time":1626153375}],"due":null},{"id":"5637273da9b93bb84743a0f9","name":"Fix Splash Screen bugs","description":"","idAttachmentCover":"5603a2ae2bbd55bb2db57478","idMembers":["56027c1930450d8bf7b10758"],"idLabels":[],"attachments":[{"id":"5603a2ae2bbd55bb2db57478","name":"mail-app-design.jpg","src":"assets/images/scrumboard/mail.jpg","time":1626154875,"type":"image"}],"subscribed":true,"checklists":[],"activities":[],"due":null}],"members":[{"id":"56027c1930450d8bf7b10758","name":"Alice Freeman","avatar":"assets/images/avatars/alice.jpg"},{"id":"26027s1930450d8bf7b10828","name":"Danielle Obrien","avatar":"assets/images/avatars/danielle.jpg"},{"id":"76027g1930450d8bf7b10958","name":"James Lewis","avatar":"assets/images/avatars/james.jpg"},{"id":"36027j1930450d8bf7b10158","name":"John Doe","avatar":"assets/images/avatars/Velazquez.jpg"}],"labels":[{"id":"56027e4119ad3a5dc28b36cd","name":"Design","class":"bg-orange text-white"},{"id":"5640635e19ad3a5dc21416b2","name":"App","class":"bg-blue text-white"},{"id":"6540635g19ad3s5dc31412b2","name":"Feature","class":"bg-green text-white"}]}'
	const board = JSON.parse(_board)

	const [formOpen, setFormOpen] = useState(false);
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset(defaultValues);
		}
	}, [formOpen, reset]);

	function handleOpenForm(ev) {
		ev.stopPropagation();
		dispatch(openCardDialog())
		// setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function onSubmit(data) {
		dispatch(newCard({ boardId: board.id, listId: props.listId, cardTitle: data.title })).then(() => {
			props.onCardAdded();
		});
		handleCloseForm();
	}

	return (
		<div className="w-full border-t-1">
			{formOpen ? (
				<ClickAwayListener onClickAway={handleCloseForm}>
					<form className="p-16" onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="title"
							control={control}
							render={({ field }) => (
								<TextField
									className="mb-16"
									required
									fullWidth
									variant="filled"
									label="Card title"
									autoFocus
									InputProps={{
										...field,
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={handleCloseForm}>
													<Icon className="text-18">close</Icon>
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>

						<div className="flex justify-between items-center">
							<Button
								variant="contained"
								color="secondary"
								type="submit"
								disabled={_.isEmpty(dirtyFields) || !isValid}
							>
								Add
							</Button>
						</div>
					</form>
				</ClickAwayListener>
			) : (
				<Button
					onClick={handleOpenForm}
					classes={{
						root: 'font-medium w-full px-16 rounded-none h-48',
						label: 'justify-start'
					}}
				>
					<Icon className="text-20">add</Icon>
					<span className="mx-8">Add content</span>
				</Button>
			)}
		</div>
	);
}

export default BoardAddCard;
