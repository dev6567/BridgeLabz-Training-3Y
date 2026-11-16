// Q6: Real-Time Table Filter Using the input Event

const searchBox = document.getElementById("search");
const rows = document.querySelectorAll("#student-body tr");
const noResultsMessage = document.getElementById("no-results");

// The "input" event fires on every keystroke (also paste/cut), so the table updates live
searchBox.addEventListener("input", () => {
  const searchText = searchBox.value.trim().toLowerCase();   // lowercase = case-insensitive search
  let visibleCount = 0;

  rows.forEach((row) => {
    // Compare against the whole row text (Name + Branch + CGPA), also in lowercase
    const matches = row.textContent.toLowerCase().includes(searchText);
    row.classList.toggle("hidden", !matches);
    if (matches) visibleCount++;
  });

  // Show the message only when nothing matches
  noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
});
