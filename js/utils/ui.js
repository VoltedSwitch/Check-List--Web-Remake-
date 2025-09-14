import { Item } from "../core/item.js";
import { Checklist } from "../core/checklist.js";

const userChecklist = new Checklist();
const listView = document.getElementById("list-view");
const itemInput = document.getElementById("item-input");

export function renderChecklist() {
  if (userChecklist.isEmpty()) {
    listView.innerHTML = "Checklist currently empty";
  } else {
    listView.innerHTML = "";
    for (const item of userChecklist.items) {
      const li = document.createElement("li");
      li.innerHTML = item.toString();
      listView.appendChild(li);
    }
  }
}

function clearItemInput() {
  itemInput.value = "";
}

export function addItem() {
  const userItem = new Item(itemInput.value);
  if (Checklist.isValidItem(userItem)) {
    userChecklist.addItem(userItem);
    clearItemInput();
    renderChecklist();
  }
}

export function removeItem() {
  const userValue = itemInput.value;
  if (userChecklist.isValidItemNumber(userValue)) {
    userChecklist.removeItem(userValue);
    clearItemInput();
    renderChecklist();
  }
}
