import { checkUser, getUserAuth } from "./check.js";
checkUser();

const showMessage = document.querySelector("#showMessage");
const loginForm = document.querySelector("[data-login-form]");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const password = formData.get("password");
  const username = formData.get("username");

  if (!password || !username)
    showMessage.innerText = `Enter username and password!`;

  if (!!username && !!password) {
    const isVerifiedUser = await verifyUser(username, password);

    if (isVerifiedUser) {
      location.replace("../pages/dashboard.html");
    }
  }

  if (showMessage.innerText === "") return;

  const timeout = setTimeout(() => {
    showMessage.innerText = "";
    clearTimeout(timeout);
  }, 2000);
});

// verify
async function verifyUser(username, password) {
  const user = await getUserAuth();

  if (user.user != username || user.password !== password) {
    showMessage.innerText = "Enter Correct Details";
    return false;
  }

  localStorage.setItem("user", btoa(user.userkey));
  return true;
}
