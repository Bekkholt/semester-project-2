import { fetchListings } from "../js/modules.mjs";
import { displayListings } from "../js/modules.mjs";
import { allListingsUrl } from "../js/modules.mjs";

const listings = await fetchListings(allListingsUrl);

displayListings(listings);
