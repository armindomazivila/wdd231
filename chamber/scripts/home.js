// =====================================
// CHAMBER HOME PAGE JAVASCRIPT
// =====================================


// =====================================
// WEATHER API
// =====================================

const API_KEY = "78612765496a49d92887f83d5ecad960";

const CITY = "Maputo";
const COUNTRY = "MZ";

const WEATHER_URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;

const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;


// Get current weather
async function getCurrentWeather() {

    const container = document.querySelector("#weather-current");

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


// Get three-day weather forecast
async function getWeatherForecast() {

    const container = document.querySelector("#weather-forecast");

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

                // Select the forecast closest to midday
                if (
                    !dailyForecast[dateKey] ||
                    Math.abs(date.getHours() - 12) <
                    Math.abs(
                        new Date(dailyForecast[dateKey].dt * 1000).getHours() - 12
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

        console.error("Forecast error:", error);

    }

}


// =====================================
// MEMBER SPOTLIGHTS
// =====================================

async function getMemberSpotlights() {

    const container = document.querySelector("#spotlights-container");

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member information.");
        }

        const data = await response.json();

        // Support either a direct array or an object containing members
        const members = Array.isArray(data) ? data : data.members;

        if (!Array.isArray(members)) {
            throw new Error("Invalid members JSON structure.");
        }

        // Select Gold and Silver members only
        const qualifiedMembers = members.filter(member => {

            const level = Number(member.membershipLevel ?? member.membership);

            return level === 2 || level === 3;

        });

        // Randomly shuffle members
        const shuffledMembers = qualifiedMembers.sort(
            () => Math.random() - 0.5
        );

        // Randomly select 2 or 3 members
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

        // Display selected members
        container.innerHTML = selectedMembers.map(member => {

            const level = Number(
                member.membershipLevel ?? member.membership
            );

            const membershipName = level === 3 ? "Gold Member" : "Silver Member";

            const image = member.image;

            const imagePath = member.image || `images/members/${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;

            return `

                <article class="spotlight-card">

                    <img
                        src="${imagePath}"
                        alt="${member.name} logo"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='images/members/default.jpg';"
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
                        <a href="${member.website}"
                           target="_blank"
                           rel="noopener noreferrer">
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