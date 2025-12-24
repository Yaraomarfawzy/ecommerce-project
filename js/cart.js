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

let checkoutButton = document.getElementById('checkout');
// let  totalPrice = 0;
let total = document.getElementById('total-items');
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) {
        console.log('cart-items not found');
        return;
    }
    if (cart && cart.products) {
        cart.products.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item', 'mb-4', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md');
            itemDiv.innerHTML = `
                <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
                <span class="text-gray-700 font-bold">${item.price}</span>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total.textContent = cart.products.length;
        });

    }
});
checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout');
   localStorage.removeItem('cart');
    window.location.reload();
});