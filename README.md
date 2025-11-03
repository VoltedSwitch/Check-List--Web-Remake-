# Interactive Checklist App

## Overview
This is a simple and interactive **web-based checklist application** that allows users to:

- Add checklist items
- Toggle items as complete
- Swap the position of two items interactively
- Persist checklist state in the browser using `localStorage`

The app is built with **vanilla JavaScript, HTML, and CSS** and demonstrates modular code structure.

---

## Features

- **Add items:** Enter text in the input field and press Enter to add a new checklist item.
- **Toggle completion:** Click on an item to mark it complete (`✅`) or incomplete.
- **Swap items:** Select two items to swap their positions; the swap button highlights selected items in orange.
- **Persistent storage:** All items and their checked state are saved in `localStorage` and restored on page reload.
- **Clean and modular code:** Written in separate JS modules (`Checklist`, `Item`, `DataHandler`) for maintainability.

---

## How to Open

1. Simply open the link to the website.
2. No additional setup or dependencies are required.

---

## Usage

1. Enter a new item in the input field and press **Enter**.
2. Click on a checklist item to toggle completion.
3. Click the **swap** button on two items to swap their positions.
4. Your checklist is automatically saved in the browser.

---

## Project Structure


- `core/` contains main classes (`Checklist` and `Item`)  
- `utils/` contains helper classes like `DataHandler` for localStorage  
- `main.js` initializes the app

---

## License
This project is MIT licensed.
