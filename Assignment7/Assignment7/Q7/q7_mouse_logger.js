// Q7: Detect Mouse Path & Coordinates Logger

const box = document.getElementById("box");
const info = document.getElementById("info");
const dotCount = document.getElementById("dot-count");
const clearButton = document.getElementById("clear-btn");

let dots = 0;

// Live coordinates while the mouse moves inside the box
box.addEventListener("mousemove", (event) => {
  // clientX / clientY are measured from the top-left corner of the browser window
  info.textContent = `clientX: ${event.clientX}, clientY: ${event.clientY}`;
});

box.addEventListener("mouseleave", () => {
  info.textContent = "Mouse is outside the box.";
});

// Double-click drops a red dot at the clicked position
box.addEventListener("dblclick", (event) => {
  // Convert window coordinates to coordinates inside the box
  const boxPosition = box.getBoundingClientRect();
  const x = event.clientX - boxPosition.left;
  const y = event.clientY - boxPosition.top;

  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  box.appendChild(dot);

  dots++;
  dotCount.textContent = dots;
});

clearButton.addEventListener("click", () => {
  box.querySelectorAll(".dot").forEach((dot) => dot.remove());
  dots = 0;
  dotCount.textContent = dots;
});
