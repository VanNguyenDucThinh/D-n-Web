// =================================================
// INITIAL DATA & GLOBAL VARIABLES
// =================================================

const adminContent = document.querySelector(".admin-content");
const LOW_STOCK_THRESHOLD = 5;

// Dữ liệu tài khoản admin (6 tài khoản)
const adminAccounts = [
  { username: "admin1", password: "admin123", name: "Admin1" },
  { username: "admin2", password: "admin456", name: "Admin2" },
  { username: "admin3", password: "admin789", name: "Admin3" },
  { username: "admin4", password: "admin4", name: "Admin4" },
  { username: "admin5", password: "admin5", name: "Admin5" },
  { username: "admin6", password: "admin6", name: "Admin6" },
];

// Trạng thái đăng nhập
let currentAdmin = JSON.parse(localStorage.getItem("currentAdmin")) || null;

// Dữ liệu người dùng
let danhSachNguoiDung = [
  {
    id: 1,
    tenDangNhap: "truongtrungkien",
    matKhau: "123456",
    email: "Kien@gmail.com",
    hoTen: "Trương Trung Kiên",
    sdt: "0123456789",
    trangThai: "Hoạt động",
  },
  {
    id: 2,
    tenDangNhap: "nguyenvana",
    matKhau: "abcdef",
    email: "NguyenVanA@gmail.com",
    hoTen: "Nguyễn Văn A",
    sdt: "0435412454",
    trangThai: "Khóa",
  },
  {
    id: 3,
    tenDangNhap: "hoang123",
    matKhau: "hoang456",
    email: "Hoang@gmail.com",
    hoTen: "Hoàng Văn B",
    sdt: "0231412454",
    trangThai: "Hoạt động",
  },
  {
    id: 4,
    tenDangNhap: "tranvanc",
    matKhau: "tran456",
    email: "TranVanC@gmail.com",
    hoTen: "Trần Văn C",
    sdt: "0231415254",
    trangThai: "Hoạt động",
  },
  {
    id: 5,
    tenDangNhap: "lethid",
    matKhau: "le123",
    email: "LeThiD@gmail.com",
    hoTen: "Lê Thị D",
    sdt: "0231413474",
    trangThai: "Hoạt động",
  },
  {
    id: 6,
    tenDangNhap: "phamvanem",
    matKhau: "pham456",
    email: "PhamVanEm@gmail.com",
    hoTen: "Phạm Văn Em",
    sdt: "0231443474",
    trangThai: "Hoạt động",
  },
  {
    id: 7,
    tenDangNhap: "nguyenthif",
    matKhau: "nguyen789",
    email: "NguyenThiF@gmail.com",
    hoTen: "Nguyễn Thị F",
    sdt: "0231413554",
    trangThai: "Hoạt động",
  },
  {
    id: 8,
    tenDangNhap: "dinhvangg",
    matKhau: "dinh123",
    email: "DinhVanG@gmail.com",
    hoTen: "Đinh Văn G",
    sdt: "0255413554",
    trangThai: "Hoạt động",
  },
  {
    id: 9,
    tenDangNhap: "vuhohh",
    matKhau: "vu456",
    email: "VuHoHh@gmail.com",
    hoTen: "Vũ Hoàng H",
    sdt: "0255421254",
    trangThai: "Hoạt động",
  },
  {
    id: 10,
    tenDangNhap: "tranthii",
    matKhau: "tran789",
    email: "TranThiI@gmail.com",
    hoTen: "Trần Thị I",
    sdt: "0377413554",
    trangThai: "Khóa",
  },
];

let products = [
  {
    id: "P01",
    name: "Doraemon Tập 1",
    author: "Fujiko F. Fujio",
    type: "truyện tranh",
    cost: 20000,
    stock: 10,
    source: "img/P01.jpg",
  },
  {
    id: "P02",
    name: "Conan Tập 5",
    author: "Gosho Aoyama",
    type: "truyện tranh",
    cost: 18000,
    stock: 5,
    source: "img/P02.jpg",
  },
  {
    id: "P03",
    name: "One Piece Tập 10",
    author: "Eiichiro Oda",
    type: "truyện tranh",
    cost: 22000,
    stock: 8,
    source: "img/P03.jpg",
  },
  {
    id: "P04",
    name: "Harry Potter Tập 1",
    author: "J.K. Rowling",
    type: "tiểu thuyết",
    cost: 25000,
    stock: 7,
    source: "img/P04.jpg",
  },
  {
    id: "P05",
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    type: "văn học",
    cost: 30000,
    stock: 4,
    source: "img/P05.jpg",
  },
  {
    id: "P06",
    name: "Pride and Prejudice",
    author: "Jane Austen",
    type: "văn học",
    cost: 28000,
    stock: 6,
    source: "img/P06.jpg",
  },
  {
    id: "P07",
    name: "Dragon Ball Tập 4",
    author: "Akira Toriyama",
    type: "truyện tranh",
    cost: 23000,
    stock: 9,
    source: "img/P07.jpg",
  },
  {
    id: "P08",
    name: "Black Clover Tập 6",
    author: "Yūki Tabata",
    type: "truyện tranh",
    cost: 18500,
    stock: 11,
    source: "img/P08.jpg",
  },
  {
    id: "P09",
    name: "Moby Dick",
    author: "Herman Melville",
    type: "văn học",
    cost: 27000,
    stock: 5,
    source: "img/P09.jpg",
  },
  {
    id: "P10",
    name: "Fairy Tail Tập 12",
    author: "Hiro Mashima",
    type: "truyện tranh",
    cost: 21000,
    stock: 8,
    source: "img/P10.jpg",
  },
  {
    id: "P11",
    name: "Death Note Tập 1",
    author: "Tsugumi Ohba",
    type: "truyện tranh",
    cost: 22000,
    stock: 5,
    source: "img/P11.jpg",
  },
  {
    id: "P12",
    name: "Tokyo Revengers Tập 3",
    author: "Ken Wakui",
    type: "truyện tranh",
    cost: 20000,
    stock: 7,
    source: "img/P12.jpg",
  },
  {
    id: "P13",
    name: "Jujutsu Kaisen Tập 2",
    author: "Gege Akutami",
    type: "truyện tranh",
    cost: 21000,
    stock: 9,
    source: "img/P13.jpg",
  },
  {
    id: "P14",
    name: "Haikyuu Tập 9",
    author: "Haruichi Furudate",
    type: "truyện tranh",
    cost: 18000,
    stock: 12,
    source: "img/P14.jpg",
  },
  {
    id: "P15",
    name: "Demon Slayer Tập 5",
    author: "Koyoharu Gotouge",
    type: "truyện tranh",
    cost: 23000,
    stock: 6,
    source: "img/P15.jpg",
  },
  {
    id: "P16",
    name: "Hunter x Hunter Tập 7",
    author: "Yoshihiro Togashi",
    type: "truyện tranh",
    cost: 22500,
    stock: 8,
    source: "img/P16.jpg",
  },
  {
    id: "P17",
    name: "One Punch Man Tập 3",
    author: "ONE",
    type: "truyện tranh",
    cost: 19000,
    stock: 10,
    source: "img/P17.jpg",
  },
  {
    id: "P18",
    name: "Black Butler Tập 4",
    author: "Yana Toboso",
    type: "truyện tranh",
    cost: 20000,
    stock: 7,
    source: "img/P18.jpg",
  },
  {
    id: "P19",
    name: "Fullmetal Alchemist Tập 6",
    author: "Hiromu Arakawa",
    type: "truyện tranh",
    cost: 21500,
    stock: 9,
    source: "img/P19.jpg",
  },
  {
    id: "P20",
    name: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    type: "trinh thám",
    cost: 28000,
    stock: 6,
    source: "img/P20.jpg",
  },
];

