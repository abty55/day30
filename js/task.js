import { saveData } from "./storage.js";
import { updateCardLists } from "./render.js";

export let tasks = [];

const totalTaskList = document.querySelector(".total-task__cards");

class Task {
    constructor(id, name, date){
        this.id = id;
        this.name = name;
        this.date = date;
    }
}

export function addTaskCard(id, name, date){
    const newItem = new Task(id, name, date);
    console.log(`newItemid: ${newItem.id}`);
    tasks.push(newItem);
    saveData();
    updateCardLists();
}

export function removeTaskCard(){
    const selectedTasks = document.querySelectorAll(".task-card.task-card--selected");
    const selectedIds = [];
    selectedTasks.forEach((selectedTask) => {
        selectedIds.push(Number(selectedTask.dataset.id));
    });

    if (selectedIds.length === 0) return;
    
    tasks = tasks.filter((task) => {
        console.log(task.id);
        return !selectedIds.includes(task.id);
    });

    console.log(tasks);
    saveData();
    updateCardLists();

}

export function clearisSearched(){
    const isSearchedNames = document.querySelectorAll(".task-card__detail.is-searched");
    const isSearchedDates = document.querySelectorAll(".task-card__date-sentence.is-searched");

    
    isSearchedNames.forEach((isSearchedName) => {
        isSearchedName.classList.remove("is-searched");
        console.log(isSearchedName);
    });
    

    isSearchedDates.forEach((isSearchedTask) => {
        isSearchedTask.classList.remove("is-searched");
    });
    
    console.log("検索をクリアしました");
   
}

export function searchTaskName(searchedName){
    let matchCount = 0;
    const taskCardNames = document.querySelectorAll(".total-task__cards .task-card__detail");
    taskCardNames.forEach((taskCardName) => {
        if(taskCardName.textContent.includes(searchedName)){
            taskCardName.classList.add("is-searched");
            matchCount += 1;
        } 
    });
    if (matchCount > 0){
        return true;
    }
    return false;
}

export function searchTaskDate(formerDate, latterDate){
    // console.log(`${formerDate}~${latterDate}`);
    let matchCount = 0;
    const periodStartDate = new Date(formerDate).getTime();
    const periodEndDate = new Date(latterDate).getTime();

    //console.log(`${periodStartDate}~${periodEndDate}`);

    const taskCardDates = document.querySelectorAll(".total-task__cards .task-card__date");
    taskCardDates.forEach((taskCardDate) => {
        const targetTime = new Date(taskCardDate.dataset.time).getTime();
       // console.log(`${typeof targetTime} , ${targetTime}`);

        if(targetTime >= periodStartDate && targetTime <= periodEndDate){
            const dateSentences = taskCardDate.querySelectorAll(".task-card__date-sentence");
            dateSentences.forEach((dataSentence) => {
                dataSentence.classList.add("is-searched");
            });
            matchCount += 1;
        } 
    });
    if (matchCount > 0){
        return true;
    }
    return false;
}

export function setUpTaskList(){
    totalTaskList.addEventListener( "click", (event) => {
        const taskCard = event.target.closest(".task-card");
        if (taskCard === null) return;
        taskCard.classList.toggle("task-card--selected");
    });
}
