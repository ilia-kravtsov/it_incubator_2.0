import {Filter, Todolist} from "../Components/App";
import {v4} from "uuid";

export type AddTodolist = ReturnType<typeof addTodolistAC>
export type RemoveTodolist = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

export type TodolistsActions = ChangeTodolistFilter
    | RemoveTodolist
    | AddTodolist
    | ChangeTodolistTitle

export const todolistsReducer = (state: Todolist[], action: TodolistsActions): Todolist[] => {
    switch (action.type) {
        case "CHANGE_FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.newFilter} : tl)
        }
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD_TODOLIST": {
            const {newTodolistId, title} = action.payload;
            const newTodolist: Todolist = {id: newTodolistId, title, filter: 'all'};
            return [newTodolist, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        }
        default:
            return state;
    }
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: Filter) => ({
    type: 'CHANGE_FILTER' as const,
    payload: {
        todolistId,
        newFilter
    }
})
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE' as const,
    payload: {
        todolistId,
        title,
    }
})
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE_TODOLIST' as const,
    payload: {
        todolistId,
    }
})
export const addTodolistAC = (title: string) => {
    const newTodolistId = v4();
    return {
        type: 'ADD_TODOLIST' as const,
        payload: {
            title,
            newTodolistId
        }
    }
}

