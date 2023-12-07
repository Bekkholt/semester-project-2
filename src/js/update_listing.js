import { fetchSpecificListing } from "./modules.mjs";
import { allListingsUrl } from "./modules.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const listing = await fetchSpecificListing(id);

const update = document.querySelector(".update");
update.addEventListener("click", onClick);

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", onClickDelete);

const titleContainer = document.querySelector(".title");
const imageContainer = document.querySelector(".image");
const descriptionContainer = document.querySelector(".description");
const deadlineContainer = document.querySelector(".deadline");

/**
 * This inserts the new input content
 * in the form so it can be
 * updated in the listing
 * @param {string} listing The specific listing
 */
function listingDetails(listing) {
  titleContainer.value = listing.title;
  imageContainer.value = listing.media;
  descriptionContainer.value = listing.description;
  const date = new Date(listing.endsAt);
  const formatedDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "T" +
    date.getHours() +
    ":" +
    date.getMinutes();

  deadlineContainer.value = formatedDate;
}

listingDetails(listing);

/**
 * This makes the edit of the listing
 * in the API
 * @param {string} url The listing url
 * @param {string} title The listing title
 * @param {string} image The listing image
 * @param {string} description The listing description
 * @param {string} deadline The listing deadline
 */
async function editListing(url, title, image, description, deadline) {
  try {
    const token = localStorage.getItem("accessToken");

    const listingWithMedia = {
      title: title,
      media: [image],
      description: description,
      endsAt: deadline,
    };

    const listingWithoutMedia = {
      title: title,
      description: description,
      endsAt: deadline,
    };

    let body;
    if (!image) {
      body = listingWithoutMedia;
    } else {
      body = listingWithMedia;
    }

    const getData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, getData);
    return response;
  } catch (error) {
    return error;
  }
}

/**
 * This makes the updated content go
 * through to the API when clicking "update"
 * and returns the user to the feed page
 * if succeeded or gives an
 * error message if it fails
 * @param {event} event The event that happens on click
 */
async function onClick(event) {
  event.preventDefault();
  const title = titleContainer.value;
  const image = imageContainer.value;
  const description = descriptionContainer.value;
  const deadline = deadlineContainer.value;
  const response = await editListing(
    allListingsUrl + id,
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
  }
}

/**
 * This deletes the selected
 * listing from the API
 * @param {string} url The listing url
 */
async function deleteListing(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    return response;
  } catch (error) {
    return error;
  }
}

/**
 * This deletes the listing from
 * the API when clicking "delete"
 * and returns the user to the
 * feed page if succeeded or
 * gives an error message if it fails
 * @param {event} event The event that happens on click
 */
async function onClickDelete(event) {
  event.preventDefault();
  const response = await deleteListing(allListingsUrl + id);
  if (response.ok) {
    location.href = "/src/profile.html";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
