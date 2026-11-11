// Display current year
const currentYear = document.querySelector("#current-year");
currentYear.textContent = new Date().getFullYear();


// Display last modification date
const lastModified = document.querySelector("#last-modified");
lastModified.textContent = document.lastModified;


// Select HTML elements
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");


// Fetch business members from JSON
async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members data");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.textContent = "Unable to load business members.";

    }
}


// Display members
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <a href="${member.website}" target="_blank" rel="noopener">
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);

    });

}


// Grid view
gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

});


// List view
listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

});


// Load members when page opens
getMembers();