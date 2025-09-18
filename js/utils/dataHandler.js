import { Item } from "../core/item.js";

export class DataHandler {
  static accessKey = "checklist";

  static loadData() {
    const data = localStorage.getItem(DataHandler.accessKey);
    if (!data) return []; // if nothing stored, return empty array
    try {
      const rawItems = JSON.parse(data);
      return rawItems.map((obj) => {
        const item = new Item(obj.text);
        item.checked = obj.checked;
        return item;
      });
    } catch (e) {
      console.log("Failed to parse JSON:", e);
      return [];
    }
  }

  static saveData(items) {
    try {
      const dataToSave = items.map((item) => ({
        text: item.text,
        checked: item.checked,
      }));
      localStorage.setItem(
        DataHandler.accessKey,
        JSON.stringify(dataToSave, null, 4)
      );
    } catch (e) {
      console.log("Failed to save JSON:", e);
    }
  }
}
