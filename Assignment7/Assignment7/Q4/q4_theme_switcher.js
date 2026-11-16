// Q4: Theme Switcher Using Attribute Manipulation

const themeButtons = document.querySelectorAll("[data-theme-choice]");
const currentThemeLabel = document.getElementById("current-theme");

function applyTheme(theme) {
  // Class applied with setAttribute (replaces the whole class attribute)
  document.body.setAttribute("class", `theme-${theme}`);
  // Custom attribute that stores the current theme, e.g. data-theme="dark"
  document.body.setAttribute("data-theme", theme);

  currentThemeLabel.textContent = theme;

  // Mark the active button (also set with setAttribute)
  themeButtons.forEach((button) => {
    const isActive = button.getAttribute("data-theme-choice") === theme;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.getAttribute("data-theme-choice"));
  });
});

applyTheme("light");    // default theme
