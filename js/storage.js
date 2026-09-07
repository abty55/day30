import { tasks } from "./task.js";

const taskKey = "task";

export function saveData(){
    const stringTasks = JSON.stringify(tasks);
    localStorage.setItem(taskKey, stringTasks);
}

export function loadData(){
    const stringTasks = localStorage.getItem(taskKey);
    if (stringTasks === null){
        return;
    }
    try{
        const savedTasks = JSON.parse(stringTasks);
        if (!Array.isArray(savedTasks)){
            return;
        }
        tasks.push(...savedTasks);
    } catch(error){
        console.log("データが壊れています");
        return;
    }
}