/** 
Author: Build Rise Shine with Nyros (BRS) 
Created: 2023 
Library / Component: Script file
Description: Type Ahead
(c) Copyright by BRS with Nyros. 
**/

// Get DOM Elements
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// Get the JSON Data from data.json file
const cities = [...data];

// Default theme
let chathams_blue = "#1A4B84";

// Match criteria
// Function to match the input string against the cities and states in the data
const matchInput = (inputString, cities) =>
  cities.filter(
    ({ city, state }) =>
      city.match(new RegExp(inputString, "gi")) || //g- global and i - case insensitive
      state.match(new RegExp(inputString, "gi"))
  );

// Function to format numbers with commas for displaying population
// thousands separators
const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Display results
// Function to display the matched cities and states in the suggestions list
const displayMatches = (el) => {
  const matchArray = matchInput(el.value, cities);

  console.log(matchArray);
  // Generate the HTML for the suggestions list
  const suggestionList = matchArray
    .map((location) => {
      const regex = new RegExp(el.value, "gi");
      
      const cityName = location.city.replace(
        regex,
        `<span class ="hl">${el.value}</span>`
      );
      const stateName = location.state.replace(
        regex,
        `<span class="hl">${el.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(location.population)}</span>
      </li>`;
    })
    .join("");

  // Display the suggestions in the DOM
  suggestions.innerHTML = suggestionList;
};

// Event Listener for search input
searchInput.addEventListener("keyup", (e) => displayMatches(searchInput));

// Set the Theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}

// Set the initial theme to the value stored in local storage or the default 'chathams_blue'
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
