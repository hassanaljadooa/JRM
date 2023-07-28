import { React, useState } from 'react';
import { Badge } from "../Elements/Badge.jsx";
import { CreateReminderButton } from "./CreateReminderButton.jsx";
import { ReminderItem } from "./ReminderItem.jsx";

export const ReminderList = ({ todos, toggleReminder, deleteReminder, editReminder, createReminder, displayMode }) => {
	let reminderInfoScaffold = {
		id: 0,
		title: '',
		completed: false,
		dueDate: '',
	}

	// parent reminder state shared between CreateReminderButton.jsx & CreateReminderModalBody.jsx
	// this is only for creating a reminder
	let [reminderInfo, setReminderInfo] = useState(reminderInfoScaffold)

	// shared state for modifying existing reminders
	// its necessary to do it this way because the editor modal is made of 
	// two seperate components and they both need access to a shared state to track data changes.
	let [editReminderInfo, setEditReminderInfo] = useState({ title: '', dueDate: '' })

	// counts the reminders that are marked as "incomplete"
	const incompleteCount = todos.reduce((count, item) => count + (item.completed === false ? 1 : 0), 0),
		completedCount = todos.reduce((count, item) => count + (item.completed === true ? 1 : 0), 0);


	return (
		<div className="bg-gray-100 rounded-lg p-1 grid grid-rows-1 gap-1 border-b-2">
			{true === true && (
				<div className="w-full p-1 rounded-full bg-gray-300">
					<div className="flex gap-1">
						<div>
							<Badge content="Today"
								pill={true}
								type="info" />
						</div>
						<div>
							<Badge content={displayMode === 'incomplete' ? incompleteCount + ' Incomplete' : completedCount + ' Completed'}
								pill={true}
								type="info" />
						</div>
					</div>
				</div>
			)}
			<div className="rounded-lg w-full h-auto overflow-x-auto custom-scrollbar">
				<div className="flex gap-2">
					{/*Only shows the button to create a reminder if its passed as prop*/}
					{typeof createReminder !== "undefined" && (
						<div className="flex-shrink-0 shadow-lg	">
							<CreateReminderButton reminderInfo={reminderInfo} setReminderInfo={setReminderInfo} createReminder={createReminder} />
						</div>
					)}
					{todos.length === 0 && (
						<div className="flex justify-center items-center">
							<p className="text-1xl text-black font-semibold">There are currently no reminders to display.</p>
						</div>
					)}
					{todos.map((todo) => {
						return (
							<div className="flex-shrink-0">
								<ReminderItem
									{...todo}
									deleteReminder={deleteReminder}
									editReminder={editReminder}
									toggleReminder={toggleReminder}
									editReminderInfo={editReminderInfo}
									setEditReminderInfo={setEditReminderInfo}
									key={todo.id}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
