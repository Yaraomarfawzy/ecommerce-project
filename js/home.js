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
        <div class="flex items-center justify-center mt-3">
        <p class="text-white bg-green-500 p-3">item is added in cart</p>
        </div>
    `;
    // div.innerHTML = `
    //   <div class="flex items-center mt-3">
    //     <button class="decrease px-2 py-1 border rounded">−</button>
    //     <span class="quantity mx-3">
    //       ${existingProduct ? existingProduct.quantity : 1}
    //     </span>
    //     <button class="increase px-2 py-1 border rounded">+</button>
    //   </div>
    // `;
    productCard.appendChild(div);
    showToast('Item is added to cart ');
    // let decreaseBtn = div.querySelector('.decrease');
    // let increaseBtn = div.querySelector('.increase');
    // let quantitySpan = div.querySelector('.quantity');
   
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

document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || { products: [] };
  counter.textContent = cart.products.length;
});

    