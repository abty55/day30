import { tasks } from "./task.js";
import { fetchWeather } from "./wather.js";

const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();
const nowDate = now.getDate();
const nowDay = now.getDay();
const dayName = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土"
]

const todayTaskList = document.querySelector(".today-task__cards");
const totalTaskList = document.querySelector(".total-task__cards");

export async function setTodayTime(){
    const todayMonth = document.querySelector(".js-today-month");
    const todayDate = document.querySelector(".js-today-date");
    const todayDay = document.querySelector(".js-today-day");
    const todayWeather = document.querySelector(".js-today-weather");

    todayMonth.textContent = nowMonth + 1;
    todayDate.textContent = nowDate;
    todayDay.textContent = `(${dayName[nowDay]})`;
    todayWeather.textContent = await fetchWeather();

}

export function updateCardLists(){
    todayTaskList.innerHTML = "";
    totalTaskList.innerHTML = "";
    const todayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        return (
            taskDate.getFullYear() === nowYear &&
            taskDate.getMonth() === nowMonth &&
            taskDate.getDate() === nowDate
        );
    });

    tasks.forEach((task) => {
        createTaskCard(task, "total");
    });

    todayTasks.forEach((todayTask) => {
        createTaskCard(todayTask, "today");
    });
    
}

function createTaskCard({id, name, date}, position){
    const taskDate = new Date(date);
    const day = taskDate.getDay();
    const mm = taskDate.getMonth();
    const dd = taskDate.getDate();
    const hour = taskDate.getHours();
    const minute = taskDate.getMinutes();

    const newTaskCard = document.createElement("article");
    const newTaskName = document.createElement("h3");
    const newTaskDate = document.createElement("div");
    const newTaskDateDate = document.createElement("p");
    const newTaskDateTime = document.createElement("p");

    newTaskCard.classList.add("task-card");
    newTaskCard.dataset.id = id;
    newTaskName.classList.add("task-card__detail");
    newTaskName.textContent = name;
    newTaskDate.classList.add("task-card__date");
    newTaskDate.dataset.time = date;
    newTaskDateDate.textContent = `${mm+1}月${dd}日(${dayName[day]})`;
    newTaskDateTime.textContent = `${hour} : ${minute < 10 ? `0${minute}` : minute}`;
    newTaskDateDate.classList.add("task-card__date-sentence");
    newTaskDateTime.classList.add("task-card__date-sentence");

    newTaskDate.append(newTaskDateDate, newTaskDateTime);
    newTaskCard.append(newTaskName, newTaskDate);
    //以下の処理はスマートではない気がする
    if(position === "total") {
        totalTaskList.append(newTaskCard);
    } else if (position === "today") {
        todayTaskList.append(newTaskCard);
    } else{
        console.log("カード生成中のエラー");
        return;
    }
}