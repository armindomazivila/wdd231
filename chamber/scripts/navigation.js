// Select navigation elements
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Toggle navigation menu
menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    // Update accessibility label
    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Change menu icon
    menuButton.textContent = isOpen ? "✕" : "☰";

});