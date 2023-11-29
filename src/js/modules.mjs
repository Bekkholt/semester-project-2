const apiUrl = "https://api.noroff.dev";
const profileUrl = "/api/v1/auction/profiles/";
const listingsUrl = "/api/v1/auction/listings";

const displayProfileUrl = apiUrl + profileUrl;
const allListingsUrl = apiUrl + listingsUrl;

const sortBy = "created";
const numListings = 10;
let offset = 0;

const loadMore = document.querySelector(".loadMore");
loadMore.addEventListener("click", onClick);

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
      allListingsUrl + `${id}` + `?_author=true`,
      getData
    );
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
}

/**
 * Displays the listings from the API in the "see all" feed
 * @param {string} listings The listings to display
 */
function displayListing(listings) {
  const card = document.querySelector(".listingCard");

  const imageContainer = document.createElement("div");
  const listingTitle = document.createElement("h5");
  const listingText = document.createElement("p");
  const goToProduct = document.createElement("a");
  const listingOwner = document.createElement("p");

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
    "display-4"
  );
  listingText.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font"
  );
  goToProduct.classList.add(
    "d-flex",
    "justify-content-end",
    "text-light",
    "small-font",
    "nav-link"
  );

  listingOwner.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font",
    "fst-italic"
  );

  listingTitle.textContent = listings.title;
  listingText.textContent = listings.description;
  goToProduct.textContent = "See more";
  listingOwner.textContent = "Ends at" + " " + listings.endsAt;

  if (listings.media) {
    image.src = listings.media;
  }

  card.append(cardContent);
  cardContent.appendChild(imageContainer);
  cardContent.append(listingTitle);
  cardContent.append(listingText);
  cardContent.append(goToProduct);
  cardContent.append(listingOwner);
}

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
  event.preventDefault();
  offset += numListings;
  fetchAndDisplay();
}

/**
 * Loops through the listings from the API
 * @param {string} listings The listings that loops through
 */
function displayListings(listings) {
  let listingNumber = listings.length;
  for (let i = 0; i < listingNumber; i++) {
    const listing = listings[i];
    displayListing(listing);
  }
}

export { apiUrl };
export { fetchProfileDetails };
export { displayProfileUrl };
export { allListingsUrl };
export { fetchListings };
export { fetchSpecificListing };
export { displayListing };
export { fetchAndDisplay };
export { displayListings };
export { onClick };
