const apiUrl = "https://api.noroff.dev";
const profileUrl = "/api/v1/auction/profiles/";
const displayProfileUrl = apiUrl + profileUrl;

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

export { apiUrl };
export { fetchProfileDetails };
export { displayProfileUrl };
