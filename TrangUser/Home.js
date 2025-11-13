// home.js - cleaned & robust version

// --- Modal close when clicking backdrop & safe helpers ---
function safeQuery(selector) {
  return document.querySelector(selector);
}

// ===== HELPER FUNCTIONS CHO VALIDATION =====
// Hàm hiển thị lỗi bằng viền đỏ + text thông báo (thay vì alert)
function hienThiLoi(inputElement, thongBaoLoi) {
  // Bước 1: Xóa lỗi cũ (nếu có)
  xoaLoi(inputElement);

  // Bước 2: Thêm class viền đỏ cho input
  inputElement.classList.add("input-error");

  // Bước 3: Tạo thẻ span chứa text lỗi
  const errorSpan = document.createElement("span");
  errorSpan.className = "error-text shake";
  errorSpan.textContent = thongBaoLoi;

  // Bước 4: Chèn error text ngay sau input
  inputElement.parentNode.appendChild(errorSpan);

  // Bước 5: Focus vào input bị lỗi để người dùng sửa
  inputElement.focus();
}

// Hàm xóa lỗi khi người dùng bắt đầu sửa
function xoaLoi(inputElement) {
  // Xóa class viền đỏ
  inputElement.classList.remove("input-error");

  // Tìm và xóa error text (nếu có)
  const errorText = inputElement.parentNode.querySelector(".error-text");
  if (errorText) {
    errorText.remove();
  }
}

// Hàm xóa tất cả lỗi trong form
function xoaTatCaLoi(formElement) {
  const allInputs = formElement.querySelectorAll("input, select, textarea");
  allInputs.forEach((input) => xoaLoi(input));
}

document.addEventListener("DOMContentLoaded", () => {
  // Modal backdrop close
  const DongLogin = document.getElementById("DonDangNhap");
  const DongDangKy = document.getElementById("DonDangKy");
  const DonChinhSua = document.getElementById("DonChinhSua");

  window.onclick = function (click) {
    if (click.target === DongLogin) DongLogin.style.display = "none";
    if (click.target === DongDangKy) DongDangKy.style.display = "none";
    if (click.target === DonChinhSua) DonChinhSua.style.display = "none";
  };

  // Init features after DOM ready
  initCarousel();
  loadProductsFromLocalStorage();
  renderCategoryMenu(); // Load menu thể loại từ localStorage
  renderProducts();
  renderPagination();
  setupAddToCartHandler();
  setupAuthForms();
  setupSearchFunction(); // Thêm chức năng tìm kiếm
  setupAdvancedSearch(); // Thêm chức năng tìm kiếm nâng cao

  // Kiểm tra và hiển thị user info nếu đã đăng nhập
  checkUserLoginStatus();

  // Cập nhật số đếm giỏ hàng
  updateCartCount();
});

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

// --- Carousel ---
let images = ["Pictures/Book1.jpg", "Pictures/Book4.jpg", "Pictures/Book3.jpg"];
let current = 0;
let intervalId = null;

function initCarousel() {
  const imgAdvertise = safeQuery(".QuangCao img");
  const radioButtons = Array.from(
    document.querySelectorAll(".rdoQuangCao input")
  );
  if (!imgAdvertise) return;

  images = images.map((s) => (s || "").trim()).filter(Boolean);
  if (images.length === 0) images = ["Pictures/BlankBook.jpg"];

  function updateUI() {
    imgAdvertise.src = images[current] || "Pictures/BlankBook.jpg";
    radioButtons.forEach((r, i) => {
      if (r) r.checked = i === current;
    });
  }
  function nextImg() {
    current = (current + 1) % images.length;
    updateUI();
  }
  function prevImg() {
    current = (current - 1 + images.length) % images.length;
    updateUI();
  }
  window.nextImg = nextImg;
  window.prevImg = prevImg;
  window.showImg = (index) => {
    if (typeof index === "number" && index >= 0 && index < images.length) {
      current = index;
      updateUI();
      resetAutoSlide();
    }
  };

  function autoSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(nextImg, 3000);
  }
  function resetAutoSlide() {
    autoSlide();
  }

  updateUI();
  autoSlide();

  radioButtons.forEach((r, i) => {
    if (!r) return;
    r.addEventListener("click", () => showImg(i));
  });
}

// --- Products listing / pagination ---
const productsPerPage = 6;
let currentPage = 1;
let allProducts = [];
let filteredProducts = []; // Danh sách sản phẩm sau khi lọc
let currentCategory = "all"; // Category hiện tại

function loadProductsFromLocalStorage() {
  allProducts = JSON.parse(localStorage.getItem("products")) || [];
  filteredProducts = [...allProducts]; // Ban đầu hiển thị tất cả
}

// ===== HÀM LẤY ĐƯỜNG DẪN HÌNH ẢNH SẢN PHẨM =====
// Normalize image path - sử dụng đường dẫn tương đối để hiển thị đúng
function getImageForProduct(product) {
  if (!product) return "Pictures/BlankBook.jpg";

  const keys = ["image", "source", "img", "picture", "src"];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(product, k)) {
      const v = product[k];
      if (typeof v === "string" && v.trim() !== "") {
        const t = v.trim();

        // Nếu đã là URL đầy đủ (http/https) thì giữ nguyên
        if (t.startsWith("http")) return t;

        // Nếu là base64 image (từ file upload) thì giữ nguyên
        if (t.startsWith("data:image")) return t;

        // Nếu đã có Pictures trong path thì chỉ lấy từ Pictures trở đi
        if (t.includes("Pictures/")) {
          const index = t.indexOf("Pictures/");
          return t.substring(index);
        }

        // Nếu có TrangUser trong path, bỏ phần TrangUser đi
        if (t.includes("TrangUser")) {
          return t.replace(/.*TrangUser[\/\\]/, "");
        }

        // Xóa các prefix folder (img/, images/) và thêm Pictures/
        const cleanPath = t
          .replace(/^[\/\\]/, "") // Bỏ / hoặc \ ở đầu
          .replace(/^img[\/\\]/i, "") // Bỏ img/
          .replace(/^images[\/\\]/i, "") // Bỏ images/
          .trim();

        return "Pictures/" + cleanPath;
      }
    }
  }
  return "Pictures/BlankBook.jpg";
}

