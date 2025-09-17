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

    for (const [index, item] of userChecklist.items.entries()) {
      const itemNumber = index + 1;
      const itemText = document.createElement("button");
      itemText.innerHTML = item.toString();
      itemText.addEventListener("click", () => {
        userChecklist.toggleItem(itemNumber);
        userChecklist.saveState();
        renderChecklist();
      });

      const itemDeleteOption = document.createElement("button");
      itemDeleteOption.innerHTML = "⛌";
      itemDeleteOption.addEventListener("click", () => {
        userChecklist.removeItem(itemNumber);
        userChecklist.saveState();
        renderChecklist();
      });

      const li = document.createElement("li");
      li.appendChild(itemText);
      li.appendChild(itemDeleteOption);

      listView.appendChild(li);
    }
  }
}

export function addItem() {
  const userItem = new Item(itemInput.value);
  if (Checklist.isValidItem(userItem)) {
    userChecklist.addItem(userItem);
    userChecklist.saveState();
    itemInput.value = "";
    renderChecklist();
  }
}
