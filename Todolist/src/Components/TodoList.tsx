import React, {ChangeEvent, KeyboardEvent, FC, ReactElement, useState, useRef} from "react";
import {Button} from "./Button";
import {Filter} from "./App";
import s from '../styles/Components/Todolist.module.scss';

export type TaskProps = {
    id: string, title: string, isDone: boolean
}
type Props = {
    title: string
    tasks: TaskProps[]
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeFilterCB: (newFilter: Filter) => void
    date?: string
}

export const TodoList: FC<Props> = ({title, tasks, removeTask, addTask, changeFilterCB})  => {

    let [taskTitle, setTaskTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        setError(null);
    }
    const onKeyDownTaskAdding = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitle && e.key === 'Enter') addTaskTitleClick();
    }
    const addTaskTitleClick = () => {
        const taskTitleTrimmed = taskTitle.trim();
        if (taskTitleTrimmed && taskTitleTrimmed.length < 18) {
            setError(null);
            addTask(taskTitle);
            setTaskTitle('')
        } else {
            if (!taskTitleTrimmed) {
                setError('Type something before click');
            } else if (taskTitleTrimmed.length > 18) {
                setError('Max length 17 symbols');
            }
        }
    }

    const tasksList: ReactElement[] | ReactElement = tasks.length
        ? tasks.map((task: TaskProps) => {
            const onClickRemoveTaskHandler = () => removeTask(task.id);
            return (
                <li key={task.id} className={s.todolist__listItem}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <Button title={'x'} onClick={onClickRemoveTaskHandler} clas={s.todolist__listItemButton}/>
                </li>
            )
        })
        : <li>Enter your first task</li>;

    const onFilterChangeCBCreator = (newFilterValue: Filter) => () => changeFilterCB(newFilterValue);

    const isAddBtnDisabled = !taskTitle || taskTitle.length >= 17;

    return (
        <div className={s.todolist}>
            <h2>{title}</h2>
            <div className={s.todolistBox}>
                <input className={s.todolistBox__input}
                       onChange={onTaskTitleChange}
                       maxLength={17}
                       onKeyDown={onKeyDownTaskAdding}
                       value={taskTitle}/>
                <button className={s.todolistBox__button} onClick={addTaskTitleClick} disabled={isAddBtnDisabled}>+</button>
            </div>
            {error && <p className={s.todolistBox__error}>{error}</p>}
            {taskTitle.length >= 17 && <p className={s.todolistBox__error}>{'You title is too long'}</p>}
            <ul className={s.todolist__list}>
            {tasksList}
            </ul>
            <div className={s.todolistButtonGroup}>
                <Button title={'All'} onClick={onFilterChangeCBCreator('all')} clas={s.todolistfilterButton}/>
                <Button title={'Unfulfilled'} onClick={onFilterChangeCBCreator('unfulfilled')} clas={s.todolistfilterButton}/>
                <Button title={'Completed'} onClick={onFilterChangeCBCreator('completed')} clas={s.todolistfilterButton}/>
            </div>
        </div>
    );
};

