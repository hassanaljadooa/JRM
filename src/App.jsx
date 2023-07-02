import './index.css'
import {useEffect, useState} from "react";
import {CreateReminderButton} from "./Components/CreateReminderButton.jsx";
import {Badge} from "./Components/Elements/Badge.jsx";
import {ReminderViewer} from "./Components/ReminderViewer.jsx";
import {VerticalDivider} from "./Components/Elements/VerticalDivider.jsx";
import {NavBar} from "./Components/NavBar.jsx";

export default function App() {
    const [todos, setTodos] = useState(() => {
        return localStorage.getItem('ITEMS') !== null ? JSON.parse(localStorage.getItem('ITEMS')) : []
    })

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])

    const currentDate = new Date()

    function generateBrightHexColor() {
        var hex = '0123456789ABCDEF';
        var color = '#';

        // Generate a random bright color excluding green
        do {
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += hex[Math.floor(Math.random() * 10) + 6];
            }
        } while (color.includes('8') || color.includes('9') || color.includes('A') || color.includes('B') || color.includes('C') || color.includes('D') || color.includes('E') || color.includes('F'));

        return color;
    }


    function createReminder(title) {
        setTodos(currentTodos => {
            // creates a new copy of the current todo state, then adds a new todo object which is then repopulated into the state.
            return [...currentTodos,
                {
                    id:crypto.randomUUID(),
                    title: title, completed: false,
                    color: generateBrightHexColor(),
                    datetime: currentDate.toDateString()
                }
            ]
        })
    }

    // toggles completion state
    function toggleReminder(todoID, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                // changes status to completed/incomplete or returns obj with no changes
                return todo.id === todoID ? {...todo, completed} : todo
            })
        })
    }

    function deleteReminder (todoID) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== todoID)
        })
    }

    // edits the title of the todo object
    function editReminder (title, todoID) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                return todo.id === todoID ? {...todo, title} : todo
            })
        })
    }

    //console.log(todos)
    return (
        <div>
            <NavBar />
            <div className="custom-scrollbar bg-black px-2 py-1.5 flex border-b border-b-slate-500 gap-1 overflow-x-auto">
                <Badge type="info" content={currentDate.toDateString()} />
                <Badge type={todos.length === 0 ? "success" : "info"} content={todos.length === 0 ? "You're all set!" : `${todos.length} Incomplete`} />
                <VerticalDivider />
                <button onClick={() => {setTodos([])}}>
                    <Badge content="Delete All Reminders" />
                </button>
                <button onClick={() => {
                    console.log(todos)}}>
                    <Badge content="Log Reminders" />
                </button>
            </div>
            <div className="w-full h-auto custom-scrollbar bg-black overflow-x-auto p-2 border-b-4 border-b-indigo-500">
                <div className="flex gap-2">
                    <div className="flex-shrink-0 sticky">
                        <CreateReminderButton createReminder={createReminder} />
                    </div>
                    {
                        todos.map(todo => {
                            if (todo.completed !== true) {
                                return (
                                    <div className="flex-shrink-0 sticky">
                                        <ReminderViewer {...todo} deleteReminder={deleteReminder} editReminder={editReminder} toggleReminder={toggleReminder} key={todo.id} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}