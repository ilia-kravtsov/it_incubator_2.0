import React, {FC, ReactElement} from "react";
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
    changeFilterCB: (newFilter: Filter) => void
    date?: string
}

export const TodoList: FC<Props> = ({title, tasks, removeTask, changeFilterCB})  => {

    const tasksList: ReactElement[] | ReactElement = tasks.length
        ? tasks.map((task: TaskProps) => {
            const onClickRemoveTaskHandler = () => removeTask(task.id);
            return (
                <li key={task.id} className={s.todolist__listItem}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    {/*<button onClick={() => removeTask(task.id);}>x</button>*/}
                    <Button title={'x'} onClick={onClickRemoveTaskHandler} clas={s.todolist__listItemButton}/>
                </li>
            )
        })
        : <li>Enter your first task</li>;

    // const onFilterAllChange = () => changeFilterCB('all')
    // const onFilterActiveChange = () => changeFilterCB('active')
    // const onFilterCompletedChange = () => changeFilterCB('completed')
    const onFilterChangeCBCreator = (newFilterValue: Filter) => () => changeFilterCB(newFilterValue);

    return (
        <div className={s.todolist}>
            <h2>{title}</h2>
            <div className={s.todolistBox}>
                <input className={s.todolistBox__input}/>
                <button className={s.todolistBox__button}>+</button>
            </div>
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

