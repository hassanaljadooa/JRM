export const NavBar = () => {
	return (
		<>
			<div className="w-full bg-slate-100 p-2 flex justify-between">
				<div className="py-2 font-thin text-xl">
					Reminder App
				</div>
				<div className="flex gap-2">
					<a href="https://github.com/hassanaljadooa/reminder" className="px-2 py-1 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 active:bg-gray-400 focus:relative">GitHub</a>
					<button className="px-2 py-1 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 active:bg-gray-400 focus:relative">About</button>
				</div>
			</div>
		</>
	)
}