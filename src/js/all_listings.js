import { fetchListings } from "../js/modules.mjs";
import { displayListings } from "../js/modules.mjs";
import { apiUrl } from "../js/modules.mjs";

const listingsUrl = "/api/v1/auction/listings/";
const allListingsUrl = apiUrl + listingsUrl;

const listings = await fetchListings(allListingsUrl);

displayListings(listings);
