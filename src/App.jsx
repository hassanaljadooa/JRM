import './index.css'
import { useEffect, useState } from "react";
import { NavBar } from "./Components/NavBar.jsx";
import { ReminderList } from "./Components/Core/ReminderList.jsx";
import { Toolbar } from "./Components/Core/Toolbar.jsx";

export default function App() {
    const currentDate = new Date()
    // display mode to show completed or/ incomplete reminders based on the value in the state
    let [displayMode, setDisplayMode] = useState('incomplete')

    const [todos, setTodos] = useState(() => {
        return localStorage.getItem('reminders') !== null ? JSON.parse(localStorage.getItem('reminders')) : []
    })

    const [currentData, setCurrentData] = useState([])

    // moniters changes to the todos data and display mode and reacts accordingly
    useEffect(() => {
        // filters todos data based on completed/incomplete reminders
        displayMode === 'incomplete' ? setCurrentData(todos.filter(todo => todo.completed === false)) : setCurrentData(todos.filter(todo => todo.completed === true))
    }, [todos, displayMode])

    useEffect(() => {
        localStorage.setItem("reminders", JSON.stringify(todos))

        console.log("Current Reminders", todos)
    }, [todos])

    // toggles display mode to show completed and incomplete reminders
    function toggleDisplay() {
        setDisplayMode(() => {
            return displayMode === "incomplete" ? "completed" : "incomplete"
        })
    }

    /**
     * TODO: This should refactored into class based data model
     * */
    function createReminder(reminderInfo) {
        setTodos(currentTodos => {
            // creates a new copy of the current todo state, then adds a new todo object which is then repopulated into the state.
            return [...currentTodos, reminderInfo]
        })
    }

    // toggles completion state
    function toggleReminder(id, completed) {
        const foundTodo = todos.find(todo => todo.id === id);
        if (foundTodo) {
            setTodos(currentTodos => {
                return currentTodos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, completed };
                    }
                    return todo;
                });
            });
        }
    }

    function deleteReminder(todoID) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== todoID)
        })
    }

    // edits the title of the todo object
    function editReminder(todoID, title, dueDate) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                return todo.id === todoID ? { ...todo, title, dueDate } : todo
            })
        })
    }

    //console.log(todos)
    return (
        <div className="bg-black">
            <NavBar />
            <div>
                <div className="sticky top-0 z-10">
                    <Toolbar
                        setTodos={setTodos}
                        toggleDisplay={toggleDisplay}
                        displayMode={displayMode}
                        todos={currentData}
                    />
                </div>
                <div className="bg-white grid grid-rows-1 gap-2 p-1">
                    <ReminderList
                        todos={currentData}
                        displayMode={displayMode}
                        editReminder={editReminder}
                        toggleReminder={toggleReminder}
                        createReminder={createReminder}
                        deleteReminder={deleteReminder}
                    />
                </div>
            </div>
        </div>
    )
}