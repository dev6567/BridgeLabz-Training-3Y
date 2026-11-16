// Q1: Dynamic Product List Manager (event delegation)

const productInput = document.getElementById("product-input");
const addButton = document.getElementById("add-btn");
const productList = document.getElementById("product-list");

let activeEditItem = null;   // the <li> currently in edit mode (only one at a time)

// Builds one list item with a name and Edit / Delete buttons
function createProductItem(name) {
  const item = document.createElement("li");
  item.className = "product-item";

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  nameSpan.textContent = name;           // textContent keeps user input safe from HTML injection

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";

  item.append(nameSpan, editButton, deleteButton);
  return item;
}

function addProduct() {
  const name = productInput.value.trim();
  if (name === "") return;               // ignore empty names
  productList.appendChild(createProductItem(name));
  productInput.value = "";
  productInput.focus();
}

// Switch an item to edit mode: replace the name text with an input box
function startEdit(item) {
  if (activeEditItem && activeEditItem !== item) {
    saveEdit(activeEditItem);            // save the previous edit first
  }
  const nameSpan = item.querySelector(".product-name");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = nameSpan.textContent;
  editInput.dataset.original = nameSpan.textContent;   // remember the old name for Escape / empty values

  item.replaceChild(editInput, nameSpan);
  item.querySelector(".edit-btn").textContent = "Save";
  activeEditItem = item;
  editInput.focus();
}

// Save the edited text and return to normal mode
function saveEdit(item, cancel = false) {
  const editInput = item.querySelector(".edit-input");
  if (!editInput) return;

  const newName = editInput.value.trim();
  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  // Keep the old name if the box is empty or the user cancelled
  nameSpan.textContent = cancel || newName === "" ? editInput.dataset.original : newName;

  item.replaceChild(nameSpan, editInput);
  item.querySelector(".edit-btn").textContent = "Edit";
  if (activeEditItem === item) activeEditItem = null;
}

// EVENT DELEGATION: one listener on the parent <ul> handles Edit/Delete for all
// current AND future items, so we never attach listeners to each button.
productList.addEventListener("click", (event) => {
  const item = event.target.closest(".product-item");
  if (!item) return;

  if (event.target.matches(".delete-btn")) {
    if (item === activeEditItem) activeEditItem = null;
    item.remove();
  } else if (event.target.matches(".edit-btn")) {
    if (item === activeEditItem) {
      saveEdit(item);                    // button says "Save"
    } else {
      startEdit(item);
    }
  }
});

// Keyboard support inside the edit box: Enter saves, Escape cancels
productList.addEventListener("keydown", (event) => {
  if (!event.target.matches(".edit-input")) return;
  const item = event.target.closest(".product-item");
  if (event.key === "Enter") saveEdit(item);
  if (event.key === "Escape") saveEdit(item, true);
});

// Clicking anywhere outside the item being edited auto-saves it
document.addEventListener("click", (event) => {
  if (activeEditItem && !activeEditItem.contains(event.target)) {
    saveEdit(activeEditItem);
  }
});

addButton.addEventListener("click", addProduct);
productInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addProduct();
});
