import { profileDetails } from "./modules.mjs";

const username = localStorage.getItem("name");
const credits = localStorage.getItem("credits");

/**
 * Shows the username
 * for the profile logged in
 */
function displayUsername() {
  const usernameText = document.querySelector("#username");

  usernameText.textContent = username;
}

displayUsername();

profileDetails();

/**
 * Shows the credits
 * for the profile logged in
 */
function displayCredits() {
  const displayCredits = document.querySelector("#credits");

  displayCredits.textContent = "My credits:" + " " + credits;
}

displayCredits();
