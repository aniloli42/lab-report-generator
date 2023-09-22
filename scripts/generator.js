import { validate } from "./check.js";

validate();

const backToDashboard = () => {
  location.assign("../pages/dashboard.html");
};

const getTestProperties = async () => {
  const data = await import("../assets/json/test.json", {
    assert: { type: "json" }
  });

  console.log(data);
};

getTestProperties();

const backButton = document.querySelector("[data-backButton]");
backButton.addEventListener("click", backToDashboard);

const errorShowcaseContainer = document.querySelector("[data-error-container]");

const reportFormElement = document.querySelector("[data-report-form]");

reportFormElement.addEventListener("submit", handleReportGenerate);

/**
 *
 * @param {SubmitEvent} e
 */
function handleReportGenerate(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data = getPatientDetails(formData);

  console.log(...formData.entries());
}

/**
 * @typedef {"haematology" | "differential" | "biochemistry" | "semen" | "serology" | "widal"} TestCategory
 */

/**
 * @typedef {Object} PatientDetail
 * @property {string} patientName
 * @property {"male" | "female"} gender
 * @property {string} age
 * @property {string} birthType
 * @property {string} doctorName
 * @property {number} labNo
 * @property {TestCategory[]} testCategories
 */

/**
 * Get Customer Data from Input Form
 * @param {FormData} formData
 *
 * @return {PatientDetail}
 */
function getPatientDetails(formData) {
  const patientName = formData.get("patientName");
  const gender = formData.get("gender");
  const age = formData.get("age");
  const birthType = formData.get("birthType");
  const doctorName = formData.get("doctorName");
  const labNo = formData.get("labNo");
  const testCategories = formData.getAll("testCategory");

  return {
    patientName,
    gender,
    age,
    birthType,
    doctorName,
    labNo,
    testCategories
  };
}
