import { setupNavbar } from "./components/navbar.js";
import { setupCursor } from "./components/cursor.js";
import { homeBG } from "./components/homeBG.js";
import { carrousel } from "./components/carrousel.js";
import { works } from "./components/works.js";
import { setupEducation } from "./components/education.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupCursor();
  homeBG();
  carrousel();
  works();
  setupEducation();
});









