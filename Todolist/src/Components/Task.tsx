import s from "../styles/Components/Todolist.module.scss";
import {ButtonComponent} from "./ButtonComponent";
import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./App";
import Checkbox from '@mui/material/Checkbox';

type Props = {
    task: TaskType
    onTaskStatusChange: (newTaskStatus: boolean) => void
    onClickRemoveTaskHandler: () => void
    taskTitleChangeCallback: (newTitle: string) => void
}

export const Task = ({task, onTaskStatusChange, onClickRemoveTaskHandler, taskTitleChangeCallback}: Props) => {

        const taskTitleChangeCB = (newTitle: string) => taskTitleChangeCallback(newTitle);
        const taskStatusChangeCB = (e: ChangeEvent<HTMLInputElement>) => onTaskStatusChange(e.currentTarget.checked);

        const isDoneClass = task.isDone ? `${s.todolist__listItem} ${s.opacity}` : s.todolist__listItem

        return (
            <li key={task.id} className={isDoneClass}>
                <Checkbox checked={task.isDone} onChange={taskStatusChangeCB} style={{color: 'silver'}}/>
                <EditableSpan title={task.title} titleChangeCB={taskTitleChangeCB}/>
                <ButtonComponent onClick={onClickRemoveTaskHandler}/>
            </li>
        )
}


