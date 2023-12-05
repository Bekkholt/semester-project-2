import { apiUrl } from "./modules.mjs";
import { profileUrl } from "./modules.mjs";
import { fetchListings } from "./modules.mjs";
import { displayListings } from "./modules.mjs";

const seeListings = document.querySelector(".listings");
seeListings.addEventListener("click", onClick);

const username = localStorage.getItem("name");
const fullProfileURL = apiUrl + profileUrl + username + "/listings";

/**
 * Checks the API when
 * clicking "My listings"
 * and returns the listings
 * made by the user and shows
 * an error message if it fails
 * @param {Event} event The event that happens on click
 */
async function onClick(event) {
  event.preventDefault();
  const listings = await fetchListings(fullProfileURL);
  if (listings.length !== undefined) {
    displayListings(listings);
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
