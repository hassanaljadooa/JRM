import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CreateReminderModalBody } from "./CreateReminderModalBody";
import { useRef, useEffect } from "react";

/* 
* This component is responsible for both the UI aspect of creating a reminder 
* as well as handling the user input
*/

export function CreateReminderButton({ reminderInfo, setReminderInfo, createReminder }) {
	const MySwal = withReactContent(Swal)

	let reminderInfoRef = useRef(reminderInfo)

	useEffect(() => {
		reminderInfoRef.current = reminderInfo
	}, [reminderInfo])

	async function createReminderModal() {
		MySwal.fire({
			title: 'New Reminder',
			html: <CreateReminderModalBody reminderInfo={reminderInfo} setReminderInfo={setReminderInfo} />,
			cancelButtonText: "Cancel",
			confirmButtonText: "Create Reminder",
			confirmButtonColor: '#6366f1',
			showCancelButton: true,
			allowEscapeKey: true,
			allowEnterKey: true,
			allowOutsideClick: true,
			preConfirm: () => {
				if (!reminderInfoRef.current.title || !reminderInfoRef.current.dueDate) {
					MySwal.showValidationMessage('Please add a Title and a due date. ');
				}
			}
		}).then(result => {
			if (result.isConfirmed) {
				createReminder(reminderInfoRef.current)
				setReminderInfo({})
			}
		})
	}

	return (
		<>
			<button onClick={createReminderModal} className="bg-white font-semibold w-full h-full p-6 rounded-md text-4xl hover:bg-slate-200 active:bg-slate-300">
				<i className="fa-solid fa-plus"></i>
			</button>
		</>
	)
}