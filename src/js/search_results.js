import { fetchListings } from "./modules.mjs";
import { allListingsUrl } from "./modules.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const search = params.get("search");

let i = 0;
let foundAll = false;
const allListings = [];
const limit = 100;
const sortBy = "endsAt";

while (foundAll === false && i < 100) {
  const offset = limit * i;
  const listings = await fetchListings(
    `${allListingsUrl}?sort=${sortBy}&limit=${limit}&offset=${offset}`
  );
  allListings.push(...listings);
  if (listings.length < limit) {
    foundAll = true;
  }
  i++;
}

const spinner = document.querySelector(".spinner-border");

/**
 * Runs through the input text in the
 * search input and check if any of the
 * listings matches the input text
 * @param {string} listings The listings to search through
 * @param {string} searchText The search text in the input
 * @returns the results of the listings that
 * includes the input text in title or description
 */

function filterListings(listings, searchText) {
  const results = listings.filter(function (listing) {
    if (!listing.description) listing.description = "";
    if (!listing.title) listing.title = "";
    const title = listing.title.toLowerCase();
    const description = listing.description.toLowerCase();
    const search = searchText.toLowerCase();
    const includes = title.includes(search) || description.includes(search);
    return includes;
  });
  return results;
}

/**
 * Creates the HTML
 * for the listings
 * @param {string} results The results of the search
 */
function showResults(results) {
  const card = document.querySelector(".listingCard");
  const noResult = results.length === 0;

  if (noResult) {
    card.textContent = "No result";
    card.classList.add("d-flex", "justify-content-center", "m-4");
  } else {
    for (let i = 0; i < results.length; i++) {
      const imageContainer = document.createElement("div");
      const listingTitle = document.createElement("h5");
      const listingText = document.createElement("p");
      const goToProduct = document.createElement("a");
      const listingEnding = document.createElement("p");

      const productUrl = "/src/product.html?id=";
      goToProduct.href = productUrl + `${results[i].id}`;

      const cardContent = card.appendChild(document.createElement(`div`));
      const image = imageContainer.appendChild(document.createElement(`img`));

      cardContent.classList.add(
        "p-4",
        "mt-4",
        "col-8",
        "container",
        "bg-primary"
      );
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

      listingEnding.classList.add(
        "d-flex",
        "justify-content-start",
        "text-light",
        "small-font",
        "fst-italic"
      );

      listingTitle.textContent = results[i].title;
      listingText.textContent = results[i].description;
      goToProduct.textContent = "See more";
      listingEnding.textContent = "Ends at" + " " + results[i].endsAt;

      if (results[i].media) {
        image.src = results[i].media;
      }

      card.append(cardContent);
      card.append(spinner);
      cardContent.appendChild(imageContainer);
      cardContent.append(listingTitle);
      cardContent.append(listingText);
      cardContent.append(goToProduct);
      cardContent.append(listingEnding);
    }
  }
}
/**
 * This will display all the
 * correct search results in
 * the HTML made in showResults
 */
async function allResults() {
  const searchedListings = filterListings(allListings, search);
  showResults(searchedListings);
}

allResults();

/**
 * Stops the spinner when all results are loaded
 */
function stopLoader() {
  spinner.classList.add("invisible");
}

stopLoader();
