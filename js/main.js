import { renderChecklist, addItem } from "./utils/ui.js";

const itemInput = document.getElementById("item-input");

renderChecklist();
itemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});
