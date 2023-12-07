import { apiUrl } from "./modules.mjs";
import { profileUrl } from "./modules.mjs";
import { fetchListings } from "./modules.mjs";
import { displayListings } from "./modules.mjs";
import { displayMyBids } from "./modules.mjs";

const seeListings = document.querySelector(".listings");
seeListings.addEventListener("click", onClick);

const seeBids = document.querySelector(".bids");
seeBids.addEventListener("click", onClickBids);

const username = localStorage.getItem("name");
const myListingsuRL = apiUrl + profileUrl + username + "/listings";
const myBidsUrl = apiUrl + profileUrl + username + "/bids" + "?_listings=true";

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
  const listings = await fetchListings(myListingsuRL);
  if (listings.length !== undefined) {
    displayListings(listings);
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}

/**
 * Checks the API when
 * clicking "My bids"
 * and returns the listings
 * bid on by the user and shows
 * an error message if it fails
 * @param {Event} event The event that happens on click
 */
async function onClickBids(event) {
  event.preventDefault();
  const bids = await displayMyBids(myBidsUrl);
  console.log({ bids });
  if (bids.length !== undefined) {
    displayMyBids(bids);
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