function getPriceNumber(product) {
  if (!product) return null;

  // Lấy giá bán từ localStorage
  const giaBan = JSON.parse(localStorage.getItem("giaBan")) || [];
  const priceInfo = giaBan.find((item) => item.id === product.id);

  if (priceInfo && priceInfo.giaBan) {
    return priceInfo.giaBan;
  }

  // Fallback: tìm trong chính object product
  const keys = ["giaBan", "cost", "price", "gia", "giaVon"];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(product, k)) {
      const raw = product[k];
      if (raw === null || raw === undefined || raw === "") continue;
      const n = Number(raw);
      if (!Number.isNaN(n)) return n;
    }
  }
  return null;
}

function renderProducts() {
  const productContainer = document.querySelector(".content");
  if (!productContainer) return;

  let productGrid = productContainer.querySelector(".product-grid");
  if (!productGrid) {
    productGrid = document.createElement("div");
    productGrid.classList.add("product-grid");
    const paginationDiv = productContainer.querySelector(".pagination");
    if (paginationDiv)
      productContainer.insertBefore(productGrid, paginationDiv);
    else productContainer.appendChild(productGrid);
  }

  const startIndex = (currentPage - 1) * productsPerPage;

  // Sử dụng filteredProducts thay vì allProducts
  const productsToRender = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  productGrid.innerHTML = "";
  if (productsToRender.length === 0) {
    productGrid.innerHTML =
      '<p style="text-align:center;width:100%;padding:40px;font-size:18px;color:#666;">📚 Không có sản phẩm nào trong danh mục này.</p>';
    return;
  }

  productsToRender.forEach((product) => {
    const imageUrl = getImageForProduct(product);
    const priceNum = getPriceNumber(product);
    let priceText =
      priceNum === null
        ? "Liên hệ"
        : priceNum === 0
        ? "0đ"
        : priceNum.toLocaleString("vi-VN") + "đ";

    const div = document.createElement("div");
    div.classList.add("product");
    div.dataset.id = product.id ?? "";
    div.innerHTML = `
      <div><img src="${imageUrl}" alt="${
      product.name || "Sản phẩm"
    }" onerror="this.onerror=null;this.src='Pictures/BlankBook.jpg'"></div>
      <div class="product-name">${product.name || ""}</div>
      <div class="product-price">${priceText}</div>
      <div class="product-type">${product.type || ""}</div>
      <div><button class="btn-add-cart">Thêm vào giỏ hàng</button></div>
    `;
    productGrid.appendChild(div);
  });
  // pagination buttons remain active when renderProducts runs
}

// ===== PAGINATION CẢI TIẾN =====
// Tạo pagination với nút << (trang đầu), < (trước), số trang, > (sau), >> (trang cuối)
function renderPagination() {
  const paginationContainer = document.querySelector(".pagination");
  if (!paginationContainer) return;

  // Xóa pagination cũ
  paginationContainer.innerHTML = "";

  // Tính tổng số trang - sử dụng filteredProducts
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  // Nếu chỉ có 1 trang thì không cần pagination
  if (totalPages <= 1) return;

  // ===== NÚT TRANG ĐẦU (<<) =====
  const firstBtn = document.createElement("button");
  firstBtn.innerHTML = "&laquo;&laquo;"; // << ký tự đặc biệt
  firstBtn.title = "Trang đầu";
  firstBtn.disabled = currentPage === 1; // Disable nếu đang ở trang 1
  firstBtn.addEventListener("click", () => {
    if (currentPage !== 1) {
      currentPage = 1;
      renderProducts();
      renderPagination();
    }
  });
  paginationContainer.appendChild(firstBtn);

  // ===== NÚT TRANG TRƯỚC (<) =====
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "&laquo;"; // < ký tự đặc biệt
  prevBtn.title = "Trang trước";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPagination();
    }
  });
  paginationContainer.appendChild(prevBtn);

  // ===== CÁC NÚT SỐ TRANG =====
  // Hiển thị tối đa 5 trang xung quanh trang hiện tại để không quá dài
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Đảm bảo luôn hiển thị 5 trang (nếu có đủ)
  if (endPage - startPage < 4) {
    if (currentPage < 3) {
      endPage = Math.min(totalPages, 5);
    } else {
      startPage = Math.max(1, totalPages - 4);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pbtn = document.createElement("button");
    pbtn.innerText = i;

    // Highlight trang hiện tại
    if (i === currentPage) {
      pbtn.classList.add("active");
    }

    pbtn.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
      renderPagination();
    });
    paginationContainer.appendChild(pbtn);
  }

  // ===== NÚT TRANG SAU (>) =====
  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "&raquo;"; // > ký tự đặc biệt
  nextBtn.title = "Trang sau";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      renderPagination();
    }
  });
  paginationContainer.appendChild(nextBtn);

  // ===== NÚT TRANG CUỐI (>>) =====
  const lastBtn = document.createElement("button");
  lastBtn.innerHTML = "&raquo;&raquo;"; // >> ký tự đặc biệt
  lastBtn.title = "Trang cuối";
  lastBtn.disabled = currentPage === totalPages;
  lastBtn.addEventListener("click", () => {
    if (currentPage !== totalPages) {
      currentPage = totalPages;
      renderProducts();
      renderPagination();
    }
  });
  paginationContainer.appendChild(lastBtn);
}

