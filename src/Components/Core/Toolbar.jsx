import {Badge} from "../Elements/Badge.jsx";
import {VerticalDivider} from "../Elements/VerticalDivider.jsx";

export const Toolbar = ({todos, setTodos, setCompleteTodos, toggleDisplay, displayMode}) => {
	const currentDate = new Date()

	return (
		<>
			<div className="custom-scrollbar bg-black flex border-b border-b-slate-500 overflow-x-auto">
				<div className="p-1.5 flex gap-1">
					<Badge type="info" pill={true} content={[<i className="fa-solid fa-calendar-days"></i> ," ",currentDate.toDateString()]} />
					{displayMode === 'incomplete' && (
						<Badge type={todos.length === 0 ? "success" : "error"} pill={true} content={todos.length === 0 ? "You're all set!" : `${todos.length} Incomplete`} />
					)}
					{displayMode === 'completed' && (
						<Badge type="success" pill={true} content={`${todos.length} Completed`} />
					)}
				</div>
				<VerticalDivider />
				<div className="p-1.5 flex gap-1">
					<button onClick={() => {
						setTodos([])
						setCompleteTodos([])
					}}>
						<Badge content="Delete All Reminders" />
					</button>
					<button onClick={toggleDisplay}>
						<Badge content={displayMode === 'incomplete' ? 'Show Finished' : 'Show Unfinished'} />
					</button>
				</div>
			</div>
		</>
	)
}