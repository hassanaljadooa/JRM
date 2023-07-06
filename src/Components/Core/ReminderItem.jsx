import Swal from "sweetalert2";
import {Badge} from "../Elements/Badge.jsx";

export function ReminderItem({id, title, completed, datetime, toggleReminder, deleteReminder, editReminder}) {
	async function reminderEditor () {
		const reminder = await Swal.fire({
			title: "Edit your Reminder",
			input: "text",
			inputLabel: "What would you like your reminder to say?",
			inputValue: title,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return "Please write something"
				}
			}
		})

		if (reminder.value) {
			editReminder(reminder.value, id)
		}
	}

	return (
		<div>
			<div className="bg-white w-full h-auto rounded-t-lg">
				<p className="font-medium text-xl p-2 ">{title}</p>
				<div className="p-1">
						<Badge type="info" pill={true} content={[<i className="fa-solid fa-bell"></i>," ", datetime]} />
				</div>
			</div>
			<div className="h-auto w-full">
				<button className="w-full inline-block px-4 py-2 text-sm font-medium bg-white hover:bg-gray-50 focus:relative border-t border-t-gray-400">
					<i className="fa-solid fa-eye"></i> View Reminder
				</button>
				<span className="flex justify-between -space-x-px overflow-hidden rounded-b-lg border-t border-t-gray-400 bg-white">
					<button onClick={() => {
						const status = completed === true ? false : true
						toggleReminder(id, status)
					}} className="w-full inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
						<i className="fa-solid fa-check text-xl"></i>
					</button>
					<button onClick={reminderEditor} className="w-full inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
						<i className="fa-solid fa-pen"></i>
					</button>
					<button onClick={() => {deleteReminder(id)}} className="w-full inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
						<i className="fa-solid fa-trash"></i>
					</button>
				</span>
			</div>
		</div>
	)
}