// ===== THÊM VÀO GIỎ HÀNG VỚI KIỂM TRA TỒN KHO =====
function setupAddToCartHandler() {
  const productContainer = document.querySelector(".content");
  if (!productContainer) return;

  // Remove old handler if set (saved on element)
  if (productContainer._addToCartHandler)
    productContainer.removeEventListener(
      "click",
      productContainer._addToCartHandler
    );

  function onClick(e) {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;
    const productEl = btn.closest(".product");
    if (!productEl) return;
    const id = productEl.dataset.id;
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    // Bước 1: Kiểm tra đăng nhập trước khi thêm vào giỏ hàng
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      document.getElementById("DonDangNhap").style.display = "block";
      return;
    }

    // Bước 2: Kiểm tra tồn kho (stock)
    const tonKhoHienTai = product.stock || 0;

    // Lấy giỏ hàng hiện tại để kiểm tra số lượng đã có
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i.id === id);
    const soLuongDaCo = existing ? existing.quantity || 0 : 0;

    // Kiểm tra nếu hết hàng
    if (tonKhoHienTai <= 0) {
      alert(
        `Rất tiếc! "${
          product.name || "Sản phẩm"
        }" hiện đã HẾT HÀNG.\n\nVui lòng quay lại sau! 🙏`
      );
      return;
    }

    // Kiểm tra nếu số lượng trong giỏ đã đạt giới hạn tồn kho
    if (soLuongDaCo >= tonKhoHienTai) {
      alert(
        `Không thể thêm nữa!\n\nBạn đã có ${soLuongDaCo} sản phẩm trong giỏ.\nTồn kho chỉ còn: ${tonKhoHienTai} sản phẩm.`
      );
      return;
    }

    // Cảnh báo nếu sắp hết hàng (còn ít hơn 5 sản phẩm)
    if (tonKhoHienTai <= 5 && tonKhoHienTai > 0) {
      const xacNhan = confirm(
        `SẮP HẾT HÀNG!\n\n` +
          `"${
            product.name || "Sản phẩm"
          }" chỉ còn ${tonKhoHienTai} sản phẩm.\n\n` +
          `Bạn có muốn thêm vào giỏ hàng không?`
      );
      if (!xacNhan) return;
    }

    // Bước 3: Thêm vào giỏ hàng
    const price = getPriceNumber(product) ?? 0;
    const image = getImageForProduct(product) ?? "Pictures/BlankBook.jpg";

    if (existing) {
      existing.quantity = soLuongDaCo + 1;
    } else {
      cart.push({
        id,
        name: product.name || "Sản phẩm",
        price,
        image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `Đã thêm "${
        product.name || "Sản phẩm"
      }" vào giỏ hàng!\n\nSố lượng trong giỏ: ${soLuongDaCo + 1}`
    );

    // Cập nhật số đếm giỏ hàng
    updateCartCount();
  }

  productContainer._addToCartHandler = onClick;
  productContainer.addEventListener("click", onClick);
}

