import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from '../styles/Components/Task.module.scss';
import {TaskProps} from "./TodoList";

type Props = {
    task: TaskProps
    taskTitleChangeCB: (newTitle: string) => void
}

export const EditableSpan = ({task, taskTitleChangeCB}: Props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [newTitle, setNewTitle] = useState<string>(task.title)

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const onSaveTitleClick = () => {
        const title = newTitle.trim();
        if (title && title.length > 0) {
            taskTitleChangeCB(newTitle)
            setEditMode(false);
        }
    }
    const onKeyTitleSaving = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSaveTitleClick()
        }
    }
    const onEditModeClick = () => setEditMode(true);

    return editMode
        ? <div>
            <input value={newTitle} onChange={onTitleChange} onKeyDown={onKeyTitleSaving} className={s.taskTitleChanger} autoFocus/>
            <button onClick={onSaveTitleClick} className={s.taskTitleChangerButton}>Save</button>
        </div>
        : <span onClick={onEditModeClick} className={task.isDone ? `${s.taskTitle} ${s.taskDone}` : s.taskTitle}>{task.title}</span>
};

