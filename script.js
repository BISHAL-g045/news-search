const apik = "4f2a5ab97a0e45679c06288366041fcc";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input"); 
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apik}
        `;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim();
    if(query !== "")
    {
        try {
            const articles = await fetchUsingQuery(query);
            displayBlogs(articles);

        } catch (error) {
            console.log("Error fetching the data by query", error)
        }
    }
})

async function fetchUsingQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apik}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length>30? article.title.slice(0,30) + "....." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDescription = article.description.length>90? article.description.slice(0,90) + "....." : article.description;
        description.textContent = truncatedDescription

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

// Initially display random news
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
