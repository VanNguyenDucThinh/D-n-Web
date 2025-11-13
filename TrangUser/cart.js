// cart.js - robust version for cart.html

// ===== KIỂM TRA ĐĂNG NHẬP NGAY KHI VÀO TRANG =====
(function checkLoginOnPageLoad() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || !currentUser.username) {
    // Chưa đăng nhập - chuyển về trang chủ và hiện form đăng nhập
    alert("Vui lòng đăng nhập để xem giỏ hàng!");
    window.location.href = "Home.html";
  }
})();

// ===== QUẢN LÝ HIỂN THỊ USER INFO =====
function checkUserLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authButtons = document.getElementById("auth-buttons");
  const userInfo = document.getElementById("user-info");

  if (currentUser && currentUser.username) {
    // Đã đăng nhập - Ẩn nút đăng ký/đăng nhập, hiện user info
    if (authButtons) authButtons.style.display = "none";
    if (userInfo) userInfo.style.display = "flex";

    // Hiển thị username
    const usernameDisplay = document.getElementById("username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = currentUser.username;
    }
  } else {
    // Chưa đăng nhập - Hiện nút đăng ký/đăng nhập, ẩn user info
    if (authButtons) authButtons.style.display = "flex";
    if (userInfo) userInfo.style.display = "none";
  }
}

// Xử lý đăng xuất
function handleLogout() {
  const xacNhan = confirm("Bạn có chắc muốn đăng xuất không?");
  if (xacNhan) {
    localStorage.removeItem("currentUser");
    alert("Đăng xuất thành công!");
    window.location.href = "Home.html"; // Quay về trang chủ
  }
}

// Export để dùng trong HTML
window.handleLogout = handleLogout;

// ===== XỬ LÝ ĐỊA CHỈ GIAO HÀNG - 2 OPTIONS =====
function handleAddressTypeChange() {
  const addressType = document.getElementById("address-type").value;
  const currentAddressDisplay = document.getElementById(
    "current-address-display"
  );
  const addressForm = document.getElementById("address-form");

  if (addressType === "current") {
    // Hiện địa chỉ hiện tại, ẩn form
    currentAddressDisplay.style.display = "block";
    addressForm.style.display = "none";

    // Lấy thông tin user từ localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      // Điền thông tin user vào display
      document.getElementById("current-name").textContent =
        currentUser.fullName ||
        currentUser.fullname ||
        currentUser.username ||
        "Chưa cập nhật";
      document.getElementById("current-phone").textContent =
        currentUser.phone || "Chưa cập nhật";
      document.getElementById("current-address-text").textContent =
        currentUser.address || "Chưa cập nhật địa chỉ trong Profile";
    } else {
      // Chưa đăng nhập
      alert(
        "Bạn chưa đăng nhập!\n\nVui lòng đăng nhập hoặc chọn 'Nhập địa chỉ mới'."
      );
      document.getElementById("address-type").value = "new";
      handleAddressTypeChange(); // Gọi lại để chuyển sang form mới
    }
  } else {
    // Hiện form nhập mới, ẩn địa chỉ hiện tại
    currentAddressDisplay.style.display = "none";
    addressForm.style.display = "block";
  }
}

// Export để HTML có thể gọi
window.handleAddressTypeChange = handleAddressTypeChange;

