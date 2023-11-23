import { apiUrl } from "./modules.mjs";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#inputPassword");

/**
 * Gets the login data from the API and
 * sends access token to local storage and
 * the API
 * @param {string} url API
 * @param {string} login login data
 * @returns json data
 */
async function loginUser(url, login) {
  try {
    const data = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(login),
    };
    const response = await fetch(url, data);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", json.name);
    localStorage.setItem("avatar", json.avatar);
    return json;
  } catch (error) {
    return error;
  }
}

/**
 * Checks the data inserted
 * to see if login is successful
 * or has errors
 */
async function submit() {
  const login = {
    email: email.value,
    password: password.value,
  };
  const json = await loginUser(`${apiUrl}/api/v1/auction/auth/login`, login);
  if (json.statusCode === undefined) {
    location.href = "/src/profile.html";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
    const errorMessage = document.querySelector("#errorMessage");
    const errors = json.errors;
    let errorText = "";
    for (let i = 0; i < errors.length; i++) {
      if (i !== 0) errorText += ", ";
      const error = errors[i];
      errorText += error.message;
    }
    errorMessage.textContent = errorText;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submit();
});
