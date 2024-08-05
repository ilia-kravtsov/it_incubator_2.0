import {Filter} from "./App";

type Props = {
    title: Filter
    changeFilterCB: (newFilter: Filter) => void
}

export const Button = ({title, changeFilterCB}: Props) => {

    const onFilterChangeHandler = () => changeFilterCB(title);

    return (
        <button onClick={onFilterChangeHandler}>
            {title}
        </button>
    );
};

