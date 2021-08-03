import { validate, logout } from "./check.js";

validate();

// Variables

const backBTN = document.getElementById("backBTN");
const displayReportsDiv = document.getElementById("reportDisplay");
const reportDiv = document.getElementsByClassName('report');
const searchResult = document.getElementById('searchResult');

// backBTN Function
backBTN.addEventListener("click", () => {
  location.replace("./dashboard.html");
});

// Display Reports
displayReports();

async function displayReports() {
  let savedReports = await getReports();
  if (savedReports == null) {
    displayReportsDiv.innerHTML = `<p class="error">No any reports saved yet!</p>`;
    return;
  }
  
  displayReportsDiv.innerHTML = "";

  savedReports.forEach((saveReport, index) => {
    let patientName = saveReport.find((name) => name.name == "patientName");
    let testDate = saveReport.find((name) => name.name == "testDate");
    let checkTest = saveReport.filter((name) => name.name == "checkTest");
    let testIndex = index;

    populateDiv(patientName, testDate,checkTest, testIndex);
  });
}



function getReports() {
  let getReports = localStorage.getItem("savedReports");
  if (getReports == null) return null;
  getReports = JSON.parse(getReports);
  return getReports;
}

function populateDiv(patientName, testDate, checkTest, testIndex) {
  let testDiv = document.createElement("div");
  let testsList = "";
  checkTest.forEach(test=>{
    testsList +=`<li>${test.value.toUpperCase()}</li>`;
  })

  testDiv.classList.add("report");

  testDiv.innerHTML = `
        <h2 class="patientNames">${patientName.value}</h2>
        <p class="date">${testDate.value}</p>
        <ul> Tests:
        ${testsList}
        </ul>
        <div class="report-btns">
          <button class="printTest">Print</button>
          <button class="removeTest" data-test-id="${testIndex}">Remove</button>
        </div>
`;

  displayReportsDiv.appendChild(testDiv);
}

searchTest.addEventListener('input',(e)=>{
  let searchText = e.target.value.toLowerCase();
  const patientNames = document.getElementsByClassName('patientNames');
  
  if(searchText=="" || searchText==null || searchText == undefined){
    searchResult.style.display = "none";
    displayReports();
  }



 [...reportDiv].forEach(report=> {

  let personName = report.children[0].innerText.toLowerCase();

  if(personName.includes(searchText)){
    report.style.display = "initial";
  }

  if(!personName.includes(searchText)){
    report.style.display = "none";
  }

  


  if(displayReportsDiv.offsetHeight == "0"){
    searchResult.style.display = "block";
  }

  });
})