import Swal from "sweetalert2";

export const NavBar = () => {
	async function aboutJRM(){
		await Swal.fire({
			title: "What is JRM?",
			icon: "info",
			text: "\n" +
				"JRM (Just Remind Me) is a web application developed using React as a learning project. It was not meant to be anything other than a way to practice react, but I decided transform it into a user-facing product to enhance my portfolio. Although it is currently unfinished as a reminder app, the ultimate goal is to provide reminders through various channels such as email, text, telegram, discord, etc. Stay tuned!"
		})
	}

	return (
		<>
			<div className="w-full bg-slate-100 p-2 flex justify-between border-b-4 border-b-indigo-500">
				<div className="py-2 font-semibold text-xl tracking-wide">
					JRM
				</div>
				<div className="flex gap-2">
					<a href="https://github.com/hassanaljadooa/reminder" className="px-2 py-3 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 active:bg-gray-400 focus:relative">GitHub</a>
					<button onClick={aboutJRM} className="px-2 py-1 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 active:bg-gray-400 focus:relative">About</button>
				</div>
			</div>
		</>
	)
}