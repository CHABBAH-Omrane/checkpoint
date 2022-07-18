//DataBase
const products = [
	{
		id: 0,
		name: '2 Person',
		price: 25,
		discription: 'Hiking or Beach',
		imgSrc: '../img/2-person.jpg',
	},
	{
		id: 1,
		name: '8 Person',
		price: 220,
		discription: 'Water Resistant',
		imgSrc: '../img/8-person.jpg',
	},

	{
		id: 2,
		name: 'Coleman-4',
		price: 70,
		discription: 'Pop-up Tent',
		imgSrc: '../img/Coleman-2.jpg',
	},
	{
		id: 3,
		name: 'Coleman-2',
		price: 180,
		discription: ' Skydome -Dark Room ',
		imgSrc: '../img/Coleman-4.jpg',
	},
	{
		id: 4,
		name: 'Instant',
		price: 150,
		discription: 'Setup- in 60 Seconds',
		imgSrc: '../img/Instant .jpg',
	},
	{
		id: 5,
		name: 'Stansport Scout',
		price: 35,
		discription: 'Backpack and Camping',
		imgSrc: '../img/Stansport .jpg',
	},
];

//select element
const productsEl = document.querySelector('.products');
const itemsEl = document.querySelector('.cart-items');
const subTotalEl = document.querySelector('.subtotal');

//Render Products with while

// let index = 0;

// function renderProducts() {
// 	while (index < products.length) {
// 		//console.log(products[index].name);
// 		productsEl.innerHTML += `
// 			<div class="item">
// 					<div class="item-container">

//                         <div class="card" style="width: 18rem; ">
// 						<img src="${products[index].imgSrc}"  style="height:200px;" class="card-img-top" alt="img of product">
// 						<div class="card-body">
//                               <h5 class="card-title">${products[index].name}     ${products[index].price}$</h5>
//                               <p class="card-text"> ${products[index].discription} </p>

//                             </div>
//                           </div>
// 						<div class="add-to-wishlist">
// 							<img src="../icons/bag-plus.png" alt="add to wish list" />
// 						</div>
// 						<div class="add-to-cart" onclick="addToCard(item)">
// 							<img src="../icons/heart.png" alt="add to cart" />
// 						</div>
// 					</div>
// 				</div>`;
// 		index += 1;
// 	}
// }
// renderProducts();

// Add item to Cart

// cart array

function renderProducts() {
	//Render Products with ForEach method
	products.forEach((product) => {
		productsEl.innerHTML += `
			<div class="item">
					<div class="item-container">
                        <div class="card" style="width: 17rem; ">
						<img src="${product.imgSrc}"  style="height:180px;" class="card-img-top" alt="img of product">
						<div class="card-body">
                              <h5 class="card-title">${product.name} $${product.price}</h5>
                              <p class="card-text"> ${product.discription} </p>

                            </div>
                          </div>
						<div class="add-to-cart" >
						<img  src="../icons/heart.png" alt="add " class="heart"/>
						</div>
						<div class="add-to-wishlist" onclick="addToCard(${product.id})"  >
						<img  src="../icons/bag-plus.png" alt="add to wish list" />
						</div>
					</div>
				</div>`;
	});
}
renderProducts();

var hearts = document.querySelectorAll('.heart');
for (let i = 0; i < hearts.length; i++) {
	const heart = hearts[i];
	heart.addEventListener('click', (e) => {
		e.target.classList.toggle('red');
	});
}

let cart = [];

// add to cart
function addToCard(id) {
	// console.log(id);
	if (cart.some((item) => item.id === id)) {
		changeNumberOfUnits('plus', id);
	} else {
		const item = products.find((product) => product.id === id);
		cart.push({
			...item,
			numberOfUnits: 1,
		});
	}
	updateCart();
}

//update cart
function updateCart() {
	renderCartItems();
	renderSubtotal();
}

// calculate and render subtotal
function renderSubtotal() {
	let totalPrice = 0,
		totalItems = 0;

	cart.forEach((item) => {
		totalPrice += item.price * item.numberOfUnits;
		totalItems += item.numberOfUnits;
	});

	subTotalEl.innerHTML = `Price (${totalItems} items): $${totalPrice.toFixed(
		2
	)}`;
}

//render cart items
function renderCartItems() {
	itemsEl.innerHTML = ''; // clear the init elem  in cart
	cart.forEach((item) => {
		itemsEl.innerHTML += `
		<div class="cart-item">
			<div class="item-info"  onclick="removeItemFromCart(${item.id})">
				<img src="${item.imgSrc}" alt="${item.name}" />
				<h6>${item.name}</h6>
			</div>
			<div class="unit-price"><small>$</small>${item.price}</div>
			<div class="units">
				<div class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
				<div class="number">${item.numberOfUnits}</div>
				<div class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
			</div>
		</div>`;
	});
}

//remove item from cart
function removeItemFromCart(id) {
	cart = cart.filter((item) => item.id !== id);

	updateCart();
}

//change number of units for
function changeNumberOfUnits(action, id) {
	cart = cart.map((item) => {
		let numberOfUnits = item.numberOfUnits;

		if (item.id === id) {
			if (action === 'minus' && numberOfUnits > 1) {
				numberOfUnits--;
			} else if (action === 'plus' && numberOfUnits < 5) {
				numberOfUnits++;
			}
		}

		return {
			...item,
			numberOfUnits,
		};
	});
	updateCart();
}

//chnage heart color

// function changeColorHeart(id) {
// 	colorHeart.setAttribute('class', 'red');
// 	container.createElement('src', '../icons/heart.png');
// }

//style= "filter: invert(30%) sepia(100%) saturate(6945%) hue-rotate(1deg) brightness(106%) contrast(111%)"

// onclick=filter: invert(30%) sepia(100%) saturate(6945%) hue-rotate(1deg) brightness(106%) contrast(111%)
