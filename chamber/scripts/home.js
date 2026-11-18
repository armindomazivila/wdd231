
// =====================================
// WEATHER API
// =====================================

const API_KEY = "72f8856b953424796badff8f65c6a801";

const CITY = "Maputo";
const COUNTRY = "MZ";

const WEATHER_URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;

const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;


// =====================================
// CURRENT WEATHER
// =====================================

async function getCurrentWeather() {

    const container = document.querySelector("#weather-current");

    if (!container) return;

    try {

        const response = await fetch(WEATHER_URL);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        container.innerHTML = `

            <div class="weather-current-details">

                <img
                    src="https://openweathermap.org/img/wn/${icon}@2x.png"
                    alt="${description}"
                >

                <div>

                    <p class="weather-temperature">
                        ${temperature}°C
                    </p>

                    <p class="weather-description">
                        ${description}
                    </p>

                    <p>
                        Humidity: ${data.main.humidity}%
                    </p>

                </div>

            </div>

        `;

    } catch (error) {

        container.innerHTML = `
            <p class="error-message">
                Weather information is currently unavailable.
            </p>
        `;

        console.error("Current weather error:", error);

    }

}


// =====================================
// THREE-DAY WEATHER FORECAST
// =====================================

async function getWeatherForecast() {

    const container = document.querySelector("#weather-forecast");

    if (!container) return;

    try {

        const response = await fetch(FORECAST_URL);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather forecast.");
        }

        const data = await response.json();

        const today = new Date().toDateString();

        const dailyForecast = {};

        data.list.forEach(item => {

            const date = new Date(item.dt * 1000);

            const dateKey = date.toDateString();

            // Exclude today's forecast
            if (dateKey !== today) {

                // Select forecast closest to midday
                if (
                    !dailyForecast[dateKey] ||
                    Math.abs(date.getHours() - 12) <
                    Math.abs(
                        new Date(
                            dailyForecast[dateKey].dt * 1000
                        ).getHours() - 12
                    )
                ) {

                    dailyForecast[dateKey] = item;

                }

            }

        });

        const forecastDays = Object.values(dailyForecast).slice(0, 3);

        container.innerHTML = `

            <div class="forecast-container">

                ${forecastDays.map(day => {

            const date = new Date(day.dt * 1000);

            const dayName = date.toLocaleDateString("en-US", {
                weekday: "short"
            });

            const temperature = Math.round(day.main.temp);

            const description = day.weather[0].description;

            const icon = day.weather[0].icon;

            return `

                <div class="forecast-day">

                    <h4>${dayName}</h4>

                    <img
                        src="https://openweathermap.org/img/wn/${icon}@2x.png"
                        alt="${description}"
                    >

                    <p><strong>${temperature}°C</strong></p>

                    <p>${description}</p>

                </div>

            `;

        }).join("")}

            </div>

        `;

    } catch (error) {

        container.innerHTML = `
            <p class="error-message">
                Weather forecast is currently unavailable.
            </p>
        `;

        console.error("Weather forecast error:", error);

    }

}


// =====================================
// MEMBER SPOTLIGHTS
// =====================================


// Correctly resolve member image paths
function getMemberImagePath(member) {

    const image = member.image?.trim();

    if (!image) {
        return "images/favicon.png";
    }

    // Keep complete external image URLs
    if (/^https?:\/\//i.test(image)) {
        return image;
    }

    // Remove leading ./ and duplicate images/ folders
    const cleanImage = image
        .replace(/^\.?\//, "")
        .replace(/^images\/images\//, "images/");

    // Keep existing images/ paths
    if (cleanImage.startsWith("images/")) {
        return cleanImage;
    }

    // Add images/ when only the filename is supplied
    return `images/${cleanImage}`;

}


// Randomize array using Fisher-Yates shuffle
function shuffleMembers(members) {

    const shuffled = [...members];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    }

    return shuffled;

}


// Fetch and display Gold and Silver members
async function getMemberSpotlights() {

    const container = document.querySelector("#spotlights-container");

    if (!container) return;

    try {

        // Fetch members JSON
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member information.");
        }

        const members = await response.json();

        if (!Array.isArray(members)) {
            throw new Error("Members data must be an array.");
        }


        // Select Gold and Silver members only
        const qualifiedMembers = members.filter(member => {

            const level = Number(
                member.membershipLevel ?? member.membership
            );

            return level === 2 || level === 3;

        });


        // Randomly shuffle qualified members
        const shuffledMembers = shuffleMembers(qualifiedMembers);


        // Randomly display 2 or 3 members
        const numberOfSpotlights = Math.min(
            shuffledMembers.length,
            Math.floor(Math.random() * 2) + 2
        );


        const selectedMembers = shuffledMembers.slice(
            0,
            numberOfSpotlights
        );


        if (selectedMembers.length === 0) {

            container.innerHTML = `
                <p>No Gold or Silver members available.</p>
            `;

            return;

        }


        // Generate member spotlight cards
        container.innerHTML = selectedMembers.map(member => {

            const level = Number(
                member.membershipLevel ?? member.membership
            );

            const membershipName = level === 3
                ? "Gold Member"
                : "Silver Member";

            const imagePath = getMemberImagePath(member);

            return `

                <article class="spotlight-card">

                    <img
                        src="${imagePath}"
                        alt="${member.name} logo"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='images/favicon.png';"
                    >

                    <h3>${member.name}</h3>

                    <p>
                        <strong>Address:</strong>
                        ${member.address}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${member.phone}
                    </p>

                    <p>
                        <a
                            href="${member.website}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website
                        </a>
                    </p>

                    <span class="membership-level">
                        ${membershipName}
                    </span>

                </article>

            `;

        }).join("");


    } catch (error) {

        container.innerHTML = `
            <p class="error-message">
                Unable to load member spotlights.
            </p>
        `;

        console.error("Member spotlight error:", error);

    }

}


// =====================================
// INITIALIZE HOMEPAGE
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    getCurrentWeather();

    getWeatherForecast();

    getMemberSpotlights();

});