document.addEventListener('DOMContentLoaded', () => {
    let productName = localStorage.getItem('productName');
    let productPrice = localStorage.getItem('productPrice');
    console.log(productName, productPrice); // لازم يظهر في console

    let cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) console.log('cart-items not found');

    if(productName && productPrice && cartItemsContainer){
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item','mb-4','p-4','bg-white','rounded-lg','shadow-md');
        itemDiv.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">${productName}</h3>
            <span class="text-gray-700 font-bold">${productPrice}</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
    }
});

