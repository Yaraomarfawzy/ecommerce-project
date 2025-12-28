// document.addEventListener('DOMContentLoaded', () => {
//     let productName = localStorage.getItem('productName');
//     let productPrice = localStorage.getItem('productPrice');
//     console.log(productName, productPrice);

//     let cartItemsContainer = document.getElementById('cart-items');
//     if (!cartItemsContainer) console.log('cart-items not found');

//     if(productName && productPrice && cartItemsContainer){
//         let itemDiv = document.createElement('div');
//         itemDiv.classList.add('cart-item','mb-4','p-4','bg-white','rounded-lg','shadow-md');
//         itemDiv.innerHTML = `
//             <h3 class="text-lg font-semibold mb-2">${productName}</h3>
//             <span class="text-gray-700 font-bold">${productPrice}</span>
//         `;
//         cartItemsContainer.appendChild(itemDiv);
//     }
// });

let checkoutButton = document.getElementById("checkout");
let total = document.getElementById("total-items");

document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartItemsContainer = document.getElementById("cart-items");

  if (!cartItemsContainer) return;

 
  if (!cart || !cart.products || cart.products.length === 0) {
    cartItemsContainer.innerHTML =
      "<p class='text-center text-gray-500'>Your cart is empty.</p>";
    updateTotal({ products: [] });
    updateTotalPrice({ products: [] });
    checkoutButton.style.display = "none";
   let disableCheckout = document.querySelector('.disabled');
   disableCheckout.style.display = 'none';
    return;
  }
  updateTotal(cart);
  updateTotalPrice(cart);

  cart.products.forEach((item) => {
    let itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "cart-item",
      "mb-4",
      "p-4",
      "bg-white",
      "rounded-lg",
      "shadow-md"
    );

    itemDiv.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
      <span class="text-gray-700 font-bold">${item.price} EGP</span>
      <p class="product-description mt-2 text-gray-600">${item.description}</p>
      <img src="${item.image || item.Image || ''}" alt="${item.name}" class="w-24 h-24 object-cover mt-2">

      <div class="flex items-center mt-3">
        <button class="decrease px-2 py-1 border rounded">−</button>
        <span class="quantity mx-3">${item.quantity}</span>
        <button class="increase px-2 py-1 border rounded">+</button>
      </div>

      <button class="remove-item bg-red-500 text-white px-3 py-1 rounded mt-3">
        Remove
      </button>
    `;

    const increaseBtn = itemDiv.querySelector(".increase");
    const decreaseBtn = itemDiv.querySelector(".decrease");
    const quantitySpan = itemDiv.querySelector(".quantity");
    const removeButton = itemDiv.querySelector(".remove-item");

   
    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      quantitySpan.textContent = item.quantity;
      saveCart(cart);
      updateTotal(cart);
      updateTotalPrice(cart);
    });

 
    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantitySpan.textContent = item.quantity;
        saveCart(cart);
        updateTotal(cart);
        updateTotalPrice(cart);
      }
    });

    // 🗑 حذف المنتج
    removeButton.addEventListener("click", () => {
      cart.products = cart.products.filter(
        (prod) => prod.name !== item.name
      );
      saveCart(cart);
      itemDiv.remove();

    
      if (cart.products.length === 0) {
        cartItemsContainer.innerHTML =
          "<p class='text-center text-gray-500'>Your cart is empty.</p>";
        updateTotal({ products: [] });
        updateTotalPrice({ products: [] });
        checkoutButton.style.display = "none";
       let disableCheckout = document.querySelector('.disabled');
       disableCheckout.style.display = 'none';
      } else {
        updateTotal(cart);
        updateTotalPrice(cart);
      }
    });

    cartItemsContainer.appendChild(itemDiv);
  });
});


function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateTotal(cart) {
  let totalCount = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  total.textContent = totalCount;
}


function updateTotalPrice(cart) {
  let totalPrice = cart.products.reduce((sum, item) => {
    let cleanPrice = Number(
      item.price.toString().replace(/[^\d.]/g, "")
    );
    return sum + cleanPrice * item.quantity;
  }, 0);

  document.getElementById("total-price").textContent =
    totalPrice;
}

checkoutButton.addEventListener("click", () => {
  alert("Proceeding to checkout");
  localStorage.removeItem("cart");
  window.location.reload();
});