// --- Auth forms setup (kept same behaviour) ---
function setupAuthForms() {
  const registrationForm = document.querySelector("#DonDangKy .formdangky");
  const loginForm = document.querySelector("#DonDangNhap .formdangnhap");

  if (registrationForm) {
    // Xóa lỗi khi người dùng bắt đầu gõ vào input
    const allInputs = registrationForm.querySelectorAll("input");
    allInputs.forEach((input) => {
      input.addEventListener("input", () => xoaLoi(input));
    });

    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Xóa tất cả lỗi cũ trước khi kiểm tra lại
      xoaTatCaLoi(registrationForm);

      // Lấy tất cả input elements
      const inputFullName =
        registrationForm.querySelector('[name="TenDangKy"]');
      const inputEmail = registrationForm.querySelector('[name="EmailDangKy"]');
      const inputPhone = registrationForm.querySelector('[name="SDT_DangKy"]');
      const inputAddress = registrationForm.querySelector(
        '[name="DiaChiDangKy"]'
      );
      const inputUsername = registrationForm.querySelector(
        '[name="UserDangKy"]'
      );
      const inputPassword = registrationForm.querySelector(
        '[name="PassDangKy"]'
      );
      const inputBirthDate = registrationForm.querySelector(
        '[name="NgaySinhDangKy"]'
      );

      // Lấy giá trị từ form - rõ ràng và dễ hiểu
      const fullName = inputFullName.value.trim();
      const gender = registrationForm.querySelector(
        '[name="GenderDangKy"]:checked'
      )?.value;
      const email = inputEmail.value.trim();
      const phone = inputPhone.value.trim();
      const address = inputAddress.value.trim();
      const username = inputUsername.value.trim();
      const password = inputPassword.value;
      const birthDate = inputBirthDate.value;

      // Bước 1: Kiểm tra đầy đủ thông tin
      if (!fullName) {
        hienThiLoi(inputFullName, "Vui lòng nhập họ tên đầy đủ!");
        return;
      }
      if (!email) {
        hienThiLoi(inputEmail, "Vui lòng nhập email!");
        return;
      }
      if (!phone) {
        hienThiLoi(inputPhone, "Vui lòng nhập số điện thoại!");
        return;
      }
      if (!address) {
        hienThiLoi(inputAddress, "Vui lòng nhập địa chỉ!");
        return;
      }
      if (!username) {
        hienThiLoi(inputUsername, "Vui lòng nhập tên đăng nhập!");
        return;
      }
      if (!password) {
        hienThiLoi(inputPassword, "Vui lòng nhập mật khẩu!");
        return;
      }
      if (!birthDate) {
        hienThiLoi(inputBirthDate, "Vui lòng chọn ngày sinh!");
        return;
      }
      if (!gender) {
        alert("Vui lòng chọn giới tính!");
        return;
      }

      // Bước 2: Kiểm tra email phải có @gmail.com ĐẦY ĐỦ
      // Không chấp nhận @gmail, @gmailcom hay các domain khác
      if (
        !email.endsWith("@gmail.com") ||
        email.indexOf("@gmail.com") !== email.lastIndexOf("@")
      ) {
        hienThiLoi(
          inputEmail,
          "Email phải là @gmail.com đầy đủ! (VD: abc@gmail.com)"
        );
        return;
      }

      // Bước 3: Kiểm tra mật khẩu có ký tự đặc biệt
      // Yêu cầu: tối thiểu 6 ký tự, phải có ít nhất 1 ký tự đặc biệt
      const kyTuDacBiet = /[!@#$%^&*(),.?":{}|<>]/;
      if (password.length < 6) {
        hienThiLoi(inputPassword, "Mật khẩu phải có ít nhất 6 ký tự!");
        return;
      }
      if (!kyTuDacBiet.test(password)) {
        hienThiLoi(
          inputPassword,
          "Mật khẩu phải có ký tự đặc biệt (! @ # $ % ...)"
        );
        return;
      }

      // Bước 4: Kiểm tra username đã tồn tại chưa
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userDaTonTai = users.some((user) => user.username === username);
      if (userDaTonTai) {
        hienThiLoi(
          inputUsername,
          'Tên "' + username + '" đã có người dùng!'
        );
        return;
      }

      // Bước 5: Tạo tài khoản mới và lưu vào localStorage
      const newUser = {
        username,
        password,
        fullName,
        email,
        phone,
        address,
        gender,
        birthDate,
        trangThai: "Hoạt động", // Mặc định trạng thái hoạt động khi đăng ký
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Thông báo thành công và reset form
      alert("Đăng ký thành công!\nChào mừng " + fullName + "!");
      document.getElementById("DonDangKy").style.display = "none";
      registrationForm.reset();

      // Tự động mở form đăng nhập
      document.getElementById("DonDangNhap").style.display = "block";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = loginForm.querySelector('[name="TenDangNhap"]').value;
      const password = loginForm.querySelector(
        '[name="MatKhauDangNhap"]'
      ).value;
      const rememberMe = loginForm.querySelector('[name="Remember"]').checked;

      if (!username || !password) {
        alert("Vui lòng nhập tên đăng nhập và mật khẩu.");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        // KIỂM TRA TRẠNG THÁI TÀI KHOẢN
        if (
          foundUser.trangThai === "Khóa" ||
          foundUser.trangThai === "Bị khóa"
        ) {
          alert(
            `TÀI KHOẢN ĐÃ BỊ KHÓA!\n\n` +
              `Tài khoản "${foundUser.username}" đã bị quản trị viên khóa.\n` +
              `Vui lòng liên hệ admin để được hỗ trợ.`
          );
          return;
        }

        alert(
          `Đăng nhập thành công! Chào mừng ${
            foundUser.fullName || foundUser.username
          }.`
        );

        const userInfo = {
          username: foundUser.username,
          fullName: foundUser.fullName,
          email: foundUser.email,
          phone: foundUser.phone,
          gender: foundUser.gender,
          birthDate: foundUser.birthDate,
          address: foundUser.address,
        };

        // Lưu thông tin user
        localStorage.setItem("currentUser", JSON.stringify(userInfo));

        // Nếu chọn Remember me, lưu thông tin đăng nhập
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", username);
          localStorage.setItem("rememberedPassword", password);
        } else {
          // Xóa thông tin đã lưu nếu không chọn Remember me
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
        }

        document.getElementById("DonDangNhap").style.display = "none";
        loginForm.reset();

        // Cập nhật hiển thị user info
        checkUserLoginStatus();
      } else alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    });

    // Tự động điền thông tin đăng nhập nếu đã Remember me
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedUsername && rememberedPassword) {
      loginForm.querySelector('[name="TenDangNhap"]').value =
        rememberedUsername;
      loginForm.querySelector('[name="MatKhauDangNhap"]').value =
        rememberedPassword;
      loginForm.querySelector('[name="Remember"]').checked = true;
    }
  }
}

// ===== QUẢN LÝ HIỂN THỊ USER INFO SAU KHI ĐĂNG NHẬP =====
function checkUserLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authButtons = document.getElementById("auth-buttons");
  const userInfo = document.getElementById("user-info");

  if (currentUser && currentUser.username) {
    // Đã đăng nhập - Ẩn nút đăng ký/đăng nhập, hiện user info
    authButtons.style.display = "none";
    userInfo.style.display = "flex";

    // Hiển thị username
    document.getElementById("username-display").textContent =
      currentUser.username;

    // Cập nhật dropdown info
    updateUserDropdown(currentUser);
  } else {
    // Chưa đăng nhập - Hiện nút đăng ký/đăng nhập, ẩn user info
    authButtons.style.display = "flex";
    userInfo.style.display = "none";
  }
}

