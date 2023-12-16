import { fetchSpecificListing } from "./modules.mjs";
import { allListingsUrl } from "./modules.mjs";
import { bidUrl } from "./modules.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");
const token = localStorage.getItem("accessToken");

const profileName = localStorage.getItem("name");

/**
 * Creates the HTML with the details
 * from the product
 * @param {string} specificProduct The fetched specific product
 */
function createProductHTML(specificProduct) {
  document.title = "Auctionhouse" + " - " + specificProduct.title;
  const title = document.querySelector(".title");
  title.textContent = specificProduct.title;

  const card = document.querySelector(".productCard");
  const imageContainer = document.createElement("div");
  const productText = document.createElement("p");
  const lowerCard = document.createElement("div");
  const bidInfo = document.createElement("div");
  const deadline = document.createElement("p");
  const deadlineDetails = document.createElement("p");
  const currentBid = document.createElement("p");
  const currentDetails = document.createElement("p");
  const startedOn = document.createElement("p");
  const startedDetails = document.createElement("p");
  const insertForm = document.createElement("form");
  const formDiv = document.createElement("div");
  const formLabel = document.createElement("label");
  const formInput = document.createElement("input");
  const btnDiv = document.createElement("div");
  const bidBtn = document.createElement("button");
  const editBtn = document.createElement("a");

  const cardContent = card.appendChild(document.createElement(`div`));
  const image = imageContainer.appendChild(document.createElement(`img`));

  cardContent.classList.add("p-4", "mt-4", "col-8", "container", "bg-primary");
  imageContainer.classList.add("d-flex", "row", "justify-content-center");
  image.classList.add("w-50", "mb-2");
  productText.classList.add(
    "d-flex",
    "justify-content-start",
    "text-light",
    "small-font"
  );
  lowerCard.classList.add("d-flex", "justify-content-between", "pt-4");
  bidInfo.classList.add("d-flex", "justify-content-start", "row");
  deadline.classList.add("text-light", "small-font");
  deadlineDetails.classList.add("text-light", "small-font");
  currentBid.classList.add("text-light", "small-font", "invisible");
  currentDetails.classList.add("text-light", "small-font", "invisible");
  startedOn.classList.add("text-light", "small-font");
  startedDetails.classList.add("text-light", "small-font");
  insertForm.classList.add("d-flex", "justify-content-end", "row");
  formDiv.classList.add("col-4");
  formLabel.classList.add(
    "d-flex",
    "form-label",
    "justify-content-end",
    "text-light",
    "small-font"
  );
  formInput.classList.add("form-control", "bg-light", "small-font", "input");
  btnDiv.classList.add("d-flex", "justify-content-end", "p-0");
  bidBtn.classList.add(
    "btn",
    "bg-secondary",
    "medium-font",
    "fw-semibold",
    "mt-2",
    "bid"
  );
  editBtn.classList.add(
    "btn",
    "bg-secondary",
    "medium-font",
    "fw-semibold",
    "m-4",
    "invisible"
  );

  if (specificProduct.media) {
    image.src = specificProduct.media;
  }

  if (profileName === `${specificProduct.seller.name}`) {
    editBtn.classList.remove("invisible");
    btnDiv.append(editBtn);
    formLabel.classList.add("invisible");
    formInput.classList.add("invisible");
    bidBtn.classList.add("invisible");
    productText.classList.add("mt-4");
  }

  const deadlineDate = new Date(specificProduct.endsAt);
  const formatedDeadlineDate =
    deadlineDate.getDate() +
    "/" +
    (deadlineDate.getMonth() + 1) +
    "/" +
    deadlineDate.getFullYear() +
    " - " +
    deadlineDate.getHours() +
    ":" +
    deadlineDate.getMinutes();

  productText.textContent = specificProduct.description;
  deadline.textContent = "Deadline:";
  deadlineDetails.textContent = formatedDeadlineDate;
  currentBid.textContent = "Latest bids (low to high):";

  if (specificProduct.bids.length > 0) {
    specificProduct.bids.sort((a, b) => {
      return a.amount - b.amount;
    });
    for (let i = 0; i < specificProduct.bids.length; i++) {
      const allbids = currentDetails.appendChild(document.createElement(`p`));
      allbids.textContent = `${specificProduct.bids[i].amount}`;
    }
  } else {
    currentDetails.textContent = "No bids";
  }

  const createdDate = new Date(specificProduct.created);
  const formatedCreatedDate =
    createdDate.getDate() +
    "/" +
    (createdDate.getMonth() + 1) +
    "/" +
    createdDate.getFullYear() +
    " - " +
    createdDate.getHours() +
    ":" +
    createdDate.getMinutes();

  startedOn.textContent = "Created:";
  startedDetails.textContent = formatedCreatedDate;
  formLabel.textContent = "Insert bid here:";
  formInput.type = "number";
  formInput.placeholder = "Credits";
  editBtn.type = "button";
  editBtn.href = "/src/update_listing.html" + "?id=" + `${specificProduct.id}`;
  bidBtn.type = "submit";

  if (localStorage.accessToken === token) {
    bidBtn.textContent = "Place bid";
    currentBid.classList.remove("invisible");
    currentDetails.classList.remove("invisible");
  } else {
    formLabel.textContent = "Login to bid on this item.";
    formInput.classList.add("invisible");
    bidBtn.classList.add("invisible");
  }

  editBtn.textContent = "Edit listing";

  card.append(cardContent);
  cardContent.appendChild(imageContainer);
  cardContent.append(productText);
  cardContent.appendChild(lowerCard);
  lowerCard.appendChild(bidInfo);
  bidInfo.append(deadline);
  bidInfo.append(deadlineDetails);
  bidInfo.append(currentBid);
  bidInfo.append(currentDetails);
  bidInfo.append(startedOn);
  bidInfo.append(startedDetails);
  lowerCard.appendChild(insertForm);
  insertForm.appendChild(formDiv);
  insertForm.append(formLabel);
  insertForm.append(formInput);
  insertForm.append(btnDiv);
  btnDiv.appendChild(bidBtn);
}

const product = await fetchSpecificListing(id);
createProductHTML(product);

const bid = document.querySelector(".bid");
bid.addEventListener("click", onClick);

const creditsInput = document.querySelector(".input");

/**
 * Creates a new bid on
 * the specific listing that
 * will be posted to the API
 * @param {string} id The listing ID
 * @param {string} bid The bid
 */
async function makeBid(id, bid) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: bid,
      }),
    };
    const response = await fetch(allListingsUrl + `${id}` + bidUrl, getData);
    return response;
  } catch (error) {
    return error;
  }
}

/**
 * The content goes through to the API
 * when clicking "Place bid"
 * and returns the user to the
 * profile page if succeeded or gives
 * an error message if it fails
 * @param {Event} event The event that happens on click
 */
async function onClick(event) {
  event.preventDefault();
  const bid = Number.parseFloat(creditsInput.value);
  const response = await makeBid(id, bid);
  if (response.ok) {
    const newCredits = localStorage.getItem("credits") - bid;
    localStorage.setItem("credits", newCredits);
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
