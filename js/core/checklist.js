import { Item } from "./item.js";
import { DataHandler } from "../utils/dataHandler.js";

export class Checklist {
  constructor() {
    this.items = [];
  }
  getItem(itemNumber) {
    return this.items[itemNumber - 1];
  }
  addItem(item) {
    this.items.push(item);
  }
  removeItem(itemNumber, giveRemovedItem = false) {
    const itemIndex = Number(itemNumber) - 1;
    const [removedItem] = this.items.splice(itemIndex, 1);
    if (giveRemovedItem) return removedItem;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  isValidItemNumber(itemNumber) {
    const result = Number(itemNumber);
    return (
      !isNaN(result) &&
      Number.isInteger(result) &&
      this.isitemNumberWithinValiditemNumbers(result)
    );
  }
  static isValidItem(item) {
    return item instanceof Item && !item.isEmpty();
  }
  isitemNumberWithinValiditemNumbers(itemNumber) {
    return itemNumber >= 1 && itemNumber <= this.items.length;
  }

  loadItems() {
    this.items = DataHandler.loadData();
  }

  saveItems() {
    DataHandler.saveData(this.items);
  }
}
