import './index.css'
import {useEffect, useState} from "react";
import {NavBar} from "./Components/NavBar.jsx";
import {ReminderList} from "./Components/ReminderList.jsx";
import {Toolbar} from "./Components/Toolbar.jsx";

export default function App() {
    const currentDate = new Date()

    // display mode to show completed or/ incomplete reminders based on the value in the state
    let [displayMode, setDisplayMode] = useState('incomplete')

    const [todos, setTodos] = useState(() => {
        return localStorage.getItem('incompleteReminder') !== null ? JSON.parse(localStorage.getItem('incompleteReminder')) : []
    })

    // TODOS marked as completed
    const [completeTodos, setCompleteTodos] = useState(() => {
        return localStorage.getItem('completeReminder') !== null ? JSON.parse(localStorage.getItem('completeReminder')) : []
    })

    useEffect(() => {
        localStorage.setItem("incompleteReminder", JSON.stringify(todos))
        localStorage.setItem("completeReminder", JSON.stringify(completeTodos))

        console.log("Incomplete", todos)
        console.log("Complete", completeTodos)
    }, [todos, completeTodos])

    function toggleDisplay() {
        setDisplayMode(() => {
            return displayMode === "incomplete" ? "completed" : "incomplete"
        })
    }
    
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

    /**
     * TODO: This should refactored into class based data model
     * */
    function createReminder(title) {
        setTodos(currentTodos => {
            // creates a new copy of the current todo state, then adds a new todo object which is then repopulated into the state.
            return [...currentTodos,
                {
                    id:crypto.randomUUID(),
                    title: title,
                    completed: false,
                    color: generateBrightHexColor(),
                    datetime: currentDate.toDateString(),
                }
            ]
        })
    }

    // toggles completion state
    function toggleReminder(id, completed) {
        if (completed) {
            todos.map(todo => {
                if (todo.id === id) {
                    setCompleteTodos(currentCompletedReminders => {
                        return [...currentCompletedReminders, {...todo, completed}]
                    })
                    setTodos(() => {
                        return todos.filter(todo => todo.id !== id)
                    })
                }
            })
        } else {
            todos.map(todo => {
                if (todo.id === id) {
                    setTodos(currentReminders => {
                        return [...currentReminders, {...todo, completed}]
                    })
                    setCompleteTodos(() => {
                        return completeTodos.filter(todo => todo.id !== id)
                    })
                }
            })
        }
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
            <div>
                <div className="sticky top-0 z-10">
                    <Toolbar
                        setTodos={setTodos}
                        setCompleteTodos={setCompleteTodos}
                        toggleDisplay={toggleDisplay}
                        displayMode={displayMode}
                        todos={displayMode === 'incomplete' ? todos : completeTodos}
                    />
                </div>
                <div className="">
                    <ReminderList
                        todos={displayMode === 'incomplete' ? todos : completeTodos}
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