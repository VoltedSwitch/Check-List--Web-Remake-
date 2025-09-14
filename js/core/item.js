export class Item {
  constructor(text) {
    this.text = text;
    this.checked = false;
  }
  check() {
    this.checked = true;
  }
  uncheck() {
    this.checked = false;
  }
  isEmpty() {
    return this.text.trim() === "";
  }
  toString() {
    return this.checked ? `${this.text} ✅` : this.text;
  }
}
