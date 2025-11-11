// cart.js - robust version for cart.html

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const shippingFeeEl = document.getElementById('shipping-fee');
    const finalTotalEl = document.getElementById('final-total');
    const placeOrderBtn = document.getElementById('place-order-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Normalize image paths coming from different sources
    function normalizeImagePath(path) {
        if (!path || typeof path !== 'string') return '/TrangUser/Pictures/BlankBook.jpg';
        let v = path.trim();
        if (v.startsWith('http')) return v;
        if (v.startsWith('/')) return v; // absolute path already
        // if path includes 'TrangUser' treat as full-ish
        if (v.includes('TrangUser')) return v;
        // strip common prefixes and attach to pictures folder
        v = v.replace(/^img[\\/]/i, '').replace(/^images[\\/]/i, '').trim();
        return '/TrangUser/Pictures/' + v;
    }

    function renderCart() {
        if (!cartItemsList) return;
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
            updateTotals();
            return;
        }

        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            // price normalization
            let priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0);
            if (isNaN(priceVal) || priceVal < 0) priceVal = 0;
            const formattedPrice = priceVal > 0 ? priceVal.toLocaleString('vi-VN') + 'đ' : 'Liên hệ';

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div class="cart-item-img">
                  <img src="${normalizeImagePath(item.image)}" alt="${item.name || ''}" onerror="this.onerror=null;this.src='/TrangUser/Pictures/BlankBook.jpg'">
                </div>
                <div class="cart-item-info">
                    <h3>${item.name || ''}</h3>
                    <p>${formattedPrice}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="item-quantity">
                        <button class="quantity-change" data-id="${item.id}" data-change="-1">-</button>
                        <span>${item.quantity || 1}</span>
                        <button class="quantity-change" data-id="${item.id}" data-change="1">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">Xóa</button>
                </div>
            `;
            cartItemsList.appendChild(div);
        });
        updateTotals();
    }

    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => {
            const priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0) || 0;
            return sum + (priceVal * (item.quantity || 1));
        }, 0);

        const shippingFee = cart.length > 0 ? 30000 : 0;
        const finalTotal = subtotal + shippingFee;

        subtotalEl.textContent = `${subtotal.toLocaleString('vi-VN')}đ`;
        shippingFeeEl.textContent = `${shippingFee.toLocaleString('vi-VN')}đ`;
        finalTotalEl.textContent = `${finalTotal.toLocaleString('vi-VN')}đ`;
    }

    function updateQuantity(productId, change) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = (item.quantity || 1) + change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
            saveCartAndRerender();
        }
    }

    function removeItem(productId) {
        cart = cart.filter(i => i.id !== productId);
        saveCartAndRerender();
    }

    function saveCartAndRerender() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Delegate click events (single listener)
    cartItemsList.addEventListener('click', (e) => {
        const qtyBtn = e.target.closest('.quantity-change');
        if (qtyBtn) {
            const id = qtyBtn.dataset.id;
            const change = parseInt(qtyBtn.dataset.change, 10) || 0;
            updateQuantity(id, change);
            return;
        }
        const remBtn = e.target.closest('.remove-item-btn');
        if (remBtn) {
            removeItem(remBtn.dataset.id);
            return;
        }
    });

    placeOrderBtn && placeOrderBtn.addEventListener('click', () => {
        const name = document.getElementById('customer-name')?.value.trim() || '';
        const phone = document.getElementById('customer-phone')?.value.trim() || '';
        const address = document.getElementById('customer-address')?.value.trim() || '';
        const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';

        if (cart.length === 0) return alert('Giỏ hàng trống!');
        if (!name || !phone || !address) return alert('Vui lòng điền đầy đủ thông tin.');

        const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
        const shippingFee = 30000;
        const total = subtotal + shippingFee;

        const order = {
            orderId: 'order-' + Date.now(),
            customer: { name, phone, address },
            items: cart,
            paymentMethod: payment,
            subtotal,
            shippingFee,
            total,
            status: 'Mới đặt',
            createdAt: new Date().toISOString()
        };

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart after order
        localStorage.removeItem('cart');
        cart = [];

        alert('Đặt hàng thành công!');
        renderCart();
    });

    // Initial render: read cart from localStorage (do NOT remove it here)
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();
});
