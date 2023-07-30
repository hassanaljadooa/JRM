import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Badge } from "../Elements/Badge.jsx";
import { EditReminderModalBody } from "./EditReminderModalBody.jsx";
import { ReminderViewer } from "./ReminderViewer.jsx";
import { useEffect, useRef } from "react";

// deconstructed props include vital information about the reminder
// as well functions to modify a reminder in different ways including the ability to edit, delete, and toggle completion status
// all functions wull require the id of the reminder
export function ReminderItem({ id, title, summary, completed, dueDate, createdOn,
	toggleReminder, deleteReminder, editReminder, editReminderInfo, setEditReminderInfo }) {
	// this life saver allows us to render react components from within the sweetalert2 config
	let MySwal = withReactContent(Swal)

	// Ref hook is necessary for Swal to work properly
	let editReminderInfoRef = useRef(editReminderInfo)

	// updates DOM reference whenever data in the state changes
	useEffect(() => {
		editReminderInfoRef.current = editReminderInfo
	}, [editReminderInfo])

	// launches an editor to modify existing reminders
	// parent container is an interactive modal inside of which is the editor as a react component
	async function reminderEditor() {
		MySwal.fire({
			title: 'Edit Reminder',
			html: <EditReminderModalBody title={title} dueDate={dueDate} summary={summary} setEditReminderInfo={setEditReminderInfo} />,
			showCancelButton: true,
			allowEscapeKey: true,
			allowEnterKey: true,
			confirmButtonText: 'Confirm Edits',
			confirmButtonColor: '6366f1',
			preConfirm: () => {
				//console.log(editReminderInfoRef.current);
				if (!editReminderInfoRef.current.title || !editReminderInfoRef.current.dueDate) {
					Swal.showValidationMessage('Please enter both text and date');
				}
			}
		}).then((result) => {
			if (result.isConfirmed) {
				let title = editReminderInfoRef.current.title,
					dueDate = editReminderInfoRef.current.dueDate,
					summary = editReminderInfoRef.current.summary

				editReminder(id, title, dueDate, summary)
			}
		});
	}

	// Same logic as the reminder editor, except no data modifications occur.
	async function viewReminder() {
		MySwal.fire({
			html: <ReminderViewer id={id} title={title} summary={summary} dueDate={dueDate} createdOn={createdOn} completed={completed} />,
			confirmButtonText: 'Close',
			showConfirmButton: false,
			showCloseButton: true,
			allowEscapeKey: true,
			allowOutsideClick: false,
			allowEnterKey: true,
			customClass: {
				closeButton: 'mb-0.5'
			}
		});
	}

	// will remove text truncation and clip text in effect showing text in full with changing parent eement width
	const expandSummary = (e) => {
		// targets elements class list
		let targetClass = e.target.classList,
			classStatus = targetClass.contains('truncate')

		// checks if the target element is truncated or not
		classStatus ? targetClass.replace('truncate', 'text-clip') : targetClass.replace('text-clip', 'truncate')
	}
	return (
		<div>
			<div className="bg-white h-auto rounded-t-lg max-w-sm">
				<p className="font-bold text-lg px-2 py-1 truncate">{title}</p>
				<p onClick={expandSummary} className="px-2 cursor-pointer font-normal truncate hover:underline">{summary ? summary : <span className="italic">No summary!</span>}</p>
				<div className="p-1">
					<Badge type="info" pill={true} content={[<i className="fa-solid fa-bell"></i>, " ", dueDate]} />
				</div>
			</div>
			<div className="h-auto w-full">
				<button onClick={viewReminder} className="w-full inline-block px-4 py-2 text-sm font-medium bg-white hover:bg-gray-50 focus:relative border-t border-t-gray-400">
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