import { useEffect, useState } from "react"

export function EditReminderModalBody({ title, dueDate, summary, setEditReminderInfo }) {
    let [reminderDetails, setReminderDetails] = useState({ title: title, dueDate: dueDate, summary: summary })

    const handleTitleInput = (e) => {
        let title = e.target.value
        setReminderDetails(reminderDetails => { return { ...reminderDetails, title } })
    }
    const handleSummaryInput = (e) => {
        let summary = e.target.value
        setReminderDetails(reminderDetails => { return { ...reminderDetails, summary } })
    }
    const handleDueDateInput = (e) => {
        let dueDate = e.target.value
        setReminderDetails(reminderDetails => { return { ...reminderDetails, dueDate } })
    }

    // will update shared reminder state whenever data in either input field changes
    useEffect(() => {
        if (reminderDetails.title && reminderDetails.dueDate) {
            setEditReminderInfo(info => {
                return { ...info, ...reminderDetails }
            })
        }
    }, [reminderDetails])
    return (
        <div className="w-full">
            <div className="grid grid-row-1 gap-1">
                <label
                    for="reminderTitle"
                    className="text-left block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <span className="text-sm font-medium text-gray-700"> Reminder Title </span>

                    <input
                        type="text"
                        value={reminderDetails.title}
                        onChange={handleTitleInput}
                        id="reminderTitle"
                        placeholder="What would like your reminder to say?"
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                </label>
                <label
                    htmlFor="reminderSummary"
                    className="text-left block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-0 focus-within:ring-indigo-500"
                >
                    <span className="text-sm font-medium text-gray-700">Summary (optional) </span>

                    <textarea
                        type="text"
                        value={reminderDetails.summary}
                        onChange={handleSummaryInput}
                        id="reminderSummary"
                        placeholder="Add a summary to your reminder..."
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    ></textarea>
                </label>
                <label
                    for="reminderDueDate"
                    className="text-left block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <span className="text-sm font-medium text-gray-700"> Due Date </span>

                    <input
                        type="date"
                        value={reminderDetails.dueDate}
                        onChange={handleDueDateInput}
                        id="reminderDueDate"
                        placeholder="anthony@rhcp.com"
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                </label>
            </div>
        </div>
    )
}