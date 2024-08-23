import React, {Reducer, useReducer, useState} from 'react';
import s from '../styles/Components/App.module.scss';
import {TodoList} from "./TodoList";
import {v4} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActions,
    tasksReducer
} from "../reducers/tasksReducer";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsActions,
    todolistsReducer
} from "../reducers/todolsitReducer";

export type Filter = 'all' | 'unfulfilled' | 'completed';
export type Todolist = {
    id: string
    title: string
    filter: Filter
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type Tasks = {
    [todolistId: string]: TaskType[]
}
type ThemeMode = 'dark' | 'light'

function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#C0C0C0FF',
            },
        },
    })
    const changeModeHandler = () => setThemeMode(themeMode == 'light' ? 'dark' : 'light');

    const todolistId_1 = v4();
    const todolistId_2 = v4();
    // BLL
    let [todolists, dispatchTodolists] = useReducer<Reducer<Todolist[], TodolistsActions>>(todolistsReducer, [
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to read', filter: 'all'},
    ])
    let [tasks, dispatchTasks] = useReducer<Reducer<Tasks, TasksActions>>(tasksReducer, {
        [todolistId_1]: [
            { id: v4(), title: "HTML", isDone: true},
            { id: v4(), title: "CSS", isDone: true},
            { id: v4(), title: "SASS", isDone: false},
        ],
        [todolistId_2]: [
            { id: v4(), title: "React", isDone: true},
            { id: v4(), title: "JS", isDone: false},
            { id: v4(), title: "Redux", isDone: true},
        ],
    })

    const changeTaskStatus = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
        // setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: newTaskStatus } : task ));
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newTaskStatus} : task)});
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, newTaskStatus));
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks(tasks.map(task => task.id === taskId ? {...task, title: newTitle } : task ));
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTitle} : task)});
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTitle));
    }
    const removeTask = (todolistId: string, taskId: string) => {
        // setTasks(tasks.filter((task) => task.id !== taskId));
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)});
        dispatchTasks(removeTaskAC(todolistId, taskId));
    }
    const addTask = (todolistId: string, title: string) => {
        // setTasks([{id: v4(), title, isDone: false}, ...tasks]);
        // setTasks({...tasks, [todolistId]: [{id: v4(), title, isDone: false}, ...tasks[todolistId]]});
        dispatchTasks(addTaskAC(todolistId, title));
    }

    const changeTodolistFilter = (todolistId: string, newFilter: Filter) => {
       // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilter}: tl));
        dispatchTodolists(changeTodolistFilterAC(todolistId, newFilter))
    }
    const removeTodolist = (todolistId: string) => {
       // setTodolists(todolists.filter(tl => tl.id !== todolistId));
       // delete tasks[todolistId];
        dispatchTodolists(removeTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        // let newTodolistId = v4();
        // let newTodolist: Todolist = {id: newTodolistId, title: title, filter: 'all'};
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [newTodolistId]: []})
        const newTodolistActionObject = addTodolistAC(title)
        dispatchTodolists(newTodolistActionObject);
        dispatchTasks(newTodolistActionObject);
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
        dispatchTodolists(changeTodolistTitleAC(todolistId, title));
    }
    // UI
    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <ButtonAppBar themeMode={changeModeHandler}/>
                <div className={s.addTodolistBox}>
                    <AddItemForm addItem={addTodolist}/>
                </div>
                <div className={s.todolistBox}>

                    {todolists.map((todolist) => {
                        return (
                            <TodoList
                            key={todolist.id}
                            todolist={todolist}
                            deleteTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                            tasks={tasks}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeFilterCB={changeTodolistFilter}/>
                        )
                    })}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;

