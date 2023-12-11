const apiUrl = "https://api.noroff.dev";
const profileUrl = "/api/v1/auction/profiles/";
const listingsUrl = "/api/v1/auction/listings/";
const bidUrl = "/bids?_seller=true&_bids=true";

const displayProfileUrl = apiUrl + profileUrl;
const allListingsUrl = apiUrl + listingsUrl;

/**
 * Fetches the profile details
 * from the API
 * @param {string} name the profile name
 * @returns the profile details
 */
async function fetchProfileDetails() {
  try {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(displayProfileUrl + name, getData);
    const details = await response.json();

    return details;
  } catch (error) {
    return error;
  }
}

/**
 * Gets all the listings from the API
 * @returns listings from API
 */
async function fetchListings(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const listings = await response.json();
    return listings;
  } catch (error) {
    return error;
  }
}

/**
 * Fetches the specific listing
 * from the API based on the ID
 * @param {string} id The listing ID
 * @returns the specific listing from ID
 */
async function fetchSpecificListing(id) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      allListingsUrl + `${id}` + `?_seller=true&_bids=true`,
      getData
    );
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
}

/**
 * Displays the listings from the API in the feed
 * @param {string} listings The listings to display
 */
function displayListing(listings) {
  const card = document.querySelector(".listingCard");

  const imageContainer = document.createElement("div");
  const listingTitle = document.createElement("h5");
  const listingText = document.createElement("p");
  const goToProduct = document.createElement("a");
  const listingEnding = document.createElement("p");

  const productUrl = "/src/product.html?id=";
  goToProduct.href = productUrl + `${listings.id}`;

  const cardContent = card.appendChild(document.createElement(`div`));
  const image = imageContainer.appendChild(document.createElement(`img`));

  cardContent.classList.add("p-4", "mt-4", "col-8", "container", "bg-primary");
  imageContainer.classList.add("d-flex", "row", "justify-content-center");
  image.classList.add("w-50", "mb-2");
  listingTitle.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "medium-font",
    "display-4",
    "p-2"
  );
  listingText.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font",
    "p-2"
  );
  goToProduct.classList.add(
    "d-flex",
    "justify-content-center",
    "text-primary",
    "small-font",
    "btn",
    "bg-secondary",
    "col-3"
  );

  listingEnding.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font",
    "fst-italic",
    "p-2"
  );

  const date = new Date(listings.endsAt);
  const formatedDate =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " - " +
    date.getHours() +
    ":" +
    date.getMinutes();

  listingTitle.textContent = listings.title;
  listingText.textContent = listings.description;
  goToProduct.textContent = "See more";
  listingEnding.textContent = "Ends at" + " " + formatedDate;

  if (listings.media) {
    image.src = listings.media;
  }

  card.append(cardContent);
  cardContent.appendChild(imageContainer);
  cardContent.append(listingTitle);
  cardContent.append(listingText);
  cardContent.append(goToProduct);
  cardContent.append(listingEnding);
}

/**
 * Displays the bids from teh API in the feed
 * @param {string} bid The bids to display
 */
function displayMyBid(bid) {
  const card = document.querySelector(".listingCard");

  const imageContainer = document.createElement("div");
  const listingTitle = document.createElement("h5");
  const listingText = document.createElement("p");
  const goToProduct = document.createElement("a");
  const myBid = document.createElement("p");
  const listingEnding = document.createElement("p");

  const productUrl = "/src/product.html?id=";
  goToProduct.href = productUrl + `${bid.listing.id}`;

  const cardContent = card.appendChild(document.createElement(`div`));
  const image = imageContainer.appendChild(document.createElement(`img`));

  cardContent.classList.add("p-4", "mt-4", "col-8", "container", "bg-primary");
  imageContainer.classList.add("d-flex", "row", "justify-content-center");
  image.classList.add("w-50", "mb-2");
  listingTitle.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "medium-font",
    "display-4",
    "p-2"
  );
  listingText.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font",
    "p-2"
  );
  goToProduct.classList.add(
    "d-flex",
    "justify-content-center",
    "text-primary",
    "small-font",
    "btn",
    "bg-secondary",
    "col-3"
  );

  listingEnding.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font",
    "fst-italic",
    "p-2"
  );
  myBid.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font",
    "fst-italic",
    "p-2"
  );

  const bidEnding = new Date(bid.listing.endsAt);
  const formatedDate =
    bidEnding.getDate() +
    "/" +
    (bidEnding.getMonth() + 1) +
    "/" +
    bidEnding.getFullYear() +
    " - " +
    bidEnding.getHours() +
    ":" +
    bidEnding.getMinutes();

  listingTitle.textContent = bid.listing.title;
  listingText.textContent = bid.listing.description;
  goToProduct.textContent = "See more";
  listingEnding.textContent = "Ends at" + " " + formatedDate;
  myBid.textContent = "My bid:" + " " + bid.amount;

  if (bid.listing.media) {
    image.src = bid.listing.media;
  }

  card.append(cardContent);
  cardContent.appendChild(imageContainer);
  cardContent.append(listingTitle);
  cardContent.append(listingText);
  cardContent.append(myBid);
  cardContent.append(goToProduct);
  cardContent.append(listingEnding);
}

/**
 * Clears the div with the cards
 */
function clearCards() {
  const card = document.querySelector(".listingCard");
  while (card.firstChild) {
    card.removeChild(card.firstChild);
  }
}

/**
 * Loops through the listings from the API
 * @param {string} listings The listings that loops through
 */
function displayListings(listings, clear) {
  if (clear) clearCards();
  let listingNumber = listings.length;
  for (let i = 0; i < listingNumber; i++) {
    const listing = listings[i];
    displayListing(listing);
  }
}
/**
 * Loops through the bids from the API
 * @param {string} bids The bids that loops through
 */
function displayMyBids(bids) {
  clearCards();
  let bidNumber = bids.length;
  for (let i = 0; i < bidNumber; i++) {
    const bid = bids[i];
    displayMyBid(bid);
  }
}

export { apiUrl };
export { profileUrl };
export { fetchProfileDetails };
export { displayProfileUrl };
export { allListingsUrl };
export { fetchListings };
export { fetchSpecificListing };
export { displayListing };
export { displayListings };
export { bidUrl };
export { displayMyBids };
