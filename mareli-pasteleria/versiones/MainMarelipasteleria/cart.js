let cart = [];
let appliedCoupon = null;
const DISCOUNT_AMOUNT = 0.10; 

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('open');
    if (cartPanel.classList.contains('open')) {
        cartPanel.style.right = '0';
    } else {
        cartPanel.style.right = '-400px';
    }
}

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartBadge();
    updateCartDisplay();
    showNotification('¡Producto agregado al carrito!', 'cart-notification');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    updateCartDisplay();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartBadge();
        updateCartDisplay();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'block' : 'none';
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('cart-subtotal');
    const discountContainer = document.getElementById('discount-container');
    const discountElement = document.getElementById('discount-amount');
    const totalElement = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString()}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})" class="remove-item">×</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    subtotalElement.textContent = `$${subtotal.toLocaleString()}`;
    
    let discount = 0;
    if (appliedCoupon) {
        discount = subtotal * DISCOUNT_AMOUNT;
        discountContainer.style.display = 'flex';
        discountElement.textContent = `-$${discount.toLocaleString()}`;
    } else {
        discountContainer.style.display = 'none';
    }
    
    const total = subtotal - discount;
    totalElement.textContent = `$${total.toLocaleString()}`;
}

function showNotification(message, elementId) {
    const notification = document.getElementById(elementId);
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function applyCoupon() {
    const couponInput = document.getElementById('couponCode');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (couponCode === 'MARELI10') {
        if (appliedCoupon) {
            showNotification('Este cupón ya está aplicado', 'coupon-error-notification');
            return;
        }
        
        appliedCoupon = couponCode;
        updateCartDisplay();
        showNotification('¡Descuento aplicado correctamente!', 'coupon-notification');
        couponInput.value = '';
    } else {
        showNotification('Cupón inválido', 'coupon-error-notification');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'cart-notification');
        return;
    }
    
    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';
    
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nSubtotal: $${subtotal.toLocaleString()}`;
    
    if (appliedCoupon) {
        const discount = subtotal * DISCOUNT_AMOUNT;
        message += `\nDescuento: -$${discount.toLocaleString()}`;
        message += `\nTotal: $${(subtotal - discount).toLocaleString()}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5491131445490?text=${encodedMessage}`, '_blank');
}


document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateCartDisplay();
}); 