localStorage.setItem("products", JSON.stringify(products));
let types = ["truyện tranh", "tiểu thuyết", "văn học", "trinh thám"];
localStorage.setItem("types", JSON.stringify(types));
let suaIndex = null;
function taoMaTuDong() {
  if (danhSachSP.length === 0) return "P01";
  // Lấy số cuối của mã sản phẩm lớn nhất hiện có
  const maCuoi = danhSachSP[danhSachSP.length - 1].id;
  const soCuoi = parseInt(maCuoi.replace("P", "")) || 0;
  const soMoi = soCuoi + 1;
  return "P" + soMoi.toString().padStart(2, "0");
}
function loadTypesToDropdown() {
  const types = JSON.parse(localStorage.getItem("types")) || [];
  const sel = document.getElementById("theloai");

  sel.innerHTML = types
    .map((t) => `<option value="${t}">${t}</option>`)
    .join("");
}

// Data for Sales Statistics
let data = [
  { ten: "Doraemon Tập 1", giaVon: 20000, loiNhuan: 20 },
  { ten: "Conan Tập 5", giaVon: 18000, loiNhuan: 25 },
  { ten: "One Piece Tập 10", giaVon: 22000, loiNhuan: 18 },
  { ten: "Harry Potter Tập 1", giaVon: 25000, loiNhuan: 30 },
  { ten: "To Kill a Mockingbird", giaVon: 30000, loiNhuan: 22 },
  { ten: "Pride and Prejudice", giaVon: 28000, loiNhuan: 20 },
  { ten: "Dragon Ball Tập 4", giaVon: 23000, loiNhuan: 15 },
];

let trangHienTaiStats = 1;
const spMoiTrangStats = 5;

// Data for Order Management
let donHangs = [];
let donHangsHienTai = [];
let currentPageOrders = 1;
const perPageOrders = 3;
let danhSachSP = JSON.parse(localStorage.getItem("products")) || [];

// =================================================
// USER MANAGEMENT FEATURE ("Người dùng")
// =================================================

function renderUserManagement() {
  adminContent.innerHTML = `
    <div class="user-section" style="margin-top: 20px;">
      <h2>Quản lý Người Dùng</h2>
      <p style="margin-bottom: 20px;padding:20px;font-size:20px;">Tổng số người dùng: ${danhSachNguoiDung.length}</p>
      <div class="search-bar" style="display:flex; align-items:center; gap: 8px;">
          <b>Tìm kiếm:</b>
          <input type="text" placeholder="Nhập thông tin" style="padding: 6px; border: 1px solid #ccc; flex-grow: 1; max-width: 300px;" />
      </div>
      <div class="khuVucBangNguoiDung">
      </div>
    </div>
  `;

  hienThiNguoiDung(danhSachNguoiDung);
  ganChucNangTimKiem();
}

function hienThiNguoiDung(danhSach) {
  const khuVucBangNguoiDung = document.querySelector(".khuVucBangNguoiDung");
  if (!khuVucBangNguoiDung) return;

  let htmlBang = ` 
    <div class="user-table" style="width:100%; box-sizing:border-box; margin-top:15px;">
      <div class="user-row user-row--head" style="display:flex; gap:12px; font-weight:700; padding:8px 12px; background:rgba(36, 34, 34, 0.08);">
        <div style="width:40px">ID</div>
        <div style="width:140px">Tên Đăng Nhập</div>
        <div style="width:140px">Mật Khẩu</div>
        <div style="width:200px">Email</div>
        <div style="width:180px">Họ Tên</div>
        <div style="width:100px">SĐT</div>
        <div style="width:100px">Trạng Thái</div>
        <div style="width:160px; text-align:center;">Hành Động</div>
      </div>
  `;

  danhSach.forEach((nguoiDung) => {
    const mauTrangThai = nguoiDung.trangThai === "Hoạt động" ? "green" : "red";
    const nutKhoaMo =
      nguoiDung.trangThai === "Hoạt động"
        ? `<button class="action-lock" data-id="${nguoiDung.id}" style="padding: 4px 8px; border:none; background:#ff4757; color:white; cursor:pointer;">Khóa</button>`
        : `<button class="action-unlock" data-id="${nguoiDung.id}" style="padding: 4px 8px; border:none; background:#2ed573; color:white; cursor:pointer;">Mở Khóa</button>`;

    htmlBang += `
      <div class="user-row" style="display:flex; gap:12px; align-items:center; padding:8px 12px; border-top:1px solid rgba(0,0,0,0.06);">
        <div style="width:40px">${nguoiDung.id}</div>
        <div style="width:140px">${nguoiDung.tenDangNhap}</div>
        <div style="width:140px; font-family: monospace;">********</div>
        <div style="width:200px">${nguoiDung.email}</div>
        <div style="width:180px">${nguoiDung.hoTen}</div>
        <div style="width:100px">${nguoiDung.sdt}</div>
        <div style="width:100px; font-weight: bold; color: ${mauTrangThai};">${nguoiDung.trangThai}</div>
        <div style="width:160px; display:flex; gap:8px; justify-content:center;">
          ${nutKhoaMo}
          <button class="action-reset" data-id="${nguoiDung.id}" style="padding: 4px 8px; border:none; background:#ffa502; color:white; cursor:pointer;">Reset MK</button>
        </div>
      </div>
    `;
  });

  htmlBang += `</div>`;
  khuVucBangNguoiDung.innerHTML = htmlBang;
  ganSuKienHanhDong();
}

