// Get application information from the URL

const params = new URLSearchParams(window.location.search);

const fields = [
    ["First Name", "first-name"],
    ["Last Name", "last-name"],
    ["Email Address", "email"],
    ["Mobile Phone", "phone"],
    ["Business Name", "business"],
    ["Membership Level", "membership"],
    ["Application Date", "timestamp"]
];

const details = document.querySelector("#application-details");

fields.forEach(([label, name]) => {

    const value = params.get(name);

    if (value) {

        const paragraph = document.createElement("p");

        paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;

        details.appendChild(paragraph);
    }
});