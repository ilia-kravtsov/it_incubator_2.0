import {
    AddTodolist, ChangeTodolistTitle,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolist,
    todolistsReducer, ChangeTodolistFilter, removeTodolistAC, addTodolistAC
} from './todolsitReducer'
import { v1 } from 'uuid'
import {Tasks, Todolist} from "../Components/App";
import {tasksReducer} from "./tasksReducer";

let todolistId1: string;
let todolistId2: string;
let startState: Todolist[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {
    // 2. Действие
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    const newTodoTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodoTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoTitle)
})
test('correct todolist title should be changed', () => {
    const newTodoTitle = 'New Todolist title';

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTodoTitle))

    expect(endState[0].title).toBe(newTodoTitle);
    expect(endState[1].title).toBe(startState[1].title);
})
test('correct todolist filter should be changed', () => {
    const newFilter = 'completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe(startState[0].filter);
    expect(endState[1].filter).toBe(newFilter);
})
test('ids should be equals', () => {
    const startTasksState: Tasks = {}
    const startTodolistsState: Todolist[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistId)
    expect(idFromTodolists).toBe(action.payload.newTodolistId)
    expect(endTodolistsState[0].title).toBe('new todolist')
})

