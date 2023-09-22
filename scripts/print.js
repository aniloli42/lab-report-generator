// customer Details
function customerDetailsPopulater(customerDetailsArray) {
  customerDetailsArray.forEach((customerDetails) => {
    if (customerDetails.name == "patientName")
      showPatientName.innerText = `Name: ${customerDetails.value}`;

    if (customerDetails.name == "patientAge")
      showPatientAge.innerText = `Age: ${customerDetails.value}`;

    if (customerDetails.name == "patientBirth") {
      const patient = Number(showPatientAge.innerText.slice(5));

      showPatientAge.innerText += ` ${
        patient === 1
          ? customerDetails.value.slice(0, customerDetails.value.length - 1)
          : customerDetails.value
      }`;
    }

    if (customerDetails.name == "patientGender")
      showPatientSex.innerText = `Sex: ${customerDetails.value}`;

    if (customerDetails.name == "doctorName")
      showDoctorName.innerText = `Doctor: ${customerDetails.value}`;

    if (customerDetails.name == "labNo")
      showLabNo.innerText = `Lab No: ${customerDetails.value}`;

    if (customerDetails.name == "testDate")
      showDate.innerText = `Date: ${customerDetails.value}`;
  });

  // showDate in report
  if (getDirectPrintData != "" && getDirectPrintData.source == 0) {
    let DateCreator = new Date();
    displayDate = `${DateCreator.getFullYear()}-${
      DateCreator.getMonth() + 1
    }-${DateCreator.getDate()} AD`;
    showDate.innerText = `Date: ${displayDate.toString()}`;
    formInputs.push({
      name: "testDate",
      value: displayDate
    });
    return;
  }
}

// Report Populator

function reportPopulater(reportDetailsArray, getReports) {
  let markedTest = reportDetailsArray.filter((tests) => {
    return tests.name == "checkTest";
  });

  for (let reports of markedTest) {
    reportSectionTestValidator(reports.value, getReports);
  }
}

// report section test validator
let testAvailable = [];
function reportSectionTestValidator(testName, getReports) {
  let reportTestDetails = getReports[`${testName}`];

  for (let testDetails of reportTestDetails) {
    let testValid = formInputs.filter(
      (tests) => tests.name == testDetails.test
    );
    if (testValid.length != 0) {
      testDetails.value = testValid[0].value;
      testAvailable.push(testDetails);
    }
  }
  reportSectionCreator(testName, testAvailable);
  testAvailable = [];
}

// data Fetcher
async function testFetcher() {
  let data = await fetch(`../json/test.json`);
  let fetchedData = await data.json();
  return fetchedData;
}
// report Section Creator

function reportSectionCreator(testTitle, testDatas) {
  let printedPhysicalTitle = false;
  let printedChemicalTitle = false;
  let printedMicroTitle = false;
  let titleMaker = [
    {
      name: "haematology",
      visibleTitle: "HAEMATOLOGY TEST"
    },
    {
      name: "differential",
      visibleTitle: "DIFFERENTIAL COUNT"
    },
    {
      name: "biochemistry",
      visibleTitle: "BIOCHEMISTRY TEST"
    },
    {
      name: "semen",
      visibleTitle: "SEMEN ANALYSIS"
    },
    {
      name: "serology",
      visibleTitle: "SEROLOGY TEST"
    },
    {
      name: "widal",
      visibleTitle: "WIDAL TEST"
    },
    {
      name: "urine",
      visibleTitle: "URINE ANALYSIS"
    }
  ];
  let noUnitRefColumnTable = ["serology", "widal", "urine"];
  let showTitle = titleMaker.filter((title) => title.name == testTitle);
  let testHTML = `
        <section>
          <header><h2>${showTitle[0]["visibleTitle"]}</h2></header>
          <table>
          <thead>
            <tr>
              <th>TEST</th>
              <th>RESULT</th>
              `;

  if (testTitle == "urine") {
    testHTML += `
              <th>UNIT</th>`;
  } else if (noUnitRefColumnTable.indexOf(testTitle) == -1) {
    testHTML += `
              <th>UNIT</th>
              <th>REF.RANG</th>
              `;
  }

  testHTML += `
            </tr>
            </thead>
            <tbody>`;

  testDatas.forEach((creatingData) => {
    if (
      testTitle == "urine" &&
      (creatingData.test == "urineColour" ||
        creatingData.test == "urineReaction" ||
        creatingData.test == "urineTransparency") &&
      printedPhysicalTitle == false
    ) {
      testHTML += `
        <tr>
        <td colspan="4" class="tdSubTitle">PHYSICAL EXAMINATION</td>
        </tr>
        <tr>
              <td>${creatingData.name}</td>
              <td class="ttbold">${creatingData.value}</td>
        `;
      printedPhysicalTitle = true;
    } else if (
      testTitle == "urine" &&
      (creatingData.test == "urineAlbumin" ||
        creatingData.test == "urineSugar") &&
      printedChemicalTitle == false
    ) {
      testHTML += `
        <tr>
        <td colspan="4" class="tdSubTitle">CHEMICAL EXAMINATION</td>
        </tr>
        <tr>
              <td>${creatingData.name}</td>
              <td class="ttbold">${creatingData.value}</td>
        `;
      printedChemicalTitle = true;
    } else if (
      testTitle == "urine" &&
      (creatingData.test == "urineEpithelial" ||
        creatingData.test == "urinePus" ||
        creatingData.test == "urineRBC" ||
        creatingData.test == "urineCaOxalate" ||
        creatingData.test == "urineCrystals" ||
        creatingData.test == "urineOthers" ||
        creatingData.test == "urineHCG") &&
      printedMicroTitle == false
    ) {
      testHTML += `
      <tr>
      <td colspan="4" class="tdSubTitle">MICROSCOPIC EXAMINATION</td>
      </tr>
      <tr>
            <td>${creatingData.name}</td>
            <td class="ttbold">${creatingData.value}</td>
      `;
      printedMicroTitle = true;
    } else {
      testHTML += `
            <tr>
              <td>${creatingData.name}</td>
              <td class="ttbold">${creatingData.value}</td>
              `;
    }

    if (testTitle == "urine") {
      testHTML += `
      <td>${creatingData.unit == undefined ? "-" : creatingData.unit}</td>`;
    } else if (noUnitRefColumnTable.indexOf(testTitle) == -1) {
      testHTML += `
              <td>${
                creatingData.unit == undefined ? "-" : creatingData.unit
              }</td>
              <td>${creatingData.ref == undefined ? "-" : creatingData.ref}</td>

   `;
    }

    testHTML += `</tr>`;
  });
  testHTML += `
            </tbody>
          </table>
        </section>
`;
  showReportsDiv.innerHTML += testHTML;
  testHTML = null;
}

