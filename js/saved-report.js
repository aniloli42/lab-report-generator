// Variables
const backBTN = document.getElementById("backBTN");
const displayReportsDiv = document.getElementById("reportDisplay");
const reportDiv = document.getElementsByClassName("report");
const searchResult = document.getElementById("searchResult");

// backBTN Function
backBTN.addEventListener("click", () => {
  location.replace("./dashboard.html");
});

// Display Reports
displayReports();

async function displayReports() {
  let savedReports = await getReports();
  if (savedReports == null || savedReports == undefined) {
    displayReportsDiv.innerHTML = `<p class="error">No any report saved yet!</p>`;
    return;
  }

  displayReportsDiv.innerHTML = "";

  savedReports.forEach((saveReport, index) => {
    let patientName = saveReport.find((name) => name.name == "patientName");
    let testDate = saveReport.find((name) => name.name == "testDate");
    let checkTest = saveReport.filter((name) => name.name == "checkTest");
    let testIndex = index;

    populateDiv(patientName, testDate, checkTest, testIndex);
  });
}

function getReports() {
  let getReports = localStorage.getItem("savedReports");
  if (getReports == null) return null;
  getReports = JSON.parse(getReports);
  return getReports;
}

function populateDiv(patientName, testDate, checkTest, testIndex) {
  let testDiv = "";
  let testsList = "";
  checkTest.forEach((test) => {
    testsList += `<li>${test.value.toUpperCase()}</li>`;
  });

  testDiv = `
      <div class="report">
        <h2 class="patientNames">${patientName.value}</h2>
        <p class="date">${testDate.value}</p>
        <ul> Tests:
        ${testsList}
        </ul>
        <div class="report-btns" >
          <button class="printTest" onclick="printReport(${testIndex})">Print</button>
          <button class="removeTest" onclick="deleteReport(${testIndex})">Remove</button>
        </div>
      </div>
`;

  displayReportsDiv.innerHTML += testDiv;
}

searchTest.addEventListener("input", (e) => {
  let searchText = e.target.value.toLowerCase();
  const patientNames = document.getElementsByClassName("patientNames");

  if (searchText == "" || searchText == null || searchText == undefined) {
    searchResult.style.display = "none";
    displayReports();
  }

  [...reportDiv].forEach((report) => {
    let personName = report.children[0].innerText.toLowerCase();

    if (personName.includes(searchText)) {
      report.style.display = "initial";
    }

    if (!personName.includes(searchText)) {
      report.style.display = "none";
    }

    if (displayReportsDiv.offsetHeight == "0") {
      searchResult.style.display = "block";
    }
  });
});

const printTestBtns = document.getElementsByClassName("printTest");
const removeTest = document.getElementsByClassName("removeTest");

// print Report on click
function printReport(index) {
  localStorage.setItem("printNumber", index);
  location.assign("./generator.html");
}

// delete Report on click
function deleteReport(index) {
  let getDatas = getReports();
  delete getDatas[index];

  getDatas = getDatas.filter((data) => data != null);
  console.log(getDatas.length, getDatas);
  if (getDatas.length != 0)
    localStorage.setItem("savedReports", JSON.stringify(getDatas));
  if (getDatas.length == 0) localStorage.removeItem("savedReports");
  displayReports();
}
