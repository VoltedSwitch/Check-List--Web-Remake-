export class Item {
  constructor(text, checklist = null) {
    this.text = text;
    this.checklist = checklist;
    this.checked = false;
    this.widget = document.createElement("button");
    this.widget.addEventListener("click", () => {
      this.toggle();
      if (this.checklist) {
        this.checklist.saveState();
        this.checklist.render();
      }
    });
  }
  render() {
    this.widget.innerHTML = this.toString();
  }
  unrender() {
    this.widget.innerHTML = "";
  }
  toggle() {
    this.checked = !this.checked;
  }
  isEmpty() {
    return this.text.trim() === "";
  }
  toString() {
    return this.checked ? `${this.text} ✅` : this.text;
  }
}
