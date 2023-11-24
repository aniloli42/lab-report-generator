import { checkUser, jsonReader } from "./check.js";
checkUser();

// when the button clicked
const showMessage = document.getElementById("showMessage");

document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault();
  const passwordBox = document.getElementById("password");
  const userBox = document.getElementById("username");
  passwordBox.value == "" || userBox.value == ""
    ? (showMessage.innerHTML = "Enter user and password")
    : verifyUser(userBox.value, passwordBox.value);
  if (showMessage.innerHTML != "") {
    setTimeout(() => {
      showMessage.innerHTML = "";
    }, 2000);
  }
});

// verify
async function verifyUser(username, password) {
  const user = await jsonReader();

  if (user.user != username)
    return (showMessage.innerHTML = "Enter Correct Details");
  if (user.password != password)
    return (showMessage.innerHTML = "Enter Correct Details");
  document.getElementById("userForm");
  userForm.reset();
  localStorage.setItem("user", btoa(user.userkey));

  location.replace("./html/dashboard.html");
}
