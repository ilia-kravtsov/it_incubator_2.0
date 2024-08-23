import {
    AddTodolist, ChangeTodolistTitle,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolist,
    todolistsReducer, ChangeTodolistFilter, removeTodolistAC, addTodolistAC
} from './todolsitReducer'
import { v1 } from 'uuid'
import {Todolist} from "../Components/App";

test('correct todolist should be removed', () => {
    // 1. Стартовый state
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // 2. Действие
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newTodoTitle = 'New Todolist'

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
    const endState = todolistsReducer(startState, addTodolistAC(newTodoTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoTitle)
})

test('correct todolist title should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newTodoTitle = 'New Todolist title';

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTodoTitle))

    expect(endState[0].title).toBe(newTodoTitle);
    expect(endState[1].title).toBe(startState[1].title);
})

test('correct todolist filter should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newFilter = 'completed'

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe(startState[0].filter);
    expect(endState[1].filter).toBe(newFilter);
})