function ganChucNangTimKiem() {
  const thanhTimKiem = adminContent.querySelector(".search-bar");
  if (!thanhTimKiem) return;
  const oNhap = thanhTimKiem.querySelector("input");

  const thucHienTimKiem = () => {
    const chuoiTimKiem = (oNhap.value || "").trim().toLowerCase();

    if (!chuoiTimKiem) {
      hienThiNguoiDung(danhSachNguoiDung);
      return;
    }

    const ketQuaLoc = danhSachNguoiDung.filter(
      (nguoiDung) =>
        (nguoiDung.tenDangNhap || "").toLowerCase().includes(chuoiTimKiem) ||
        (nguoiDung.hoTen || "").toLowerCase().includes(chuoiTimKiem) ||
        (nguoiDung.email || "").toLowerCase().includes(chuoiTimKiem) ||
        (nguoiDung.sdt || "").toLowerCase().includes(chuoiTimKiem)
    );

    hienThiNguoiDung(ketQuaLoc);
  };

  oNhap && oNhap.addEventListener("input", thucHienTimKiem);
}

function xuLyHanhDong(id, hanhDong) {
  const nguoiDungCanXuLy = danhSachNguoiDung.find((u) => u.id === id);
  if (!nguoiDungCanXuLy) return;

  switch (hanhDong) {
    case "reset":
      if (
        confirm(
          `Bạn có chắc muốn reset mật khẩu cho ${nguoiDungCanXuLy.tenDangNhap}? Mật khẩu sẽ được đặt lại về '0'.`
        )
      ) {
        nguoiDungCanXuLy.matKhau = "0";
        alert(
          `Đã reset mật khẩu cho ${nguoiDungCanXuLy.tenDangNhap} thành công! Mật khẩu mới là '0'.`
        );
      }
      break;
    case "lock":
      if (
        confirm(
          `Bạn có chắc muốn KHÓA tài khoản ${nguoiDungCanXuLy.tenDangNhap}?`
        )
      ) {
        nguoiDungCanXuLy.trangThai = "Khóa";
        alert(`Tài khoản ${nguoiDungCanXuLy.tenDangNhap} đã bị KHÓA.`);
      }
      break;
    case "unlock":
      if (
        confirm(
          `Bạn có chắc muốn MỞ KHÓA tài khoản ${nguoiDungCanXuLy.tenDangNhap}?`
        )
      ) {
        nguoiDungCanXuLy.trangThai = "Hoạt động";
        alert(`Tài khoản ${nguoiDungCanXuLy.tenDangNhap} đã được MỞ KHÓA.`);
      }
      break;
  }

  hienThiNguoiDung(danhSachNguoiDung);
}

function ganSuKienHanhDong() {
  adminContent.querySelectorAll(".action-reset").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      xuLyHanhDong(id, "reset");
    });
  });

  adminContent
    .querySelectorAll(".action-lock, .action-unlock")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const actionType = e.currentTarget.classList.contains("action-lock")
          ? "lock"
          : "unlock";
        xuLyHanhDong(id, actionType);
      });
    });
}

// =================================================
// PRODUCT MANAGEMENT FEATURE ("Danh mục sách")
// =================================================

