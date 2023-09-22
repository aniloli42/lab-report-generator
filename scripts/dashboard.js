import { validate, logout } from "./check.js";

validate();

if (localStorage.getItem("directPrint") !== "") {
  localStorage.removeItem("directPrint");
}

const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

const generateReportButton = document.querySelector("#generatorDiv");
generateReportButton.addEventListener("click", () =>
  handleSectionButtonClick({ path: "../pages/generator.html" })
);

const savedReportButton = document.querySelector("#savedDiv");
savedReportButton.addEventListener("click", () =>
  handleSectionButtonClick({ path: "../pages/saved-report.html" })
);

function handleSectionButtonClick({ path }) {
  location.assign(path);
}