/*
Lesson 1
Типизируем:
1. Переменные в момент создания.
2. Параметры функции (Props)
3. Возвращаемое значение функции (Компоненты FC)
6. Запросы на сервер

Массив - упорядоченная, индексированная коллекция элементов

Объект - коллекция пар ключ значение или коллекция ассоциированных с ключом значений
порядок элементов в объекте - неопределен

Todolist({title: todoListTitle_1, tasks: tasks_1})

The difference between 'type' and 'interface'
___________________ interface
interface Animal {
  name: string;
}

interface Bear extends Animal { // difference line
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

___________________ type
type Animal = {
  name: string;
}

type Bear = Animal & {  // difference line
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

__________________ interface
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
__________________ type

type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}
____________________ interface
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
___________________ type
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;

 // Error: Duplicate identifier 'Window'.
_____________________ type
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
__________________________________________ extending
Interface extends interface

interface PartialPointX { x: number; }
interface Point extends PartialPointX { y: number; }

Type alias extends type alias

type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

Interface extends type alias

type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }

Type alias extends interface

interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
__________________________________________ implements
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// can not implement a union type
class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}
_________________________________ declaration merging
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
_____________________________________________ interface
use `interface` if exporting so that consumers can extend
_________________________________ Деструктурирующее присваивание
const {title, tasks} = props
{title, tasks} - не приводит к созданию нового объекта это схема деструктурирующего присваивания
*/
/* Lesson 2) {
в const можно выполнить присвоение только единожды, но внутри ссылочного типа данных объекта массива изменнеия производить мы можем даже с const

State - состояние данных нашего приложения
У React есть механизмы и инструменты которые позволяют
1. Отслеживать состояние в этом state
2. Затем запускать процесс перерисовки интерфейса после изменений данных в state

// map
let listsTask: ReactElement[] = [];
for (let i = 0; i < tasks.length; i++) {
    const newElement = <li key={tasks[i].id}>
        <input type="checkbox" checked={tasks[i].isDone}/>
        <span>{tasks[i].title}</span>
        <button>x</button>
    </li>
    listsTask.push(newElement);
}
{listsTask.length ? listsTask : <p>Enter your first task</p>}

// filter
const removeTask = (taskId: number) => {
const nextState: TaskProps[] = [];
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== taskId) {
        nextState.push(tasks[i]);
    }
}
setTasks(nextState);
}
__________________________________________________________________________________

State создается с помощью инструментов state менеджмента:
1. useState
2. useReducer
3. redux

useState - каждый раз когда будет вызываться компонент App в которой находится хук
будет вызываться функция useState, поэтому рекомендуется объявлять state на верхнем уровне компоненты, после названия и запрещено его использовать внутри условных выражений if else потому что стейт всегда должен быть доступен коду и всегда должен обновляться

    let result = useState<TaskProps[]>([
        {
            id: 1,
            title: "HTML&CSS",
            isDone: true,
        },
        {
            id: 2,
            title: "JS",
            isDone: true,
        },
        {
            id: 3,
            title: "React",
            isDone: false,
        },
        {
            id: 4,
            title: "Redux",
            isDone: false,
        },
        {
            id: 5,
            title: "Redux-Toolkit",
            isDone: false,
        },
    ]);

    const tasks = result[0];
    const setTasts = result[1];

let [tasks, setTasks] = useState<TaskProps[]>([...]);
let [tasks, setTasks] - не приводит к созданию нового массива
это схема деструктуризированного присваивания массива

Для корректной работы useState работаем с данными immutable
React посмотри на key и на основании этих key прими решения что нужно добавить а что удалить

callback - это функция которую вызываем не мы, мы отдаем возможность ее вызова под управление кому-то другому, например когда произойдет событие клик тогда и вызови функцию
<button onClick={onClickRemoveTaskHandler}>x</button>

<button onClick={() => removeTask(task.id);}>x</button>
||
<button onClick={onClickRemoveTaskHandler}>x</button>

const onClickRemoveTaskHandler = () => removeTask(task.id);
onClickRemoveTaskHandler - ссылка на анонимную функцию

Колбэк-функция (или обратный вызов) - это функция, переданная в другую функцию в качестве аргумента, которая затем вызывается по завершению какого-либо действия.
*/
/* Lesson 3
yarn add uuid @types/uuid - for uuid

console.log(crypto.randomUUID()) - генерирует рандомные id без установки новых библиотек type string

useRef
пока пользователь набирает текст у нас нет доступа к этому тексту до отправления
const titleInput = useRef<HTMLInputElement>(null);
<input ref={titleInput}/>
<button onClick={() => {
    // if (titleInput.current) {
    //     addTask(titleInput.current.value)
    //     titleInput.current.value = '';
    // }
    titleInput.current && addTask(titleInput.current.value);

}
}></button>

Контролируемый инпут выносим в отдельную компоненту для того чтобы его перерендеринг был максимально дешевый
*/
/* Lesson 4
Typescript first
*/
/* useState
1. функция setState - изменяет состояние асинхронно
2. в useState можно передать функцию в качестве initialState эта фнукция будет называться инициализационной, и отработает только при первом рендеренге и не отработает при последующих например при напечатывании символов в Input

function greeting(name) {
  alert("Hello " + name);
}

function processUserInput(callback) {
  var name = prompt("Please enter your name.");
  callback(name);
}

processUserInput(greeting);
 */
