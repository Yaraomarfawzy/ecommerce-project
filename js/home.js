let buttons = document.querySelectorAll('.add');
let counter = document.getElementById('counter');
let products = document.querySelectorAll('.product');
// console.log(buttons);
// console.log(counter);
// console.log(products);

buttons.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        alert('Item added to cart');
        counter.textContent= parseInt(counter.textContent) + 1;


    const productCard = e.target.closest('.product');
    const productName = productCard.querySelector('.product-name').innerText;
    const productPrice = productCard.querySelector('.product-price').innerText;
    const productDescription = productCard.querySelector('.product-desc').innerText;
    const productImage = productCard.querySelector('img').src;
    // console.log(`Added to cart: ${productName} - ${productPrice}`);
    let cart = JSON.parse(localStorage.getItem('cart')) || { products: [] };
     if (!cart.products) {
            cart.products = [];
        }
     cart.products.push({ name: productName, price: productPrice, description: productDescription, quantity: 1, Image: productImage });

         localStorage.setItem('cart', JSON.stringify(cart));
         console.log(cart);
    

    });
});

document.addEventListener('DOMContentLoaded', () => {
    counter.textContent = '0';
    localStorage.removeItem('cart');
});
    