import './style.css';
import { renderDashboard } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

if (window.location.search.includes("?country=")) {
  renderDetail();
} else {
  document.querySelector(".filters").classList.add("active");
  renderDashboard();
}

if (window.localStorage.getItem("preferDark")) {
  document.body.classList.toggle('dark-mode');
}

let switchColorTheme = document.querySelector(".theme-switcher");
switchColorTheme.addEventListener("click", () => {
  if (window.localStorage.getItem("preferDark")) {
    window.localStorage.setItem("preferDark", 0);
  } else {
    window.localStorage.setItem("preferDark", 1);
  }
  document.body.classList.toggle('dark-mode');
});
