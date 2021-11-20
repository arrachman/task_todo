import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function BoardCard(props) {
	const item = useSelector(({ adminApp }) => adminApp.item)
	const itemLesson = useSelector(({ adminApp }) => adminApp.itemLesson)

	const classes = useStyles(props);
	const { cardId, index } = props;
	let card;
	card = _.find(cardId.indexOf("item") ? itemLesson.list : item.list, { id: parseInt(cardId.replace("item_", "").replace("lesson_", "")) });

	return (
		<Draggable draggableId={cardId} index={index} type="card">
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Card
						className={clsx(
							classes.card,
							snapshot.isDragging ? 'shadow-lg' : 'shadow-0',
							'w-full mb-16 rounded-16 cursor-pointer border-1'
						)}
					>
						<div className="p-16 pb-0">
							<div className="flex items-center mb-12 -mx-4">
								<div
									className={clsx(
										'flex items-center px-8 py-4 mx-4 rounded-16',
									)}
									style={{marginBottom: '10px'}}
								>
									<Icon className="text-16">ondemand_video</Icon>
								</div>
								<Typography className="font-medium mb-12">{card && card.title} {card && card.name}</Typography>
							</div>

						</div>

					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default BoardCard;
