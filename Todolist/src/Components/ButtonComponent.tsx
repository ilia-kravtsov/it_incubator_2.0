import {Filter} from "./App";
import s from '../styles/Components/Task.module.scss';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

type Props = {
    title?: string
    onClick: () => void
    filter?: Filter
}

export const ButtonComponent = ({title, onClick, filter}: Props) => {

    const onClickHandler = () => onClick();

    const isActiveBtn = title === filter ? s.border : ''

    return (
        title
        ? <Button onClick={onClickHandler}
                  style={{color: 'silver', borderColor: 'silver', backgroundColor: 'transparent', fontFamily: 'Montserrat', textTransform: 'capitalize', letterSpacing: '1px'}}
                  className={isActiveBtn}>
                {title}
        </Button>
        : <IconButton onClick={onClickHandler} style={{color: 'silver'}}>
            <DeleteIcon/>
        </IconButton>
    );
};

