async function checkUser() {
  if (localStorage.length == 0) return;
  const user = await jsonReader();
  if (atob(localStorage.getItem("user")) != user.userkey) return;
  location.replace("html/dashboard.html");
}

async function validate() {
  if (localStorage.length == 0) location.replace("../index.html");
  const user = await jsonReader();
  if (atob(localStorage.getItem("user")) != user.userkey)
    location.replace("../index.html");
}

function logout() {
  localStorage.removeItem("user");
  location.replace("../index.html");
}

async function jsonReader() {
  const data = await fetch("/json/key.json");
  const user = await data.json();
  return user;
}

export { checkUser, validate, logout, jsonReader };