function displayproduct() {
  adminContent.innerHTML = `
        <div class="admin-content">
          <h1>Quản lý sản phẩm</h1>

          <!-- Thanh công cụ -->
          <div class="product-toolbar">
            <button id="addProductBtn"><i class="ri-add-box-fill"></i> Thêm sản phẩm</button>
            <button id="quanlytheloai"><i class="ri-add-box-fill"></i> Quản lý thể loại</button>
            <input type="text" id="searchInput" placeholder="Tìm kiếm sản phẩm..." />
          </div>
          <!-- Bảng danh sách sản phẩm -->
          <table class="product-table">
            <thead>
              <tr>
                <th>hinh anh</th>
                <th>Mã</th>
                <th>Tên sản phẩm</th>
                <th>Tác Giả</th>
                <th>the loai</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody id="productTableBody">
            </tbody>
          </table>
        </div>
      </div>
    </section>
<div id="productFormOverlay" class="overlay hidden">
  <div class="form-box">
    <h2 id="formTitle">Thêm sản phẩm</h2>
    <label>Hình ảnh:</label>
    <input type="text" id="hinhAnhSP" placeholder="images/tenanh.jpg" />
    <label>Mã sản phẩm:</label>
    <input type="text" id="maSP" />
    <label>Tên sản phẩm:</label>
    <input type="text" id="tenSP" placeholder="Tên sản phẩm" />
    <label>Tác giả:</label>
    <input type="text" id="tacGiaSP" placeholder="Tên tác giả" />
    <label>Thể loại:</label>
    <select id="theloai"></select>
    <div class="form-btns">
      <button id="saveProductBtn">Lưu</button>
      <button id="cancelBtn">Hủy</button>
    </div>
  </div>
</div> `;
  hienThiSanPham();
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const ketQua = danhSachSP.filter(
      (sp) =>
        sp.name.toLowerCase().includes(keyword) ||
        sp.id.toLowerCase().includes(keyword) ||
        sp.author.toLowerCase().includes(keyword)
    );
    hienThiSanPham(ketQua);
  });
  // ===== Mở form thêm sản phẩm =====
  document.getElementById("addProductBtn").addEventListener("click", () => {
    suaIndex = null;

    document.getElementById("maSP").value = taoMaTuDong(); // mã tự động
    document.getElementById("maSP").disabled = true;
    document.getElementById("tenSP").value = "";
    document.getElementById("tacGiaSP").value = "";
    document.getElementById("hinhAnhSP").value = "";
    loadTypesToDropdown();
    const sel = document.getElementById("theloai");
    sel.selectedIndex = 0;
    document.getElementById("productFormOverlay").classList.remove("hidden");
  });

  // ===== Hủy form =====
  document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("productFormOverlay").classList.add("hidden");
  });

  // ===== Lưu sản phẩm =====
  document.getElementById("saveProductBtn").addEventListener("click", () => {
    const ma = document.getElementById("maSP").value.trim();
    const name = document.getElementById("tenSP").value.trim();
    const author = document.getElementById("tacGiaSP").value.trim();
    const type = document.getElementById("theloai").value.trim();
    const imageInput = document.getElementById("hinhAnhSP").value.trim();

    if (!name) {
      alert("Vui lòng nhập tên sản phẩm!");
      return;
    }

    // Chuẩn hóa ảnh
    const source = imageInput.startsWith("images/")
      ? imageInput
      : `images/${imageInput}`;

    const spMoi = { id: ma, name, author, type, source };

    if (suaIndex === null) {
      // Thêm mới
      danhSachSP.push(spMoi);
    } else {
      // Cập nhật
      danhSachSP[suaIndex] = spMoi;
    }

    localStorage.setItem("products", JSON.stringify(danhSachSP));

    document.getElementById("productFormOverlay").classList.add("hidden");
    hienThiSanPham(); // Refresh lại bảng
  });
}
function hienThiSanPham(list = danhSachSP) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";

  list.forEach((sp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <img src="${sp.source}" class="product-img" />
      </td>
      <td>${sp.id}</td>
      <td>${sp.name}</td>
      <td>${sp.author}</td>
      <td>${sp.type}</td>
      <td>
        <button class="edit-btn" onclick="moFormSua(${index})">
          <i class="ri-edit-2-fill"></i>
        </button>
        <button class="delete-btn" onclick="xoaSanPham(${index})">
          <i class="ri-delete-bin-6-fill"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Mở form sửa sản phẩm
function moFormSua(index) {
  suaIndex = index;
  const sp = danhSachSP[index];

  document.getElementById("maSP").value = sp.id;
  document.getElementById("maSP").disabled = true;
  document.getElementById("tenSP").value = sp.name;
  document.getElementById("tacGiaSP").value = sp.author;
  document.getElementById("hinhAnhSP").value = sp.source;

  loadTypesToDropdown();
  const sel = document.getElementById("theloai");
  sel.value = sp.type;

  document.getElementById("formTitle").innerText = "Sửa sản phẩm";
  document.getElementById("productFormOverlay").classList.remove("hidden");
}

// Xóa sản phẩm
function xoaSanPham(index) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    danhSachSP.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(danhSachSP));
    hienThiSanPham();
  }
}

function loadTypesToDropdown() {
  const types = JSON.parse(localStorage.getItem("types")) || [];
  const sel = document.getElementById("theloai");

  sel.innerHTML = types
    .map((t) => `<option value="${t}">${t}</option>`)
    .join("");
}

// =================================================
// INVENTORY MANAGEMENT FEATURE ("Số lượng tồn kho")
// =================================================

