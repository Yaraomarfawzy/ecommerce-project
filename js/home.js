let buttons = document.querySelectorAll('.add');
let counter = document.getElementById('counter');
let products = document.querySelectorAll('.product');
// let arrayproducts = Array.from(products);
let savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
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
    console.log(`Added to cart: ${productName} - ${productPrice}`);
    localStorage.setItem(productName, productPrice);
    

    });
});
