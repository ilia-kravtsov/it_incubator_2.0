import React, {useState} from 'react';
import s from '../styles/Components/App.module.scss';
import {TaskProps, TodoList} from "./TodoList";
import {filterTasks} from "../utils/filterTasks";
import {v4} from 'uuid';

export type Filter = "all" | "unfulfilled" | "completed";

function App() {
    // BLL
    let [tasks, setTasks] = useState<TaskProps[]>([
        {
            id: v4(),
            title: "HTML&CSS",
            isDone: true,
        },
        {
            id: v4(),
            title: "JS",
            isDone: true,
        },
        {
            id: v4(),
            title: "React",
            isDone: true,
        },
        {
            id: v4(),
            title: "React-Query",
            isDone: false,
        },
        {
            id: v4(),
            title: "Redux",
            isDone: false,
        },
        {
            id: v4(),
            title: "Redux-Toolkit",
            isDone: false,
        },
    ]);
    let [filter, setFilter] = useState<Filter>("all");

    const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
        // выборочное преобразование массива || selective array conversion
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: newTaskStatus } : task ));
    }
    const changeTaskTitle = (taskId: string, newTitle: string) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, title: newTitle } : task ));
    }
    const removeTask = (taskId: string) => setTasks(tasks.filter((task) => task.id !== taskId));
    const addTask = (title: string) => setTasks([{id: v4(), title, isDone: false}, ...tasks]);
    const changeFilter = (newFilter: Filter) => setFilter(newFilter);
    const filteredTasks = filterTasks(tasks, filter);

    // UI
    return (
        <div className={s.app}>
            <TodoList
                title={'What to learn'}
                filter={filter}
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeFilterCB={changeFilter}/>
        </div>
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
