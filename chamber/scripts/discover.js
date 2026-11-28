
const discoverContainer = document.querySelector("#discover-container");

async function loadDiscoverPlaces() {

    try {

        const response = await fetch("data/discover.json");

        if (!response.ok) {
            throw new Error("Unable to load discover data.");
        }

        const places = await response.json();

        places.forEach((place, index) => {

            const card = document.createElement("article");
            card.classList.add("discover-card");

            card.innerHTML = `
                <h3>${place.name}</h3>

                <figure>
                    <img
                        src="${place.image}"
                        alt="${place.alt}"
                        loading="lazy"
                        width="400"
                        height="250"
                    >
                </figure>

                <div class="card-content">

                    <address>${place.address}</address>

                    <p>${place.description}</p>

                    <a
                        href="${place.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="learn-more"
                    >
                        Learn More
                    </a>

                </div>
            `;

            discoverContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading attractions:", error);

        discoverContainer.innerHTML = `
            <p>Sorry, the Maputo attractions could not be loaded.</p>
        `;

    }

}

if (discoverContainer) {
    loadDiscoverPlaces();
}



const visitMessage = document.querySelector("#visit-message");

const lastVisitKey = "maputoDiscoverLastVisit";

const currentVisit = Date.now();

const previousVisit = localStorage.getItem(lastVisitKey);

if (visitMessage) {

    if (previousVisit === null) {

        visitMessage.textContent =
            "Welcome! Let us know if you have any questions about Maputo.";

    } else {

        const elapsedTime = currentVisit - Number(previousVisit);

        const daysBetweenVisits = Math.floor(
            elapsedTime / (1000 * 60 * 60 * 24)
        );

        if (elapsedTime < 0) {

            visitMessage.textContent =
                "Welcome back! Enjoy discovering Maputo.";

        } else if (daysBetweenVisits === 0) {

            visitMessage.textContent =
                "Back so soon! Awesome! We hope you enjoy exploring Maputo.";

        } else if (daysBetweenVisits === 1) {

            visitMessage.textContent =
                "You last visited 1 day ago. Welcome back!";

        } else {

            visitMessage.textContent =
                `You last visited ${daysBetweenVisits} days ago. Welcome back!`;

        }

    }

    localStorage.setItem(lastVisitKey, currentVisit);

}