import {TaskProps} from "./TodoList";
import {Filter} from "./App";

export const filterTasksUtil = (tasks: TaskProps[], filter: Filter):TaskProps[] => {

    switch(filter) {
        case "active":
            return tasks.filter(task => !task.isDone);
        case "completed":
            return tasks.filter(task => task.isDone);
        default:
            return tasks
    }

    // let filteredTasksForRender: TaskProps[] = tasks;
    // if (filter === "active") {
    //     return filteredTasksForRender = tasks.filter(task => task.isDone);
    // } else if (filter === "completed") {
    //     return filteredTasksForRender = tasks.filter(task => !task.isDone);
    // } else {
    //     return filteredTasksForRender
    // }
}