// Get the search input and article list elements
const searchInput = document.getElementById("searchInput");

// Predefined articles (mockup of content)
const articles = [
  {
    title: "Advanced AI Techniques",
    author: "Alfaiz Shaikh",
    file: "Advanced_AI_Techniques.pdf",
  },
  {
    title: "The High Tech Entrepreneur",
    author: "Mark Zuckerberg",
    file: "The_High_Tech_Entrepreneur.pdf",
  },
  {
    title: "Future of Digital Transformation",
    author: "Elon Musk",
    file: "Future_of_Digital_Transformation.pdf",
  },
];

// Function to handle the search logic and redirection
searchInput.addEventListener("keydown", function (event) {
  // Check if Enter key is pressed
  if (event.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      alert("Please enter a search term");
      return;
    }

    let matchedArticle = null;

    // Loop through articles and check if query matches any title or author
    articles.forEach((article) => {
      const combinedText = (article.title + " " + article.author).toLowerCase();
      if (combinedText.includes(query)) {
        matchedArticle = article;
      }
    });

    // If a match is found, redirect to research.html with the article data
    if (matchedArticle) {
      window.location.href = `research.html?title=${encodeURIComponent(
        matchedArticle.title
      )}&author=${encodeURIComponent(
        matchedArticle.author
      )}&file=${encodeURIComponent(matchedArticle.file)}`;
    } else {
      // No match found, redirect with 'not found' message
      window.location.href = `research.html?error=No content found for "${query}"`;
    }
  }
});

// Function to get URL parameters for research.html
function getUrlParams() {
  const params = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach((pair) => {
      const [key, value] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  return params;
}

// Handling URL parameters on research.html (or displaying results)
const params = getUrlParams();
const searchResultDiv = document.getElementById("searchResult");

if (params.error) {
  // If there's an error (no content found)
  searchResultDiv.innerHTML = `<p style="color: red;">${params.error}</p>`;
} else if (params.title && params.author && params.file) {
  // If an article was found, display the result
  searchResultDiv.innerHTML = `
      <h3>${params.title}</h3>
      <p>Author: ${params.author}</p>
      <a href="Articles/${params.file}" download>Download the article</a>
  `;
} else {
  // If no valid search result, or URL tampered with
  searchResultDiv.innerHTML = `<p>No search query provided.</p>`;
}
