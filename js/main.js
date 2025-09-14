import { renderChecklist, addItem, removeItem } from "./utils/ui.js";

const addButton = document.getElementById("add-btn");
const removeButton = document.getElementById("remove-btn");

renderChecklist();
addButton.addEventListener("click", addItem);
removeButton.addEventListener("click", removeItem);