function updateUserDropdown(user) {
  document.getElementById("dropdown-username").textContent = user.username;
  document.getElementById("dropdown-fullname").textContent =
    user.fullName || "Chưa cập nhật";
  document.getElementById("dropdown-email").textContent =
    user.email || "Chưa cập nhật";
  document.getElementById("dropdown-phone").textContent =
    user.phone || "Chưa cập nhật";
  document.getElementById("dropdown-gender").textContent =
    user.gender || "Chưa cập nhật";
  document.getElementById("dropdown-birthdate").textContent =
    user.birthDate || "Chưa cập nhật";
}

// Toggle dropdown menu khi click vào avatar
function toggleUserMenu() {
  const dropdown = document.getElementById("user-dropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// Đóng dropdown khi click ra ngoài
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("user-dropdown");
  const avatar = document.querySelector(".user-avatar");

  if (
    dropdown &&
    avatar &&
    !avatar.contains(e.target) &&
    !dropdown.contains(e.target)
  ) {
    dropdown.style.display = "none";
  }
});

// Xử lý đăng xuất
function handleLogout() {
  const xacNhan = confirm("Bạn có chắc muốn đăng xuất không?");
  if (xacNhan) {
    localStorage.removeItem("currentUser");
    // Không xóa rememberedUsername và rememberedPassword để giữ Remember me
    alert("Đăng xuất thành công!");
    checkUserLoginStatus();

    // Đóng dropdown nếu đang mở
    document.getElementById("user-dropdown").style.display = "none";
  }
}

// Mở form chỉnh sửa thông tin
function openEditProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Vui lòng đăng nhập!");
    return;
  }

  // Đóng dropdown
  document.getElementById("user-dropdown").style.display = "none";

  // Điền thông tin vào form
  document.getElementById("TenEdit").value = currentUser.fullName || "";
  document.getElementById("EmailEdit").value = currentUser.email || "";
  document.getElementById("SDT_Edit").value = currentUser.phone || "";
  document.getElementById("NgaySinhEdit").value = currentUser.birthDate || "";
  document.getElementById("DiaChiEdit").value = currentUser.address || "";

  // Reset các ô mật khẩu (để trống khi mở form)
  document.getElementById("MatKhauCuEdit").value = "";
  document.getElementById("MatKhauMoiEdit").value = "";
  document.getElementById("XacNhanMatKhauEdit").value = "";

  // Set gender radio
  if (currentUser.gender === "Nam") {
    document.getElementById("GenderNam").checked = true;
  } else if (currentUser.gender === "Nữ") {
    document.getElementById("GenderNu").checked = true;
  }

  // Hiển thị modal
  document.getElementById("DonChinhSua").style.display = "block";
}

