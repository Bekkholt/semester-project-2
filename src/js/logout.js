const logoutButton = document.querySelector(".logout");

logoutButton.addEventListener("click", onClick);

//** Clears localstorage and returns to login page */
function onClick() {
  localStorage.clear();
  location.href = "/";
}
