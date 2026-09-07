import { loadData } from "./storage.js";
import { updateCardLists, setTodayTime } from "./render.js";
import { setUpTaskList } from "./task.js";
import { setUpModal } from "./modal.js";

setTodayTime();
loadData();
updateCardLists();
setUpTaskList();
setUpModal();