// Xử lý submit form chỉnh sửa
document.addEventListener("DOMContentLoaded", () => {
  const formChinhSua = document.getElementById("formChinhSua");
  if (formChinhSua) {
    formChinhSua.addEventListener("submit", (e) => {
      e.preventDefault();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Lỗi: Không tìm thấy thông tin người dùng!");
        return;
      }

      // Lấy thông tin mới từ form
      const fullName = document.getElementById("TenEdit").value.trim();
      const email = document.getElementById("EmailEdit").value.trim();
      const phone = document.getElementById("SDT_Edit").value.trim();
      const birthDate = document.getElementById("NgaySinhEdit").value;
      const address = document.getElementById("DiaChiEdit").value.trim();
      const gender = document.querySelector(
        'input[name="GenderEdit"]:checked'
      )?.value;

      // Validation
      if (!fullName || !email || !phone || !birthDate || !gender) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      // Kiểm tra email @gmail.com
      if (!email.endsWith("@gmail.com")) {
        alert("Email phải là @gmail.com!");
        return;
      }

      // ===== XỬ LÝ ĐỔI MẬT KHẨU =====
      const oldPassword = document.getElementById("MatKhauCuEdit").value.trim();
      const newPassword = document
        .getElementById("MatKhauMoiEdit")
        .value.trim();
      const confirmPassword = document
        .getElementById("XacNhanMatKhauEdit")
        .value.trim();

      // Cập nhật vào danh sách users
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(
        (u) => u.username === currentUser.username
      );

      if (userIndex === -1) {
        alert("Không tìm thấy người dùng trong hệ thống!");
        return;
      }

      // Nếu có nhập thông tin đổi mật khẩu
      if (oldPassword || newPassword || confirmPassword) {
        // Kiểm tra đầy đủ thông tin đổi mật khẩu
        if (!oldPassword) {
          alert("Vui lòng nhập mật khẩu hiện tại!");
          document.getElementById("MatKhauCuEdit").focus();
          return;
        }
        if (!newPassword) {
          alert("Vui lòng nhập mật khẩu mới!");
          document.getElementById("MatKhauMoiEdit").focus();
          return;
        }
        if (!confirmPassword) {
          alert("Vui lòng xác nhận mật khẩu mới!");
          document.getElementById("XacNhanMatKhauEdit").focus();
          return;
        }

        // Kiểm tra mật khẩu cũ có đúng không
        if (users[userIndex].password !== oldPassword) {
          alert("Mật khẩu hiện tại không đúng!");
          document.getElementById("MatKhauCuEdit").focus();
          return;
        }

        // Kiểm tra mật khẩu mới có ký tự đặc biệt
        const kyTuDacBiet = /[!@#$%^&*(),.?":{}|<>]/;
        if (newPassword.length < 6) {
          alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
          document.getElementById("MatKhauMoiEdit").focus();
          return;
        }
        if (!kyTuDacBiet.test(newPassword)) {
          alert("Mật khẩu mới phải có ký tự đặc biệt (! @ # $ % ...)");
          document.getElementById("MatKhauMoiEdit").focus();
          return;
        }

        // Kiểm tra xác nhận mật khẩu
        if (newPassword !== confirmPassword) {
          alert("Mật khẩu mới và xác nhận không khớp!");
          document.getElementById("XacNhanMatKhauEdit").focus();
          return;
        }

        // Cập nhật mật khẩu mới
        users[userIndex].password = newPassword;
        alert("Đổi mật khẩu thành công!");
      }

      // Cập nhật thông tin cá nhân
      users[userIndex] = {
        ...users[userIndex],
        fullName,
        email,
        phone,
        gender,
        birthDate,
        address,
      };

      // Lưu lại vào localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Cập nhật currentUser
      const updatedUser = {
        username: currentUser.username,
        fullName,
        email,
        phone,
        gender,
        birthDate,
        address,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Cập nhật hiển thị
      updateUserDropdown(updatedUser);
      document.getElementById("username-display").textContent =
        currentUser.username;

      // Reset các ô mật khẩu
      document.getElementById("MatKhauCuEdit").value = "";
      document.getElementById("MatKhauMoiEdit").value = "";
      document.getElementById("XacNhanMatKhauEdit").value = "";

      alert("Cập nhật thông tin thành công!");
      document.getElementById("DonChinhSua").style.display = "none";
    });
  }
});

// Export các hàm để dùng trong HTML onclick
window.toggleUserMenu = toggleUserMenu;
window.handleLogout = handleLogout;
window.openEditProfile = openEditProfile;

// ===== RENDER MENU THỂ LOẠI ĐỘNG =====
function renderCategoryMenu() {
  const types = JSON.parse(localStorage.getItem("types")) || [];
  const menuContainer = document.querySelector(".LeftMenu ul");

  if (!menuContainer) return;

  // Xóa menu cũ
  menuContainer.innerHTML = "";

  // Thêm "Tất cả sản phẩm"
  const allItem = document.createElement("li");
  allItem.className = "menu-item active";
  allItem.textContent = "Tất cả sản phẩm";
  allItem.onclick = () => filterByCategory("all");
  menuContainer.appendChild(allItem);

  // Thêm các thể loại từ localStorage
  types.forEach((type, index) => {
    const li = document.createElement("li");
    li.className = "menu-item";
    li.textContent = `${index + 1}. ${type}`;
    li.onclick = () => filterByCategory(type);
    menuContainer.appendChild(li);
  });
}

// ===== LỌC SẢN PHẨM THEO DANH MỤC =====
function filterByCategory(category) {
  // Cập nhật category hiện tại
  currentCategory = category;

  // Lọc sản phẩm
  if (category === "all") {
    filteredProducts = [...allProducts];
  } else {
    // Lọc theo type (không phân biệt hoa thường)
    filteredProducts = allProducts.filter((product) => {
      const productType = (product.type || "").toLowerCase().trim();
      return productType === category.toLowerCase().trim();
    });
  }

  // Reset về trang 1
  currentPage = 1;

  // Cập nhật active class cho menu
  document.querySelectorAll(".LeftMenu .menu-item").forEach((item) => {
    item.classList.remove("active");
  });
  event.target.classList.add("active");

  // Render lại sản phẩm và pagination
  renderProducts();
  renderPagination();
}

// Export để dùng trong HTML
window.filterByCategory = filterByCategory;

// ===== CHỨC NĂNG TÌM KIẾM SẢN PHẨM =====
function setupSearchFunction() {
  const searchInput = document.querySelector(
    '.SearchBar input[name="SearchItem"]'
  );

  if (!searchInput) return;

  // Tìm kiếm khi nhập
  searchInput.addEventListener("input", function (e) {
    const searchText = e.target.value.toLowerCase().trim();

    // Nếu ô tìm kiếm trống, reset về danh mục hiện tại
    if (searchText === "") {
      if (currentCategory === "all") {
        filteredProducts = [...allProducts];
      } else {
        filteredProducts = allProducts.filter((product) => {
          const productType = (product.type || "").toLowerCase().trim();
          return productType === currentCategory.toLowerCase().trim();
        });
      }
    } else {
      // Tìm kiếm trong tất cả sản phẩm (bỏ qua category filter)
      filteredProducts = allProducts.filter((product) => {
        // Tìm trong tên sản phẩm
        const productName = (product.name || "").toLowerCase();
        // Tìm trong loại sản phẩm
        const productType = (product.type || "").toLowerCase();
        // Tìm trong mô tả (nếu có)
        const productDesc = (product.description || "").toLowerCase();

        return (
          productName.includes(searchText) ||
          productType.includes(searchText) ||
          productDesc.includes(searchText)
        );
      });
    }

    // Reset về trang 1
    currentPage = 1;

    // Render lại
    renderProducts();
    renderPagination();
  });

  // Tìm kiếm khi nhấn Enter
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      // Đã xử lý ở input event rồi
    }
  });
}

// Export để dùng trong DOMContentLoaded
window.setupSearchFunction = setupSearchFunction;

// ================================================
// CHỨC NĂNG TÌM KIẾM NÂNG CAO
// ================================================

/**
 * Khởi tạo và hiển thị giao diện tìm kiếm nâng cao
 * Thêm form tìm kiếm với nhiều tiêu chí: tên, thể loại, khoảng giá
 */
