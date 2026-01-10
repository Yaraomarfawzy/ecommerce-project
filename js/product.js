function getValidImage(images) {
  if (!Array.isArray(images)) return null;

  for (let img of images) {
    if (typeof img === "string" && img.startsWith("http")) {
      return img.replace(/"/g, "");
    }
  }

  return null;
}

const defaultImage = "./image/img2/watch-white-surface-18364115.webp";

async function showProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await res.json();

  const container = document.getElementById("products");

  container.innerHTML = data.map(product => {
    const image = getValidImage(product.images) || defaultImage;

    return `
      <div style="border:1px solid #ccc; margin:10px; padding:10px">
        <img 
          src="${image}"
          width="120"
          onerror="this.src='${defaultImage}'"
          alt="${product.title}"
        />
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>${product.description.slice(0, 60)}...</p>
      </div>
    `;
  }).join("");
}

function cleanImage(url) {
  if (!url) return defaultImage;
  return url.replace(/"/g, "");
}

showProducts();

const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('search-input');

async function fetchProducts(query = '') {
  try {
    const url = query 
      ? `https://api.escuelajs.co/api/v1/products/?title=${query}` 
      : 'https://api.escuelajs.co/api/v1/products';
    const res = await fetch(url);
    const data = await res.json();
    displayProducts(data);
  } catch (err) {
    console.error('Error fetching products:', err);
    productsContainer.innerHTML = '<p>حدث خطأ أثناء تحميل المنتجات.</p>';
  }
}

function displayProducts(products) {
  if (!products.length) {
    productsContainer.innerHTML = '<p>لا توجد منتجات لعرضها.</p>';
    return;
  }

  productsContainer.innerHTML = products.map(product => `
    <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img src="${product.images[0] || 'https://i.imgur.com/9LFjwpI.jpeg'}" alt="${product.title}" class="w-full h-48 object-cover mb-4 rounded">
      <h2 class="font-semibold text-lg mb-2">${product.title}</h2>
      <p class="text-gray-700 font-bold">$${product.price}</p>
    </div>
  `).join('');
}

// Initial fetch
fetchProducts();

// Search event
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  fetchProducts(query);
});

const usersContainer = document.getElementById('users');

async function fetchUsers() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/users'); // GET request
    const users = await res.json();
    displayUsers(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    usersContainer.innerHTML = '<p>حدث خطأ أثناء تحميل المستخدمين.</p>';
  }
}



