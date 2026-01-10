let buttons = document.querySelectorAll('.add');
let counter = document.getElementById('counter');

function showToast(message) {
  const toastMessage = document.getElementById('toast-message') || document.getElementById('toast');
  toastMessage.textContent = message;

  toastMessage.classList.remove('opacity-0', 'translate-y-4');
  toastMessage.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toastMessage.classList.add('opacity-0', 'translate-y-4');
    toastMessage.classList.remove('opacity-100', 'translate-y-0');
  }, 2000);
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {

    const productCard = e.target.closest('.product');
    const productName = productCard.querySelector('.product-name').innerText;
    const productPrice = productCard.querySelector('.product-price').innerText;
    const productDescription = productCard.querySelector('.product-desc').innerText;
    const productImage = productCard.querySelector('img').src;
    

    

    let cart = JSON.parse(localStorage.getItem('cart')) || { products: [] };

    let existingProduct = cart.products.find(p => p.name === productName);


    button.style.display = 'none';
    
    let div = document.createElement('div');
    div.classList.add('qty-controls');
   
    div.innerHTML = `
      <div class="flex items-center mt-3">
        <button class="decrease px-2 py-1 border rounded">−</button>
        <span class="quantity mx-3">
          ${existingProduct ? existingProduct.quantity : 1}
        </span>
        <button class="increase px-2 py-1 border rounded">+</button>
      </div>
    `;
    productCard.appendChild(div);
    showToast('Item is added to cart ');
    let decreaseBtn = div.querySelector('.decrease');
    let increaseBtn = div.querySelector('.increase');
    let quantitySpan = div.querySelector('.quantity');
    decreaseBtn.addEventListener('click', () => {
      let currentQuantity = parseInt(quantitySpan.textContent);
      if (currentQuantity > 1) {
        currentQuantity--;
        quantitySpan.textContent = currentQuantity;
        counter.textContent = parseInt(counter.textContent) - 1;
        let productInCart = cart.products.find(p => p.name === productName);
        if (productInCart) {
          productInCart.quantity = currentQuantity;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
    });
    increaseBtn.addEventListener('click', () => {
      let currentQuantity = parseInt(quantitySpan.textContent);
      currentQuantity++;
      quantitySpan.textContent = currentQuantity;
      counter.textContent = parseInt(counter.textContent) + 1;
      let productInCart = cart.products.find(p => p.name === productName);
      if (productInCart) {
        productInCart.quantity = currentQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    });
    if (existingProduct) {
      existingProduct.quantity += 1;
      
    } else {
      cart.products.push({
        name: productName,
        price: productPrice,
        description: productDescription,
        quantity: 1,
        image: productImage
      });
      counter.textContent = parseInt(counter.textContent) + 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  });

  
});
document.addEventListener('DOMContentLoaded', () => { counter.textContent = '0'; localStorage.removeItem('cart'); });

// let shopButton = document.getElementById('shop');
// let watchButton = document.getElementById('watch');
// watchButton.addEventListener('click', () => {
//   =`
// <div class="min-h-screen bg-gray-100 flex items-center justify-center absolute">
//   <h1 class="text-4xl font-bold text-gray-800">Watch Page Coming Soon!</h1>
// </div>
// `;
// });


async function getCategories() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    const categories = await res.json();

    const container = document.getElementById("categories");

    container.innerHTML = categories.map(cat => `
      <div style="border:1px solid #ccc; padding:10px; margin:10px">
        <img src="${cat.image}" alt="${cat.name}" width="150" height="150" />
        <h3>${cat.name}</h3>
        <p>Slug: ${cat.slug}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

getCategories();


const usersContainer = document.getElementById('users');

    async function fetchUsers() {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/users'); // GET request
        const users = await res.json();
        displayUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        usersContainer.innerHTML = '<p class="text-red-500">حدث خطأ أثناء تحميل المستخدمين.</p>';
      }
    }

    function displayUsers(users) {
      if (!users.length) {
        usersContainer.innerHTML = '<p>لا يوجد مستخدمين لعرضهم.</p>';
        return;
      }

      usersContainer.innerHTML = users.map(user => `
        <div class="bg-white p-4 rounded shadow hover:shadow-lg transition text-center">
          <img src="${user.avatar || ''}" alt="${user.name}" class="w-24 h-24 mx-auto rounded-full mb-4 object-cover">
          <h2 class="font-semibold text-lg">${user.name}</h2>
          <p class="text-gray-700">${user.email}</p>
          <p class="text-sm text-gray-500">${user.role}</p>
        </div>
      `).join('');
    }

    // Load users on page load
    fetchUsers();

 const locationsContainer = document.getElementById('locations');

    async function fetchLocations() {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/locations'); // GET request
        const locations = await res.json();
        displayLocations(locations);
      } catch (err) {
        console.error('Error fetching locations:', err);
        locationsContainer.innerHTML = '<p class="text-red-500">حدث خطأ أثناء تحميل المواقع.</p>';
      }
    }

    function displayLocations(locations) {
      if (!locations.length) {
        locationsContainer.innerHTML = '<p>لا توجد مواقع لعرضها.</p>';
        return;
      }

      locationsContainer.innerHTML = locations.map(loc => `
        <div class="bg-white p-4 rounded shadow hover:shadow-lg transition text-center">
          <h2 class="font-semibold text-lg mb-2">${loc.name}</h2>
          <p class="text-gray-700">${loc.description || 'No description available'}</p>
        </div>
      `).join('');
    }
   fetchLocations();