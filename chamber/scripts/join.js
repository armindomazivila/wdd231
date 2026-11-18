// Set application timestamp

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Membership modals

const membershipLinks = document.querySelectorAll(
    ".membership-card a"
);

membershipLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const modal = document.querySelector(link.getAttribute("href"));

        if (modal) {
            modal.showModal();
        }
    });
});

// Close modal buttons

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
