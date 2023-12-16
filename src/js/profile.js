import { fetchProfileDetails } from "./modules.mjs";

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

const currentDetails = await fetchProfileDetails(username);
const avatarContainer = document.querySelector("#avatarContainer");

/**
 * Inserts the avatar details
 * in the form so it can be
 * updated on the profile
 * @param {string} currentDetails The profile details
 */
function profileDetails() {
  if (
    currentDetails.avatar !== null &&
    currentDetails.avatar !== undefined &&
    currentDetails.avatar !== "null" &&
    currentDetails.avatar !== ""
  ) {
    avatarContainer.src = currentDetails.avatar;
  }
}

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
