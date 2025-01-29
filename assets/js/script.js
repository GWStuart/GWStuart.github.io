const toggle = document.getElementById("mode-toggle");

// Check if the user has a preferred mode stored in localStorage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  toggle.click();  // works for now. Essentially makes sure it is on
}

// Toggle dark mode on button click
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Store the mode in localStorage to persist the setting
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "true");
  } else {
    localStorage.setItem("darkMode", "false");
  }
});