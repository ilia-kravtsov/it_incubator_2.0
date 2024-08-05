import React, {FC, ReactElement} from "react";
import {Button} from "./Button";
import {Filter} from "./App";

export type TaskProps = {
    id: number, title: string, isDone: boolean
}

type Props = {
    title: string
    tasks: TaskProps[]
    removeTask: (taskId: number) => void
    changeFilterCB: (newFilter: Filter) => void
    date?: string
}

export const TodoList: FC<Props> = ({title, tasks, removeTask, changeFilterCB})  => {

    const tasksList: ReactElement[] | ReactElement = tasks.length
        ? tasks.map((task: TaskProps) => {
            const onClickRemoveTaskHandler = () => removeTask(task.id);
            return (
                <li key={task.id} className={"todo-list-item"}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    {/*<button onClick={() => removeTask(task.id);}>x</button>*/}
                    <button onClick={onClickRemoveTaskHandler}>x</button>
                </li>
            )
        })
        : <li>Enter your first task</li>;

    const onFilterChange = (newFilter: Filter) => changeFilterCB(newFilter)

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title={'all'} changeFilterCB={onFilterChange}/>
                <Button title={'active'} changeFilterCB={onFilterChange}/>
                <Button title={'completed'} changeFilterCB={onFilterChange}/>
            </div>
        </div>
    );
};

