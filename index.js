const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};


const addToCart = (product) => {
  const item = findInItemsList(product);
  let cartItem = findInCartList(item);
  const ul = document.querySelector('.cart--item-list');

  // If the product is in the cart, increase the quantity.
  if (cartItem) {
    const li = document.querySelector(`li[data-product="${cartItem.id}"]`);
    updateQuantity(li, cartItem, true);
  }
  // Add product to cart.
  else {
    cartItem = { ...item, quantity: 1 };
    const li = document.createElement('li');
    li.setAttribute('data-product', item.id);
    li.innerHTML = getHtmlTags(cartItem);

    addIncrementAndDecrementListeners(li, cartItem);
    state.cart.push(cartItem);
    ul.appendChild(li);
  }
}

const addIncrementAndDecrementListeners = (li, cartItem) => {
  li.querySelector('.remove-btn').addEventListener('click', () => updateQuantity(li, cartItem, false));
  li.querySelector('.add-btn').addEventListener('click', () => updateQuantity(li, cartItem, true));
}

const updateQuantity = (li, cartItem, increase) => {
  const quantity = li.querySelector('.quantity-text');
  const total = document.querySelector('.total-number');
  if (increase) {
    cartItem.quantity += 1;
    updateTotal(total);
  } 
  else {
    cartItem.quantity -= 1;
    updateTotal(total);
  }

  if (cartItem.quantity === 0) {
    li.remove();
    state.cart = state.cart.filter((item) => item.id !== cartItem.id);
  } 
  else if (quantity) {
    quantity.textContent = cartItem.quantity;
  }
}

const findInItemsList = (product) => state.items.find((item) => item.name === product);
const findInCartList = (item) => state.cart.find((cartItem) => cartItem.id === item.id);

const getHtmlTags = (cartItem) => {
  return ` 
        <img
          class="cart--item-icon"
          src="assets/icons/${cartItem.id}.svg"
          alt="${cartItem.name}"
        />
        <p>${cartItem.name}</p>
        <button class="quantity-btn remove-btn center">-</button>
        <span class="quantity-text center">1</span>
        <button class="quantity-btn add-btn center">+</button>
      `
}

const updateTotal = (total) => {
  const sum = state.cart.reduce((sum, item) => sum += item.price * item.quantity, 0);
  total.textContent = `£${sum.toFixed(2)}`;
}

// Add event listeners to all the products buttons.
state.items.forEach((item) => {
  document.getElementById(item.name).addEventListener('click', () => {
    const total = document.querySelector('.total-number');
    addToCart(item.name);
    updateTotal(total);
  });
});

