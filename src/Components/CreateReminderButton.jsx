import * as Swal from "sweetalert2";
export function CreateReminderButton({createReminder}) {
	async function createReminderModal () {
		const reminder = await Swal.fire({
			title: "Create a Reminder",
			input: "text",
			inputLabel: "What would you like your reminder to say?",
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return "Please write something"
				}
			}
		})
		if (reminder.value) {
			createReminder(reminder.value)
		}
	}
	return (
		<>
			<button onClick={createReminderModal} className="bg-slate-100 font-semibold w-full h-full p-6 rounded-lg shadow text-3xl hover:bg-slate-200 active:bg-slate-300">
				<i className="fa-solid fa-plus"></i>
			</button>
		</>
	)
}