import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from '../styles/Components/Task.module.scss';

type Props = {
    title: string
    titleChangeCB: (newTitle: string) => void
    isDone?: boolean
}

export const EditableSpan = ({title, isDone, titleChangeCB}: Props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [newTitle, setNewTitle] = useState<string>(title)

    const onSaveTitleClick = () => {
        const title = newTitle.trim();
        if (title && title.length > 0) {
            titleChangeCB(newTitle)
            setEditMode(false);
        }
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);
    const onKeyTitleSaving = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onSaveTitleClick();
    const onFocusChange = () => onSaveTitleClick();
    const onEditModeClick = () => setEditMode(true);

    return editMode
        ? <div className={s.editModeBox}>
            <input value={newTitle} onChange={onTitleChange} onKeyDown={onKeyTitleSaving} className={s.taskTitleChanger} autoFocus onBlur={onFocusChange}/>
            <button onClick={onSaveTitleClick} className={s.taskTitleChangerButton}>Save</button>
        </div>
        : <span onClick={onEditModeClick} className={isDone ? `${s.taskTitle} ${s.taskDone}` : s.taskTitle}>{title}</span>
};