function renderInventoryView() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const types = JSON.parse(localStorage.getItem("types")) || [];

  const tableRows = generateProductRows_Inventory(products);

  adminContent.innerHTML = `
    <div class="content-header">
      <h1>Quản lý Tồn kho</h1>
      <div class="search-and-filter">
        <input type="text" id="searchInput" placeholder="Tìm theo tên sản phẩm...">
        <select id="typeFilter">
          <option value="">Tất cả loại sản phẩm</option>
          ${types
            .map((type) => `<option value="${type}">${type}</option>`)
            .join("")}
        </select>
      </div>
    </div>
    <div class="content-body">
      <table class="content-table">
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên Sản phẩm</th>
            <th>Loại Sản phẩm</th>
            <th>Số lượng tồn</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
  addInventoryEventListeners();
}

function addInventoryEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");

  const handleFilterAndSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    const filteredProducts = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);
      const matchesType = selectedType ? product.type === selectedType : true;
      return matchesSearch && matchesType;
    });

    const tableRows = generateProductRows_Inventory(filteredProducts);
    document.querySelector(".content-table tbody").innerHTML = tableRows;
  };

  searchInput.addEventListener("input", handleFilterAndSearch);
  typeFilter.addEventListener("change", handleFilterAndSearch);
}

function generateProductRows_Inventory(products) {
  return products
    .map((product) => {
      let stockStatusClass = "";
      if (product.stock === 0) {
        stockStatusClass = "out-of-stock";
      } else if (product.stock <= LOW_STOCK_THRESHOLD) {
        stockStatusClass = "low-stock";
      }
      return `
      <tr class="${stockStatusClass}">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.type || "N/A"}</td>
        <td>${product.stock}</td>
      </tr>
    `;
    })
    .join("");
}

// =================================================
// ORDER MANAGEMENT FEATURE ("Đơn hàng")
// =================================================

// Dữ liệu đơn hàng nhúng trực tiếp trong JS
const duLieuDonHang = `DH001,Nguyễn Văn A,2024-01-15,Mới đặt,Doraemon Tập 1:2:20000;Conan Tập 5:1:18000
DH002,Trần Thị B,2024-01-16,Đã xử lý,One Piece Tập 10:3:22000;Harry Potter Tập 1:1:25000
DH003,Lê Văn C,2024-01-17,Đã giao,Dragon Ball Tập 4:2:23000
DH004,Phạm Thị D,2024-01-18,Mới đặt,Death Note Tập 1:1:22000;Tokyo Revengers Tập 3:2:20000
DH005,Hoàng Văn E,2024-01-19,Đã xử lý,Jujutsu Kaisen Tập 2:2:21000;Haikyuu Tập 9:1:18000
DH006,Võ Thị F,2024-01-20,Đã giao,Demon Slayer Tập 5:3:23000
DH007,Đặng Văn G,2024-01-21,Hủy,Hunter x Hunter Tập 7:1:22500
DH008,Bùi Thị H,2024-01-22,Mới đặt,One Punch Man Tập 3:2:19000;Black Butler Tập 4:1:20000
DH009,Ngô Văn I,2024-01-23,Đã xử lý,Fullmetal Alchemist Tập 6:1:21500;Sherlock Holmes:2:28000
DH010,Dương Thị K,2024-01-24,Đã giao,Pride and Prejudice:1:28000;To Kill a Mockingbird:1:30000`;

function taiDuLieuTuText() {
  try {
    const lines = duLieuDonHang.trim().split(/\r?\n/);

    donHangs = lines
      .map((line) => {
        const [maDH, khachHang, ngayDat, tinhTrang, dsSach] = line.split(",");
        if (!dsSach) return null;
        const sach = dsSach.split(";").map((sp) => {
          const [tenSach, soLuong, donGia] = sp.split(":");
          return { tenSach, soLuong: +soLuong, donGia: +donGia };
        });
        return { maDH, khachHang, ngayDat, tinhTrang, sach };
      })
      .filter(Boolean); // Lọc bỏ các dòng lỗi

    donHangsHienTai = [...donHangs];
    hienThiBangDH(donHangsHienTai);
  } catch (error) {
    console.error("Lỗi tải dữ liệu đơn hàng:", error);
    adminContent.innerHTML +=
      "<p style='color: red;'>Lỗi: Không thể tải dữ liệu đơn hàng.</p>";
  }
}

function hienThiBangDH(ds) {
  const tbody = document.querySelector("#orderTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const totalPages = Math.ceil(ds.length / perPageOrders);

  const start = (currentPageOrders - 1) * perPageOrders;
  const end = start + perPageOrders;
  const pageData = ds.slice(start, end);

  pageData.forEach((dh) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${dh.maDH}</td>
        <td>${dh.khachHang}</td>
        <td>${dh.ngayDat}</td>
        <td>${dh.tinhTrang}</td>
        <td>
          <button onclick="xemChiTietDH('${dh.maDH}')">Chi tiết</button>
          <button onclick="capNhatDH('${dh.maDH}')">Cập nhật</button>
        </td>
      `;
    tbody.appendChild(row);
  });

  const paginationContainer = document.querySelector("#pagination-orders");
  if (paginationContainer) {
    let paginationHTML = "";
    if (currentPageOrders > 1)
      paginationHTML += `<button onclick="doiTrangDH(${
        currentPageOrders - 1
      })">⬅ Trang trước</button>`;
    if (currentPageOrders < totalPages)
      paginationHTML += `<button onclick="doiTrangDH(${
        currentPageOrders + 1
      })">Trang sau ➡</button>`;
    paginationContainer.innerHTML = paginationHTML;
  }
}

function doiTrangDH(trang) {
  currentPageOrders = trang;
  hienThiBangDH(donHangsHienTai);
}

function locDonHang() {
  if (donHangs.length === 0) return;
  const from = document.getElementById("fromDate").value;
  const to = document.getElementById("toDate").value;
  const status = document.getElementById("statusFilter").value;

  donHangsHienTai = donHangs.filter((dh) => {
    let hopLe = true;
    if (from && new Date(dh.ngayDat) < new Date(from)) hopLe = false;
    if (to && new Date(dh.ngayDat) > new Date(to)) hopLe = false;
    if (status && dh.tinhTrang !== status) hopLe = false;
    return hopLe;
  });

  currentPageOrders = 1; // Reset về trang đầu khi lọc
  hienThiBangDH(donHangsHienTai);
}

