import Swal from "sweetalert2";
import {Badge} from "../Elements/Badge.jsx";

export function ReminderItem({id, title, completed, dueDate, toggleReminder, deleteReminder, editReminder}) {
	async function reminderEditor () {
		Swal.fire({
			title: 'Enter Details',
			inputValue: title,
			html:
				'<div>' +
				'	<input id="text-input" class="swal2-input w-80" placeholder="Reminder Title">' +
				'	<input id="date-input" class="swal2-input w-80" type="date"> ' +
				'</div>',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			preConfirm: () => {
				const textValue = document.getElementById('text-input').value;
				const dateValue = document.getElementById('date-input').value;

				if (!textValue || !dateValue) {
					Swal.showValidationMessage('Please enter both text and date');
				}

				return { text: textValue, date: dateValue };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const title = result.value.text;
				const dueDate = result.value.date;

				editReminder(id, title, dueDate)
			}
		});
	}

	return (
		<div>
			<div className="bg-white w-full h-auto rounded-t-lg">
				<p className="font-medium text-xl p-2 ">{title}</p>
				<div className="p-1">
						<Badge type="info" pill={true} content={[<i className="fa-solid fa-bell"></i>," ", dueDate]} />
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