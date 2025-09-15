import {
  renderChecklist,
  addItem,
  removeItem,
  toggleItem,
} from "./utils/ui.js";

const addButton = document.getElementById("add-btn");
const removeButton = document.getElementById("remove-btn");
const toggleButton = document.getElementById("toggle-btn");

renderChecklist();
addButton.addEventListener("click", addItem);
removeButton.addEventListener("click", removeItem);
toggleButton.addEventListener("click", toggleItem);