// ===== CẬP NHẬT SỐ ĐẾM GIỎ HÀNG =====
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const cartCountEl = document.getElementById("cart-count");

  if (cartCountEl) {
    if (totalItems > 0) {
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = "flex";
    } else {
      cartCountEl.textContent = "0";
      cartCountEl.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra user login status ngay khi load trang
  checkUserLoginStatus();

  // Cập nhật số đếm giỏ hàng
  updateCartCount();

  // Khởi tạo địa chỉ giao hàng
  handleAddressTypeChange();

  const cartItemsList = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("subtotal");
  const shippingFeeEl = document.getElementById("shipping-fee");
  const finalTotalEl = document.getElementById("final-total");
  const placeOrderBtn = document.getElementById("place-order-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Hàm chuẩn hóa đường dẫn hình ảnh
  function normalizeImagePath(imagePath) {
    if (!imagePath) return "Pictures/default.jpg";

    // Nếu là base64 thì giữ nguyên
    if (imagePath.startsWith("data:image")) {
      return imagePath;
    }

    // Nếu đã có Pictures/ ở đầu thì giữ nguyên
    if (imagePath.startsWith("Pictures/")) {
      return imagePath;
    }

    // Nếu chỉ có tên file, thêm Pictures/
    if (!imagePath.includes("/")) {
      return `Pictures/${imagePath}`;
    }

    // Xử lý các trường hợp khác - lấy tên file và thêm Pictures/
    const fileName = imagePath.split("/").pop();
    return `Pictures/${fileName}`;
  }
  function renderCart() {
    if (!cartItemsList) return;
    if (cart.length === 0) {
      cartItemsList.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
      updateTotals();
      return;
    }

    cartItemsList.innerHTML = "";
    cart.forEach((item) => {
      // price normalization
      let priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0);
      if (isNaN(priceVal) || priceVal < 0) priceVal = 0;
      const formattedPrice =
        priceVal > 0 ? priceVal.toLocaleString("vi-VN") + "đ" : "Liên hệ";

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
                <div class="cart-item-img">
                  <img src="${normalizeImagePath(item.image)}" alt="${
        item.name || ""
      }" onerror="this.onerror=null;this.src='/TrangUser/Pictures/BlankBook.jpg'">
                </div>
                <div class="cart-item-info">
                    <h3>${item.name || ""}</h3>
                    <p>${formattedPrice}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="item-quantity">
                        <button class="quantity-change" data-id="${
                          item.id
                        }" data-change="-1">-</button>
                        <span>${item.quantity || 1}</span>
                        <button class="quantity-change" data-id="${
                          item.id
                        }" data-change="1">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${
                      item.id
                    }">Xóa</button>
                </div>
            `;
      cartItemsList.appendChild(div);
    });
    updateTotals();
  }

  function updateTotals() {
    const subtotal = cart.reduce((sum, item) => {
      const priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0) || 0;
      return sum + priceVal * (item.quantity || 1);
    }, 0);

    const shippingFee = cart.length > 0 ? 15000 : 0;
    const finalTotal = subtotal + shippingFee;

    subtotalEl.textContent = `${subtotal.toLocaleString("vi-VN")}đ`;
    shippingFeeEl.textContent = `${shippingFee.toLocaleString("vi-VN")}đ`;
    finalTotalEl.textContent = `${finalTotal.toLocaleString("vi-VN")}đ`;
  }

  function updateQuantity(productId, change) {
    const item = cart.find((i) => i.id === productId);
    if (item) {
      const newQuantity = (item.quantity || 1) + change;

      // Nếu tăng số lượng, kiểm tra tồn kho
      if (change > 0) {
        // Lấy tồn kho
        const tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];
        const tonKhoItem = tonKho.find((tk) => tk.productId === productId);

        if (tonKhoItem) {
          const soLuongTon = tonKhoItem.soLuongTon || tonKhoItem.quantity || 0;

          if (newQuantity > soLuongTon) {
            alert(
              `Không thể tăng thêm!\n\n` +
                `Sản phẩm "${item.name}" chỉ còn ${soLuongTon} trong kho.\n` +
                `Bạn đã có ${item.quantity} trong giỏ hàng.`
            );
            return; // Không cho tăng
          }
        } else {
          alert(
            `Sản phẩm "${item.name}" không tồn tại trong kho!\n\n` +
              `Vui lòng xóa khỏi giỏ hàng.`
          );
          return;
        }
      }

      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== productId);
      }
      saveCartAndRerender();
    }
  }

  function removeItem(productId) {
    cart = cart.filter((i) => i.id !== productId);
    saveCartAndRerender();
  }

  function saveCartAndRerender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount(); // Cập nhật số đếm
  }

  // Delegate click events (single listener)
  cartItemsList.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest(".quantity-change");
    if (qtyBtn) {
      const id = qtyBtn.dataset.id;
      const change = parseInt(qtyBtn.dataset.change, 10) || 0;
      updateQuantity(id, change);
      return;
    }
    const remBtn = e.target.closest(".remove-item-btn");
    if (remBtn) {
      removeItem(remBtn.dataset.id);
      return;
    }
  });

  placeOrderBtn &&
    placeOrderBtn.addEventListener("click", () => {
      console.log("Nút Đặt hàng được click!");

      // Lấy thông tin địa chỉ
      const addressType = document.getElementById("address-type").value;
      console.log("Loại địa chỉ:", addressType);

      let name, phone, address;

      if (addressType === "current") {
        // Lấy từ địa chỉ hiện tại
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log("Current user:", currentUser);

        if (!currentUser) {
          return alert("Vui lòng đăng nhập hoặc chọn 'Nhập địa chỉ mới'!");
        }
        name = currentUser.fullname || currentUser.username;
        phone = currentUser.phone;
        address = currentUser.address;

        // Kiểm tra thông tin có đầy đủ không
        if (!name || !phone || !address) {
          return alert(
            "Thông tin địa chỉ chưa đầy đủ!\n\nVui lòng cập nhật trong Profile hoặc chọn 'Nhập địa chỉ mới'."
          );
        }
      } else {
        // Lấy từ form nhập mới
        name = document.getElementById("customer-name")?.value.trim() || "";
        phone = document.getElementById("customer-phone")?.value.trim() || "";
        address =
          document.getElementById("customer-address")?.value.trim() || "";

        if (!name || !phone || !address) {
          return alert("Vui lòng điền đầy đủ thông tin!");
        }
      }

      console.log("Thông tin:", { name, phone, address });

      const payment =
        document.querySelector('input[name="payment"]:checked')?.value || "cod";

      if (cart.length === 0) return alert("Giỏ hàng trống!");

      const subtotal = cart.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
        0
      );
      const shippingFee = 15000;
      const total = subtotal + shippingFee;

      // Lấy danh sách đơn hàng hiện có TRƯỚC khi tạo orderId
      const orders = JSON.parse(localStorage.getItem("orders")) || [];

      // Lấy currentUser để thêm username vào đơn hàng
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      const order = {
        orderId: "DH" + String(orders.length + 1).padStart(3, "0"), // DH001, DH002...
        username: currentUser?.username || "", // THÊM USERNAME để filter
        fullname: name, // Tên khách hàng
        phone: phone,
        address: address,
        items: cart, // Danh sách sản phẩm
        paymentMethod: payment,
        subtotal,
        shippingFee,
        total,
        status: "Mới Đặt", // Trạng thái ban đầu
        orderDate: new Date().toISOString().split("T")[0], // yyyy-mm-dd
        createdAt: new Date().toISOString(),
      };

      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      console.log("Đơn hàng đã lưu:", order);
      console.log("Tổng số đơn hàng:", orders.length);

      // KIỂM TRA TỒN KHO trước khi đặt hàng
      const tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];

      console.log("KIỂM TRA TỒN KHO:");
      console.log("  - Tồn kho hiện tại:", tonKho);
      console.log("  - Giỏ hàng:", cart);

      // Kiểm tra từng sản phẩm có đủ hàng không
      for (const cartItem of cart) {
        console.log(
          `  - Kiểm tra sản phẩm: ${cartItem.name} (ID: ${cartItem.id})`
        );

        const tonKhoItem = tonKho.find((tk) => tk.productId === cartItem.id);

        if (!tonKhoItem) {
          alert(
            `Sản phẩm "${cartItem.name}" không tồn tại trong kho!\n\nVui lòng liên hệ admin.`
          );
          console.log(`    KHÔNG tìm thấy trong tồn kho!`);
          return; // Dừng đặt hàng
        }

        // Lấy số lượng tồn từ bất kỳ field nào có sẵn
        const soLuongTon = tonKhoItem.soLuongTon || tonKhoItem.quantity || 0;
        const soLuongMua = cartItem.quantity || 0;

        console.log(`    Tồn kho: ${soLuongTon}, Muốn mua: ${soLuongMua}`);
        console.log(`    tonKhoItem:`, tonKhoItem);

        if (soLuongTon < soLuongMua) {
          alert(
            `Sản phẩm "${cartItem.name}" không đủ hàng!\n\n` +
              `Tồn kho: ${soLuongTon}\n` +
              `Bạn muốn mua: ${soLuongMua}\n\n` +
              `Vui lòng giảm số lượng hoặc chọn sản phẩm khác.`
          );
          console.log(`    KHÔNG ĐỦ HÀNG!`);
          return; // Dừng đặt hàng
        }

        console.log(`    Đủ hàng!`);
      }

      // Nếu tất cả đều OK → TRỪ TỒN KHO
      console.log("\nBẮT ĐẦU TRỪ TỒN KHO:");

      // Lấy products để đồng bộ stock
      const products = JSON.parse(localStorage.getItem("products")) || [];

      cart.forEach((cartItem) => {
        const tonKhoItem = tonKho.find((tk) => tk.productId === cartItem.id);
        const oldQuantity = tonKhoItem.soLuongTon || tonKhoItem.quantity || 0;
        const newQuantity = oldQuantity - (cartItem.quantity || 0);

        // Cập nhật tất cả các field
        tonKhoItem.soLuongTon = newQuantity;
        tonKhoItem.quantity = newQuantity;

        // Đồng bộ sang products.stock
        const product = products.find((p) => p.id === cartItem.id);
        if (product) {
          product.stock = newQuantity;
          console.log(
            `  ${cartItem.name}: ${oldQuantity} - ${cartItem.quantity} = ${newQuantity} (Đã đồng bộ product.stock)`
          );
        } else {
          console.log(
            `  ${cartItem.name}: ${oldQuantity} - ${cartItem.quantity} = ${newQuantity}`
          );
        }
      });

      localStorage.setItem("tonKho", JSON.stringify(tonKho));
      localStorage.setItem("products", JSON.stringify(products));
      console.log("Đã cập nhật tồn kho và products!");

      // Clear cart after order
      localStorage.removeItem("cart");
      cart = [];

      alert("Đặt hàng thành công!");
      renderCart();
      updateCartCount(); // Cập nhật số đếm về 0
    });

  // Initial render: read cart from localStorage (do NOT remove it here)
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();

  // ===== CHỨC NĂNG TÌM KIẾM TRONG GIỎ HÀNG =====
  setupCartSearch();
});

// ===== TÌM KIẾM SẢN PHẨM TRONG GIỎ HÀNG =====
function setupCartSearch() {
  const searchInput = document.querySelector(
    '.SearchBar input[name="SearchItem"]'
  );
  const cartItemsList = document.getElementById("cart-items-list");

  if (!searchInput || !cartItemsList) return;

  let fullCart = JSON.parse(localStorage.getItem("cart")) || []; // Lưu giỏ hàng đầy đủ

  searchInput.addEventListener("input", function (e) {
    const searchText = e.target.value.toLowerCase().trim();

    if (!fullCart || fullCart.length === 0) {
      fullCart = JSON.parse(localStorage.getItem("cart")) || [];
    }

    if (searchText === "") {
      // Hiển thị tất cả sản phẩm
      displayFilteredCart(fullCart);
    } else {
      // Lọc sản phẩm theo tên
      const filtered = fullCart.filter((item) => {
        const itemName = (item.name || "").toLowerCase();
        return itemName.includes(searchText);
      });
      displayFilteredCart(filtered);
    }
  });
}

function displayFilteredCart(items) {
  const cartItemsList = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("subtotal");
  const shippingFeeEl = document.getElementById("shipping-fee");
  const finalTotalEl = document.getElementById("final-total");

  if (!cartItemsList) return;

  function normalizeImagePath(imagePath) {
    if (!imagePath) return "Pictures/default.jpg";
    if (imagePath.startsWith("data:image")) return imagePath;
    if (imagePath.startsWith("Pictures/")) return imagePath;
    if (!imagePath.includes("/")) return `Pictures/${imagePath}`;
    const fileName = imagePath.split("/").pop();
    return `Pictures/${fileName}`;
  }

  if (items.length === 0) {
    cartItemsList.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
    subtotalEl.textContent = "0đ";
    shippingFeeEl.textContent = "0đ";
    finalTotalEl.textContent = "0đ";
    return;
  }

  cartItemsList.innerHTML = "";
  items.forEach((item) => {
    let priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0);
    if (isNaN(priceVal) || priceVal < 0) priceVal = 0;
    const formattedPrice =
      priceVal > 0 ? priceVal.toLocaleString("vi-VN") + "đ" : "Liên hệ";

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${normalizeImagePath(item.image)}" alt="${
      item.name || ""
    }" onerror="this.onerror=null;this.src='Pictures/BlankBook.jpg'">
      </div>
      <div class="cart-item-info">
        <h3>${item.name || ""}</h3>
        <p>${formattedPrice}</p>
      </div>
      <div class="cart-item-actions">
        <div class="item-quantity">
          <button class="quantity-change" data-id="${
            item.id
          }" data-change="-1">-</button>
          <span>${item.quantity || 1}</span>
          <button class="quantity-change" data-id="${
            item.id
          }" data-change="1">+</button>
        </div>
        <button class="remove-item-btn" data-id="${item.id}">Xóa</button>
      </div>
    `;
    cartItemsList.appendChild(div);
  });

  // Tính tổng cho các sản phẩm được hiển thị (nhưng vẫn giữ nguyên tổng thực tế)
  const displaySubtotal = items.reduce((sum, item) => {
    const priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0) || 0;
    return sum + priceVal * (item.quantity || 1);
  }, 0);

  const fullCart = JSON.parse(localStorage.getItem("cart")) || [];
  const actualSubtotal = fullCart.reduce((sum, item) => {
    const priceVal = Number(item.price ?? item.cost ?? item.giaVon ?? 0) || 0;
    return sum + priceVal * (item.quantity || 1);
  }, 0);

  const shippingFee = fullCart.length > 0 ? 15000 : 0;
  const finalTotal = actualSubtotal + shippingFee;

  // Hiển thị tổng thực tế (không thay đổi khi search)
  subtotalEl.textContent = `${actualSubtotal.toLocaleString("vi-VN")}đ`;
  shippingFeeEl.textContent = `${shippingFee.toLocaleString("vi-VN")}đ`;
  finalTotalEl.textContent = `${finalTotal.toLocaleString("vi-VN")}đ`;
}

