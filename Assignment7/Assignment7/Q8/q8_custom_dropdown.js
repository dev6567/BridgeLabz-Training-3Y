// Q8: Custom Dropdown Using Only JavaScript (no <select> tag)

const dropdown = document.getElementById("dropdown");
const dropdownButton = document.getElementById("dropdown-btn");
const dropdownList = document.getElementById("dropdown-list");
const selectedValue = document.getElementById("selected-value");

function openDropdown() {
  dropdownList.classList.add("open");
  dropdownButton.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  dropdownList.classList.remove("open");
  dropdownButton.setAttribute("aria-expanded", "false");
}

// The button shows / hides the options
dropdownButton.addEventListener("click", () => {
  if (dropdownList.classList.contains("open")) {
    closeDropdown();
  } else {
    openDropdown();
  }
});

// Clicking an option updates the button text (event delegation on the list)
dropdownList.addEventListener("click", (event) => {
  const option = event.target.closest("li");
  if (!option) return;
  dropdownButton.textContent = option.textContent;
  selectedValue.textContent = option.dataset.value;
  closeDropdown();
});

// CAPTURING PHASE: the third argument `true` makes this listener run on the way DOWN
// (document -> target), before any click handler on the target itself runs.
// So an outside click closes the dropdown first, even if another element would
// call stopPropagation() during the normal bubbling phase.
document.addEventListener(
  "click",
  (event) => {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  },
  true
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDropdown();
});
