import './index.css'
import {useEffect, useState} from "react";
import {NavBar} from "./Components/NavBar.jsx";
import {ReminderList} from "./Components/ReminderList.jsx";

export default function App() {
    const currentDate = new Date()

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
    }, [todos, completeTodos])

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
            <ReminderList setTodos={setTodos} todos={todos} editReminder={editReminder} toggleReminder={toggleReminder} createReminder={createReminder} deleteReminder={deleteReminder} />
        </div>
    )
}