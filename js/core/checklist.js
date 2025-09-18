import { Item } from "./item.js";
import { DataHandler } from "../utils/dataHandler.js";

export class Checklist {
  constructor() {
    this.items = DataHandler.loadData();
    for (const item of this.items) {
      item.checklist = this;
    }
    this.listView = document.getElementById("list-view");
    this.itemInput = document.getElementById("item-input");
    this.itemInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const newItem = new Item(this.itemInput.value);
        this.addItem(newItem);
        this.render();
        this.itemInput.value = "";
      }
    });
  }
  render() {
    if (this.isEmpty()) {
      this.listView.innerHTML = "Checklist currently empty";
    } else {
      this.listView.innerHTML = "";

      for (const [index, item] of this.items.entries()) {
        const itemNumber = index + 1;
        item.render();

        const itemDeleteOption = document.createElement("button");
        itemDeleteOption.innerHTML = "⛌";
        itemDeleteOption.addEventListener("click", () => {
          this.removeItem(itemNumber);
          this.render();
        });

        const li = document.createElement("li");
        li.appendChild(item.widget);
        li.appendChild(itemDeleteOption);

        this.listView.appendChild(li);
      }
    }
  }
  getItem(itemNumber) {
    if (this.isValidItemNumber(itemNumber)) {
      const itemIndex = itemNumber - 1;
      return this.items[itemIndex];
    }
  }
  addItem(item) {
    if (Checklist.isValidItem(item)) {
      item.checklist = this;
      this.items.push(item);
      this.saveState();
    }
  }
  removeItem(itemNumber, giveRemovedItem = false) {
    if (this.isValidItemNumber(itemNumber)) {
      const itemIndex = Number(itemNumber) - 1;
      const [removedItem] = this.items.splice(itemIndex, 1);
      this.saveState();
      if (giveRemovedItem) return removedItem;
    }
  }
  isEmpty() {
    return this.items.length === 0;
  }
  isValidItemNumber(itemNumber) {
    const result = Number(itemNumber);
    return !isNaN(result) && Number.isInteger(result);
  }
  isitemNumberWithinValiditemNumbers(itemNumber) {
    return (
      this.isValidItemNumber(itemNumber) &&
      itemNumber >= 1 &&
      itemNumber <= this.items.length
    );
  }
  static isValidItem(item) {
    return item instanceof Item && !item.isEmpty();
  }

  saveState() {
    DataHandler.saveData(this.items);
  }
}
