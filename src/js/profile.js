const username = localStorage.getItem("name");
const avatar = localStorage.getItem("avatar");
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

/**
 * Shows the avatar
 * for the profile logged in
 */
function displayAvatar() {
  const displayAvatar = document.querySelector("#avatar");

  displayAvatar.src = avatar;
}

displayAvatar();

/**
 * Shows the credits
 * for the profile logged in
 */
function displayCredits() {
  const displayCredits = document.querySelector("#credits");

  displayCredits.textContent = "My credits:" + " " + credits;
}

displayCredits();
