import * as Swal from "sweetalert2";
export function CreateReminderButton({createReminder}) {
	async function createReminderModal () {
		Swal.fire({
			title: 'Enter Details',
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

				createReminder(title, dueDate)
			}
		});

	}


	return (
		<>
			<button onClick={createReminderModal} className="bg-white font-semibold w-full h-full p-6 rounded-md text-4xl hover:bg-slate-200 active:bg-slate-300">
				<i className="fa-solid fa-plus"></i>
			</button>

			{/*{isModalRendered === true && (<CreateReminderModal />)}*/}
		</>
	)
}