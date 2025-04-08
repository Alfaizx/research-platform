// Function to load user-uploaded research articles
function loadUserUploadedResearch() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    // If no user is logged in, do not load user-uploaded research
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve the list of users from localStorage
  const userData = users.find((user) => user.username === currentUser); // Find the current logged-in user

  if (
    userData &&
    userData.uploadedResearch &&
    userData.uploadedResearch.length > 0
  ) {
    const articleList = document.getElementById("articleList"); // Get the <ul> or <ol> element where articles are listed

    // Array of default article titles to avoid duplication
    const defaultTitles = [
      "Study on Digital Transformation",
      "Research Paper on Software Development",
      "The High Tech Entrepreneur",
      "Analysis of Branding Strategies"
    ];

    // Iterate through the user's uploaded research articles
    userData.uploadedResearch.forEach((research) => {
      // Check if the article title is already in the default titles
      if (!defaultTitles.includes(research.title)) {
        const li = document.createElement("li"); // Create a new list item for the article

        const titleContainer = document.createElement("div"); // Create a container for the title
        const title = document.createElement("span"); // Create a span for the title
        title.className = "article-title";
        title.textContent = `${research.title} by ${userData.fullname}`; // Set the title text

        titleContainer.appendChild(title); // Add the title to the container

        const downloadLink = document.createElement("a"); // Create a download link
        downloadLink.href = research.dataURL; // Set the download link's href to the research data URL
        downloadLink.className = "download-link";
        downloadLink.download = `${research.title}.pdf`; // Set the default file name for download
        downloadLink.textContent = "Download"; // Set the link text

        li.appendChild(titleContainer); // Add the title container to the list item
        li.appendChild(downloadLink); // Add the download link to the list item
        articleList.appendChild(li); // Append the list item to the article list
      }
    });
  }
}

// Load user-uploaded research on page load
window.onload = loadUserUploadedResearch; // Ensure the function runs when the page loads

// 🔍 Search Functionality
document.getElementById("searchInput").addEventListener("keyup", function () {
  let input = this.value.trim().toLowerCase(); // Trim to avoid extra spaces
  let articles = document.querySelectorAll(".article-list li");
  let noResultsMessage = document.getElementById("noResults");

  let found = false;
  articles.forEach(article => {
    let title = article.querySelector(".article-title").textContent.toLowerCase();
    if (title.includes(input)) {
      article.style.display = "";
      found = true;
    } else {
      article.style.display = "none";
    }
  });

  noResultsMessage.style.display = found ? "none" : "block";
});

// 🔹 Autocomplete (Search Suggestions)
const searchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("suggestions");

let articleTitles = [];

function updateArticleTitles() {
  articleTitles = Array.from(document.querySelectorAll(".article-title")).map(el => el.textContent);
}

searchInput.addEventListener("input", function () {
  let input = this.value.trim().toLowerCase(); // Trim whitespace
  updateArticleTitles(); // Update with latest articles

  let suggestions = articleTitles.filter(title => title.toLowerCase().includes(input));
  suggestionBox.innerHTML = ""; // Clear previous suggestions

  if (input && suggestions.length > 0) {
    suggestionBox.style.display = "block"; // Show suggestions
    suggestions.forEach(title => {
      let suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";
      suggestionItem.textContent = title;

      // Click to autocomplete
      suggestionItem.addEventListener("click", function () {
        searchInput.value = title.trim(); // Set input value exactly
        suggestionBox.style.display = "none"; // Hide suggestions
        searchInput.dispatchEvent(new Event("keyup")); // Trigger search
      });

      suggestionBox.appendChild(suggestionItem);
    });
  } else {
    suggestionBox.style.display = "none"; // Hide if no suggestions
  }
});

// 🔹 Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
    suggestionBox.style.display = "none"; // Hide suggestions
  }
});

// 🔹 Autocomplete with "Tab" Key
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Tab" && suggestionBox.firstChild) {
    e.preventDefault();
    searchInput.value = suggestionBox.firstChild.textContent.trim(); // Autocomplete
    suggestionBox.style.display = "none"; // Hide suggestions
    searchInput.dispatchEvent(new Event("keyup")); // Trigger search
  }
});

// Logout Functionality
document.getElementById("logoutLink").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior
  localStorage.removeItem("currentUser"); // Remove the current user from localStorage
  window.location.href = "login.html"; // Redirect to the login page
});
