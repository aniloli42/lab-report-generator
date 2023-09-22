async function checkUser() {
  if (localStorage.length == 0) return;
  const user = await getUserAuth();
  if (atob(localStorage.getItem("user")) != user.userkey) return;
  location.replace("../pages/dashboard.html");
}

async function validate() {
  if (localStorage.length == 0) return location.replace("/index.html");

  const user = await getUserAuth();
  if (atob(localStorage.getItem("user")) != user.userkey)
    location.replace("/index.html");
}

function logout() {
  localStorage.removeItem("user");
  location.replace("/index.html");
}

async function getUserAuth() {
  const data = await fetch("../assets/json/key.json");
  const user = await data.json();
  return user;
}

export { checkUser, validate, logout, getUserAuth };
