import React, {ChangeEvent, KeyboardEvent, FC, ReactElement, useState, useRef} from "react";
import {Button} from "./Button";
import {Filter} from "./App";
import s from '../styles/Components/Todolist.module.scss';
import {Task} from "./Task";

export type TaskProps = {
    id: string, title: string, isDone: boolean
}
type Props = {
    title: string
    filter: Filter
    tasks: TaskProps[]
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, newTaskStatus: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    changeFilterCB: (newFilter: Filter) => void
    date?: string
}

export const TodoList: FC<Props> = ({title, filter, tasks, removeTask, addTask, changeFilterCB, changeTaskStatus, changeTaskTitle})  => {

    let [taskTitle, setTaskTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (value.trim() || value.length === 0) {
            setTaskTitle(value);
            setError(null);
            if (value.length >= 17) {
                setError('You title is too long')
            }
        } else {
            setError('Too much spaces')
        }
    }
    const addTaskTitleClick = () => {
        const taskTitleTrimmed = taskTitle.trim();
        if (taskTitleTrimmed && taskTitleTrimmed.length < 18) {
            addTask(taskTitle);
            setError(null);
            setTaskTitle('');
        } else {
            if (!taskTitleTrimmed) {
                setError('Type something before click');
            } else if (taskTitleTrimmed.length > 18) {
                setError('Max length 17 symbols');
            }
        }
    }

    const onKeyDownTaskAdding = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitle && e.key === 'Enter') addTaskTitleClick();
    }

    const tasksList: ReactElement[] | ReactElement = tasks.length
        ? tasks.map((task: TaskProps) => {
            const onClickRemoveTaskHandler = () => removeTask(task.id);
            const onTaskStatusChange = (newTaskStatus: boolean) => changeTaskStatus(task.id, newTaskStatus);
            const taskTitleChangeCallback = (newTitle: string) => changeTaskTitle(task.id, newTitle)
            return <Task task={task}
                         onTaskStatusChange={onTaskStatusChange}
                         taskTitleChangeCallback={taskTitleChangeCallback}
                         onClickRemoveTaskHandler={onClickRemoveTaskHandler} />
        })
        : <li>Enter your first task</li>;

    const onFilterChangeCBCreator = (newFilterValue: Filter) => () => changeFilterCB(newFilterValue);

    const isAddBtnDisabled = !taskTitle || taskTitle.length >= 17;
    const isMainInputErrorStyle = error ? `${s.todolistBox__input} ${s.todolistBox__inputError} ` : s.todolistBox__input

    return (
        <div className={s.todolist}>
            <h2>{title}</h2>
            <div className={s.todolistBox}>
                <input className={isMainInputErrorStyle}
                       onChange={onTaskTitleChange}
                       maxLength={17}
                       placeholder={'Enter new title'}
                       onKeyDown={onKeyDownTaskAdding}
                       value={taskTitle}/>
                <button className={s.todolistBox__button} onClick={addTaskTitleClick} disabled={isAddBtnDisabled}>+</button>
            </div>
            {error && <p className={s.todolistBox__error}>{error}</p>}
            <ul className={s.todolist__list}>
            {tasksList}
            </ul>
            <div className={s.todolistButtonGroup}>
                <Button title={'All'}
                        onClick={onFilterChangeCBCreator('all')}
                        baseClass={s.todolistfilterButton}
                        filter={filter}/>
                <Button title={'Unfulfilled'}
                        onClick={onFilterChangeCBCreator('unfulfilled')}
                        baseClass={s.todolistfilterButton}
                        filter={filter}/>
                <Button title={'Completed'}
                        onClick={onFilterChangeCBCreator('completed')}
                        baseClass={s.todolistfilterButton}
                        filter={filter}/>
            </div>
        </div>
    );
};

