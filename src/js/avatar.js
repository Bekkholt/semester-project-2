import { fetchProfileDetails } from "../js/modules.mjs";
import { displayProfileUrl } from "../js/modules.mjs";

const name = localStorage.getItem("name");

const currentDetails = await fetchProfileDetails(name);

const update = document.querySelector("#update");
update.addEventListener("click", onClick);

const avatarContainer = document.querySelector("#avatarContainer");

const inputImage = document.querySelector("#input");

/**
 * Inserts the avatar details
 * in the form so it can be
 * updated on the profile
 * @param {string} currentDetails The profile details
 */

function profileDetails() {
  avatarContainer.src = currentDetails.avatar;
}

profileDetails();

/**
 * Updates the avatar
 * in the API
 * @param {string} avatar The avatar

 */
async function newAvatar(url, avatar) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    };
    console.log(getData);
    const response = await fetch(url, getData);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * The updated avatar goes to the
 * API when clicking "update" and returns
 * to the profile page
 * if succeeded or gives an
 * error message if it fails
 * @param {event} event The event that happens on click
 */
async function onClick(event) {
  event.preventDefault();
  const url = displayProfileUrl + name + "/media";
  const avatar = inputImage.value;
  console.log(url, avatar);
  const response = await newAvatar(url, avatar);
  if (response.ok) {
    localStorage.setItem("avatar", avatar);
    location.href = "/src/profile.html";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