// print Click handler
printPageBtn.addEventListener("click", () => {
  print();
  labNoUpgrade();
});

// Edit the current details of patient
printEdit.addEventListener("click", () => {
  showPrintDiv.style.display = "none";
  containerDiv.style.display = "grid";
  containerDiv.style.overflow = "unset";
  showReports.innerHTML = "";
  isIdAdded = false;
});

// New Patient Print Available
nextPatient.addEventListener("click", () => {
  mainForm.reset();
  testInclude.innerHTML = "";
  showPrintDiv.style.display = "none";
  containerDiv.style.overflow = "unset";
  containerDiv.style.display = "grid";
  showReports.innerHTML = "";

  const labNumber = Number(localStorage.getItem("labNo"));
  if (labNumber === labNo.value) {
    labNoUpgrade();
  }
  setLabNo();
  isLabNoUpdate = false;
  isIdAdded = false;
});

// Click on Save Report
savePrint.addEventListener("click", () => {
  const labNum = document.getElementById("labNo");
  const patientName = document.querySelector("#patientName");
  if (localStorage.getItem("savedReports") == null) return saveReport();

  const savedReports = JSON.parse(localStorage.getItem("savedReports"));

  const searchReportIndex = savedReports.findIndex((reports) => {
    let findMatchLabTestNo = reports.find((tested) => tested.name == "labNo");

    let labDate = reports.find((labTested) => labTested.name == "labTestDate");

    let labPatientName = reports.find(
      (report) => report.name === "patientName"
    ).value;

    if (
      findMatchLabTestNo.value === labNum.value &&
      labDate.value === todayDate &&
      labPatientName.toLowerCase() === patientName.value.toLowerCase()
    )
      return reports;
  });

  if (searchReportIndex === -1) {
    saveReport(savedReports);
    return;
  }

  const reportId = savedReports[searchReportIndex][0].value;

  saveReport(savedReports, searchReportIndex, todayDate, reportId);
});

function saveReport(savedReports = [], index = -1, labDate = null, id = null) {
  console.log(savedReports, index, labDate, id);

  if (isIdAdded === false) {
    formInputs.push({
      name: "labTestDate",
      value: labDate ?? todayDate
    });

    formInputs.unshift({
      name: "id",
      value: id ?? Date.now()
    });

    isIdAdded = true;
  }

  if (index !== -1) {
    savedReports[index] = formInputs;
  } else {
    savedReports.unshift(formInputs);
  }

  localStorage.setItem("savedReports", JSON.stringify(savedReports));
  saveStatus("Successfully Saved Report!!!");

  if (id == null) {
    labNoUpgrade();
  }
}

function saveStatus(message) {
  successSaving.style.visibility = "visible";
  successSaving.style.transform = "translateY(0)";
  successSaving.innerText = message;
  const animTimeout = setTimeout(() => {
    successSaving.style.transform = "translateY(-100%)";
    clearTimeout(animTimeout);

    const hiddenTimeout = setTimeout(() => {
      successSaving.style.visibility = "hidden";
      clearTimeout(hiddenTimeout);
    }, 200);
  }, 1000);
}

function labNoUpgrade() {
  if (isLabNoUpdate) return;

  const labNumber = Number(localStorage.getItem("labNo")) + 1;

  localStorage.setItem("labNo", labNumber);
  isLabNoUpdate = true;
}
