import {Filter, TaskType} from "../Components/App";

export const filterTasks = (tasks: TaskType[], filter: Filter): TaskType[] => {

    switch(filter) {
        case "unfulfilled":
            return tasks.filter(task => !task.isDone);
        case "completed":
            return tasks.filter(task => task.isDone);
        default:
            return tasks
    }
}