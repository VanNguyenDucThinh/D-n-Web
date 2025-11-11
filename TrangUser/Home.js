// home.js - cleaned & robust version

// --- Modal close when clicking backdrop & safe helpers ---
function safeQuery(selector) { return document.querySelector(selector); }

document.addEventListener('DOMContentLoaded', () => {
  // Modal backdrop close
  const DongLogin = document.getElementById('DonDangNhap');
  const DongDangKy = document.getElementById('DonDangKy');
  window.onclick = function(click) {
    if (click.target === DongLogin) DongLogin.style.display = "none";
    if (click.target === DongDangKy) DongDangKy.style.display = "none";
  };

  // Init features after DOM ready
  initCarousel();
  loadProductsFromLocalStorage();
  renderProducts();
  renderPagination();
  setupAddToCartHandler();
  setupAuthForms();
});

// --- Carousel ---
let images = [
  "/TrangUser/Pictures/Book1.jpg",
  "/TrangUser/Pictures/Book4.jpg",
  "/TrangUser/Pictures/Book3.jpg"
];
let current = 0;
let intervalId = null;

function initCarousel() {
  const imgAdvertise = safeQuery(".QuangCao img");
  const radioButtons = Array.from(document.querySelectorAll(".rdoQuangCao input"));
  if (!imgAdvertise) return;

  images = images.map(s => (s || "").trim()).filter(Boolean);
  if (images.length === 0) images = ["/TrangUser/Pictures/BlankBook.jpg"];

  function updateUI() {
    imgAdvertise.src = images[current] || "/TrangUser/Pictures/BlankBook.jpg";
    radioButtons.forEach((r, i) => { if (r) r.checked = (i === current); });
  }
  function nextImg() { current = (current + 1) % images.length; updateUI(); }
  function prevImg() { current = (current - 1 + images.length) % images.length; updateUI(); }
  window.nextImg = nextImg; window.prevImg = prevImg;
  window.showImg = (index) => { if (typeof index === 'number' && index >= 0 && index < images.length) { current = index; updateUI(); resetAutoSlide(); } };

  function autoSlide(){ clearInterval(intervalId); intervalId = setInterval(nextImg, 3000); }
  function resetAutoSlide(){ autoSlide(); }

  updateUI();
  autoSlide();

  radioButtons.forEach((r, i) => { if (!r) return; r.addEventListener('click', () => showImg(i)); });
}

// --- Products listing / pagination ---
const productsPerPage = 6;
let currentPage = 1;
let allProducts = [];

function loadProductsFromLocalStorage() {
  allProducts = JSON.parse(localStorage.getItem('products')) || [];
}

// normalize image: if product stores image like 'img/P01.jpg' or 'images/foo.jpg' -> convert to '/TrangUser/Pictures/P01.jpg'
// if path already absolute (startsWith '/' or contains 'TrangUser' or startsWith 'http') -> keep as-is
function getImageForProduct(product) {
  if (!product) return '/TrangUser/Pictures/BlankBook.jpg';
  const keys = ['image','source','img','picture','src'];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(product, k)) {
      const v = product[k];
      if (typeof v === 'string' && v.trim() !== '') {
        const t = v.trim();
        if (t.startsWith('http')) return t;
        if (t.startsWith('/')) return t; // already absolute
        if (t.includes('TrangUser')) return t; // already full-ish
        // remove leading folder prefixes then attach to /TrangUser/Pictures/
        return '/TrangUser/Pictures/' + t.replace(/^img[\\/]/i, '').replace(/^images[\\/]/i, '').trim();
      }
    }
  }
  return '/TrangUser/Pictures/BlankBook.jpg';
}

function getPriceNumber(product) {
  if (!product) return null;
  const keys = ['cost','price','gia','giaVon'];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(product, k)) {
      const raw = product[k];
      if (raw === null || raw === undefined || raw === '') continue;
      const n = Number(raw);
      if (!Number.isNaN(n)) return n;
    }
  }
  return null;
}

