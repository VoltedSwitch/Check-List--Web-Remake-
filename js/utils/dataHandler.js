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
        if (obj.checked) item.check();
        return item;
      });
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }
  }

  static saveData(data) {
    try {
      localStorage.setItem(
        DataHandler.accessKey,
        JSON.stringify(data, null, 4)
      );
    } catch (e) {
      console.error("Failed to save JSON:", e);
    }
  }
}
