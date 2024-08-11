import {Filter} from "./App";
import s from '../styles/Components/Task.module.scss';

type Props = {
    title: string
    onClick: () => void
    filter?: Filter
    baseClass?: string;
}

export const Button = ({title, onClick, baseClass, filter}: Props) => {

    const onClickHandler = () => onClick();

    let buttonClass = baseClass;
    if (filter) buttonClass = filter  === title.toLowerCase() ? `${s.activeFilterBtn} ${baseClass}` : baseClass;

    return (
        <button onClick={onClickHandler} className={buttonClass}>
            {title}
        </button>
    );
};

