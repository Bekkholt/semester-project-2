import { allListingsUrl } from "./modules.mjs";
import { fetchListings } from "./modules.mjs";
import { displayListings } from "./modules.mjs";

const sortBy = "created";
const numListings = 10;
let offset = 0;

const loadMore = document.querySelector(".loadMore");
loadMore.addEventListener("click", onClick);

/**
 * Fetches and displays the listings
 * sorted by newest to latest created
 */
async function fetchAndDisplay() {
  const listings = await fetchListings(
    `${allListingsUrl}?sort=${sortBy}&limit=${numListings}&offset=${offset}`
  );
  displayListings(listings);
}

/**
 * The page loads more listings
 * from the API when clicking the
 * "load more" button
 * @param {event} event The event that happens on click
 */
function onClick(event) {
  offset += numListings;
  fetchAndDisplay(event);
}

fetchAndDisplay();
onClick();
