// Variables
const backBTN = document.getElementById("backBTN");
const displayReportsDiv = document.getElementById("reportDisplay");
const reportDiv = document.getElementsByClassName("report");
const searchResult = document.getElementById("searchResult");
const searchTest = document.querySelector("#searchTest");
const loadBtn = document.querySelector("[data-load]");
const RENDER_LIMIT = 6;

class Paginate {
  #startOffset = 0;
  #currentPage = 1;
  #endoffset;
  #renderLimit;
  #totalPages;
  #elements;

  constructor(reportArray, renderLimit) {
    this.#elements = reportArray;
    this.#renderLimit = renderLimit;
    this.#totalPages = Math.ceil(reportArray.length / renderLimit);

    if (this.#totalPages > 1) {
      loadBtn.classList.add("active");
    }
  }

  getNextElements() {
    if (this.#endoffset == null) this.#endoffset = this.#renderLimit;
    if (this.#currentPage === this.#totalPages) {
      loadBtn.classList.remove("active");
    }

    const reports = this.#elements.slice(this.#startOffset, this.#endoffset);
    this.#changeOffset();

    reports.forEach((report) => {
      let patientName = report.find(({ name }) => name == "patientName");
      let testDate = report.find(({ name }) => name == "testDate");
      let checkTest = report.filter(({ name }) => name == "checkTest");
      let testIndex = report.filter(({ name }) => name === "id");

      populateDiv(patientName, testDate, checkTest, testIndex);
    });
  }

  #changeOffset() {
    this.#currentPage += 1;
    this.#startOffset += this.#renderLimit;
    this.#endoffset = this.#startOffset + this.#renderLimit;
  }
}

// backBTN Function
backBTN.addEventListener("click", () => {
  location.replace("./dashboard.html");
});

// Return the current saved reports
function getReports() {
  let getReports = localStorage.getItem("savedReports");
  if (getReports == null) return null;
  return JSON.parse(getReports);
}

// Display Reports
displayReports();

function displayReports(reportArray = null) {
  let savedReports = reportArray ?? getReports();

  if (savedReports == null) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = "No any report saved yet!";
    [...displayReportsDiv.children].forEach((elem) => elem.remove());

    displayReportsDiv.append(errorElement);
    return;
  }

  displayReportsDiv.innerHTML = "";

  const paginatedReports = new Paginate(savedReports, RENDER_LIMIT);

  paginatedReports.getNextElements();

  loadBtn.onclick = () => paginatedReports.getNextElements();
}

function populateDiv(patientName, testDate, checkTest, testIndex) {
  const reportDiv = document.createElement("div");
  reportDiv.classList.add("report");

  const reportBtns = document.createElement("div");
  reportBtns.classList.add("report-btns");

  const patientNamesElement = document.createElement("h2");
  patientNamesElement.classList.add("patientNames");
  patientNamesElement.innerText = patientName.value;
  reportDiv.append(patientNamesElement);

  const dateElement = document.createElement("p");
  dateElement.classList.add("date");
  dateElement.innerText = testDate.value;

  reportDiv.append(dateElement);

  const testsElement = document.createElement("div");
  testsElement.classList.add("tests");

  testsElement.append("Tests:");

  checkTest.map((test) => {
    const testDiv = document.createElement("div");
    testDiv.classList.add("test");
    testDiv.innerText = test.value.toUpperCase();
    testsElement.append(testDiv);
  });
  reportDiv.append(testsElement);

  const printButton = document.createElement("button");
  printButton.classList.add("printTest");
  printButton.innerText = "Print";

  printButton.onclick = () => printReport(testIndex);
  reportBtns.append(printButton);

  const removeButton = document.createElement("button");
  removeButton.classList.add("removeTest");
  removeButton.innerText = "Remove";
  removeButton.onclick = () => deleteReport(testIndex);

  reportBtns.append(removeButton);

  reportDiv.append(reportBtns);
  displayReportsDiv.append(reportDiv);
}

const debounceSearch = debounce((searchText) => {
  if (searchText === "" || searchText == null) {
    searchResult.style.display = "none";
    displayReports();
  }

  const getReport = getReports();
  if (getReport == null || getReport.length === 0) return;

  const matchResult = getReport.filter((report) =>
    report[1]?.value?.toLowerCase()?.includes(searchText)
  );

  if (matchResult.length == 0) {
    searchResult.style.display = "block";
    displayReportsDiv.innerHTML = "";
    return;
  }

  displayReports(matchResult);
});

// Search The Test
searchTest.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  debounceSearch(searchText);
});

function debounce(cb, delay = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => cb(...args), delay);
  };
}

function searchMatchedPersonTest() {}

const printTestBtn = document.getElementsByClassName("printTest");
const removeTest = document.getElementsByClassName("removeTest");

// print Report on click
function printReport(reportIndex) {
  const getReportIndex = getReports().findIndex(
    (report) => report[0].value === reportIndex[0].value
  );
  localStorage.setItem("printNumber", getReportIndex);
  location.assign("./generator.html");
}

// delete Report on click
function deleteReport(reportIndex) {
  let getData = getReports();
  console.log(reportIndex[0].value);
  getData = getData.filter((data) => data[0].value !== reportIndex[0].value);
  if (getData.length != 0)
    localStorage.setItem("savedReports", JSON.stringify(getData));
  if (getData.length == 0) localStorage.removeItem("savedReports");
  displayReports();
}
