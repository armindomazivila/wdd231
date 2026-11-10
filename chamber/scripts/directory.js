// Display current year
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();


// Display last modification date
const lastModified = document.querySelector("#last-modified");

lastModified.textContent = document.lastModified;