function setupAdvancedSearch() {
  // 1. Tìm vị trí để chèn form (sau SearchBar hoặc trước content)
  const searchBar = document.querySelector(".SearchBar");
  if (!searchBar) return;

  // 2. Kiểm tra xem form đã tồn tại chưa
  let advancedSearchForm = document.querySelector(".advanced-search-panel");
  if (advancedSearchForm) return; // Đã có rồi thì không tạo lại

  // 3. Tạo form tìm kiếm nâng cao
  advancedSearchForm = document.createElement("div");
  advancedSearchForm.className = "advanced-search-panel";
  advancedSearchForm.innerHTML = `
    <div class="advanced-search-toggle">
      <button id="btnToggleAdvancedSearch" onclick="toggleAdvancedSearch()">
        <i class="fa-solid fa-sliders"></i> Tìm kiếm nâng cao
      </button>
    </div>
    <div class="advanced-search-form" id="advancedSearchForm" style="display:none;">
      <div class="search-fields">
        <!-- Tìm theo tên -->
        <div class="search-field">
          <label for="advSearchName"><i class="fa-solid fa-book"></i> Tên sách:</label>
          <input type="text" id="advSearchName" placeholder="Nhập tên sách...">
        </div>
        
        <!-- Chọn thể loại -->
        <div class="search-field">
          <label for="advSearchCategory"><i class="fa-solid fa-list"></i> Thể loại:</label>
          <select id="advSearchCategory">
            <option value="">-- Tất cả --</option>
          </select>
        </div>
        
        <!-- Khoảng giá -->
        <div class="search-field price-range-field">
          <label><i class="fa-solid fa-money-bill"></i> Khoảng giá:</label>
          <div class="price-inputs">
            <input type="number" id="advMinPrice" placeholder="Từ" min="0">
            <span>→</span>
            <input type="number" id="advMaxPrice" placeholder="Đến" min="0">
          </div>
        </div>
      </div>
      
      <!-- Nút hành động -->
      <div class="search-actions">
        <button id="btnAdvSearch" onclick="performAdvancedSearch()">
          <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
        </button>
        <button id="btnResetAdvSearch" onclick="resetAdvancedSearch()">
          <i class="fa-solid fa-rotate-right"></i> Đặt lại
        </button>
      </div>
    </div>
  `;

  // 4. Chèn form vào sau SearchBar
  searchBar.parentNode.insertBefore(advancedSearchForm, searchBar.nextSibling);

  // 5. Load danh sách thể loại vào dropdown
  loadCategoriesForAdvancedSearch();
}

/**
 * Load danh sách thể loại vào dropdown tìm kiếm nâng cao
 */
function loadCategoriesForAdvancedSearch() {
  const dropdown = document.getElementById("advSearchCategory");
  if (!dropdown) return;

  // Lấy danh sách thể loại duy nhất từ products
  const categories = [...new Set(allProducts.map((p) => p.type))].filter(
    (c) => c
  );

  // Xóa options cũ (trừ option đầu tiên "Tất cả")
  dropdown.innerHTML = '<option value="">-- Tất cả --</option>';

  // Thêm các thể loại
  categories.sort().forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });
}

/**
 * Toggle hiển thị/ẩn form tìm kiếm nâng cao
 */
function toggleAdvancedSearch() {
  const form = document.getElementById("advancedSearchForm");
  if (!form) return;

  if (form.style.display === "none") {
    form.style.display = "block";
    // Load lại categories mỗi khi mở (phòng trường hợp products thay đổi)
    loadCategoriesForAdvancedSearch();
  } else {
    form.style.display = "none";
  }
}

/**
 * Thực hiện tìm kiếm nâng cao với nhiều tiêu chí
 */
