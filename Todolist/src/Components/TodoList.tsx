import React, {FC, ReactElement} from "react";
import {ButtonComponent} from "./ButtonComponent";
import {Filter, Tasks, TaskType, Todolist} from "./App";
import s from '../styles/Components/Todolist.module.scss';
import {Task} from "./Task";
import {filterTasks} from "../utils/filterTasks";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type Props = {
    todolist: Todolist
    tasks: Tasks
    removeTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newTaskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeFilterCB: (todolistId: string, newFilter: Filter) => void
    date?: string
}

export const TodoList: FC<Props> = ({todolist, tasks, removeTask, addTask, changeFilterCB, changeTaskStatus, changeTaskTitle, deleteTodolist, changeTodolistTitle})  => {

    const addTaskCB = (title: string) => addTask(todolist.id, title);
    const filteredTasks = filterTasks(tasks[todolist.id], todolist.filter);

    const deleteTodolistCB = () => deleteTodolist(todolist.id);

    const tasksList: ReactElement[] | ReactElement = filteredTasks.length
        ? filteredTasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => removeTask(todolist.id, task.id);
            const onTaskStatusChange = (newTaskStatus: boolean) => changeTaskStatus(todolist.id, task.id, newTaskStatus);
            const taskTitleChangeCallback = (newTitle: string) => changeTaskTitle(todolist.id, task.id, newTitle)
            return <Task task={task}
                         onTaskStatusChange={onTaskStatusChange}
                         taskTitleChangeCallback={taskTitleChangeCallback}
                         onClickRemoveTaskHandler={onClickRemoveTaskHandler} />
        })
        : <li>Enter your first task</li>;

    const onFilterChangeCBCreator = (newFilterValue: Filter) => () => changeFilterCB(todolist.id, newFilterValue);
    const todolistTitleChangeCB = (newTitle: string) => {
        changeTodolistTitle(todolist.id, newTitle)
    }
    return (
        <div className={s.todolist}>
            <div className={s.todolist__titleContainer}>
                <EditableSpan title={todolist.title} titleChangeCB={todolistTitleChangeCB}/>
                <ButtonComponent onClick={deleteTodolistCB}/>
            </div>
            <AddItemForm addItem={addTaskCB}/>
            <ul className={s.todolist__list}>
            {tasksList}
            </ul>
            <div className={s.todolistButtonGroup}>
                <ButtonComponent title={'all'}
                                 onClick={onFilterChangeCBCreator('all')}
                                 filter={todolist.filter}/>
                <ButtonComponent title={'unfulfilled'}
                                 onClick={onFilterChangeCBCreator('unfulfilled')}
                                 filter={todolist.filter}/>
                <ButtonComponent title={'completed'}
                                 onClick={onFilterChangeCBCreator('completed')}
                                 filter={todolist.filter}/>
            </div>
        </div>
    );
};

