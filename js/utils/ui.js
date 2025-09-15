import { Item } from "../core/item.js";
import { Checklist } from "../core/checklist.js";

const userChecklist = new Checklist();
const listView = document.getElementById("list-view");
const itemInput = document.getElementById("item-input");

userChecklist.loadItems();

export function renderChecklist() {
  if (userChecklist.isEmpty()) {
    listView.innerHTML = "Checklist currently empty";
  } else {
    listView.innerHTML = "";

    for (const [index, item] of userChecklist.items.entries()) {
      const itemNumber = index + 1;
      const itemTextButton = document.createElement("button");
      itemTextButton.innerHTML = item.toString();
      itemTextButton.addEventListener("click", () => {
        userChecklist.toggleItem(itemNumber);
        userChecklist.saveItems();
        renderChecklist();
      });

      const itemDeleteButton = document.createElement("button");
      itemDeleteButton.innerHTML = "⛌";
      itemDeleteButton.addEventListener("click", () => {
        userChecklist.removeItem(itemNumber);
        userChecklist.saveItems();
        renderChecklist();
      });

      const li = document.createElement("li");
      li.appendChild(itemTextButton);
      li.appendChild(itemDeleteButton);

      listView.appendChild(li);
    }
  }
}

export function addItem() {
  const userItem = new Item(itemInput.value);
  if (Checklist.isValidItem(userItem)) {
    userChecklist.addItem(userItem);
    userChecklist.saveItems();
    itemInput.value = "";
    renderChecklist();
  }
}
