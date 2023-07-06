import React from 'react';
import { Badge } from "../Elements/Badge.jsx";
import { CreateReminderButton } from "./CreateReminderButton.jsx";
import { ReminderItem } from "./ReminderItem.jsx";

export const ReminderList = ({todos, toggleReminder, deleteReminder, editReminder, createReminder }) => {
	return (
		<div className="bg-gray-100 rounded-lg p-1 grid grid-rows-1 gap-1 border-b-2">
			{true === true && (
				<div className="w-full p-1 rounded-lg bg-gray-300">
					<div className="flex gap-1">
						<div>
							<Badge content="Today" type="info" />
						</div>
						<div>
							<Badge content="5 Incomplete" type="error" />
						</div>
					</div>
				</div>
			)}
			<div className="rounded-lg w-full h-auto overflow-x-auto custom-scrollbar">
				<div className="flex gap-2">
					{typeof createReminder !== "undefined" && (
						<div className="flex-shrink-0 shadow-lg	">
							<CreateReminderButton createReminder={createReminder} />
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
