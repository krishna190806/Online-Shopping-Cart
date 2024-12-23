const cart = [];

// Function to add a product
function addProduct() {
  const productName = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const quantity = parseInt(document.getElementById('product-quantity').value, 10);

  if (productName && price > 0 && quantity > 0) {
    cart.push({ productName, price, quantity });
    updateCart();
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '';
  } else {
    alert('Please enter valid product details.');
  }
}

// Function to calculate total cost
function calculateTotal() {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Function to remove a product by name
const removeProduct = (name) => {
  const index = cart.findIndex(product => product.productName === name);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
};

// Function to update the cart display
function updateCart() {
  const cartList = document.getElementById('cart');
  const totalCostElement = document.getElementById('total-cost');

  cartList.innerHTML = '';
  cart.forEach(({ productName, price, quantity }) => {
    const listItem = document.createElement('li');
    listItem.className = 'cart-item';
    listItem.innerHTML = `
      <span>Product: ${productName}, Price: ₹${price.toFixed(2)}, Quantity: ${quantity}</span>
      <div class="actions">
        <button onclick="removeProduct('${productName}')">Remove</button>
      </div>
    `;
    cartList.appendChild(listItem);
  });

  const totalCost = calculateTotal();
  totalCostElement.textContent = `Total: ₹${totalCost.toFixed(2)}`;
}

// Event listener for the "Add Product" button
document.getElementById('add-product').addEventListener('click', addProduct);
