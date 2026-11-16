// Q2: Live Character Counter with Warning Behavior

const MAX_CHARS = 100;
const WARNING_LIMIT = 20;     // counter turns yellow at 20 characters left

const messageBox = document.getElementById("message");
const counter = document.getElementById("counter");
const resetButton = document.getElementById("reset-btn");

// Updates the text and color of the counter
function updateCounter() {
  const remaining = MAX_CHARS - messageBox.value.length;
  counter.textContent = `${remaining} character${remaining === 1 ? "" : "s"} remaining`;

  counter.classList.toggle("warning", remaining <= WARNING_LIMIT && remaining > 0); // yellow
  counter.classList.toggle("danger", remaining === 0);                               // red
}

// Block typing once the limit is reached (Backspace, Delete and arrows still work)
messageBox.addEventListener("keydown", (event) => {
  const isTypingKey = event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
  const isEnter = event.key === "Enter";
  const hasSelection = messageBox.selectionStart !== messageBox.selectionEnd;  // typing would replace the selection

  if ((isTypingKey || isEnter) && messageBox.value.length >= MAX_CHARS && !hasSelection) {
    event.preventDefault();
  }
});

// Pasting can bypass keydown, so only paste as much text as fits
messageBox.addEventListener("paste", (event) => {
  event.preventDefault();
  const pastedText = event.clipboardData.getData("text");
  const start = messageBox.selectionStart;
  const end = messageBox.selectionEnd;
  const roomLeft = MAX_CHARS - (messageBox.value.length - (end - start));
  if (roomLeft > 0) {
    messageBox.setRangeText(pastedText.slice(0, roomLeft), start, end, "end");
  }
  updateCounter();
});

// Safety net (e.g. mobile keyboards): trim anything above the limit
messageBox.addEventListener("input", () => {
  if (messageBox.value.length > MAX_CHARS) {
    messageBox.value = messageBox.value.slice(0, MAX_CHARS);
  }
  updateCounter();
});

// Reset clears the text and the counter
resetButton.addEventListener("click", () => {
  messageBox.value = "";
  updateCounter();
  messageBox.focus();
});

updateCounter();
