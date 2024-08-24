import {Tasks} from "../Components/App";
import {v4} from "uuid";
import {addTodolistAC, RemoveTodolist, removeTodolistAC} from "./todolsitReducer";

export type TasksActions = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export const tasksReducer = (state: Tasks, action: TasksActions): Tasks => {

    switch (action.type) {
        case "REMOVE_TASK": {
            const todolistId = action.payload.todolistId;
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== action.payload.taskId)}
        }
        case "ADD_TASK": {
            const todolistId = action.payload.todolistId;
            return {...state, [todolistId]: [...state[todolistId], {id: v4(), title: action.payload.title, isDone: false}]}
        }
        case "CHANGE_TASK_TITLE": {
            const todolistId = action.payload.todolistId;
            return {...state, [todolistId]: state[todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        }
        case "CHANGE_TASK_STATUS": {
            const {todolistId, taskId, newTaskStatus} = action.payload;
            debugger
            return {...state, [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, isDone: newTaskStatus} : task)}
        }
        case "ADD_TODOLIST": {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "REMOVE_TODOLIST": {
            // const {[action.payload.todolistId]: [] or xxx, ...rest} = state // при деструктуризации инициализируется новый объект
            // return rest
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK' as const,
        payload: {
            todolistId,
            taskId
        }
    }
}
export const addTaskAC = (todolistId: string, title: string) => {
    const taskId = v4();
    return {
        type: 'ADD_TASK' as const,
        payload: {
            todolistId,
            title,
            taskId
        }
    }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE' as const,
        payload: {
            todolistId,
            title,
            taskId
        }
    }
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS' as const,
        payload: {
            todolistId,
            newTaskStatus,
            taskId
        }
    }
}