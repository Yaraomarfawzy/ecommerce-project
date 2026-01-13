const productsContainer = document.getElementById("products");
    const searchInput = document.getElementById("search-input");

    const defaultImage =
      "https://images.pexels.com/photos/13534508/pexels-photo-13534508.jpeg";

    function getValidImage(images) {
      if (!Array.isArray(images)) return null;

      for (let img of images) {
        if (typeof img === "string" && img.startsWith("http")) {
          return img.replace(/"/g, "");
        }
      }
      return null;
    }

    async function fetchProducts(query = "") {
      try {
        const url = query
          ? `https://api.escuelajs.co/api/v1/products/?title=${query}`
          : "https://api.escuelajs.co/api/v1/products";

        const res = await fetch(url);
        const data = await res.json();
        displayProducts(data);
      } catch (error) {
        console.error(error);
        productsContainer.innerHTML =
          "<p class='text-center text-red-500'>حدث خطأ أثناء تحميل المنتجات</p>";
      }
    }

    function displayProducts(products) {
      if (!products.length) {
        productsContainer.innerHTML =
          "<p class='text-center'>لا توجد منتجات</p>";
        return;
      }

      productsContainer.innerHTML = products
        .map((product) => {
          const image = getValidImage(product.images) || defaultImage;

          return `
            <div class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="${image}"
                onerror="this.src='${defaultImage}'"
                alt="${product.title}"
                loading="lazy"
                class="w-full h-48 object-cover rounded mb-4"
              />
              <h2 class="font-semibold text-lg mb-1">${product.title}</h2>
              <p class="text-gray-600 text-sm mb-2">
                ${product.description.slice(0, 60)}...
              </p>
              <p class="font-bold text-indigo-600">$${product.price}</p>
            </div>
          `;
        })
        .join("");
    }

    // Initial Load
    fetchProducts();

    // Search
    searchInput.addEventListener("input", (e) => {
      fetchProducts(e.target.value.trim());
    });



