import { VerticalDivider } from "../Elements/VerticalDivider";

export function ReminderViewer({ id, title, dueDate, completed, summary, createdOn }) {
    let createdOnParsed = new Date(createdOn).toDateString()
    return (
        <div className="text-left">
            <div
                href="#"
                className="relative block overflow-hidden rounded-lg bg-gray-100 border border-gray-300 p-3 sm:p-4 lg:p-4 w-full"
            >
                <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                        <h3 className="text-lg font-normal text-gray-900 sm:text-xl">
                            <span className="break font-bold">Title: </span>
                            {title}
                        </h3>
                    </div>
                </div>

                <div className="mt-2">
                    <p className="text-base">
                        <span className="font-semibold text-md text-black">Summary: </span>
                        {summary ? summary : <span className="italic">No summary was provided!</span>}
                    </p>
                </div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-black">Created On</dt>
                        <dd className="text-xs  text-gray-800">{createdOnParsed}</dd>
                    </div>
                    <VerticalDivider />
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-black">Due Date</dt>
                        <dd className="text-xs text-gray-800">{dueDate}</dd>
                    </div>
                    <VerticalDivider />
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-black">Completion Status</dt>
                        <dd className="text-xs  text-gray-800">{completed === false ? "Ongoing" : "Marked as Completed"}</dd>
                    </div>
                </dl>
            </div>
        </ div>
    )

}