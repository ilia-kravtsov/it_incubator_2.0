import s from "../styles/Components/AddItem.module.scss";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: Props) => {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addNewTitleClick = () => {
        const titleTrimmed = title.trim();
        if (titleTrimmed && titleTrimmed.length < 18) {
            addItem(title);
            setError(null);
            setTitle('');
        } else {
            if (!titleTrimmed) {
                setError('Type something before click');
            } else if (titleTrimmed.length > 18) {
                setError('Max length 17 symbols');
            }
        }
    }

    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (value.trim() || value.length === 0) {
            setTitle(value);
            setError(null);
            if (value.length >= 17) {
                setError('You title is too long')
            }
        } else {
            setError('Too much spaces')
        }
    }

    const onKeyDownTaskAdding = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title && e.key === 'Enter') addNewTitleClick();
    }

    const isAddBtnDisabled = !title || title.length >= 17;

    return (
        <div className={s.addItemBox}>
            <div className={s.addItemBoxInputButton}>
                <TextField className={s.addItemBox__input}
                           onChange={onTaskTitleChange}
                           variant="standard"
                           type={'text'}
                           label={'Enter new title'}
                           error={!!error}
                           helperText={error}
                           InputProps={{
                               style: { color: 'silver'},
                               disableUnderline: false,
                               classes: {
                                   notchedOutline: s.customOutline,
                               },
                           }}
                           InputLabelProps={{
                               style: { color: 'silver' },
                           }}
                           sx={{
                               '& .MuiInput-underline:before': {
                                   borderBottomColor: 'silver', // Change the default underline color
                               },
                               '& .MuiInput-underline:hover:before': {
                                   borderBottomColor: 'silver', // Change underline color on hover
                               },
                               '& .MuiInput-underline:after': {
                                   borderBottomColor: 'silver', // Underline color after focus
                               },
                           }}
                       onKeyDown={onKeyDownTaskAdding}
                       value={title}/>
                <IconButton className={s.addItemBox__button} onClick={addNewTitleClick} disabled={isAddBtnDisabled} style={{color: 'silver'}}>
                    <AddIcon/>
                </IconButton>
            </div>
        </div>
    );
};

