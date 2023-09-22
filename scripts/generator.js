import { validate } from "./check.js";
import {
  createBooleanElement,
  createLabel,
  createValueElement
} from "./element.js";
validate();

const backToDashboard = () => {
  location.assign("../pages/dashboard.html");
};

const backButton = document.querySelector("[data-backButton]");
backButton?.addEventListener("click", backToDashboard);

const errorShowcaseContainer = document.querySelector("[data-error-container]");
const testElementWrapper = document.querySelector("[data-tests]");

/**
 * @typedef {Object} Test
 * @property {string} name
 * @property {string} test
 * @property {"value" | "boolean" |  "label"} inputType
 * @property {string} [unit]
 * @property {string} [ref]
 * @property {string[]} [options]
 * @property {string} [defaultValue]
 */

/**
 * Rendering Logics
 */

/**
 * @param {TestCategory} category
 *
 * @returns {Promise<Test[]>}
 */
const getTestProperties = async (category) => {
  const res = await fetch("../assets/json/test.json");
  const data = await res.json();
  return data[category];
};

const testCategoriesElements = document.querySelectorAll(
  `input[name='testCategory']`
);

[...testCategoriesElements].forEach((testCategoriesElement) => {
  testCategoriesElement?.addEventListener("input", handleTestCategoryCheck);
});

function handleTestCategoryCheck(e) {
  const element = e.currentTarget;
  const isChecked = element.checked;
  const category = element.value;
  const categoryFullName = element.dataset.name;

  populateCategoryTests(category, categoryFullName, isChecked);
}

/**
 *
 * @param {TestCategory} category
 * @param {string} categoryFullName
 * @param {boolean} isChecked
 */
async function populateCategoryTests(category, categoryFullName, isChecked) {
  if (!isChecked) {
    removeCategoryFromUI(category);
    return;
  }

  const tests = await getTestProperties(category);

  const categoryElement = document.createElement("div");
  categoryElement.classList.add("input-group");
  categoryElement.dataset.category = category;

  const categoryTitleElement = document.createElement("div");
  categoryTitleElement.classList.add("input-title");
  categoryTitleElement.innerText = categoryFullName;
  categoryElement.append(categoryTitleElement);

  tests.forEach((currentTest) => {
    const createdElement = populateTestElement(currentTest);
    categoryElement.append(createdElement);
  });

  testElementWrapper?.append(categoryElement);
}

/**
 *
 * @param {Test} currentTest
 */
function populateTestElement(currentTest) {
  const testWrapper = document.createElement("div");
  testWrapper.classList.add("input-div");

  // Label
  const testLabel = createLabel(currentTest.name);
  testWrapper.append(testLabel);

  let element;

  if (currentTest.inputType === "value")
    element = createValueElement({
      name: currentTest.name,
      testName: currentTest.test,
      ref: currentTest.ref,
      unit: currentTest.unit
    });

  if (currentTest.inputType === "boolean")
    element = createBooleanElement({
      name: currentTest.name,
      testName: currentTest.test,
      options: currentTest.options,
      defaultValue: currentTest.defaultValue
    });

  if (currentTest.inputType === "label") {
    testLabel.style.fontWeight = "bold";
    return testWrapper;
  }

  if (!element) return "";

  testWrapper.append(element);

  return testWrapper;
}

// Handle Test Removal

function removeCategoryFromUI(category) {
  const categoryElement = testElementWrapper.querySelector(
    `[data-category="${category}"]`
  );

  if (!categoryElement) return;

  categoryElement.remove();
}

/**
 * Handling Form Submit
 */
const labReportFormElement = document.querySelector("[data-report-form]");
labReportFormElement?.addEventListener("submit", handleReportGenerate);

/**
 *
 * @param {SubmitEvent} e
 */
function handleReportGenerate(e) {
  e.preventDefault();

  const formData = new FormData(e?.currentTarget);

  const data = getPatientDetails(formData);

  console.log(...formData.entries());
}

/**
 * @typedef {"haematology" | "differential" | "biochemistry" | "semen" | "serology" | "widal" | "urine"} TestCategory
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
