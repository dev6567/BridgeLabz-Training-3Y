// Q6: E-Commerce Dashboard - Product Card Fetcher
// Works in Node.js 18+ (console output) and in the browser (console + HTML cards).
// Needs an internet connection to reach the Fake Store API.

const API_URL = "https://fakestoreapi.com/products";

// Fetches the product list using async/await
async function fetchProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    // fetch() only rejects on network errors, so check HTTP errors manually
    throw new Error(`HTTP error ${response.status}`);
  }
  return response.json();
}

// Logs each product in the required format
function logProducts(products) {
  products.forEach((product) => {
    console.log(`Product: ${product.title}`);
    console.log(`Price: $${product.price}`);
    console.log(`Image: ${product.image}`);
    console.log("");
  });
}

// Bonus: builds product cards with document.createElement (browser only)
function renderProductCards(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    card.append(image, title, price);
    container.appendChild(card);
  });
}

async function main() {
  try {
    const products = await fetchProducts();
    logProducts(products);

    // document exists only in the browser
    if (typeof document !== "undefined") {
      renderProductCards(products);
    }
  } catch (error) {
    const message = "Failed to load products. Please try again.";
    console.log(message);
    console.error(error.message);
    if (typeof document !== "undefined") {
      document.getElementById("error").textContent = message;
    }
  }
}

main();