function renderProducts() {
  const productContainer = document.querySelector('.content');
  if (!productContainer) return;

  let productGrid = productContainer.querySelector('.product-grid');
  if (!productGrid) {
    productGrid = document.createElement('div');
    productGrid.classList.add('product-grid');
    const paginationDiv = productContainer.querySelector('.pagination');
    if (paginationDiv) productContainer.insertBefore(productGrid, paginationDiv);
    else productContainer.appendChild(productGrid);
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const productsToRender = allProducts.slice(startIndex, startIndex + productsPerPage);

  productGrid.innerHTML = '';
  if (productsToRender.length === 0) {
    productGrid.innerHTML = '<p style="text-align:center;width:100%;">Không có sản phẩm nào để hiển thị.</p>';
    return;
  }

  productsToRender.forEach(product => {
    const imageUrl = getImageForProduct(product);
    const priceNum = getPriceNumber(product);
    let priceText = priceNum === null ? 'Liên hệ' : (priceNum === 0 ? '0đ' : priceNum.toLocaleString('vi-VN') + 'đ');

    const div = document.createElement('div');
    div.classList.add('product');
    div.dataset.id = product.id ?? '';
    div.innerHTML = `
      <div><img src="${imageUrl}" alt="${(product.name||'Sản phẩm')}" onerror="this.onerror=null;this.src='/TrangUser/Pictures/BlankBook.jpg'"></div>
      <div class="product-name">${product.name || ''}</div>
      <div class="product-price">${priceText}</div>
      <div class="product-type">${product.type || ''}</div>
      <div><button class="btn-add-cart">Thêm vào giỏ hàng</button></div>
    `;
    productGrid.appendChild(div);
  });
  // pagination buttons remain active when renderProducts runs
}

function renderPagination() {
  const paginationContainer = document.querySelector('.pagination');
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';
  const totalPages = Math.max(1, Math.ceil(allProducts.length / productsPerPage));
  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button'); prevBtn.innerText = 'Trước';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => { if (currentPage>1){ currentPage--; renderProducts(); renderPagination(); } });
  paginationContainer.appendChild(prevBtn);

  for (let i=1;i<=totalPages;i++){
    const pbtn = document.createElement('button'); pbtn.innerText = i;
    if (i===currentPage) pbtn.classList.add('active');
    pbtn.addEventListener('click', ()=>{ currentPage = i; renderProducts(); renderPagination(); });
    paginationContainer.appendChild(pbtn);
  }

  const nextBtn = document.createElement('button'); nextBtn.innerText = 'Sau';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', ()=>{ if (currentPage<totalPages){ currentPage++; renderProducts(); renderPagination(); } });
  paginationContainer.appendChild(nextBtn);
}

// --- Add to cart handler (delegated) ---
function setupAddToCartHandler() {
  const productContainer = document.querySelector('.content');
  if (!productContainer) return;

  // Remove old handler if set (saved on element)
  if (productContainer._addToCartHandler) productContainer.removeEventListener('click', productContainer._addToCartHandler);

    function onClick(e) {
    const btn = e.target.closest('.btn-add-cart');
    if (!btn) return;
    const productEl = btn.closest('.product');
    if (!productEl) return;
    const id = productEl.dataset.id;
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    // ✅ Kiểm tra đăng nhập trước khi thêm vào giỏ hàng
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      document.getElementById('DonDangNhap').style.display = 'block';
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const price = getPriceNumber(product) ?? 0;
    const image = getImageForProduct(product) ?? '/TrangUser/Pictures/BlankBook.jpg';

    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity = (existing.quantity || 0) + 1;
    else cart.push({
      id,
      name: product.name || 'Sản phẩm',
      price,
      image,
      quantity: 1
    });

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name || 'Sản phẩm'} đã được thêm vào giỏ hàng!`);
}


  productContainer._addToCartHandler = onClick;
  productContainer.addEventListener('click', onClick);
}

// --- Auth forms setup (kept same behaviour) ---
function setupAuthForms(){
  const registrationForm = document.querySelector('#DonDangKy .formdangky');
  const loginForm = document.querySelector('#DonDangNhap .formdangnhap');

  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = registrationForm.querySelector('[name="TenDangKy"]').value;
      const gender = registrationForm.querySelector('[name="GenderDangKy"]:checked')?.value;
      const email = registrationForm.querySelector('[name="EmailDangKy"]').value;
      const phone = registrationForm.querySelector('[name="SDT_DangKy"]').value;
      const username = registrationForm.querySelector('[name="UserDangKy"]').value;
      const password = registrationForm.querySelector('[name="PassDangKy"]').value;
      const birthDate = registrationForm.querySelector('[name="NgaySinhDangKy"]').value;

      if (!fullName || !email || !phone || !username || !password || !birthDate || !gender) {
        alert('Vui lòng điền đầy đủ thông tin đăng ký.');
        return;
      }

      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.username === username)) {
        alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
        return;
      }

      const newUser = { username, password, fullName, email, phone, gender, birthDate };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Đăng ký thành công!');
      document.getElementById('DonDangKy').style.display = 'none';
      registrationForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = loginForm.querySelector('[name="TenDangNhap"]').value;
      const password = loginForm.querySelector('[name="MatKhauDangNhap"]').value;
      if (!username || !password) { alert('Vui lòng nhập tên đăng nhập và mật khẩu.'); return; }
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = users.find(user => user.username === username && user.password === password);
      if (foundUser) {
        alert(`Đăng nhập thành công! Chào mừng ${foundUser.fullName || foundUser.username}.`);
        localStorage.setItem('currentUser', JSON.stringify({ username: foundUser.username, fullName: foundUser.fullName }));
        document.getElementById('DonDangNhap').style.display = 'none';
        loginForm.reset();
      } else alert('Tên đăng nhập hoặc mật khẩu không đúng.');
    });
  }
}
