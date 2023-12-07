import { allListingsUrl } from "./modules.mjs";

const upload = document.querySelector(".upload");
upload.addEventListener("click", onClick);

const titleInput = document.querySelector(".title");
const imageInput = document.querySelector(".image");
const descriptionInput = document.querySelector(".description");
const deadlineInput = document.querySelector(".deadline");

/**
 * Creates a new listing
 * with title, image, description
 * and a deadline that will
 * be posted to the API
 * @param {string} url The listing url
 * @param {string} title The listing title
 * @param {string} image The listing image
 * @param {string} description The listing description
 * @param {string} deadline The listing deadline
 */
async function createListing(url, title, image, description, deadline) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        media: [image],
        description: description,
        tags: [],
        endsAt: deadline,
      }),
    };
    const response = await fetch(url, getData);
    return response;
  } catch (error) {
    return error;
  }
}

/**
 * The content goes through to the API
 * when clicking "upload"
 * and returns the user to the
 * profile page if succeeded or gives
 * an error message if it fails
 * @param {Event} event The event that happens on click
 */
async function onClick(event) {
  event.preventDefault();
  const title = titleInput.value;
  const image = imageInput.value;
  const description = descriptionInput.value;
  const deadline = deadlineInput.value;
  const response = await createListing(
    allListingsUrl,
    title,
    image,
    description,
    deadline
  );

  if (response.ok) {
    location.href = "/src/profile.html";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
    const errorMessage = document.querySelector("#errorMessage");
    const json = await response.json();
    const errors = json.errors;
    let errorText = "";
    for (let i = 0; i < errors.length; i++) {
      if (i !== 0) errorText += ", ";
      const error = errors[i];
      errorText += error.message;
    }
    errorMessage.textContent = "Error!" + " " + errorText;
  }
}
