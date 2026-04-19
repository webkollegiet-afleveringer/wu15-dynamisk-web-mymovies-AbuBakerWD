// Theme toggle (light / dark)
const toggle = document.querySelector("#theme-toggle");
const body = document.body;

// Load saved preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.checked = true;
}

toggle?.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});
