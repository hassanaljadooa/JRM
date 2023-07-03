import {Badge} from "./Elements/Badge.jsx";
import {VerticalDivider} from "./Elements/VerticalDivider.jsx";
import {CreateReminderButton} from "./CreateReminderButton.jsx";
import {ReminderViewer} from "./ReminderViewer.jsx";

export const ReminderList = ({todos, toggleReminder, deleteReminder, editReminder, setTodos, createReminder}) => {
	const currentDate = new Date()

	return (
		<>
			<div className="custom-scrollbar bg-black flex border-b border-b-slate-500 overflow-x-auto">
				<div className="p-1.5 flex gap-1">
					<Badge type="info" content={currentDate.toDateString()} />
					<Badge type={todos.length === 0 ? "success" : "error"} content={todos.length === 0 ? "You're all set!" : `${todos.length} Incomplete`} />
				</div>
				<VerticalDivider />
				<div className="p-1.5 flex gap-1">
					<button onClick={() => {setTodos([])}}>
						<Badge content="Delete All Reminders" />
					</button>
					{/*<button onClick={() => {
						console.log(todos)}}>
						<Badge content="Log Reminders" />
					</button>*/}
				</div>
			</div>
			<div className="w-full h-auto custom-scrollbar bg-black overflow-x-auto p-2 border-b-4 border-b-indigo-500">
				<div className="flex gap-2">
					<div className="flex-shrink-0 sticky">
						<CreateReminderButton createReminder={createReminder} />
					</div>
					{
						todos.map(todo => {
							if (todo.completed !== true) {
								return (
									<div className="flex-shrink-0 sticky">
										<ReminderViewer {...todo} deleteReminder={deleteReminder} editReminder={editReminder} toggleReminder={toggleReminder} key={todo.id} />
									</div>
								)
							}
						})
					}
				</div>
			</div>
		</>
	)
}