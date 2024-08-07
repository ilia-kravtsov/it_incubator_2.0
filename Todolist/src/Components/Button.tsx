type Props = {
    title: string
    onClick: () => void
    clas?: string;
}

export const Button = ({title, onClick, clas}: Props) => {

    const onClickHandler = () => onClick();

    return (
        <button onClick={onClickHandler} className={clas}>
            {title}
        </button>
    );
};