function xemChiTietDH(ma) {
  const dh = donHangs.find((d) => d.maDH === ma);
  if (!dh) return alert("Không tìm thấy đơn!");
  let tong = dh.sach.reduce((acc, sp) => acc + sp.soLuong * sp.donGia, 0);

  const popupId = "popup-order-detail";
  if (document.getElementById(popupId)) return; // Avoid multiple popups

  const div = document.createElement("div");
  div.id = popupId;
  div.className = "popup-backdrop";
  div.innerHTML = `
        <div class="popup-content">
            <h3 style="text-align:center;">Chi tiết đơn ${dh.maDH}</h3>
            <p><strong>Khách hàng:</strong> ${dh.khachHang}</p>
            <p><strong>Ngày đặt:</strong> ${dh.ngayDat}</p>
            <p><strong>Tình trạng:</strong> ${dh.tinhTrang}</p>
            <hr>
            <table class="popup-table">
                <thead>
                    <tr><th>Sách</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr>
                </thead>
                <tbody>
                    ${dh.sach
                      .map(
                        (sp) => `
                        <tr>
                            <td>${sp.tenSach}</td>
                            <td>${sp.soLuong}</td>
                            <td>${sp.donGia.toLocaleString()} đ</td>
                            <td>${(
                              sp.soLuong * sp.donGia
                            ).toLocaleString()} đ</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
            <hr>
            <p style="text-align:right;"><strong>Tổng cộng:</strong> ${tong.toLocaleString()} đ</p>
            <div class="popup-actions">
                <button onclick="this.closest('.popup-backdrop').remove()">Đóng</button>
            </div>
        </div>
    `;
  document.body.appendChild(div);
}

function capNhatDH(ma) {
  const dh = donHangs.find((d) => d.maDH === ma);
  if (!dh) return alert("Không tìm thấy đơn hàng!");
  if (dh.tinhTrang === "Hủy")
    return alert("❌ Đơn hàng đã bị hủy, không thể cập nhật!");

  const bac = ["Mới đặt", "Đã xử lý", "Đã giao", "Hủy"];
  const chiSoHienTai = bac.indexOf(dh.tinhTrang);

  const popupId = "popup-order-update";
  if (document.getElementById(popupId)) return;

  const optionsHTML = bac
    .map((tt, i) => {
      const selected = tt === dh.tinhTrang ? "selected" : "";
      let disabled = tt !== "Hủy" && i < chiSoHienTai ? "disabled" : "";
      return `<option value="${tt}" ${selected} ${disabled}>${tt}</option>`;
    })
    .join("");

  const div = document.createElement("div");
  div.id = popupId;
  div.className = "popup-backdrop";
  div.innerHTML = `
        <div class="popup-content" style="width: 300px;">
            <h3>Cập nhật đơn ${ma}</h3>
            <select id="chonTinhTrang" class="popup-select">${optionsHTML}</select>
            <div class="popup-actions">
                <button id="btnOK_UpdateOrder">OK</button>
                <button onclick="this.closest('.popup-backdrop').remove()">Hủy</button>
            </div>
        </div>
    `;
  document.body.appendChild(div);

  document.getElementById("btnOK_UpdateOrder").onclick = function () {
    const newStatus = document.getElementById("chonTinhTrang").value;
    if (newStatus !== dh.tinhTrang) {
      dh.tinhTrang = newStatus;
      hienThiBangDH(donHangsHienTai);
    }
    div.remove();
  };
}

async function renderOrderView() {
  adminContent.innerHTML = `
        <div class="content-header">
            <h1>Quản lý Đơn hàng</h1>
        </div>
        <div class="content-body">
            <div class="donHangfilter">
                <label>Từ ngày: </label><input type="date" id="fromDate">
                <label>Đến ngày: </label><input type="date" id="toDate">
                <label>Tình trạng: </label>
                <select id="statusFilter">
                    <option value="">-- Tất cả --</option>
                    <option value="Mới Đặt">Mới Đặt</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Hủy">Hủy</option>
                </select>
                <button onclick="locDonHang()">Lọc đơn</button>
            </div>
            <table id="orderTable" class="content-table">
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tình trạng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div id="pagination-orders" class="pagination"></div>
        </div>
    `;
  taiDuLieuTuText(); // Không cần await vì đã không còn async
}

// =================================================
// SALES STATISTICS FEATURE ("Thống kê giá bán")
// =================================================

function renderSalesStatisticsView() {
  adminContent.innerHTML = `
        <div class="content-header">
            <h1>Thống kê giá bán</h1>
        </div>
        <div id="thongke-noidung" class="content-body">
            <div class="toolbar" style="margin-bottom: 20px; text-align: center;">
                <input type="text" id="timkiem_stats" placeholder="Tìm kiếm theo tên..." style="padding: 8px 12px; width: 300px;">
                <button id="btnNhapGia" style="background:#358b8b;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Nhập giá mới</button>
            </div>
            <table class="content-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá vốn</th>
                        <th>% Lợi nhuận</th>
                        <th>Giá bán</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="bangGiaban"></tbody>
            </table>
            <div id="phanTrang_stats" class="pagination"></div>
        </div>
    `;
  hienThiBangStats(data);
  addSalesStatisticsEventListeners();
}

function hienThiBangStats(danhSach) {
  const tbody = document.getElementById("bangGiaban");
  if (!tbody) return;

  const tongTrang = Math.ceil(danhSach.length / spMoiTrangStats);
  if (trangHienTaiStats > tongTrang)
    trangHienTaiStats = tongTrang > 0 ? tongTrang : 1;
  if (trangHienTaiStats < 1) trangHienTaiStats = 1;

  const batDau = (trangHienTaiStats - 1) * spMoiTrangStats;
  const ketThuc = batDau + spMoiTrangStats;
  const trangDuLieu = danhSach.slice(batDau, ketThuc);

  tbody.innerHTML = "";
  trangDuLieu.forEach((sp, index) => {
    const giaBan = sp.giaVon * (1 + sp.loiNhuan / 100);
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${sp.ten}</td>
            <td>${sp.giaVon.toLocaleString("vi-VN")} ₫</td>
            <td>${sp.loiNhuan}%</td>
            <td>${giaBan.toLocaleString("vi-VN")} ₫</td>
            <td><button class="btnSua" data-index="${
              batDau + index
            }">Sửa</button></td>
        `;
    tbody.appendChild(tr);
  });

  const phanTrang = document.getElementById("phanTrang_stats");
  if (phanTrang) {
    let paginationHTML = "";
    if (trangHienTaiStats > 1)
      paginationHTML += `<button onclick="doiTrangStats(${
        trangHienTaiStats - 1
      })">⬅ Trang trước</button>`;
    if (trangHienTaiStats < tongTrang)
      paginationHTML += `<button onclick="doiTrangStats(${
        trangHienTaiStats + 1
      })">Trang sau ➡</button>`;
    phanTrang.innerHTML = paginationHTML;
  }
}

function doiTrangStats(trang) {
  trangHienTaiStats = trang;
  hienThiBangStats(data);
}

function addSalesStatisticsEventListeners() {
  // Search
  document.getElementById("timkiem_stats").addEventListener("input", (e) => {
    const tuKhoa = e.target.value.toLowerCase();
    const loc = data.filter((sp) => sp.ten.toLowerCase().includes(tuKhoa));
    hienThiBangStats(loc);
  });

  // Add new price popup
  document.getElementById("btnNhapGia").addEventListener("click", () => {
    // Add popup logic here
    alert("Chức năng nhập giá mới đang được phát triển.");
  });

  // Edit price listener
  document.querySelector("#bangGiaban").addEventListener("click", (e) => {
    if (e.target.classList.contains("btnSua")) {
      const index = e.target.getAttribute("data-index");
      // Add edit popup logic here
      alert(`Chức năng sửa sản phẩm với index ${index} đang được phát triển.`);
    }
  });
}

// =================================================
// PHIẾU NHẬP SÁCH FEATURE
// =================================================

let danhSachPhieu = JSON.parse(localStorage.getItem("danhSachPhieu")) || [];

function saveData() {
  localStorage.setItem("danhSachPhieu", JSON.stringify(danhSachPhieu));
}

let editIndex = null;

// Format số có dấu phẩy
function formatNumber(v) {
  if (!v) return "";
  return Number(v).toLocaleString("vi-VN");
}

// yyyy-mm-dd → dd/mm/yyyy
function formatDate(ngay) {
  const p = ngay.split("-");
  return `${p[2]}/${p[1]}/${p[0]}`;
}