// ===== TAB SWITCHING =====
function switchTab(tabName) {
  // Hide all tabs
  document.getElementById("cart-tab").classList.remove("active");
  document.getElementById("orders-tab").classList.remove("active");

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  if (tabName === "cart") {
    document.getElementById("cart-tab").classList.add("active");
    document.querySelector('.tab-btn[onclick*="cart"]').classList.add("active");
  } else if (tabName === "orders") {
    document.getElementById("orders-tab").classList.add("active");
    document
      .querySelector('.tab-btn[onclick*="orders"]')
      .classList.add("active");
    renderMyOrders(); // Load orders when tab is opened
  }
}

// Export to global scope
window.switchTab = switchTab;

// ===== ORDER FILTERING =====
let currentFilter = "all";

function filterOrders(status) {
  currentFilter = status;

  // Update active button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`.filter-btn[data-status="${status}"]`)
    .classList.add("active");

  renderMyOrders(status);
}

// Export to global scope
window.filterOrders = filterOrders;

// ===== REFRESH ORDERS =====
function refreshOrders() {
  const btn = event.target;

  // Animation effect
  btn.style.transform = "rotate(360deg)";
  btn.disabled = true;
  btn.textContent = "Đang tải...";

  setTimeout(() => {
    renderMyOrders(currentFilter);
    btn.style.transform = "rotate(0deg)";
    btn.disabled = false;
    btn.textContent = "Làm mới";

    // Show notification
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #2c5f2d;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-size: 1.5rem;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = "Đã cập nhật trạng thái mới nhất!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }, 500);
}

// Export to global scope
window.refreshOrders = refreshOrders;

// ===== RENDER MY ORDERS =====
function renderMyOrders(filterStatus = "all") {
  const ordersList = document.getElementById("orders-list");

  console.log("Debug renderMyOrders:");
  console.log("  - ordersList element:", ordersList);

  if (!ordersList) {
    console.error("KHÔNG TÌM THẤY element #orders-list!");
    return;
  }

  // Get current user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log("  - Current user:", currentUser);
  console.log("  - Filter status:", filterStatus);

  // Lấy tên user (hỗ trợ cả fullName và fullname)
  const userName =
    currentUser?.fullName || currentUser?.fullname || currentUser?.username;

  if (!currentUser || !userName) {
    ordersList.innerHTML = `
      <div class="empty-orders">
        <div class="empty-orders-icon"></div>
        <p>Vui lòng đăng nhập để xem đơn hàng</p>
      </div>
    `;
    return;
  }

  console.log("  - User name:", userName);

  // Get all orders from localStorage
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  console.log("  - Tổng đơn hàng trong localStorage:", allOrders.length);
  console.log("  - Danh sách đơn hàng:", allOrders);

  // Lấy username (ttkien1409) thay vì fullName để filter chính xác
  const filterKey = currentUser?.username || userName;

  console.log("  - Filter by username:", filterKey);

  // Filter orders by current user - SO KHỚP THEO USERNAME
  let myOrders = allOrders.filter((order) => {
    // CHIẾN LƯỢC LỌC ƯU TIÊN:
    // 1. Nếu đơn hàng CÓ username → match theo username
    // 2. Nếu KHÔNG có username → match theo phone
    // 3. Nếu không có cả 2 → match theo fullname (chính xác)

    console.log(`    - Kiểm tra đơn hàng ${order.orderId}:`);
    console.log(`    - order.username: "${order.username}"`);
    console.log(`    - currentUser.username: "${currentUser?.username}"`);
    console.log(`    - order.phone: "${order.phone}"`);
    console.log(`    - currentUser.phone: "${currentUser?.phone}"`);
    console.log(`    - order.fullname: "${order.fullname}"`);
    console.log(`    - userName: "${userName}"`);

    // Cách 1: Match theo username
    if (order.username && currentUser?.username) {
      const match = order.username === currentUser.username;
      console.log(`    Match by USERNAME: ${match}`);
      return match;
    }

    // Cách 2: Match theo phone number
    if (order.phone && currentUser?.phone) {
      const match = order.phone === currentUser.phone;
      console.log(`    Match by PHONE: ${match}`);
      return match;
    }

    // Cách 3: Fallback - match theo fullname (CHÍNH XÁC, không dùng startsWith)
    const orderName = order.fullname || order.customer?.name || "";
    const normalizeText = (text) => text?.toLowerCase().trim() || "";
    const match = normalizeText(orderName) === normalizeText(userName);
    console.log(
      `    Match by FULLNAME: ${match} (${normalizeText(
        orderName
      )} vs ${normalizeText(userName)})`
    );
    return match;
  });

  console.log("  - Đơn hàng của user này:", myOrders.length);
  console.log("  - Chi tiết:", myOrders);

  // Apply status filter
  if (filterStatus !== "all") {
    myOrders = myOrders.filter((order) => order.status === filterStatus);
  }

  // Sort by date (newest first)
  myOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  // Render orders
  if (myOrders.length === 0) {
    const emptyMessage =
      filterStatus === "all"
        ? "Bạn chưa có đơn hàng nào"
        : `Không có đơn hàng "${filterStatus}"`;

    ordersList.innerHTML = `
      <div class="empty-orders">
        <div class="empty-orders-icon"></div>
        <p>${emptyMessage}</p>
      </div>
    `;
    console.log("Hiển thị empty message:", emptyMessage);
    return;
  }

  console.log("Bắt đầu render", myOrders.length, "đơn hàng...");

  const htmlContent = myOrders
    .map((order) => {
      // Chuẩn hóa dữ liệu cho cả 2 format
      const orderId = order.orderId || "N/A";
      const orderDate =
        order.orderDate || order.createdAt?.split("T")[0] || "N/A";
      const status = order.status || "Chưa xác định";
      const items = order.items || [];

      // Lấy địa chỉ và phone từ cả 2 format
      const address =
        order.address || order.customer?.address || "Không có thông tin";
      const phone = order.phone || order.customer?.phone || "N/A";

      const paymentMethod =
        order.paymentMethod === "cod"
          ? "COD"
          : order.paymentMethod === "bank-transfer"
          ? "Chuyển khoản"
          : "N/A";

      const total = order.total || 0;

      return `
    <div class="order-card">
      <div class="order-header">
        <div>
          <div class="order-id">${orderId}</div>
          <div class="order-date">Ngày đặt: ${formatOrderDate(orderDate)}</div>
        </div>
        <div class="order-status ${getStatusClass(status)}">
          ${status}
        </div>
      </div>

      <div class="order-items">
        ${renderOrderItems(items)}
      </div>

      <div class="order-address">
        <strong>Địa chỉ giao hàng:</strong>
        ${address}
        <br>
        <strong>SĐT:</strong> ${phone}
      </div>

      <div class="order-footer">
        <div>
          <strong>Phương thức thanh toán:</strong> ${paymentMethod}
        </div>
        <div class="order-total">
          Tổng: ${total.toLocaleString("vi-VN")}đ
        </div>
      </div>
    </div>
  `;
    })
    .join("");

  console.log("HTML content length:", htmlContent.length);
  console.log("Preview:", htmlContent.substring(0, 200));

  ordersList.innerHTML = htmlContent;

  console.log("Đã render xong vào ordersList!");
}

// Helper: Normalize image path (global scope)
function normalizeImagePath(imagePath) {
  if (!imagePath) return "Pictures/BlankBook.jpg";

  // Nếu là base64 thì giữ nguyên
  if (imagePath.startsWith("data:image")) {
    return imagePath;
  }

  // Nếu đã có Pictures/ ở đầu thì giữ nguyên
  if (imagePath.startsWith("Pictures/")) {
    return imagePath;
  }

  // Thêm Pictures/ vào đầu
  return "Pictures/" + imagePath;
}

// Helper: Render order items
function renderOrderItems(items) {
  if (!items || items.length === 0) {
    return '<p style="color: #999;">Không có sản phẩm</p>';
  }

  return items
    .map(
      (item) => `
    <div class="order-item">
      <img src="${normalizeImagePath(
        item.image || "Pictures/BlankBook.jpg"
      )}" alt="${item.name || "N/A"}" class="order-item-img" 
           onerror="this.src='Pictures/BlankBook.jpg'">
      <div class="order-item-info">
        <div class="order-item-name">${item.name || "N/A"}</div>
        <div class="order-item-details">
          Số lượng: ${item.quantity || 1} × ${(item.price || 0).toLocaleString(
        "vi-VN"
      )}đ
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Helper: Get status CSS class
function getStatusClass(status) {
  const statusMap = {
    "Mới Đặt": "status-new",
    "Đang xử lý": "status-processing",
    "Đang giao": "status-shipping",
    "Đã giao": "status-delivered",
  };
  return statusMap[status] || "";
}

// Helper: Format date
function formatOrderDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return as-is if invalid

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
