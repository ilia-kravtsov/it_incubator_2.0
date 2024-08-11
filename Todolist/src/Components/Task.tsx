import s from "../styles/Components/Todolist.module.scss";
import {Button} from "./Button";
import React, {ChangeEvent} from "react";
import {TaskProps} from "./TodoList";
import {EditableSpan} from "./EditableSpan";

type Props = {
    task: TaskProps
    onTaskStatusChange: (newTaskStatus: boolean) => void
    onClickRemoveTaskHandler: () => void
    taskTitleChangeCallback: (newTitle: string) => void
}

export const Task = ({task, onTaskStatusChange, onClickRemoveTaskHandler, taskTitleChangeCallback}: Props) => {

        const taskTitleChangeCB = (newTitle: string) => taskTitleChangeCallback(newTitle);
        const taskStatusChangeCB = (e: ChangeEvent<HTMLInputElement>) => onTaskStatusChange(e.currentTarget.checked);

        return (
            <li key={task.id} className={s.todolist__listItem}>
                <input type="checkbox" checked={task.isDone} onChange={taskStatusChangeCB}/>
                <EditableSpan task={task} taskTitleChangeCB={taskTitleChangeCB}/>
                <Button title={'x'} onClick={onClickRemoveTaskHandler} baseClass={s.todolist__listItemButton}/>
            </li>
        )
}