// Hiển thị giao diện
function hienThiPhieu() {
  adminContent.innerHTML = `
    <div class="phieu-container">
      <h2>Danh Mục Phiếu Nhập Sách</h2>

      <div class="phieu-toolbar">
        <button class="btn btn-add" id="btn-open-add">+ Thêm Phiếu Nhập</button>

        <input type="text" id="search" class="search-input" placeholder="Tìm theo ID / ngày / giá / số lượng..." />

        <select id="status-filter" class="filter-select">
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chưa hoàn thành</option>
          <option value="complete">Hoàn thành</option>
        </select>

        <button class="btn btn-clear" id="btn-clear-search">Xóa tìm</button>
      </div>

      <div style="overflow:auto">
        <table class="phieu-table content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày nhập</th>
              <th>Giá nhập (VNĐ)</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody id="phieu-body"></tbody>
        </table>
      </div>

      <form id="add-form" style="display: none; margin-top: 20px;">
        <h3 id="form-title">Thêm Phiếu Nhập</h3>
        <div class="form-row">
          <input type="date" id="ngay" required />
          <input type="number" id="gia" placeholder="Giá nhập (số nguyên)" required min="0" />
          <input type="number" id="soluong" placeholder="Số lượng" required min="0" />
          <button class="btn btn-save" id="btn-save">Lưu</button>
          <button class="btn btn-clear" id="btn-cancel" type="button">Hủy</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("btn-open-add").addEventListener("click", hienForm);
  document.getElementById("btn-save").addEventListener("click", luuPhieu);
  document.getElementById("btn-cancel").addEventListener("click", anForm);
  document.getElementById("search").addEventListener("input", renderRows);
  document
    .getElementById("status-filter")
    .addEventListener("change", renderRows);
  document.getElementById("btn-clear-search").addEventListener("click", () => {
    document.getElementById("search").value = "";
    document.getElementById("status-filter").value = "all";
    renderRows();
  });

  renderRows();
}

// Lọc danh sách
function getFilteredList() {
  const q = (document.getElementById("search")?.value || "")
    .trim()
    .toLowerCase();
  const status = document.getElementById("status-filter")?.value || "all";

  return danhSachPhieu.filter((p) => {
    if (status === "pending" && p.hoanthanh) return false;
    if (status === "complete" && !p.hoanthanh) return false;
    if (!q) return true;

    const haystack = `${p.id} ${p.ngay} ${formatDate(p.ngay)} ${p.gia} ${
      p.soluong
    }`.toLowerCase();
    return haystack.includes(q);
  });
}

// Render bảng
function renderRows() {
  const tbody = document.getElementById("phieu-body");
  const list = getFilteredList();

  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6">Không có phiếu nào khớp</td></tr>`;
    return;
  }

  tbody.innerHTML = list
    .map((p) => {
      const index = danhSachPhieu.indexOf(p);
      return `
      <tr>
        <td>${p.id}</td>
        <td>${formatDate(p.ngay)}</td>
        <td>${formatNumber(p.gia)}</td>
        <td>${p.soluong}</td>
        <td class="${p.hoanthanh ? "status-complete" : "status-pending"}">
          ${p.hoanthanh ? "Hoàn thành" : "Chưa hoàn thành"}
        </td>
        <td>
          ${
            p.hoanthanh
              ? ""
              : `
            <button class="btn btn-edit" onclick="suaPhieu(${index})">Sửa</button>
            <button class="btn btn-complete" onclick="hoanThanh(${index})">Hoàn Thành</button>
          `
          }
        </td>
      </tr>
    `;
    })
    .join("");
}

// Hiện form
function hienForm() {
  editIndex = null;
  document.getElementById("form-title").innerText = "Thêm Phiếu Nhập";
  document.getElementById("add-form").style.display = "block";
  document.getElementById("ngay").value = "";
  document.getElementById("gia").value = "";
  document.getElementById("soluong").value = "";
}

// Ẩn form
function anForm() {
  document.getElementById("add-form").style.display = "none";
  editIndex = null;
}

// Lưu phiếu
function luuPhieu(e) {
  e.preventDefault();
  const ngay = document.getElementById("ngay").value;
  const gia = document.getElementById("gia").value;
  const soluong = document.getElementById("soluong").value;

  if (!ngay || gia < 0 || soluong < 0) return alert("Dữ liệu không hợp lệ.");

  if (editIndex !== null) {
    danhSachPhieu[editIndex].ngay = ngay;
    danhSachPhieu[editIndex].gia = gia;
    danhSachPhieu[editIndex].soluong = soluong;
  } else {
    const newID = "PNH" + (danhSachPhieu.length + 1);
    danhSachPhieu.push({ id: newID, ngay, gia, soluong, hoanthanh: false });
  }

  saveData();
  anForm();
  renderRows();
}

// Sửa
function suaPhieu(index) {
  editIndex = index;
  const p = danhSachPhieu[index];
  document.getElementById("form-title").innerText = "Sửa Phiếu Nhập";
  document.getElementById("add-form").style.display = "block";
  document.getElementById("ngay").value = p.ngay;
  document.getElementById("gia").value = p.gia;
  document.getElementById("soluong").value = p.soluong;
}

// Hoàn thành
function hoanThanh(index) {
  if (confirm("Xác nhận hoàn thành phiếu này?")) {
    danhSachPhieu[index].hoanthanh = true;
    saveData();
    renderRows();
  }
}

// =================================================
// LOGIN & AUTHENTICATION
// =================================================

function showLoginModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.remove("hidden");
  document.getElementById("loginUsername").focus();
}

function hideLoginModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.add("hidden");
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginError").classList.add("hidden");
}

function handleLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorDiv = document.getElementById("loginError");

  // Validate input
  if (!username || !password) {
    errorDiv.textContent = "Vui lòng nhập đầy đủ thông tin!";
    errorDiv.classList.remove("hidden");
    return;
  }

  // Check credentials
  const admin = adminAccounts.find(
    (acc) => acc.username === username && acc.password === password
  );

  if (admin) {
    // Login successful
    currentAdmin = admin;
    localStorage.setItem("currentAdmin", JSON.stringify(admin));

    errorDiv.classList.add("hidden");
    hideLoginModal();

    // Update UI
    updateLoginButton();

    // Show admin content
    showAdminContent();

    // Initialize default view
    renderUserManagement();

    // Highlight default menu
    const menuLinks = document.querySelectorAll(
      ".admin-sidebar-content ul li a"
    );
    menuLinks.forEach((link) => link.classList.remove("active"));
    const defaultMenu = Array.from(menuLinks).find((link) => {
      const normalizedText = link.textContent.trim().replace(/\s+/g, " ");
      return (
        normalizedText === "Người dùng" || normalizedText.includes("Người dùng")
      );
    });
    if (defaultMenu) {
      defaultMenu.classList.add("active");
    }

    // Show success message
    alert(`✅ Đăng nhập thành công!\nChào mừng ${admin.name}!`);
  } else {
    // Login failed
    errorDiv.textContent = "❌ Tên đăng nhập hoặc mật khẩu không đúng!";
    errorDiv.classList.remove("hidden");
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginPassword").focus();
  }
}

function handleLogout() {
  if (confirm("Bạn có chắc muốn đăng xuất?")) {
    currentAdmin = null;
    localStorage.removeItem("currentAdmin");

    // Hide admin content
    hideAdminContent();

    // Update UI
    updateLoginButton();

    // Show login modal
    showLoginModal();
  }
}

function updateLoginButton() {
  const headerRight = document.querySelector(".header-right");

  if (currentAdmin) {
    // Show admin info and logout button
    headerRight.innerHTML = `
      <div class="admin-info">
        <i class="ri-admin-fill"></i>
        <span>${currentAdmin.name}</span>
      </div>
      <button class="login-btn" id="logoutBtn">
        <i class="ri-logout-box-line"></i>
        Đăng xuất
      </button>
    `;

    document
      .getElementById("logoutBtn")
      .addEventListener("click", handleLogout);
  } else {
    // Show login button
    headerRight.innerHTML = `
      <button class="login-btn" id="loginBtn">
        <i class="ri-login-box-line"></i>
        Đăng nhập
      </button>
    `;

    document
      .getElementById("loginBtn")
      .addEventListener("click", showLoginModal);
  }
}

function showAdminContent() {
  const sidebar = document.querySelector(".admin-sidebar");
  const adminContent = document.querySelector(".admin-content");

  if (sidebar) sidebar.style.display = "block";
  if (adminContent) adminContent.style.display = "block";
}

function hideAdminContent() {
  const sidebar = document.querySelector(".admin-sidebar");
  const adminContent = document.querySelector(".admin-content");

  if (sidebar) sidebar.style.display = "none";
  if (adminContent) {
    adminContent.style.display = "none";
    adminContent.innerHTML = "";
  }
}

// =================================================
// SIDEBARNAVIGATION & INITIALIZATION
// =================================================

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".admin-sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  // Check login state
  if (!currentAdmin) {
    // User not logged in - hide admin content and show login
    hideAdminContent();
    showLoginModal();
  } else {
    // User logged in - show admin content
    showAdminContent();

    // Initialize default view
    renderUserManagement();

    // Highlight default menu
    const menuLinks = document.querySelectorAll(
      ".admin-sidebar-content ul li a"
    );
    menuLinks.forEach((link) => link.classList.remove("active"));
    const defaultMenu = Array.from(menuLinks).find((link) => {
      const normalizedText = link.textContent.trim().replace(/\s+/g, " ");
      return (
        normalizedText === "Người dùng" || normalizedText.includes("Người dùng")
      );
    });
    if (defaultMenu) {
      defaultMenu.classList.add("active");
      console.log("✅ Menu 'Người dùng' đã được highlight");
    }
  }

  // Initialize login button
  updateLoginButton();

  // Login modal events
  const closeLoginModal = document.getElementById("closeLoginModal");
  const submitLogin = document.getElementById("submitLogin");

  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", () => {
      if (!currentAdmin) {
        alert("Bạn phải đăng nhập để sử dụng hệ thống!");
      } else {
        hideLoginModal();
      }
    });
  }

  if (submitLogin) {
    submitLogin.addEventListener("click", handleLogin);
  }

  // Press Enter to login
  const loginPasswordInput = document.getElementById("loginPassword");
  if (loginPasswordInput) {
    loginPasswordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    });
  }

  // Prevent closing modal when clicking outside if not logged in
  document.getElementById("loginModal").addEventListener("click", (e) => {
    if (e.target.id === "loginModal") {
      if (!currentAdmin) {
        alert("Bạn phải đăng nhập để sử dụng hệ thống!");
      } else {
        hideLoginModal();
      }
    }
  });

  const sections = {
    "Người dùng": renderUserManagement,
    Sách: null, // Parent menu
    "Danh mục sách": displayproduct,
    "Phiếu nhập sách": hienThiPhieu,
    "Số lượng tồn kho": renderInventoryView,
    "Đơn hàng": renderOrderView,
    "Thống kê giá bán": renderSalesStatisticsView,
  };

  // Only initialize menu if logged in
  if (currentAdmin) {
    const menuLinks = document.querySelectorAll(
      ".admin-sidebar-content ul li a"
    );

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }

    function getSectionNameFromLink(link) {
      // Chuẩn hóa text: bỏ khoảng trắng thừa, xuống dòng
      const linkText = link.textContent.trim().replace(/\s+/g, " ");
      // Find the key in the sections object that matches
      return (
        Object.keys(sections).find((key) => {
          const normalizedKey = key.trim().replace(/\s+/g, " ");
          return linkText.includes(normalizedKey);
        }) || null
      );
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        let parentLi = link.parentElement;
        let submenu = null;
        try {
          submenu = parentLi.querySelector(":scope > ul");
        } catch (err) {
          submenu = parentLi.querySelector("ul");
        }

        if (submenu) {
          submenu.classList.toggle("active");
          parentLi.classList.toggle("expanded");
          return;
        }

        menuLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        const sectionName = getSectionNameFromLink(link);

        if (sectionName && sections[sectionName]) {
          sections[sectionName]();
        } else {
          console.warn(
            `Section for link "${link.textContent.trim()}" không tồn tại.`
          );
        }

        if (window.innerWidth <= 768) {
          sidebar.classList.remove("open");
        }
      });
    });
  }
});
