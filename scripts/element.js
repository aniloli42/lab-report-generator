export const createValueElement = ({ name, testName, ref, unit }) => {
  // Input Wrapper
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("inputfield");

  // Input Element
  const input = createInputElement(testName);
  inputWrapper.append(input);

  // Ref
  if (!!ref) {
    const refBadge = createBadgeElement(`Ref. RANG: ${ref}`);
    inputWrapper.append(refBadge);
  }

  // Unit
  if (!!unit) {
    const unitBadge = createBadgeElement(unit);
    inputWrapper.append(unitBadge);
  }

  return inputWrapper;
};

export const createBooleanElement = ({
  name,
  testName,
  options,
  defaultValue
}) => {
  // Input Wrapper
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("inputfield");

  const demo = createRadioElementWithLabel(testName, "", true, "Not Measured");
  inputWrapper.append(demo);

  options.forEach((option) => {
    const element = createRadioElementWithLabel(
      testName,
      option,
      option === defaultValue
    );

    inputWrapper.append(element);
  });

  return inputWrapper;
};

/**
 *
 * @param {string} testName
 * @returns {HTMLInputElement}
 */
const createInputElement = (testName) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.name = testName;
  inputElement.autocomplete = "off";
  inputElement.id = testName;
  return inputElement;
};

const createRadioElementWithLabel = (
  testName,
  value,
  isChecked = false,
  label
) => {
  const labelWrapper = document.createElement("label");

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.value = value;
  radio.name = testName;
  radio.id = testName;
  radio.checked = isChecked;

  labelWrapper.append(radio);
  labelWrapper.append(label ?? value);

  return labelWrapper;
};

export const createLabel = (text) => {
  const label = document.createElement("label");
  label.innerText = text;

  return label;
};

/**
 *
 * @param {string} label
 * @returns {HTMLDivElement}
 */

const createBadgeElement = (label) => {
  const badgeElement = document.createElement("div");
  badgeElement.classList.add("unit");
  badgeElement.innerText = label;
  return badgeElement;
};
