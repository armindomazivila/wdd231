
// 1. DISPLAY FOOTER INFORMATION

// Display current year
const currentYear = document.querySelector("#current-year");
currentYear.textContent = new Date().getFullYear();

// Display last modification date
const lastModified = document.querySelector("#last-modified");
lastModified.textContent = document.lastModified;



// 2. SELECT HTML ELEMENTS


const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");



// 3. GET MEMBERSHIP LEVEL

function getMembershipLevel(level) {
    switch (level) {
        case 3:
            return "Gold Member";

        case 2:
            return "Silver Member";

        case 1:
            return "Member";

        default:
            return "Standard Member";
    }
}



// 4. FETCH BUSINESS MEMBERS FROM JSON

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Unable to load members data.");
        }

        // Convert JSON data into JavaScript objects
        const members = await response.json();

        // Display members on the page
        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.textContent =
            "Unable to load business members. Please try again later.";
    }
}


// ========================================
// 5. DISPLAY BUSINESS MEMBERS
// ========================================

function displayMembers(members) {

    // Clear the container before displaying members
    membersContainer.innerHTML = "";

    members.forEach(member => {

        // Create a section for each business
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Create business image
        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";
        image.width = 150;
        image.height = 100;

        // Create business name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Create business address
        const address = document.createElement("p");
        address.textContent = member.address;

        // Create business phone
        const phone = document.createElement("p");
        phone.textContent = member.phone;

        // Create membership information
        const membership = document.createElement("p");
        membership.classList.add("membership-level");
        membership.textContent = getMembershipLevel(member.membership);

        // Create website link
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        // Add all elements to the business card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        // Add the business card to the container
        membersContainer.appendChild(card);
    });
}



// 6. GRID VIEW BUTTON

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});



// 7. LIST VIEW BUTTON


listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});



// 8. LOAD MEMBERS WHEN PAGE OPENS


getMembers();