import { tasks } from "./task.js";
import { addTaskCard, removeTaskCard, clearisSearched, searchTaskName, searchTaskDate } from "./task.js";

const taskDateTemplate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const modalArea = document.querySelector(".modal-area")
const displayAddTaskModal = document.querySelector(".site-header__btn--add-task");
const displayDeleteTaskModal = document.querySelector(".site-header__btn--delete-task");
const displaySearchTaskModal = document.querySelector(".site-header__btn--search-task");

const addTaskForm = document.querySelector(".add-task");
const deleteTask = document.querySelector(".delete-task");

const searchType = document.querySelector(".search-type");
const searchNameForm = document.querySelector(".search-name");
const searchDateForm = document.querySelector(".search-date");
const clearSearchedBtn = document.querySelector(".modal__btn--clear-searched")

const addTaskModal = document.querySelector(".modal--add-task");
const deleteTaskModal = document.querySelector(".modal--delete-task");
const searchTaskModal = document.querySelector(".modal--search-task");

export function setUpModal(){
    modalArea.addEventListener("click", (event) => {
        const cancelModalBtn = event.target.closest(".modal-cancel-btn");
        const displayedModal = event.target.closest(".modal");
        if (cancelModalBtn === null || displayedModal === null){
            return;
        } else{
            displayedModal.classList.add("is-hidden");
        }
    });

    displayAddTaskModal.addEventListener("click", () => {
        addTaskModal.classList.remove("is-hidden");
        addTaskForm.elements["add-task-name"].focus();
    });

    displayDeleteTaskModal.addEventListener("click", () => {
        deleteTaskModal.classList.remove("is-hidden");
    });

    displaySearchTaskModal.addEventListener("click", () => {
        searchTaskModal.classList.remove("is-hidden");
    });

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTask = new FormData(addTaskForm);
        const newTaskName = newTask.get("add-task-name").trim();
        const newTaskDate = newTask.get("add-task-date");

        if (newTaskName === ""){
            console.log("文字を入力してください");
            return;
        }

        if (!taskDateTemplate.test(newTaskDate)){
            console.log("日付の形式が違います");
            return;
        }
        const taskIds = tasks.map((task) =>{
            return task.id;
        });
        let nowId = Math.max(0, ...taskIds); 

        nowId += 1;
        addTaskCard(nowId, newTaskName, newTaskDate);

        addTaskForm.elements["add-task-name"].value = "";
        addTaskForm.elements["add-task-date"].value = "";
        addTaskForm.elements["add-task-name"].focus();

    });

    deleteTask.addEventListener("click", (event) => {
        const deleteTaskBtn = event.target.closest(".modal__btn--delete-task");
        if (deleteTaskBtn === null) return;
        removeTaskCard();
        deleteTaskModal.classList.add("is-hidden");
    });

    searchType.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        if(selectedValue === "name"){
            searchNameForm.classList.remove("is-hidden");
            searchDateForm.classList.add("is-hidden");
        } 
        if(selectedValue === "date"){
            searchNameForm.classList.add("is-hidden");
            searchDateForm.classList.remove("is-hidden");
        }
    });

    clearSearchedBtn.addEventListener("click", () => {
        clearisSearched();
    });

    searchNameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchedName = new FormData(searchNameForm);
        const searchedTaskName = searchedName.get("search-task-name").trim();
        if (searchedTaskName === ""){
            return;
        }

        clearisSearched();
        if(searchTaskName(searchedTaskName)){
            console.log("trueを返しました");
            searchNameForm.elements["search-task-name"].value = "";
            searchTaskModal.classList.add("is-hidden");
        } else{
            console.log("falseを返しました");
            const searchTaskFlash = searchNameForm.querySelector(".search-task__flash");
            searchTaskFlash.classList.remove("is-hidden");
            setTimeout(() => {
                searchTaskFlash.classList.add("is-hidden");
            }, 3000);
        }
        //検索結果のissearchedclassがaddtaskすると消えてしまった。event.preventdefaultと関係があるのか?

    });

    searchDateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchedDate = new FormData(searchDateForm);
        const searchedTaskFormerDate = searchedDate.get("search-task-former-date");
        const searchedTaskLatterDate = searchedDate.get("search-task-latter-date");

        console.log(searchedTaskFormerDate);
        if (!taskDateTemplate.test(searchedTaskFormerDate)){
            return;
        }
        if (!taskDateTemplate.test(searchedTaskLatterDate)){
            return;
        }

        clearisSearched();
        if(searchTaskDate(searchedTaskFormerDate, searchedTaskLatterDate)){
            searchDateForm.elements["search-task-former-date"].value = "";
            searchDateForm.elements["search-task-latter-date"].value = "";
            searchTaskModal.classList.add("is-hidden");
        } else{
            const searchTaskFlash = searchDateForm.querySelector(".search-task__flash");
            searchTaskFlash.classList.remove("is-hidden");
            setTimeout(() => {
                searchTaskFlash.classList.add("is-hidden");
            }, 3000);
        }

    });


}