function performAdvancedSearch() {
  // 1. Lấy các giá trị từ form
  const searchName = (document.getElementById("advSearchName").value || "")
    .toLowerCase()
    .trim();
  const searchCategory = document.getElementById("advSearchCategory").value;
  const minPrice =
    parseFloat(document.getElementById("advMinPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("advMaxPrice").value) || Infinity;

  // 2. Lấy danh sách giá bán
  const prices = JSON.parse(localStorage.getItem("giaBan")) || [];
  const priceMap = {};
  prices.forEach((p) => {
    priceMap[p.id] = p.giaBan || 0;
  });

  // 3. Lọc sản phẩm theo TẤT CẢ các tiêu chí
  filteredProducts = allProducts.filter((product) => {
    // Kiểm tra tên sản phẩm
    const matchName =
      !searchName || (product.name || "").toLowerCase().includes(searchName);

    // Kiểm tra thể loại
    const matchCategory = !searchCategory || product.type === searchCategory;

    // Kiểm tra khoảng giá
    const productPrice = priceMap[product.id] || getPriceNumber(product) || 0;
    const matchPrice = productPrice >= minPrice && productPrice <= maxPrice;

    // Chỉ giữ lại sản phẩm thỏa mãn TẤT CẢ điều kiện
    return matchName && matchCategory && matchPrice;
  });

  // 4. Hiển thị thông báo kết quả - BỎ THÔNG BÁO
  // showSearchResultMessage(filteredProducts.length, {
  //   searchName,
  //   searchCategory,
  //   minPrice: minPrice > 0 ? minPrice : null,
  //   maxPrice: maxPrice < Infinity ? maxPrice : null,
  // });

  // 5. Reset về trang 1 và render
  currentPage = 1;
  renderProducts();
  renderPagination();
}

/**
 * Hiển thị thông báo kết quả tìm kiếm
 */
function showSearchResultMessage(count, criteria) {
  // Tìm hoặc tạo div thông báo
  let messageDiv = document.querySelector(".search-result-message");
  if (!messageDiv) {
    messageDiv = document.createElement("div");
    messageDiv.className = "search-result-message";
    const content = document.querySelector(".content");
    if (content) {
      content.parentNode.insertBefore(messageDiv, content);
    }
  }

  // Tạo text thông báo
  let message = `Tìm thấy <strong>${count}</strong> sản phẩm`;

  const criteriaText = [];
  if (criteria.searchName)
    criteriaText.push(`tên chứa "${criteria.searchName}"`);
  if (criteria.searchCategory)
    criteriaText.push(`thể loại "${criteria.searchCategory}"`);
  if (criteria.minPrice || criteria.maxPrice) {
    const priceRange =
      criteria.minPrice && criteria.maxPrice
        ? `${criteria.minPrice.toLocaleString()}đ - ${criteria.maxPrice.toLocaleString()}đ`
        : criteria.minPrice
        ? `từ ${criteria.minPrice.toLocaleString()}đ`
        : `đến ${criteria.maxPrice.toLocaleString()}đ`;
    criteriaText.push(`giá ${priceRange}`);
  }

  if (criteriaText.length > 0) {
    message += ` với ${criteriaText.join(", ")}`;
  }

  messageDiv.innerHTML = `<p>${message}</p>`;
  messageDiv.style.display = "block";
}

/**
 * Đặt lại form tìm kiếm nâng cao
 */
function resetAdvancedSearch() {
  // Xóa giá trị trong form
  document.getElementById("advSearchName").value = "";
  document.getElementById("advSearchCategory").selectedIndex = 0;
  document.getElementById("advMinPrice").value = "";
  document.getElementById("advMaxPrice").value = "";

  // Reset về hiển thị tất cả sản phẩm
  filteredProducts = [...allProducts];
  currentCategory = "all";
  currentPage = 1;

  // Xóa thông báo kết quả
  const messageDiv = document.querySelector(".search-result-message");
  if (messageDiv) {
    messageDiv.style.display = "none";
  }

  // Render lại
  renderProducts();
  renderPagination();
}

// Export các hàm để có thể gọi từ HTML
window.setupAdvancedSearch = setupAdvancedSearch;
window.toggleAdvancedSearch = toggleAdvancedSearch;
window.performAdvancedSearch = performAdvancedSearch;
window.resetAdvancedSearch = resetAdvancedSearch;

// ================================================
// CHỨC NĂNG QUÊN MẬT KHẨU
// ================================================

/**
 * Mở modal quên mật khẩu
 */
function openForgetPassword() {
  // Đóng modal đăng nhập
  document.getElementById("DonDangNhap").style.display = "none";
  // Mở modal quên mật khẩu
  document.getElementById("DonQuenMatKhau").style.display = "block";
  // Reset form
  document.getElementById("UsernameQuenMK").value = "";
}

/**
 * Quay lại trang đăng nhập
 */
function backToLogin() {
  // Đóng modal quên mật khẩu
  document.getElementById("DonQuenMatKhau").style.display = "none";
  // Mở modal đăng nhập
  document.getElementById("DonDangNhap").style.display = "block";
}

/**
 * Xử lý submit form quên mật khẩu
 */
document.addEventListener("DOMContentLoaded", () => {
  const formQuenMatKhau = document.getElementById("formQuenMatKhau");
  if (formQuenMatKhau) {
    formQuenMatKhau.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("UsernameQuenMK").value.trim();

      if (!username) {
        alert("Vui lòng nhập tên đăng nhập!");
        return;
      }

      // Kiểm tra user có tồn tại không
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find((u) => u.username === username);

      if (!foundUser) {
        alert(
          `Không tìm thấy tài khoản với tên "${username}"!\n\nVui lòng kiểm tra lại tên đăng nhập.`
        );
        return;
      }

      // Lấy danh sách yêu cầu reset mật khẩu hiện tại
      let resetRequests =
        JSON.parse(localStorage.getItem("passwordResetRequests")) || [];

      // Kiểm tra xem đã có yêu cầu chưa xử lý cho user này chưa
      const existingRequest = resetRequests.find(
        (req) => req.username === username && req.status === "pending"
      );

      if (existingRequest) {
        alert(
          `Bạn đã gửi yêu cầu reset mật khẩu trước đó!\n\n` +
            `Yêu cầu đang chờ Admin xử lý.\n` +
            `Thời gian gửi: ${existingRequest.timestamp}`
        );
        return;
      }

      // Tạo yêu cầu mới
      const newRequest = {
        id: Date.now(), // ID duy nhất
        username: username,
        fullName: foundUser.fullName || username,
        email: foundUser.email || "",
        timestamp: new Date().toLocaleString("vi-VN"),
        status: "pending", // pending, approved, rejected
      };

      resetRequests.push(newRequest);
      localStorage.setItem(
        "passwordResetRequests",
        JSON.stringify(resetRequests)
      );

      alert(
        `Gửi yêu cầu thành công!\n\n` +
          `Yêu cầu reset mật khẩu cho tài khoản "${username}" đã được gửi đến Admin.\n\n` +
          `Vui lòng chờ Admin xác nhận và cập nhật mật khẩu mới.`
      );

      // Đóng modal và reset form
      document.getElementById("DonQuenMatKhau").style.display = "none";
      document.getElementById("formQuenMatKhau").reset();
    });
  }
});

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePasswordVisibility(inputId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = document.getElementById(iconId);

  if (passwordInput && toggleIcon) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    }
  }
}

// Export các hàm
window.openForgetPassword = openForgetPassword;
window.backToLogin = backToLogin;
window.togglePasswordVisibility = togglePasswordVisibility;
