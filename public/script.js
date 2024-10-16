const searchBtn = document.getElementById("searchBtn");
const queryInput = document.getElementById("query");
const newsContainer = document.getElementById("news");

const fetchNews = async (query, pageNo) => {
  try {
    const response = await fetch(`/api/news?query=${query}&pageNo=${pageNo}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

const displayNews = (articles) => {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
            <div class="card">
                <img src="${
                  article.urlToImage || "https://via.placeholder.com/150"
                }" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${
                      article.description || "No description available."
                    }</p>
                    <a href="${
                      article.url
                    }" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            </div>
        `;
    newsContainer.appendChild(col);
  });
};

searchBtn.addEventListener("click", () => {
  const query = queryInput.value.trim();
  if (query) {
    fetchNews(query, 1);
  } else {
    alert("Please enter a search term.");
  }
});
