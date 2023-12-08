const token = localStorage.getItem("accessToken");

/**
 * Displays the header HTML when
 * logged in
 */
function loggedIn() {
  const header = document.querySelector(".header");

  const navBar = header.appendChild(document.createElement("nav"));
  const list = navBar.appendChild(document.createElement("ul"));
  const leftSide = list.appendChild(document.createElement("div"));
  const logoLink = leftSide.appendChild(document.createElement("a"));
  const logoImg = logoLink.appendChild(document.createElement("img"));
  const allLink = leftSide.appendChild(document.createElement("a"));
  const rightSide = list.appendChild(document.createElement("div"));
  const myProfile = rightSide.appendChild(document.createElement("a"));
  const logout = rightSide.appendChild(document.createElement("a"));

  header.classList.add("sticky-top");
  navBar.classList.add("bg-primary", "w-100");
  list.classList.add("container", "d-flex", "justify-content-between");
  leftSide.classList.add("d-flex", "justify-content-start");
  logoImg.classList.add("mt-3", "h-50");
  allLink.classList.add(
    "text-secondary",
    "nav-link",
    "btn",
    "mt-4",
    "m-4",
    "small-font"
  );
  rightSide.classList.add("d-flex", "justify-content-end");
  myProfile.classList.add(
    "text-secondary",
    "nav-link",
    "btn",
    "mt-4",
    "m-4",
    "small-font"
  );
  logout.classList.add(
    "text-secondary",
    "nav-link",
    "btn",
    "mt-4",
    "small-font"
  );

  logout.id = "logout";

  logoLink.href = "/src/all_listings.html";
  logoImg.src = "/images/Logoauctionhouse_logo.png";
  allLink.href = "/src/all_listings.html";
  myProfile.href = "/src/profile.html";

  allLink.textContent = "See all listings";
  myProfile.textContent = "My profile";
  logout.textContent = "Logout";
}

/**
 * Displays the header HTML when
 * logged out
 */
function loggedOut() {
  const header = document.querySelector(".header");

  const navBar = header.appendChild(document.createElement("nav"));
  const list = navBar.appendChild(document.createElement("ul"));
  const leftSide = list.appendChild(document.createElement("div"));
  const logoLink = leftSide.appendChild(document.createElement("a"));
  const logoImg = logoLink.appendChild(document.createElement("img"));
  const allLink = leftSide.appendChild(document.createElement("a"));
  const rightSide = list.appendChild(document.createElement("div"));
  const register = rightSide.appendChild(document.createElement("a"));
  const login = rightSide.appendChild(document.createElement("a"));

  header.classList.add("sticky-top");
  navBar.classList.add("bg-primary", "w-100");
  list.classList.add("container", "d-flex", "justify-content-between");
  leftSide.classList.add("d-flex", "justify-content-start");
  logoImg.classList.add("mt-3", "h-50");
  allLink.classList.add(
    "text-secondary",
    "nav-link",
    "btn",
    "mt-4",
    "m-4",
    "small-font"
  );
  rightSide.classList.add("d-flex", "justify-content-end");
  register.classList.add(
    "text-secondary",
    "nav-link",
    "btn",
    "mt-4",
    "m-4",
    "small-font"
  );
  login.classList.add(
    "text-secondary",
    "nav-link",
    "btn",
    "mt-4",
    "small-font"
  );

  logoLink.href = "/";
  logoImg.src = "/images/Logoauctionhouse_logo.png";
  allLink.href = "/src/all_listings.html";
  register.href = "/src/register.html";
  login.href = "/";

  allLink.textContent = "See all listings";
  register.textContent = "Register";
  login.textContent = "Login";
}

if (token != undefined) {
  loggedIn();
} else {
  loggedOut();
}
