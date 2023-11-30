import { fetchSpecificListing } from "./modules.mjs";

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
  const editBtn = document.createElement("button");

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
  formInput.classList.add("form-control", "bg-light", "small-font");
  btnDiv.classList.add("d-flex", "justify-content-end");
  bidBtn.classList.add(
    "btn",
    "bg-secondary",
    "medium-font",
    "fw-semibold",
    "mt-2"
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

  productText.textContent = specificProduct.description;
  deadline.textContent = "Deadline:";
  deadlineDetails.textContent = specificProduct.endsAt;
  currentBid.textContent = "Latest bids:";

  if (specificProduct._count.bids) {
    currentDetails.textContent = `${specificProduct._count.bids}`;
  } else {
    currentDetails.textContent = "No bids";
  }

  startedOn.textContent = "Created:";
  startedDetails.textContent = specificProduct.created;
  formLabel.textContent = "Insert bid here:";
  formInput.placeholder = "Credits";
  editBtn.type = "button";
  editBtn.href = "../new_listing.html";
  bidBtn.type = "submit";

  if (localStorage.accessToken === token) {
    bidBtn.textContent = "Place bid";
    bidBtn.href = "../profile.html";
    currentBid.classList.remove("invisible");
    currentDetails.classList.remove("invisible");
  } else {
    bidBtn.textContent = "Login to place bid";
    bidBtn.href = "./";
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
