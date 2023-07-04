import React from 'react';
import { Badge } from "./Elements/Badge.jsx";
import { CreateReminderButton } from "./CreateReminderButton.jsx";
import { ReminderItem } from "./ReminderItem.jsx";

export const ReminderList = ({todos, toggleReminder, deleteReminder, editReminder, createReminder }) => {
	return (
		<>
			<div className="w-full h-auto custom-scrollbar bg-black overflow-x-auto border-b-4 border-gray-500 p-1">
				<div className="flex gap-2">
					{typeof createReminder !== "undefined" && (
						<div className="flex-shrink-0 sticky">
							<CreateReminderButton createReminder={createReminder} />
						</div>
					)}
					{typeof createReminder === "undefined" && (
						<div className="flex-shrink-0">
							<div className="bg-slate-100 font-semibold h-full rounded-md">
								<div className="grid grid-row-1 gap-2 p-0.5">
									<div className="">
										<Badge content="June 1, 2023" type="info" />
									</div>
									<div className="">
										<Badge content="13 Reminder" type="info" />
									</div>
									<div className="">
										<Badge content="5 Incomplete" type="warning" />
									</div>
								</div>
							</div>
						</div>
					)}
					{todos.length === 0 && (
						<p className="text-1xl text-white">There are currently no reminders to display.</p>
					)}
					{todos.map((todo) => {
						return (
							<div className="flex-shrink-0 sticky">
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
		</>
	);
};
