import { validate, logout } from "./check.js";

validate();

document.getElementById("logout").addEventListener("click", () => {
  logout();
});

document.getElementById("generatorDiv").addEventListener("click", () => {
  location.assign("./generator.html");
});

document.getElementById("savedDiv").addEventListener("click", () => {
  location.assign("./saved-report.html");
});
