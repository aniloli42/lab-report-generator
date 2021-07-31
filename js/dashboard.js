import { validate, logout } from "./check.js";

validate();

document.getElementById("logout").addEventListener("click", () => {
  logout();
});

if(localStorage.getItem("directPrint") != ""){
localStorage.removeItem("directPrint");
}

document.getElementById("generatorDiv").addEventListener("click", () => {
  localStorage.setItem("directPrint",JSON.stringify({source:0}));
  location.assign("./generator.html");
});

document.getElementById("savedDiv").addEventListener("click", () => {
  localStorage.setItem("directPrint",JSON.stringify({source:1}));
  location.assign("./saved-report.html");
});
