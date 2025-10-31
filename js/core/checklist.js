import { Item } from "./item.js";
import { DataHandler } from "../utils/dataHandler.js";

export class Checklist {
  constructor() {
    this.items = DataHandler.loadData();
    for (const item of this.items) {
      item.checklist = this;
    }
    this.neededSwappablesAmount = 2;
    this.listView = document.querySelector("#list-view");
    this.itemInput = document.querySelector("#item-input");
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
        itemDeleteOption.classList.add("delete-option");
        itemDeleteOption.innerHTML = "⛌";
        itemDeleteOption.addEventListener("click", () => {
          this.removeItem(itemNumber);
          this.render();
        });

        const itemSwapOption = document.createElement("button");
        itemSwapOption.classList.add("swap-option");
        itemSwapOption.innerHTML = "swap";
        itemSwapOption.addEventListener("click", () => {
          // Make this button orange
          itemSwapOption.classList.add("swappable");

          // Check AFTER making it orange
          if (this.twoItemsUpForSwap()) {
            // Wait a bit so the orange color appears before swapping
            setTimeout(() => {
              const items = this.getSwappableItems();
              const [firstItem, secondItem] = items;

              const firstWidget = firstItem.querySelector(".widget");
              const secondWidget = secondItem.querySelector(".widget");

              // Swap their text
              const firstPreviousText = firstWidget.innerHTML;
              firstWidget.innerHTML = secondWidget.innerHTML;
              secondWidget.innerHTML = firstPreviousText;

              this.unsetColorSwappedItems();
            }, 1000); // 👈 200 milliseconds delay
          }
        });

        const li = document.createElement("li");
        li.appendChild(item.widget);
        li.appendChild(itemDeleteOption);
        li.appendChild(itemSwapOption);

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
    return !Number.isNaN(result) && Number.isInteger(result);
  }
  isitemNumberWithinValiditemNumbers(itemNumber) {
    return (
      this.isValidItemNumber(itemNumber) &&
      itemNumber >= 1 &&
      itemNumber <= this.items.length
    );
  }
  twoItemsUpForSwap() {
    const items = this.getSwappableItems();
    return items.length === this.neededSwappablesAmount;
  }
  unsetColorSwappedItems() {
    const items = this.getSwappableItems();
    if (items.length < this.neededSwappablesAmount) return;
    const [firstItem, secondItem] = items;
    const firstSwapButton = firstItem.querySelector(".swap-option");
    const secondSwapButton = secondItem.querySelector(".swap-option");
    firstSwapButton.classList.remove("swappable");
    secondSwapButton.classList.remove("swappable");
  }
  getSwappableItems() {
    const swappableItems = [];
    const items = this.getItems();
    for (const item of items) {
      const swapButton = item.querySelector(".swap-option");
      if (swapButton.classList.contains("swappable")) {
        swappableItems.push(item);
      }
    }
    return swappableItems;
  }
  getItems() {
    const listItems = this.listView.querySelectorAll("li");
    return listItems;
  }
  static isValidItem(item) {
    return item instanceof Item && !item.isEmpty();
  }

  saveState() {
    DataHandler.saveData(this.items);
  }
}
