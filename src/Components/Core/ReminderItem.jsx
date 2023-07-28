import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Badge } from "../Elements/Badge.jsx";
import { EditReminderModalBody } from "./EditReminderModalBody.jsx";
import { useEffect, useRef } from "react";

export function ReminderItem({ id, title, completed, dueDate, toggleReminder, deleteReminder, editReminder, editReminderInfo, setEditReminderInfo }) {
	let MySwal = withReactContent(Swal)

	// Ref hook is necessary for Swal to work properly
	let editReminderInfoRef = useRef(editReminderInfo)

	// updates DOM reference whenever data in the state changes
	useEffect(() => {
		editReminderInfoRef.current = editReminderInfo
	}, [editReminderInfo])

	async function reminderEditor() {
		MySwal.fire({
			title: 'Edit Reminder',
			inputValue: title,
			html: <EditReminderModalBody title={title} dueDate={dueDate} setEditReminderInfo={setEditReminderInfo} />,
			showCancelButton: true,
			allowEscapeKey: true,
			allowEnterKey: true,
			confirmButtonText: 'Confirm Edits',
			preConfirm: () => {
				//console.log(editReminderInfoRef.current);
				if (!editReminderInfoRef.current.title || !editReminderInfoRef.current.dueDate) {
					Swal.showValidationMessage('Please enter both text and date');
				}
			}
		}).then((result) => {
			if (result.isConfirmed) {
				let title = editReminderInfoRef.current.title,
					dueDate = editReminderInfoRef.current.dueDate

				editReminder(id, title, dueDate)
			}
		});
	}

	return (
		<div>
			<div className="bg-white w-full h-auto rounded-t-lg">
				<p className="font-medium text-xl p-2 ">{title}</p>
				<div className="p-1">
					<Badge type="info" pill={true} content={[<i className="fa-solid fa-bell"></i>, " ", dueDate]} />
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
					<button onClick={() => { deleteReminder(id) }} className="w-full inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
						<i className="fa-solid fa-trash"></i>
					</button>
				</span>
			</div>
		</div>
	)
}