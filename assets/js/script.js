// Script to handle light and dark mode toggling
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("mode-toggle");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        document.body.classList.toggle("dark-mode", savedTheme === "dark");
        toggle.checked = savedTheme === "dark"; // Sync the toggle
    } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark-mode");
            toggle.checked = true;
        }
    }

    // Check for changes
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });
});
