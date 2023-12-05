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
  displayListings(listings);
  const response = displayListings(fullProfileURL);

  if (response) {
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

    listingTitle.textContent = listings.title;
    listingText.textContent = listings.description;
    goToProduct.textContent = "See more";
    listingEnding.textContent = "Ends at" + " " + listings.endsAt;

    if (listings.media) {
      image.src = listings.media;
    }

    card.append(cardContent);
    cardContent.appendChild(imageContainer);
    cardContent.append(listingTitle);
    cardContent.append(listingText);
    cardContent.append(goToProduct);
    cardContent.append(listingEnding);
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
