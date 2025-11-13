// =================================================
// INITIAL DATA & GLOBAL VARIABLES
// =================================================

const adminContent = document.querySelector(".admin-content");
const LOW_STOCK_THRESHOLD = 5;

// ===== HÀM KHỞI TẠO 20 SẢN PHẨM MẪU =====
function initSampleProducts() {
  // KIỂM TRA: Nếu đã có dữ liệu thì CẢNH BÁO
  const existingProducts = localStorage.getItem("products");
  const existingTonKho = localStorage.getItem("tonKho");
  const existingGiaBan = localStorage.getItem("giaBan");

  if (existingProducts || existingTonKho || existingGiaBan) {
    const confirm = window.confirm(
      "CẢNH BÁO: Đã có dữ liệu trong hệ thống!\n\n" +
        "Khởi tạo lại sẽ XÓA TOÀN BỘ dữ liệu hiện tại:\n" +
        "- Sản phẩm\n" +
        "- Tồn kho\n" +
        "- Giá bán\n" +
        "- Đơn hàng\n" +
        "- Phiếu nhập\n\n" +
        "Bạn có CHẮC CHẮN muốn xóa và khởi tạo lại không?"
    );

    if (!confirm) {
      console.log("Hủy khởi tạo dữ liệu mẫu");
      return;
    }
  }

  const sampleProducts = [
    // Truyện tranh (5)
    {
      id: "SP001",
      name: "One Piece - Tập 1",
      author: "Oda Eiichiro",
      type: "truyện tranh",
      source: "img/P01.jpg",
    },
    {
      id: "SP002",
      name: "Conan - Thám Tử Lừng Danh",
      author: "Aoyama Gosho",
      type: "truyện tranh",
      source: "img/P02.jpg",
    },
    {
      id: "SP003",
      name: "Doraemon - Chú Mèo Máy",
      author: "Fujiko F. Fujio",
      type: "truyện tranh",
      source: "img/P03.jpg",
    },
    {
      id: "SP004",
      name: "Dragon Ball - 7 Viên Ngọc Rồng",
      author: "Toriyama Akira",
      type: "truyện tranh",
      source: "img/P04.jpg",
    },
    {
      id: "SP005",
      name: "Naruto - Ninja Làng Lá",
      author: "Kishimoto Masashi",
      type: "truyện tranh",
      source: "img/P05.jpg",
    },

    // Tiểu thuyết (5)
    {
      id: "SP006",
      name: "Dế Mèn Phiêu Lưu Ký",
      author: "Tô Hoài",
      type: "tiểu thuyết",
      source: "img/P06.jpg",
    },
    {
      id: "SP007",
      name: "Số Đỏ",
      author: "Vũ Trọng Phụng",
      type: "tiểu thuyết",
      source: "img/P07.jpg",
    },
    {
      id: "SP008",
      name: "Lão Hạc",
      author: "Nam Cao",
      type: "tiểu thuyết",
      source: "img/P08.jpg",
    },
    {
      id: "SP009",
      name: "Chí Phèo",
      author: "Nam Cao",
      type: "tiểu thuyết",
      source: "img/P09.jpg",
    },
    {
      id: "SP010",
      name: "Tắt Đèn",
      author: "Ngô Tất Tố",
      type: "tiểu thuyết",
      source: "img/P10.jpg",
    },

    // Văn học (5)
    {
      id: "SP011",
      name: "Truyện Kiều",
      author: "Nguyễn Du",
      type: "văn học",
      source: "img/P11.jpg",
    },
    {
      id: "SP012",
      name: "Nhật Ký Trong Tù",
      author: "Hồ Chí Minh",
      type: "văn học",
      source: "img/P12.jpg",
    },
    {
      id: "SP013",
      name: "Vợ Nhặt",
      author: "Kim Lân",
      type: "văn học",
      source: "img/P13.jpg",
    },
    {
      id: "SP014",
      name: "Hai Đứa Trẻ",
      author: "Thạch Lam",
      type: "văn học",
      source: "img/P14.jpg",
    },
    {
      id: "SP015",
      name: "Cô Bé Bán Diêm",
      author: "Andersen",
      type: "văn học",
      source: "img/P15.jpg",
    },

    // Trinh thám (5)
    {
      id: "SP016",
      name: "Sherlock Holmes - Con Chó Baskerville",
      author: "Arthur Conan Doyle",
      type: "trinh thám",
      source: "img/P16.jpg",
    },
    {
      id: "SP017",
      name: "Án Mạng Trên Chuyến Tàu Phương Đông",
      author: "Agatha Christie",
      type: "trinh thám",
      source: "img/P17.jpg",
    },
    {
      id: "SP018",
      name: "Cái Chết Không Có Lời Giải",
      author: "Higashino Keigo",
      type: "trinh thám",
      source: "img/P18.jpg",
    },
    {
      id: "SP019",
      name: "Vụ Án Mật Thất",
      author: "Dan Brown",
      type: "trinh thám",
      source: "img/P19.jpg",
    },
    {
      id: "SP020",
      name: "Thám Tử Kindaichi",
      author: "Seimaru Amagi",
      type: "trinh thám",
      source: "img/P20.jpg",
    },
  ];

  localStorage.setItem("products", JSON.stringify(sampleProducts));

  // Tạo giá bán
  const samplePrices = sampleProducts.map((sp) => ({
    id: sp.id,
    name: sp.name,
    giaVon: Math.floor(Math.random() * 50000) + 30000,
    loiNhuan: Math.floor(Math.random() * 20) + 10,
    giaBan: 0,
  }));
  samplePrices.forEach((item) => {
    item.giaBan = Math.round(item.giaVon * (1 + item.loiNhuan / 100));
  });
  localStorage.setItem("giaBan", JSON.stringify(samplePrices));

  // Tạo tồn kho cho tất cả 20 sản phẩm
  const sampleInventory = sampleProducts.map((sp) => {
    const quantity = Math.floor(Math.random() * 50) + 20; // Số lượng 20-69
    return {
      productId: sp.id,
      quantity: quantity,
      soLuongTon: quantity, // Đồng bộ với quantity
      ngayNhap: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };
  });
  localStorage.setItem("tonKho", JSON.stringify(sampleInventory));

  // Cập nhật stock vào products
  sampleProducts.forEach((sp, index) => {
    sp.stock = sampleInventory[index].quantity;
  });
  localStorage.setItem("products", JSON.stringify(sampleProducts));

  // Tạo 20 phiếu nhập mẫu (đã hoàn thành)
  const samplePhieuNhap = sampleProducts.map((sp, index) => ({
    id: `PNH${index + 1}`,
    productId: sp.id,
    ngay: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    gia: Math.floor(Math.random() * 40000) + 25000,
    soluong: Math.floor(Math.random() * 30) + 10,
    hoanthanh: true,
  }));
  localStorage.setItem("danhSachPhieu", JSON.stringify(samplePhieuNhap));

  // Tạo 20 đơn hàng mẫu
  const sampleOrders = [];
  const statuses = ["Mới Đặt", "Đang Giao", "Hoàn Thành", "Đã Hủy"];
  for (let i = 1; i <= 20; i++) {
    const randomProducts = [];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 sản phẩm
    for (let j = 0; j < numItems; j++) {
      const randomProduct =
        sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      randomProducts.push({
        id: randomProduct.id,
        name: randomProduct.name,
        quantity: Math.floor(Math.random() * 3) + 1,
        price:
          samplePrices.find((p) => p.id === randomProduct.id)?.giaBan || 50000,
      });
    }
    sampleOrders.push({
      id: `DH${String(i).padStart(3, "0")}`,
      customer: `Khách hàng ${i}`,
      phone: `09${Math.floor(Math.random() * 100000000)}`,
      address: `Địa chỉ ${i}`,
      products: randomProducts,
      total: randomProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
  }
  localStorage.setItem("orders", JSON.stringify(sampleOrders));

  // Cập nhật 20 người dùng vào localStorage
  const usersForStorage = danhSachNguoiDung.map((user) => ({
    username: user.tenDangNhap,
    password: user.matKhau,
    email: user.email,
    fullName: user.hoTen,
    phone: user.sdt,
    address: user.diaChi || "",
    gender: user.gioiTinh || "Khác",
    status: user.trangThai,
  }));
  localStorage.setItem("users", JSON.stringify(usersForStorage));

  alert(
    "🎉 Đã khởi tạo đầy đủ dữ liệu mẫu:\n\n" +
      "20 sản phẩm\n" +
      "20 người dùng\n" +
      "20 phiếu nhập\n" +
      "20 đơn hàng\n" +
      "Tồn kho & Giá bán\n\n" +
      "Reload trang để xem."
  );
  location.reload();
}
// Export để console có thể gọi
window.initSampleProducts = initSampleProducts;

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

// Hàm cập nhật badge thông báo đơn hàng mới
function updateOrderNotificationBadge() {
  const ordersFromUser = JSON.parse(localStorage.getItem("orders")) || [];
  const newOrdersCount = ordersFromUser.filter(
    (order) => order.status === "Mới Đặt"
  ).length;
  const badge = document.getElementById("orderNotificationBadge");

  if (badge) {
    if (newOrdersCount > 0) {
      badge.textContent = newOrdersCount;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  }
}

// Dữ liệu người dùng
let danhSachNguoiDung = [
  {
    id: 1,
    tenDangNhap: "truongtrungkien",
    matKhau: "123456",
    email: "Kien@gmail.com",
    hoTen: "Trương Trung Kiên",
    gioiTinh: "Nam",
    sdt: "0123456789",
    trangThai: "Hoạt động",
  },
  {
    id: 2,
    tenDangNhap: "nguyenvana",
    matKhau: "abcdef",
    email: "NguyenVanA@gmail.com",
    hoTen: "Nguyễn Văn A",
    gioiTinh: "Nam",
    sdt: "0435412454",
    trangThai: "Khóa",
  },
  {
    id: 3,
    tenDangNhap: "hoang123",
    matKhau: "hoang456",
    email: "Hoang@gmail.com",
    hoTen: "Hoàng Văn B",
    gioiTinh: "Nam",
    sdt: "0231412454",
    trangThai: "Hoạt động",
  },
  {
    id: 4,
    tenDangNhap: "tranvanc",
    matKhau: "tran456",
    email: "TranVanC@gmail.com",
    hoTen: "Trần Văn C",
    gioiTinh: "Nam",
    sdt: "0231415254",
    trangThai: "Hoạt động",
  },
  {
    id: 5,
    tenDangNhap: "lethid",
    matKhau: "le123",
    email: "LeThiD@gmail.com",
    hoTen: "Lê Thị D",
    gioiTinh: "Nữ",
    sdt: "0231413474",
    trangThai: "Hoạt động",
  },
  {
    id: 6,
    tenDangNhap: "phamvanem",
    matKhau: "pham456",
    email: "PhamVanEm@gmail.com",
    hoTen: "Phạm Văn Em",
    gioiTinh: "Nam",
    sdt: "0231443474",
    trangThai: "Hoạt động",
  },
  {
    id: 7,
    tenDangNhap: "nguyenthif",
    matKhau: "nguyen789",
    email: "NguyenThiF@gmail.com",
    hoTen: "Nguyễn Thị F",
    gioiTinh: "Nữ",
    sdt: "0231413554",
    trangThai: "Hoạt động",
  },
  {
    id: 8,
    tenDangNhap: "dinhvangg",
    matKhau: "dinh123",
    email: "DinhVanG@gmail.com",
    hoTen: "Đinh Văn G",
    gioiTinh: "Nam",
    sdt: "0255413554",
    trangThai: "Hoạt động",
  },
  {
    id: 9,
    tenDangNhap: "vuhohh",
    matKhau: "vu456",
    email: "VuHoHh@gmail.com",
    hoTen: "Vũ Hoàng H",
    gioiTinh: "Nam",
    sdt: "0255421254",
    trangThai: "Hoạt động",
  },
  {
    id: 10,
    tenDangNhap: "tranthii",
    matKhau: "tran789",
    email: "TranThiI@gmail.com",
    hoTen: "Trần Thị I",
    gioiTinh: "Nữ",
    sdt: "0377413554",
    trangThai: "Khóa",
  },
  {
    id: 11,
    tenDangNhap: "buivanj",
    matKhau: "bui123",
    email: "BuiVanJ@gmail.com",
    hoTen: "Bùi Văn J",
    gioiTinh: "Nam",
    sdt: "0388413554",
    trangThai: "Hoạt động",
  },
  {
    id: 12,
    tenDangNhap: "dothik",
    matKhau: "do456",
    email: "DoThiK@gmail.com",
    hoTen: "Đỗ Thị K",
    gioiTinh: "Nữ",
    sdt: "0399413554",
    trangThai: "Hoạt động",
  },
  {
    id: 13,
    tenDangNhap: "hoangvanl",
    matKhau: "hoang789",
    email: "HoangVanL@gmail.com",
    hoTen: "Hoàng Văn L",
    gioiTinh: "Nam",
    sdt: "0366413554",
    trangThai: "Hoạt động",
  },
  {
    id: 14,
    tenDangNhap: "ngothim",
    matKhau: "ngo123",
    email: "NgoThiM@gmail.com",
    hoTen: "Ngô Thị M",
    gioiTinh: "Nữ",
    sdt: "0355413554",
    trangThai: "Hoạt động",
  },
  {
    id: 15,
    tenDangNhap: "lyhoangn",
    matKhau: "ly456",
    email: "LyHoangN@gmail.com",
    hoTen: "Lý Hoàng N",
    gioiTinh: "Nam",
    sdt: "0344413554",
    trangThai: "Hoạt động",
  },
  {
    id: 16,
    tenDangNhap: "dangthio",
    matKhau: "dang789",
    email: "DangThiO@gmail.com",
    hoTen: "Đặng Thị O",
    gioiTinh: "Nữ",
    sdt: "0333413554",
    trangThai: "Khóa",
  },
  {
    id: 17,
    tenDangNhap: "duongvanp",
    matKhau: "duong123",
    email: "DuongVanP@gmail.com",
    hoTen: "Dương Văn P",
    gioiTinh: "Nam",
    sdt: "0322413554",
    trangThai: "Hoạt động",
  },
  {
    id: 18,
    tenDangNhap: "tathiq",
    matKhau: "ta456",
    email: "TaThiQ@gmail.com",
    hoTen: "Tạ Thị Q",
    gioiTinh: "Nữ",
    sdt: "0311413554",
    trangThai: "Hoạt động",
  },
  {
    id: 19,
    tenDangNhap: "maihoanr",
    matKhau: "mai789",
    email: "MaiHoangR@gmail.com",
    hoTen: "Mai Hoàng R",
    gioiTinh: "Nam",
    sdt: "0399423554",
    trangThai: "Hoạt động",
  },
  {
    id: 20,
    tenDangNhap: "phanthis",
    matKhau: "phan123",
    email: "PhanThiS@gmail.com",
    hoTen: "Phan Thị S",
    gioiTinh: "Nữ",
    sdt: "0388433554",
    trangThai: "Hoạt động",
  },
];

// ===== ĐỒNG BỘ NGƯỜI DÙNG VỚI LOCALSTORAGE =====
// Chuyển đổi format từ Admin sang User
const usersForLocalStorage = danhSachNguoiDung.map((user) => ({
  username: user.tenDangNhap,
  password: user.matKhau,
  email: user.email,
  fullName: user.hoTen,
  phone: user.sdt,
  address: user.diaChi || "",
  gender: user.gioiTinh || "Khác",
  status: user.trangThai,
}));

// Chỉ lưu nếu chưa có dữ liệu users
if (!localStorage.getItem("users")) {
  console.log("Chưa có dữ liệu users - Khởi tạo lần đầu...");
  localStorage.setItem("users", JSON.stringify(usersForLocalStorage));
  console.log(
    "Đã lưu " + usersForLocalStorage.length + " users vào localStorage"
  );
  console.log("Danh sách users:", usersForLocalStorage);
} else {
  console.log("Đã có dữ liệu users - Giữ nguyên");
  const existingUsers = JSON.parse(localStorage.getItem("users"));
  console.log("Số users hiện có:", existingUsers.length);
}

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
    stock: 0,
    source: "img/P03.jpg",
  },
  {
    id: "P04",
    name: "Harry Potter Tập 1",
    author: "J.K. Rowling",
    type: "tiểu thuyết",
    cost: 25000,
    stock: 0,
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
    stock: 0,
    source: "img/P06.jpg",
  },
  {
    id: "P07",
    name: "Dragon Ball Tập 4",
    author: "Akira Toriyama",
    type: "truyện tranh",
    cost: 23000,
    stock: 0,
    source: "img/P07.jpg",
  },
  {
    id: "P08",
    name: "Black Clover Tập 6",
    author: "Yūki Tabata",
    type: "truyện tranh",
    cost: 18500,
    stock: 0,
    source: "img/P08.jpg",
  },
  {
    id: "P09",
    name: "Moby Dick",
    author: "Herman Melville",
    type: "văn học",
    cost: 27000,
    stock: 0,
    source: "img/P09.jpg",
  },
  {
    id: "P10",
    name: "Fairy Tail Tập 12",
    author: "Hiro Mashima",
    type: "truyện tranh",
    cost: 21000,
    stock: 0,
    source: "img/P10.jpg",
  },
  {
    id: "P11",
    name: "Death Note Tập 1",
    author: "Tsugumi Ohba",
    type: "truyện tranh",
    cost: 22000,
    stock: 0,
    source: "img/P11.jpg",
  },
  {
    id: "P12",
    name: "Tokyo Revengers Tập 3",
    author: "Ken Wakui",
    type: "truyện tranh",
    cost: 20000,
    stock: 0,
    source: "img/P12.jpg",
  },
  {
    id: "P13",
    name: "Jujutsu Kaisen Tập 2",
    author: "Gege Akutami",
    type: "truyện tranh",
    cost: 21000,
    stock: 0,
    source: "img/P13.jpg",
  },
  {
    id: "P14",
    name: "Haikyuu Tập 9",
    author: "Haruichi Furudate",
    type: "truyện tranh",
    cost: 18000,
    stock: 0,
    source: "img/P14.jpg",
  },
  {
    id: "P15",
    name: "Demon Slayer Tập 5",
    author: "Koyoharu Gotouge",
    type: "truyện tranh",
    cost: 23000,
    stock: 0,
    source: "img/P15.jpg",
  },
  {
    id: "P16",
    name: "Hunter x Hunter Tập 7",
    author: "Yoshihiro Togashi",
    type: "truyện tranh",
    cost: 22500,
    stock: 0,
    source: "img/P16.jpg",
  },
  {
    id: "P17",
    name: "One Punch Man Tập 3",
    author: "ONE",
    type: "truyện tranh",
    cost: 19000,
    stock: 0,
    source: "img/P17.jpg",
  },
  {
    id: "P18",
    name: "Black Butler Tập 4",
    author: "Yana Toboso",
    type: "truyện tranh",
    cost: 20000,
    stock: 0,
    source: "img/P18.jpg",
  },
  {
    id: "P19",
    name: "Fullmetal Alchemist Tập 6",
    author: "Hiromu Arakawa",
    type: "truyện tranh",
    cost: 21500,
    stock: 0,
    source: "img/P19.jpg",
  },
  {
    id: "P20",
    name: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    type: "trinh thám",
    cost: 28000,
    stock: 0,
    source: "img/P20.jpg",
  },
];

// ===== KHỞI TẠO DỮ LIỆU LẦN ĐẦU (CHỈ KHI CHƯA CÓ) =====
if (!localStorage.getItem("products")) {
  console.log("Chưa có dữ liệu sản phẩm - Khởi tạo lần đầu...");
  localStorage.setItem("products", JSON.stringify(products));
} else {
  console.log("Đã có dữ liệu sản phẩm - Giữ nguyên");
}

let types = ["truyện tranh", "tiểu thuyết", "văn học", "trinh thám"];
if (!localStorage.getItem("types")) {
  localStorage.setItem("types", JSON.stringify(types));
}

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
  // Lấy danh sách thể loại từ localStorage
  const types = JSON.parse(localStorage.getItem("types")) || [];

  const sel = document.getElementById("theloai");
  if (!sel) return;

  // Tạo options từ danh sách thể loại đã quản lý
  sel.innerHTML =
    '<option value="">-- Chọn loại --</option>' +
    types
      .sort() // Sắp xếp A-Z
      .map((t) => `<option value="${t}">${t}</option>`)
      .join("");
}

// Data for Sales Statistics - Lấy từ localStorage
function loadSalesData() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const giaBan = JSON.parse(localStorage.getItem("giaBan")) || [];

  // Nếu chưa có giá bán, tạo mặc định
  if (giaBan.length === 0 && products.length > 0) {
    const newGiaBan = products.map((sp) => ({
      id: sp.id,
      name: sp.name,
      giaVon: 20000,
      loiNhuan: 20,
      giaBan: 24000,
    }));
    localStorage.setItem("giaBan", JSON.stringify(newGiaBan));
    return newGiaBan.map((item) => ({
      id: item.id,
      ten: item.name,
      giaVon: item.giaVon,
      loiNhuan: item.loiNhuan,
    }));
  }

  // Chuyển đổi format để hiển thị
  return giaBan.map((item) => ({
    id: item.id,
    ten: item.name,
    giaVon: item.giaVon,
    loiNhuan: item.loiNhuan,
  }));
}

let data = loadSalesData();

let trangHienTaiStats = 1;
const spMoiTrangStats = 5;

// Data for Order Management
let donHangs = [];
let donHangsHienTai = [];
let currentPageOrders = 1;
const perPageOrders = 10;
let danhSachSP = JSON.parse(localStorage.getItem("products")) || [];

// Pagination variables
let userCurrentPage = 1;
let userItemsPerPage = 10;
let phieuCurrentPage = 1;
let phieuItemsPerPage = 10;

// =================================================
// USER MANAGEMENT FEATURE ("Người dùng")
// =================================================

function renderUserManagement() {
  // ĐỌC USERS TỪ LOCALSTORAGE
  const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];

  adminContent.innerHTML = `
    <div class="phieu-container">
      <h2>Quản lý Người Dùng</h2>
      <div class="phieu-toolbar">
        <div style="background: #f0f8ff; padding: 8px 15px; border-radius: 6px; border: 1px solid #0d6efd; color: #0d6efd; font-weight: 600;">
          👥 Tổng số: ${usersFromStorage.length} người dùng
        </div>
        <input type="text" id="userSearchInput" class="search-input" placeholder="Tìm theo tên, email, SĐT, họ tên..." style="flex: 1; min-width: 300px;" />
        <select id="userStatusFilter" class="filter-select">
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="locked">Bị khóa</option>
        </select>
        <button class="btn btn-clear" id="btnClearUserSearch">Xóa tìm</button>
      </div>
      <div class="khuVucBangNguoiDung">
      </div>
      <div id="userPagination" class="pagination-container"></div>
    </div>
  `;

  hienThiNguoiDung(usersFromStorage);
  ganChucNangTimKiem();
}

function hienThiNguoiDung(danhSach) {
  const khuVucBangNguoiDung = document.querySelector(".khuVucBangNguoiDung");
  if (!khuVucBangNguoiDung) return;

  // Phân trang
  const totalItems = danhSach.length;
  const totalPages = Math.ceil(totalItems / userItemsPerPage);
  const startIndex = (userCurrentPage - 1) * userItemsPerPage;
  const endIndex = Math.min(startIndex + userItemsPerPage, totalItems);
  const displayUsers = danhSach.slice(startIndex, endIndex);

  // Lấy danh sách yêu cầu reset mật khẩu
  const resetRequests =
    JSON.parse(localStorage.getItem("passwordResetRequests")) || [];
  const pendingRequests = resetRequests.filter(
    (req) => req.status === "pending"
  );

  let htmlBang = ` 
    <table class="phieu-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên Đăng Nhập</th>
          <th>Mật Khẩu</th>
          <th>Email</th>
          <th>Họ Tên</th>
          <th>Giới Tính</th>
          <th>SĐT</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
  `;

  displayUsers.forEach((nguoiDung, index) => {
    // Xử lý tương thích field names từ Home.js và TrangAdmin
    const username = nguoiDung.username || nguoiDung.tenDangNhap || "";
    const password = nguoiDung.password || nguoiDung.matKhau || "";
    const email = nguoiDung.email || "";
    const fullName = nguoiDung.fullName || nguoiDung.hoTen || "";
    const phone = nguoiDung.phone || nguoiDung.sdt || "";
    const gioiTinh = nguoiDung.gioiTinh || nguoiDung.gender || "Chưa rõ";
    const trangThai = nguoiDung.trangThai || "Hoạt động";

    // Kiểm tra xem user này có yêu cầu reset mật khẩu không
    const hasResetRequest = pendingRequests.some(
      (req) => req.username === username
    );

    const nutKhoaMo =
      trangThai === "Hoạt động"
        ? `<button class="btn btn-delete action-lock" data-username="${username}">Khóa</button>`
        : `<button class="btn btn-complete action-unlock" data-username="${username}">Mở Khóa</button>`;

    // Thêm badge nếu có yêu cầu reset
    const resetBadge = hasResetRequest
      ? `<span style="position:relative; display:inline-block;">
           <button class="btn btn-edit action-reset" data-username="${username}" style="position:relative;">Reset MK</button>
           <span style="position:absolute; top:-8px; right:-8px; background:#ff4757; color:white; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.3);">!</span>
         </span>`
      : `<button class="btn btn-edit action-reset" data-username="${username}">Reset MK</button>`;

    htmlBang += `
      <tr ${hasResetRequest ? 'style="background:#fff9e6;"' : ""}>
        <td>${startIndex + index + 1}</td>
        <td>
          ${username}
          ${
            hasResetRequest
              ? '<span style="color:#ff4757; font-size:12px; margin-left:4px;" title="Có yêu cầu reset mật khẩu">🔔</span>'
              : ""
          }
        </td>
        <td style="font-family: monospace;">
          <div style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <span id="password-${index}" data-password="${password.replace(
      /"/g,
      "&quot;"
    )}">********</span>
            <i class="fa-solid fa-eye" id="toggle-password-${index}" 
               style="cursor:pointer; color:#358b8b;" 
               data-index="${index}"
               title="Hiển thị mật khẩu"></i>
          </div>
        </td>
        <td>${email}</td>
        <td>${fullName}</td>
        <td>${gioiTinh}</td>
        <td>${phone}</td>
        <td><span class="${
          trangThai === "Hoạt động" ? "status-complete" : "status-pending"
        }" style="font-weight:600;">${trangThai}</span></td>
        <td>
          <div style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;">
            ${nutKhoaMo}
            ${resetBadge}
          </div>
        </td>
      </tr>
    `;
  });

  htmlBang += `</tbody></table>`;
  khuVucBangNguoiDung.innerHTML = htmlBang;
  renderUserPagination(totalItems, totalPages);
  ganSuKienHanhDong();
}

function renderUserPagination(totalItems, totalPages) {
  const paginationContainer = document.getElementById("userPagination");
  if (!paginationContainer) return;

  const startItem =
    totalItems === 0 ? 0 : (userCurrentPage - 1) * userItemsPerPage + 1;
  const endItem = Math.min(userCurrentPage * userItemsPerPage, totalItems);

  let paginationHTML = `
    <div class="pagination-info">
      Hiển thị ${startItem} - ${endItem} / ${totalItems} người dùng
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <div class="pagination-controls">
        <button class="pagination-btn" onclick="changeUserPage(1)" ${
          userCurrentPage === 1 ? "disabled" : ""
        }>
          <i class="ri-skip-back-mini-line"></i>
        </button>
        <button class="pagination-btn" onclick="changeUserPage(${
          userCurrentPage - 1
        })" ${userCurrentPage === 1 ? "disabled" : ""}>
          <i class="ri-arrow-left-s-line"></i>
        </button>
  `;

  const maxButtons = 5;
  let startPage = Math.max(1, userCurrentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-btn ${
        i === userCurrentPage ? "active" : ""
      }" onclick="changeUserPage(${i})">
        ${i}
      </button>
    `;
  }

  paginationHTML += `
        <button class="pagination-btn" onclick="changeUserPage(${
          userCurrentPage + 1
        })" ${
    userCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-arrow-right-s-line"></i>
        </button>
        <button class="pagination-btn" onclick="changeUserPage(${totalPages})" ${
    userCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-skip-forward-mini-line"></i>
        </button>
      </div>
      <div class="page-size-selector">
        <label>Hiển thị:</label>
        <select onchange="changeUserPageSize(this.value)">
          <option value="10" ${
            userItemsPerPage === 10 ? "selected" : ""
          }>10</option>
          <option value="20" ${
            userItemsPerPage === 20 ? "selected" : ""
          }>20</option>
          <option value="50" ${
            userItemsPerPage === 50 ? "selected" : ""
          }>50</option>
        </select>
      </div>
    </div>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

window.changeUserPage = function (page) {
  userCurrentPage = page;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userSearchInput = document.getElementById("userSearchInput");
  const userStatusFilter = document.getElementById("userStatusFilter");

  if (userSearchInput && userSearchInput.value) {
    // Re-apply search
    ganChucNangTimKiem();
    document
      .getElementById("userSearchInput")
      .dispatchEvent(new Event("input"));
  } else {
    hienThiNguoiDung(users);
  }
};

window.changeUserPageSize = function (size) {
  userItemsPerPage = parseInt(size);
  userCurrentPage = 1;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  hienThiNguoiDung(users);
};

function ganChucNangTimKiem() {
  const userSearchInput = document.getElementById("userSearchInput");
  const userStatusFilter = document.getElementById("userStatusFilter");
  const btnClearUserSearch = document.getElementById("btnClearUserSearch");

  const thucHienTimKiem = () => {
    userCurrentPage = 1; // Reset to page 1 when searching
    const chuoiTimKiem = (userSearchInput?.value || "").trim().toLowerCase();
    const statusFilter = userStatusFilter?.value || "all";
    const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];

    let ketQuaLoc = usersFromStorage;

    // Lọc theo trạng thái
    if (statusFilter === "active") {
      ketQuaLoc = ketQuaLoc.filter(
        (u) => (u.trangThai || "Hoạt động") === "Hoạt động"
      );
    } else if (statusFilter === "locked") {
      ketQuaLoc = ketQuaLoc.filter(
        (u) => (u.trangThai || "Hoạt động") !== "Hoạt động"
      );
    }

    // Lọc theo từ khóa tìm kiếm
    if (chuoiTimKiem) {
      ketQuaLoc = ketQuaLoc.filter(
        (nguoiDung) =>
          (nguoiDung.username || nguoiDung.tenDangNhap || "")
            .toLowerCase()
            .includes(chuoiTimKiem) ||
          (nguoiDung.fullName || nguoiDung.hoTen || "")
            .toLowerCase()
            .includes(chuoiTimKiem) ||
          (nguoiDung.email || "").toLowerCase().includes(chuoiTimKiem) ||
          (nguoiDung.phone || nguoiDung.sdt || "")
            .toLowerCase()
            .includes(chuoiTimKiem)
      );
    }

    hienThiNguoiDung(ketQuaLoc);
  };

  if (userSearchInput) {
    userSearchInput.addEventListener("input", thucHienTimKiem);
  }
  if (userStatusFilter) {
    userStatusFilter.addEventListener("change", thucHienTimKiem);
  }
  if (btnClearUserSearch) {
    btnClearUserSearch.addEventListener("click", () => {
      if (userSearchInput) userSearchInput.value = "";
      if (userStatusFilter) userStatusFilter.value = "all";
      thucHienTimKiem();
    });
  }
}

function xuLyHanhDong(username, hanhDong) {
  // Đọc users từ localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(
    (u) => (u.username || u.tenDangNhap) === username
  );

  if (userIndex === -1) {
    alert("Không tìm thấy người dùng!");
    return;
  }

  const nguoiDungCanXuLy = users[userIndex];
  const displayName = nguoiDungCanXuLy.username || nguoiDungCanXuLy.tenDangNhap;

  switch (hanhDong) {
    case "reset":
      // Kiểm tra xem có yêu cầu reset không
      let resetRequests =
        JSON.parse(localStorage.getItem("passwordResetRequests")) || [];
      const pendingRequest = resetRequests.find(
        (req) => req.username === username && req.status === "pending"
      );

      let confirmMessage = `Bạn có chắc muốn reset mật khẩu cho ${displayName}?`;
      if (pendingRequest) {
        confirmMessage =
          `User "${displayName}" đã gửi yêu cầu reset mật khẩu!\n\n` +
          `Thời gian gửi: ${pendingRequest.timestamp}\n\n` +
          `Bạn có muốn reset mật khẩu về '123' không?`;
      }

      if (confirm(confirmMessage)) {
        users[userIndex].password = "123";
        users[userIndex].matKhau = "123";
        localStorage.setItem("users", JSON.stringify(users));

        // Xóa yêu cầu reset nếu có
        if (pendingRequest) {
          resetRequests = resetRequests.filter(
            (req) => req.id !== pendingRequest.id
          );
          localStorage.setItem(
            "passwordResetRequests",
            JSON.stringify(resetRequests)
          );
        }

        alert(
          `Đã reset mật khẩu cho ${displayName} thành công!\n\nMật khẩu mới là '123'.\n\nVui lòng thông báo cho người dùng.`
        );
        renderUserManagement(); // Reload lại trang
      }
      break;
    case "lock":
      if (confirm(`Bạn có chắc muốn KHÓA tài khoản ${displayName}?`)) {
        users[userIndex].trangThai = "Khóa";
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Tài khoản ${displayName} đã bị KHÓA.`);
        renderUserManagement(); // Reload lại trang
      }
      break;
    case "unlock":
      if (confirm(`Bạn có chắc muốn MỞ KHÓA tài khoản ${displayName}?`)) {
        users[userIndex].trangThai = "Hoạt động";
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Tài khoản ${displayName} đã được MỞ KHÓA.`);
        renderUserManagement(); // Reload lại trang
      }
      break;
  }
}

function ganSuKienHanhDong() {
  adminContent.querySelectorAll(".action-reset").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const username = e.currentTarget.dataset.username;
      xuLyHanhDong(username, "reset");
    });
  });

  adminContent
    .querySelectorAll(".action-lock, .action-unlock")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const username = e.currentTarget.dataset.username;
        const actionType = e.currentTarget.classList.contains("action-lock")
          ? "lock"
          : "unlock";
        xuLyHanhDong(username, actionType);
      });
    });

  // Thêm event listener cho toggle password icons
  adminContent.querySelectorAll('[id^="toggle-password-"]').forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      const passwordSpan = document.getElementById(`password-${index}`);
      const password = passwordSpan.dataset.password;
      toggleUserPassword(index, password);
    });
  });
}

// ===== TOGGLE PASSWORD VISIBILITY =====
function toggleUserPassword(index, password) {
  const passwordSpan = document.getElementById(`password-${index}`);
  const toggleIcon = document.getElementById(`toggle-password-${index}`);

  if (passwordSpan && toggleIcon) {
    if (passwordSpan.textContent === "********") {
      // Hiển thị mật khẩu
      passwordSpan.textContent = password;
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
      toggleIcon.title = "Ẩn mật khẩu";
    } else {
      // Ẩn mật khẩu
      passwordSpan.textContent = "********";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
      toggleIcon.title = "Hiển thị mật khẩu";
    }
  }
}

// Export function to window
window.toggleUserPassword = toggleUserPassword;

// =================================================
// PRODUCT MANAGEMENT FEATURE ("Danh mục sách")
// =================================================

function displayproduct() {
  adminContent.innerHTML = `
    <div class="phieu-container">
      <h2>Quản lý sản phẩm</h2>

      <!-- Thanh công cụ -->
      <div class="phieu-toolbar">
        <button id="addProductBtn" class="btn btn-add"><i class="ri-add-box-fill"></i> Thêm sản phẩm</button>
        <button id="quanlytheloai" class="btn btn-edit"><i class="ri-price-tag-3-fill"></i> Quản lý thể loại</button>
        <input type="text" id="searchInput" class="search-input" placeholder="Tìm kiếm sản phẩm..." style="flex: 1; min-width: 300px;" />
      </div>
      <!-- Bảng danh sách sản phẩm -->
      <table class="phieu-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Mã</th>
            <th>Tên sản phẩm</th>
            <th>Tác Giả</th>
            <th>Thể loại</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody id="productTableBody">
        </tbody>
      </table>
      <!-- Phân trang -->
      <div id="productPagination" class="pagination-container"></div>
    </div>
<div id="productFormOverlay" class="overlay hidden">
  <div class="form-box">
    <h2 id="formTitle">Thêm sản phẩm</h2>
    
    <label>Hình ảnh (Chọn file):</label>
    <input type="file" id="fileHinhAnhSP" accept="image/*" style="margin-bottom: 15px;" />
    
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
    productCurrentPage = 1; // Reset về trang 1 khi tìm kiếm
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
    document.getElementById("fileHinhAnhSP").value = ""; // Reset file input
    loadTypesToDropdown();
    const sel = document.getElementById("theloai");
    sel.selectedIndex = 0;
    document.getElementById("productFormOverlay").classList.remove("hidden");
  });

  // ===== Mở form quản lý thể loại =====
  document.getElementById("quanlytheloai").addEventListener("click", () => {
    moFormQuanLyTheLoai();
  });

  // ===== Hủy form =====
  document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("productFormOverlay").classList.add("hidden");
  });

  // ===== Lưu sản phẩm =====
  document.getElementById("saveProductBtn").addEventListener("click", () => {
    // Lấy thông tin từ form
    const ma = document.getElementById("maSP").value.trim();
    const name = document.getElementById("tenSP").value.trim();
    const author = document.getElementById("tacGiaSP").value.trim();
    const type = document.getElementById("theloai").value.trim();

    // Kiểm tra thể loại
    if (!type) {
      alert("Vui lòng chọn thể loại!");
      return;
    }

    // Xử lý ảnh - chỉ dùng file upload
    let source = "";
    const fileInput = document.getElementById("fileHinhAnhSP");

    if (fileInput && fileInput.files && fileInput.files[0]) {
      // Nếu có file upload - đọc và chuyển thành base64
      const reader = new FileReader();
      reader.onload = function (e) {
        source = e.target.result; // Base64 string
        luuSanPham(ma, name, author, type, source);
      };
      reader.readAsDataURL(fileInput.files[0]);
      return; // Dừng lại đợi đọc file xong
    } else if (suaIndex !== null) {
      // Nếu đang sửa và không chọn ảnh mới, giữ nguyên ảnh cũ
      source = danhSachSP[suaIndex].source;
      luuSanPham(ma, name, author, type, source);
    } else {
      // Nếu thêm mới mà không chọn ảnh
      alert("Vui lòng chọn ảnh!");
      return;
    }
  });
}

// ===== HÀM LƯU SẢN PHẨM - TÁCH RA ĐỂ DỄ ĐỌC =====
function luuSanPham(ma, name, author, type, source) {
  // Kiểm tra tên sản phẩm
  if (!name) {
    alert("Vui lòng nhập tên sản phẩm!");
    return;
  }

  // KIỂM TRA TÊN TRÙNG - Quan trọng!
  const tenTrung = danhSachSP.find(
    (sp, index) =>
      sp.name.toLowerCase() === name.toLowerCase() && index !== suaIndex // Bỏ qua chính nó khi đang sửa
  );

  if (tenTrung) {
    alert(`Tên "${name}" đã tồn tại! Vui lòng đặt tên khác.`);
    return;
  }

  // Tạo object sản phẩm
  const spMoi = { id: ma, name, author, type, source };

  if (suaIndex === null) {
    // Thêm mới
    danhSachSP.push(spMoi);
    alert(`Đã thêm "${name}" thành công!`);
  } else {
    // Cập nhật
    danhSachSP[suaIndex] = spMoi;
    alert(`Đã cập nhật "${name}" thành công!`);
  }

  // Lưu vào localStorage
  localStorage.setItem("products", JSON.stringify(danhSachSP));

  // Đóng form và refresh bảng
  document.getElementById("productFormOverlay").classList.add("hidden");
  hienThiSanPham();
}

// Biến phân trang cho sản phẩm
let productCurrentPage = 1;
let productItemsPerPage = 10;

function hienThiSanPham(list = danhSachSP) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";

  // Tính toán phân trang
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / productItemsPerPage);
  const startIndex = (productCurrentPage - 1) * productItemsPerPage;
  const endIndex = Math.min(startIndex + productItemsPerPage, totalItems);
  const paginatedList = list.slice(startIndex, endIndex);

  paginatedList.forEach((sp) => {
    const index = danhSachSP.findIndex((item) => item.id === sp.id);
    const tr = document.createElement("tr");
    // Xử lý đường dẫn ảnh
    let imageSrc = sp.source;

    if (imageSrc) {
      if (imageSrc.startsWith("data:")) {
        // Giữ nguyên nếu là base64
        imageSrc = imageSrc;
      } else if (imageSrc.startsWith("img/")) {
        // Nếu đường dẫn bắt đầu bằng img/ (file trong TrangAdmin)
        imageSrc = imageSrc;
      } else if (imageSrc.startsWith("Pictures/")) {
        // Nếu đường dẫn bắt đầu bằng Pictures/ (file trong TrangUser)
        imageSrc = "../TrangUser/" + imageSrc;
      } else {
        // Các trường hợp khác, thử thêm ../TrangUser/
        imageSrc = "../TrangUser/" + imageSrc;
      }
    } else {
      // Nếu không có ảnh, dùng ảnh SVG placeholder
      imageSrc =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 100 150'%3E%3Crect fill='%23ddd' width='100' height='150'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
    }

    tr.innerHTML = `
      <td>
        <img src="${imageSrc}" class="product-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22150%22 viewBox=%220 0 100 150%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2214%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
      </td>
      <td>${sp.id}</td>
      <td>${sp.name}</td>
      <td>${sp.author}</td>
      <td>${sp.type}</td>
      <td>
        <div style="display:flex; gap:6px; justify-content:center;">
          <button class="btn btn-edit" onclick="moFormSua(${index})">
            <i class="ri-edit-2-fill"></i> Sửa
          </button>
          <button class="btn btn-delete" onclick="xoaSanPham(${index})">
            <i class="ri-delete-bin-6-fill"></i> Xóa
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Render phân trang
  renderProductPagination(totalItems, totalPages);
}

function renderProductPagination(totalItems, totalPages) {
  const paginationContainer = document.getElementById("productPagination");
  if (!paginationContainer) return;

  const startItem =
    totalItems === 0 ? 0 : (productCurrentPage - 1) * productItemsPerPage + 1;
  const endItem = Math.min(
    productCurrentPage * productItemsPerPage,
    totalItems
  );

  let paginationHTML = `
    <div class="pagination-info">
      Hiển thị ${startItem} - ${endItem} / ${totalItems} sản phẩm
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <div class="pagination-controls">
        <button class="pagination-btn" onclick="changeProductPage(1)" ${
          productCurrentPage === 1 ? "disabled" : ""
        }>
          <i class="ri-skip-back-mini-line"></i>
        </button>
        <button class="pagination-btn" onclick="changeProductPage(${
          productCurrentPage - 1
        })" ${productCurrentPage === 1 ? "disabled" : ""}>
          <i class="ri-arrow-left-s-line"></i>
        </button>
  `;

  // Hiển thị các số trang
  const maxButtons = 5;
  let startPage = Math.max(1, productCurrentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-btn ${
        i === productCurrentPage ? "active" : ""
      }" onclick="changeProductPage(${i})">
        ${i}
      </button>
    `;
  }

  paginationHTML += `
        <button class="pagination-btn" onclick="changeProductPage(${
          productCurrentPage + 1
        })" ${
    productCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-arrow-right-s-line"></i>
        </button>
        <button class="pagination-btn" onclick="changeProductPage(${totalPages})" ${
    productCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-skip-forward-mini-line"></i>
        </button>
      </div>
      <div class="page-size-selector">
        <label>Hiển thị:</label>
        <select onchange="changeProductPageSize(this.value)">
          <option value="10" ${
            productItemsPerPage === 10 ? "selected" : ""
          }>10</option>
          <option value="20" ${
            productItemsPerPage === 20 ? "selected" : ""
          }>20</option>
          <option value="50" ${
            productItemsPerPage === 50 ? "selected" : ""
          }>50</option>
          <option value="100" ${
            productItemsPerPage === 100 ? "selected" : ""
          }>100</option>
        </select>
      </div>
    </div>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

function changeProductPage(page) {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput ? searchInput.value.toLowerCase() : "";

  let list = danhSachSP;
  if (keyword) {
    list = danhSachSP.filter(
      (sp) =>
        sp.name.toLowerCase().includes(keyword) ||
        sp.id.toLowerCase().includes(keyword) ||
        sp.author.toLowerCase().includes(keyword)
    );
  }

  const totalPages = Math.ceil(list.length / productItemsPerPage);
  if (page >= 1 && page <= totalPages) {
    productCurrentPage = page;
    hienThiSanPham(list);
  }
}

function changeProductPageSize(size) {
  productItemsPerPage = parseInt(size);
  productCurrentPage = 1;
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput ? searchInput.value.toLowerCase() : "";

  let list = danhSachSP;
  if (keyword) {
    list = danhSachSP.filter(
      (sp) =>
        sp.name.toLowerCase().includes(keyword) ||
        sp.id.toLowerCase().includes(keyword) ||
        sp.author.toLowerCase().includes(keyword)
    );
  }
  hienThiSanPham(list);
}

// Mở form sửa sản phẩm
function moFormSua(index) {
  suaIndex = index;
  const sp = danhSachSP[index];

  document.getElementById("maSP").value = sp.id;
  document.getElementById("maSP").disabled = true;
  document.getElementById("tenSP").value = sp.name;
  document.getElementById("tacGiaSP").value = sp.author;
  // Note: Không thể hiển thị lại ảnh đã upload trong file input
  // User sẽ phải chọn lại ảnh nếu muốn thay đổi

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
  // Lấy danh sách thể loại từ localStorage
  const types = JSON.parse(localStorage.getItem("types")) || [];

  const sel = document.getElementById("theloai");
  if (!sel) return;

  // Tạo options từ danh sách thể loại đã quản lý
  sel.innerHTML =
    '<option value="">-- Chọn loại --</option>' +
    types
      .sort() // Sắp xếp A-Z
      .map((t) => `<option value="${t}">${t}</option>`)
      .join("");
}

// =================================================
// CATEGORY MANAGEMENT ("Quản lý thể loại")
// =================================================

function moFormQuanLyTheLoai() {
  const types = JSON.parse(localStorage.getItem("types")) || [];

  const popupHTML = `
    <div id="categoryManagementPopup" class="popup-backdrop">
      <div class="popup-content" style="width: 550px; max-width: 90%;">
        <h3>Quản lý Thể loại</h3>
        
        <div style="margin-bottom: 20px;">
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <input type="text" id="newCategoryInput" placeholder="Nhập tên thể loại mới..." 
                   style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" />
            <button id="addCategoryBtn" style="padding: 10px 20px; background: var(--main-bg-color); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
              <i class="ri-add-line"></i> Thêm
            </button>
          </div>
          
          <div style="max-height: 350px; overflow-y: auto; border: 1px solid #ddd; border-radius: 6px;">
            <table class="popup-table">
              <thead>
                <tr>
                  <th style="width: 60px; text-align: center;">STT</th>
                  <th>Tên thể loại</th>
                  <th style="width: 140px; text-align: center;">Hành động</th>
                </tr>
              </thead>
              <tbody id="categoryTableBody">
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="popup-actions">
          <button onclick="document.getElementById('categoryManagementPopup').remove()">Đóng</button>
        </div>
      </div>
    </div>
  `;

  // Remove existing popup if any
  const existingPopup = document.getElementById("categoryManagementPopup");
  if (existingPopup) existingPopup.remove();

  // Add popup to body
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Render category list
  renderCategoryList();

  // Add event listener for adding new category
  document
    .getElementById("addCategoryBtn")
    .addEventListener("click", themTheLoai);
  document
    .getElementById("newCategoryInput")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") themTheLoai();
    });
}

function renderCategoryList() {
  const types = JSON.parse(localStorage.getItem("types")) || [];
  const tbody = document.getElementById("categoryTableBody");

  if (!tbody) return;

  if (types.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 30px; color: #999; font-style: italic;">Chưa có thể loại nào</td></tr>`;
    return;
  }

  tbody.innerHTML = types
    .map(
      (type, index) => `
    <tr>
      <td style="text-align: center;">${index + 1}</td>
      <td>${type}</td>
      <td style="text-align: center;">
        <button class="btn-edit-category" data-index="${index}">
          <i class="ri-edit-2-fill"></i>
        </button>
        <button class="btn-delete-category" data-index="${index}">
          <i class="ri-delete-bin-6-fill"></i>
        </button>
      </td>
    </tr>
  `
    )
    .join("");

  // Add event listeners for edit and delete buttons
  tbody.querySelectorAll(".btn-edit-category").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      suaTheLoai(index);
    });
  });

  tbody.querySelectorAll(".btn-delete-category").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      xoaTheLoai(index);
    });
  });
}

function themTheLoai() {
  const input = document.getElementById("newCategoryInput");
  const newType = input.value.trim();

  if (!newType) {
    alert("Vui lòng nhập tên thể loại!");
    return;
  }

  const types = JSON.parse(localStorage.getItem("types")) || [];

  // Check if category already exists
  if (types.includes(newType)) {
    alert("Thể loại này đã tồn tại!");
    return;
  }

  // Add new category
  types.push(newType);
  localStorage.setItem("types", JSON.stringify(types));

  // Clear input
  input.value = "";

  // Refresh list
  renderCategoryList();

  alert(`Đã thêm thể loại "${newType}" thành công!`);
}

function suaTheLoai(index) {
  const types = JSON.parse(localStorage.getItem("types")) || [];
  const oldType = types[index];

  const newType = prompt(`Sửa tên thể loại:`, oldType);

  if (!newType || newType.trim() === "") {
    return;
  }

  const trimmedType = newType.trim();

  // Check if new name already exists (except current one)
  if (types.includes(trimmedType) && trimmedType !== oldType) {
    alert("Thể loại này đã tồn tại!");
    return;
  }

  // Update category
  types[index] = trimmedType;
  localStorage.setItem("types", JSON.stringify(types));

  // Update all products with this category
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((product) => {
    if (product.type === oldType) {
      product.type = trimmedType;
    }
  });
  localStorage.setItem("products", JSON.stringify(products));

  // Refresh list
  renderCategoryList();

  alert(`Đã cập nhật thể loại từ "${oldType}" thành "${trimmedType}"!`);
}

function xoaTheLoai(index) {
  const types = JSON.parse(localStorage.getItem("types")) || [];
  const typeToDelete = types[index];

  // Check if any products use this category
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsUsingType = products.filter((p) => p.type === typeToDelete);

  if (productsUsingType.length > 0) {
    const confirmMsg = `Có ${productsUsingType.length} sản phẩm đang dùng thể loại "${typeToDelete}".\n\nBạn có chắc muốn xóa? Các sản phẩm sẽ không có thể loại.`;
    if (!confirm(confirmMsg)) {
      return;
    }

    // Remove category from products
    products.forEach((product) => {
      if (product.type === typeToDelete) {
        product.type = "";
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    if (!confirm(`Bạn có chắc muốn xóa thể loại "${typeToDelete}"?`)) {
      return;
    }
  }

  // Delete category
  types.splice(index, 1);
  localStorage.setItem("types", JSON.stringify(types));

  // Refresh list
  renderCategoryList();

  alert(`Đã xóa thể loại "${typeToDelete}" thành công!`);
}

// =================================================
// INVENTORY MANAGEMENT FEATURE ("Số lượng tồn kho")
// =================================================

// Biến phân trang cho tồn kho
let inventoryCurrentPage = 1;
let inventoryItemsPerPage = 20;

function renderInventoryView() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Lấy types từ localStorage hoặc tự động tạo từ danh sách products
  let types = JSON.parse(localStorage.getItem("types")) || [];
  if (!types || types.length === 0) {
    types = [...new Set(products.map((p) => p.type).filter(Boolean))];
  }

  const tableRows = generateProductRows_Inventory(products, true);

  adminContent.innerHTML = `
    <div class="phieu-container">
      <h2>Quản lý Tồn kho</h2>
      
      <!-- Thanh công cụ -->
      <div class="phieu-toolbar">
        <input type="text" id="searchInput" class="search-input" placeholder="Tìm theo tên sản phẩm..." style="flex: 1; min-width: 250px;">
        <select id="typeFilter" class="filter-select">
          <option value="">Tất cả loại sản phẩm</option>
          ${types
            .map((type) => `<option value="${type}">${type}</option>`)
            .join("")}
        </select>
        
        <label style="font-weight: 500; color: #555; margin-left: 10px;">Từ ngày:</label>
        <input type="date" id="fromDate" class="search-input" style="max-width: 140px;">
        <label style="font-weight: 500; color: #555;">đến:</label>
        <input type="date" id="toDate" class="search-input" style="max-width: 140px;">
        <button id="btnFilterDate" class="btn btn-add">Lọc</button>
        
        <!-- Nút quick filter -->
        <button class="btn btn-clear quick-filter" data-days="1" style="min-width: auto; padding: 6px 12px;">1d</button>
        <button class="btn btn-clear quick-filter" data-days="3" style="min-width: auto; padding: 6px 12px;">3d</button>
        <button class="btn btn-clear quick-filter" data-days="7" style="min-width: auto; padding: 6px 12px;">7d</button>
        <button id="btnResetDate" class="btn btn-delete" style="min-width: auto; padding: 6px 12px;">Xóa</button>
      </div>
      
      <table class="phieu-table content-table">
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên Sản phẩm</th>
            <th>Loại Sản phẩm</th>
            <th>Số lượng tồn</th>
            <th>Ngày nhập</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <!-- Phân trang -->
      <div id="inventoryPagination" class="pagination-container"></div>
    </div>
  `;
  addInventoryEventListeners();
}

function addInventoryEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");
  const btnFilterDate = document.getElementById("btnFilterDate");
  const btnResetDate = document.getElementById("btnResetDate");

  const handleFilterAndSearch = () => {
    inventoryCurrentPage = 1; // Reset về trang 1 khi lọc/tìm kiếm
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const from = fromDate.value; // yyyy-mm-dd
    const to = toDate.value;

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];

    const filteredProducts = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);
      const matchesType = selectedType ? product.type === selectedType : true;

      // Lọc theo ngày nhập từ tonKho
      let matchesDate = true;
      if (from || to) {
        const inventory = tonKho.find((t) => t.productId === product.id);
        if (!inventory || !inventory.ngayNhap) {
          matchesDate = false;
        } else {
          const ngayNhap = inventory.ngayNhap; // yyyy-mm-dd
          if (from && ngayNhap < from) matchesDate = false;
          if (to && ngayNhap > to) matchesDate = false;
        }
      }

      return matchesSearch && matchesType && matchesDate;
    });

    const tableRows = generateProductRows_Inventory(filteredProducts, true);
    const tbody = document.querySelector(".content-table tbody");
    if (tbody) {
      tbody.innerHTML = tableRows;
    }
  };

  searchInput.addEventListener("input", handleFilterAndSearch);
  typeFilter.addEventListener("change", handleFilterAndSearch);
  btnFilterDate.addEventListener("click", handleFilterAndSearch);

  // Quick filter buttons
  document.querySelectorAll(".quick-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      const days = parseInt(btn.getAttribute("data-days"));
      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - days);

      // Set dates
      toDate.value = today.toISOString().split("T")[0];
      fromDate.value = pastDate.toISOString().split("T")[0];

      handleFilterAndSearch();
    });
  });

  // Reset button
  btnResetDate.addEventListener("click", () => {
    fromDate.value = "";
    toDate.value = "";
    handleFilterAndSearch();
  });
}

// Helper function: yyyy-mm-dd hoặc ISO string → dd/mm/yyyy
function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return "";

  // Nếu là ISO string (có chữ T), lấy phần ngày
  if (dateStr.includes("T")) {
    dateStr = dateStr.split("T")[0];
  }

  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function generateProductRows_Inventory(products, withPagination = false) {
  const tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];

  if (!products || products.length === 0) {
    if (withPagination) {
      renderInventoryPagination(0, 0);
    }
    return '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">Không có sản phẩm nào</td></tr>';
  }

  // Phân trang
  let displayProducts = products;
  let totalItems = products.length;
  let totalPages = 1;

  if (withPagination) {
    totalPages = Math.ceil(totalItems / inventoryItemsPerPage);
    const startIndex = (inventoryCurrentPage - 1) * inventoryItemsPerPage;
    const endIndex = Math.min(startIndex + inventoryItemsPerPage, totalItems);
    displayProducts = products.slice(startIndex, endIndex);

    renderInventoryPagination(totalItems, totalPages);
  }

  return displayProducts
    .map((product) => {
      // Lấy ngày nhập và số lượng tồn từ tonKho
      const inventory = tonKho.find((t) => t.productId === product.id);
      const ngayNhap =
        inventory && inventory.ngayNhap
          ? formatDateDDMMYYYY(inventory.ngayNhap)
          : "Chưa nhập";

      // Lấy số lượng tồn từ tonKho, ưu tiên soLuongTon, sau đó quantity
      const soLuongTon = inventory
        ? inventory.soLuongTon !== undefined
          ? inventory.soLuongTon
          : inventory.quantity
        : 0;

      let stockStatusClass = "";
      if (soLuongTon === 0) {
        stockStatusClass = "out-of-stock";
      } else if (soLuongTon <= LOW_STOCK_THRESHOLD) {
        stockStatusClass = "low-stock";
      }
      return `
      <tr class="${stockStatusClass}">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.type || "N/A"}</td>
        <td>${soLuongTon}</td>
        <td>${ngayNhap}</td>
      </tr>
    `;
    })
    .join("");
}

function renderInventoryPagination(totalItems, totalPages) {
  const paginationContainer = document.getElementById("inventoryPagination");
  if (!paginationContainer) return;

  const startItem =
    totalItems === 0
      ? 0
      : (inventoryCurrentPage - 1) * inventoryItemsPerPage + 1;
  const endItem = Math.min(
    inventoryCurrentPage * inventoryItemsPerPage,
    totalItems
  );

  let paginationHTML = `
    <div class="pagination-info">
      Hiển thị ${startItem} - ${endItem} / ${totalItems} sản phẩm
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <div class="pagination-controls">
        <button class="pagination-btn" onclick="changeInventoryPage(1)" ${
          inventoryCurrentPage === 1 ? "disabled" : ""
        }>
          <i class="ri-skip-back-mini-line"></i>
        </button>
        <button class="pagination-btn" onclick="changeInventoryPage(${
          inventoryCurrentPage - 1
        })" ${inventoryCurrentPage === 1 ? "disabled" : ""}>
          <i class="ri-arrow-left-s-line"></i>
        </button>
  `;

  // Hiển thị các số trang
  const maxButtons = 5;
  let startPage = Math.max(
    1,
    inventoryCurrentPage - Math.floor(maxButtons / 2)
  );
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-btn ${
        i === inventoryCurrentPage ? "active" : ""
      }" onclick="changeInventoryPage(${i})">
        ${i}
      </button>
    `;
  }

  paginationHTML += `
        <button class="pagination-btn" onclick="changeInventoryPage(${
          inventoryCurrentPage + 1
        })" ${
    inventoryCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-arrow-right-s-line"></i>
        </button>
        <button class="pagination-btn" onclick="changeInventoryPage(${totalPages})" ${
    inventoryCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-skip-forward-mini-line"></i>
        </button>
      </div>
      <div class="page-size-selector">
        <label>Hiển thị:</label>
        <select onchange="changeInventoryPageSize(this.value)">
          <option value="10" ${
            inventoryItemsPerPage === 10 ? "selected" : ""
          }>10</option>
          <option value="20" ${
            inventoryItemsPerPage === 20 ? "selected" : ""
          }>20</option>
          <option value="50" ${
            inventoryItemsPerPage === 50 ? "selected" : ""
          }>50</option>
          <option value="100" ${
            inventoryItemsPerPage === 100 ? "selected" : ""
          }>100</option>
        </select>
      </div>
    </div>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

function changeInventoryPage(page) {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedType = typeFilter ? typeFilter.value : "";
  const from = fromDate ? fromDate.value : "";
  const to = toDate ? toDate.value : "";

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  const tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesType = selectedType ? product.type === selectedType : true;

    let matchesDate = true;
    if (from || to) {
      const inventory = tonKho.find((t) => t.productId === product.id);
      if (!inventory || !inventory.ngayNhap) {
        matchesDate = false;
      } else {
        const ngayNhap = inventory.ngayNhap;
        if (from && ngayNhap < from) matchesDate = false;
        if (to && ngayNhap > to) matchesDate = false;
      }
    }

    return matchesSearch && matchesType && matchesDate;
  });

  const totalPages = Math.ceil(filteredProducts.length / inventoryItemsPerPage);
  if (page >= 1 && page <= totalPages) {
    inventoryCurrentPage = page;
    const tableRows = generateProductRows_Inventory(filteredProducts, true);
    const tbody = document.querySelector(".content-table tbody");
    if (tbody) {
      tbody.innerHTML = tableRows;
    }
  }
}

function changeInventoryPageSize(size) {
  inventoryItemsPerPage = parseInt(size);
  inventoryCurrentPage = 1;

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedType = typeFilter ? typeFilter.value : "";
  const from = fromDate ? fromDate.value : "";
  const to = toDate ? toDate.value : "";

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  const tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesType = selectedType ? product.type === selectedType : true;

    let matchesDate = true;
    if (from || to) {
      const inventory = tonKho.find((t) => t.productId === product.id);
      if (!inventory || !inventory.ngayNhap) {
        matchesDate = false;
      } else {
        const ngayNhap = inventory.ngayNhap;
        if (from && ngayNhap < from) matchesDate = false;
        if (to && ngayNhap > to) matchesDate = false;
      }
    }

    return matchesSearch && matchesType && matchesDate;
  });

  const tableRows = generateProductRows_Inventory(filteredProducts, true);
  const tbody = document.querySelector(".content-table tbody");
  if (tbody) {
    tbody.innerHTML = tableRows;
  }
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

// ===== QUẢN LÝ ĐƠN HÀNG VỚI TRẠNG THÁI & NGÀY GIAO =====
function taiDuLieuTuText() {
  try {
    // ĐỌC ĐƠN HÀNG TỪ LOCALSTORAGE (đồng bộ với User)
    const ordersFromUser = JSON.parse(localStorage.getItem("orders")) || [];

    // Nếu có đơn hàng từ User, dùng nó
    if (ordersFromUser.length > 0) {
      donHangs = ordersFromUser.map((order, index) => {
        // Chuyển đổi format từ User sang Admin
        return {
          maDH: order.orderId || `DH${String(index + 1).padStart(3, "0")}`,
          khachHang: order.fullname || order.customerName || "Khách hàng",
          ngayDat:
            order.orderDate ||
            order.date ||
            new Date().toISOString().split("T")[0],
          tinhTrang: order.status || "Mới Đặt",
          ngayGiaoDuKien: tinhNgayGiaoHang(
            order.orderDate ||
              order.date ||
              new Date().toISOString().split("T")[0],
            3
          ),
          sach: (order.items || order.products || []).map((item) => ({
            tenSach: item.name || item.productName,
            soLuong: item.quantity || item.qty,
            donGia: item.price || item.cost,
          })),
        };
      });
    } else {
      // Nếu chưa có đơn hàng, dùng dữ liệu mẫu
      const lines = duLieuDonHang.trim().split(/\r?\n/);

      donHangs = lines
        .map((line) => {
          const [maDH, khachHang, ngayDat, tinhTrang, dsSach] = line.split(",");
          if (!dsSach) return null;

          const sach = dsSach.split(";").map((sp) => {
            const [tenSach, soLuong, donGia] = sp.split(":");
            return { tenSach, soLuong: +soLuong, donGia: +donGia };
          });

          // Tính ngày giao hàng dự kiến = ngày đặt + 3 ngày
          const ngayGiaoDuKien = tinhNgayGiaoHang(ngayDat, 3);

          return {
            maDH,
            khachHang,
            ngayDat,
            tinhTrang: tinhTrang || "Mới Đặt",
            ngayGiaoDuKien,
            sach,
          };
        })
        .filter(Boolean);
    }

    donHangsHienTai = [...donHangs];
    hienThiBangDH(donHangsHienTai);
  } catch (error) {
    console.error("Lỗi tải dữ liệu đơn hàng:", error);
    adminContent.innerHTML +=
      "<p style='color: red;'>Lỗi: Không thể tải dữ liệu đơn hàng.</p>";
  }
}

// Hàm tính ngày giao hàng: ngày đặt + số ngày
function tinhNgayGiaoHang(ngayDatStr, soNgayThem) {
  const ngayDat = new Date(ngayDatStr);
  ngayDat.setDate(ngayDat.getDate() + soNgayThem);

  // Format lại thành dd/mm/yyyy
  const ngay = String(ngayDat.getDate()).padStart(2, "0");
  const thang = String(ngayDat.getMonth() + 1).padStart(2, "0");
  const nam = ngayDat.getFullYear();

  return `${ngay}/${thang}/${nam}`;
}

// ===== HIỂN THỊ BẢNG ĐƠN HÀNG VỚI DROPDOWN TRẠNG THÁI =====
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

    // Tạo dropdown cho trạng thái
    const trangThaiOptions = `
      <option value="Mới Đặt" ${
        dh.tinhTrang === "Mới Đặt" ? "selected" : ""
      }>Mới Đặt</option>
      <option value="Đang xử lý" ${
        dh.tinhTrang === "Đang xử lý" ? "selected" : ""
      }>Đang xử lý</option>
      <option value="Đang giao" ${
        dh.tinhTrang === "Đang giao" ? "selected" : ""
      }>Đang giao</option>
      <option value="Đã giao" ${
        dh.tinhTrang === "Đã giao" ? "selected" : ""
      }>Đã giao</option>
      <option value="Bị hủy" ${
        dh.tinhTrang === "Bị hủy" ? "selected" : ""
      }>Bị hủy</option>
    `;

    row.innerHTML = `
        <td>${dh.maDH}</td>
        <td>${dh.khachHang}</td>
        <td>${dh.ngayDat}</td>
        <td><strong>${dh.ngayGiaoDuKien || "Chưa xác định"}</strong></td>
        <td>
          <select onchange="doiTrangThaiDonHang('${
            dh.maDH
          }', this.value)" style="padding: 5px;">
            ${trangThaiOptions}
          </select>
        </td>
        <td>
          <button onclick="xemChiTietDH('${dh.maDH}')">Chi tiết</button>
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

// Hàm đổi trạng thái đơn hàng - CHỈ CHO PHÉP CHUYỂN XUÔI
function doiTrangThaiDonHang(maDH, trangThaiMoi) {
  // Tìm đơn hàng trong danh sách
  const donHang = donHangs.find((dh) => dh.maDH === maDH);
  if (!donHang) {
    alert("Không tìm thấy đơn hàng!");
    return;
  }

  const trangThaiHienTai = donHang.tinhTrang;

  // Kiểm tra trạng thái cuối cùng - KHÔNG CHO PHÉP ĐỔI
  if (trangThaiHienTai === "Đã giao" || trangThaiHienTai === "Bị hủy") {
    alert(
      `KHÔNG THỂ THAY ĐỔI!\n\n` +
        `Đơn hàng đã ở trạng thái cuối: "${trangThaiHienTai}"\n` +
        `Trạng thái này không thể thay đổi.`
    );
    // Render lại để reset dropdown về giá trị cũ
    hienThiBangDH(donHangsHienTai);
    return;
  }

  // Định nghĩa thứ tự trạng thái (chỉ được chuyển xuôi)
  const TRANG_THAI = ["Mới Đặt", "Đang xử lý", "Đang giao", "Đã giao"];

  // Nếu chuyển sang "Bị hủy" - chỉ cho phép từ "Mới Đặt" hoặc "Đang xử lý"
  if (trangThaiMoi === "Bị hủy") {
    if (trangThaiHienTai === "Mới Đặt" || trangThaiHienTai === "Đang xử lý") {
      // Cho phép hủy
      donHang.tinhTrang = trangThaiMoi;
    } else {
      alert(
        `KHÔNG THỂ HỦY!\n\n` +
          `Chỉ có thể hủy đơn hàng khi ở trạng thái "Mới Đặt" hoặc "Đang xử lý".\n` +
          `Trạng thái hiện tại: "${trangThaiHienTai}"`
      );
      hienThiBangDH(donHangsHienTai);
      return;
    }
  } else {
    // Chuyển sang trạng thái thông thường
    const chiSoHienTai = TRANG_THAI.indexOf(trangThaiHienTai);
    const chiSoMoi = TRANG_THAI.indexOf(trangThaiMoi);

    // Kiểm tra nếu chuyển ngược
    if (chiSoMoi < chiSoHienTai && chiSoHienTai !== -1 && chiSoMoi !== -1) {
      alert(
        `KHÔNG THỂ CHUYỂN NGƯỢC!\n\n` +
          `Trạng thái hiện tại: ${trangThaiHienTai}\n` +
          `Chỉ có thể chuyển xuôi: Mới Đặt → Đang xử lý → Đang giao → Đã giao`
      );
      // Render lại để reset dropdown về giá trị cũ
      hienThiBangDH(donHangsHienTai);
      return;
    }

    // Cho phép chuyển xuôi
    donHang.tinhTrang = trangThaiMoi;
  }

  // Cập nhật vào donHangsHienTai
  const index = donHangsHienTai.findIndex((dh) => dh.maDH === maDH);
  if (index !== -1) {
    donHangsHienTai[index].tinhTrang = trangThaiMoi;
  }

  // LƯU LẠI VÀO LOCALSTORAGE ĐỂ ĐỒNG BỘ VỚI USER
  const ordersFromStorage = JSON.parse(localStorage.getItem("orders")) || [];

  console.log("Debug - Tìm đơn hàng để cập nhật:");
  console.log("  - Mã đơn hàng cần tìm:", maDH);
  console.log(
    "  - Tổng số đơn hàng trong localStorage:",
    ordersFromStorage.length
  );
  console.log(
    "  - Danh sách orderId:",
    ordersFromStorage.map((o) => o.orderId)
  );

  const orderIndex = ordersFromStorage.findIndex((o) => o.orderId === maDH);
  console.log("  - Index tìm được:", orderIndex);

  if (orderIndex !== -1) {
    // Cập nhật trạng thái trong localStorage
    ordersFromStorage[orderIndex].status = trangThaiMoi;
    localStorage.setItem("orders", JSON.stringify(ordersFromStorage));
    console.log(
      `Đã lưu trạng thái mới vào localStorage: ${maDH} -> ${trangThaiMoi}`
    );

    // Cập nhật badge thông báo
    updateOrderNotificationBadge();
  } else {
    console.warn(`KHÔNG TÌM THẤY đơn hàng ${maDH} trong localStorage!`);
    console.log(
      "Các orderId có sẵn:",
      ordersFromStorage.map((o) => o.orderId).join(", ")
    );
  }

  // Thông báo thành công
  alert(`Đã cập nhật trạng thái!\n\nĐơn hàng ${maDH}: ${trangThaiMoi}`);

  // Render lại bảng
  hienThiBangDH(donHangsHienTai);
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
    return alert("Đơn hàng đã bị hủy, không thể cập nhật!");

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
  // Đếm số đơn hàng "Mới Đặt"
  const ordersFromUser = JSON.parse(localStorage.getItem("orders")) || [];
  const newOrdersCount = ordersFromUser.filter(
    (order) => order.status === "Mới Đặt"
  ).length;
  const newOrderBadge =
    newOrdersCount > 0
      ? `<span style="background:#ff4757;color:white;padding:2px 8px;border-radius:10px;font-size:12px;margin-left:8px;">${newOrdersCount}</span>`
      : "";

  // Cập nhật badge trong menu
  updateOrderNotificationBadge();

  adminContent.innerHTML = `
    <div class="phieu-container">
      <h2>Quản lý Đơn hàng ${newOrderBadge}</h2>
      <div class="phieu-toolbar">
        <label style="font-weight: 500;">Từ ngày:</label>
        <input type="date" id="fromDate" class="search-input" style="max-width: 150px;">
        <label style="font-weight: 500;">Đến ngày:</label>
        <input type="date" id="toDate" class="search-input" style="max-width: 150px;">
        <select id="statusFilter" class="filter-select">
          <option value="">-- Tất cả --</option>
          <option value="Mới Đặt">Mới Đặt</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Bị hủy">Bị hủy</option>
        </select>
        <button class="btn btn-add" onclick="locDonHang()">Lọc đơn</button>
      </div>
      <table id="orderTable" class="phieu-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Ngày giao (dự kiến)</th>
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
  // Reload dữ liệu từ localStorage
  data = loadSalesData();

  adminContent.innerHTML = `
    <div class="phieu-container">
      <h2>Thống kê giá bán</h2>
      <div class="phieu-toolbar">
        <input type="text" id="timkiem_stats" class="search-input" placeholder="Tìm kiếm theo tên..." style="flex: 1; min-width: 300px;">
        <button id="btnNhapGia" class="btn btn-add">Nhập giá mới</button>
      </div>
      <table class="phieu-table">
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
    tr.setAttribute("data-index", batDau + index);

    tr.innerHTML = `
            <td>${sp.ten}</td>
            <td>
              <input type="number" class="input-giavon" value="${
                sp.giaVon
              }" disabled 
                     style="width: 120px; padding: 6px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9;">
              <span style="margin-left: 5px;">₫</span>
            </td>
            <td>
              <input type="number" class="input-loinhuan" value="${
                sp.loiNhuan
              }" disabled 
                     style="width: 80px; padding: 6px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9;">
              <span style="margin-left: 5px;">%</span>
            </td>
            <td class="td-giaban">${giaBan.toLocaleString("vi-VN")} ₫</td>
            <td>
              <button class="btn btn-edit btnSua" data-index="${
                batDau + index
              }">
                Sửa
              </button>
              <button class="btn btn-save btnLuu" data-index="${
                batDau + index
              }" style="display:none;">
                Lưu
              </button>
              <button class="btn btn-clear btnHuy" data-index="${
                batDau + index
              }" style="display:none;">
                Hủy
              </button>
            </td>
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
    moFormNhapGiaMoi();
  });

  // Edit/Save/Cancel buttons
  document.querySelector("#bangGiaban").addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-index"));

    // Nút Sửa - Mở khóa input + highlight
    if (e.target.classList.contains("btnSua")) {
      const row = e.target.closest("tr");

      // Highlight dòng đang sửa
      row.style.backgroundColor = "#fff3cd";

      // Mở khóa inputs
      row.querySelector(".input-giavon").disabled = false;
      row.querySelector(".input-loinhuan").disabled = false;
      row.querySelector(".input-giavon").style.background = "#ffffff";
      row.querySelector(".input-loinhuan").style.background = "#ffffff";

      // Toggle buttons
      row.querySelector(".btnSua").style.display = "none";
      row.querySelector(".btnLuu").style.display = "inline-block";
      row.querySelector(".btnHuy").style.display = "inline-block";

      // Auto-update giá bán khi thay đổi
      const updateGiaBan = () => {
        const giaVon =
          parseFloat(row.querySelector(".input-giavon").value) || 0;
        const loiNhuan =
          parseFloat(row.querySelector(".input-loinhuan").value) || 0;
        const giaBan = giaVon * (1 + loiNhuan / 100);
        row.querySelector(".td-giaban").textContent =
          giaBan.toLocaleString("vi-VN") + " ₫";
      };

      row
        .querySelector(".input-giavon")
        .addEventListener("input", updateGiaBan);
      row
        .querySelector(".input-loinhuan")
        .addEventListener("input", updateGiaBan);
    }

    // Nút Lưu - Lưu dữ liệu + khóa lại
    if (e.target.classList.contains("btnLuu")) {
      const row = e.target.closest("tr");
      const giaVon = parseFloat(row.querySelector(".input-giavon").value);
      const loiNhuan = parseFloat(row.querySelector(".input-loinhuan").value);

      if (giaVon < 0 || loiNhuan < 0) {
        alert("Giá vốn và lợi nhuận phải >= 0!");
        return;
      }

      // Lưu vào data
      data[index].giaVon = giaVon;
      data[index].loiNhuan = loiNhuan;

      // Lưu vào localStorage
      const giaBan = JSON.parse(localStorage.getItem("giaBan")) || [];
      const itemIndex = giaBan.findIndex((item) => item.id === data[index].id);
      if (itemIndex !== -1) {
        giaBan[itemIndex].giaVon = giaVon;
        giaBan[itemIndex].loiNhuan = loiNhuan;
        giaBan[itemIndex].giaBan = Math.round(giaVon * (1 + loiNhuan / 100));
      }
      localStorage.setItem("giaBan", JSON.stringify(giaBan));

      // Bỏ highlight
      row.style.backgroundColor = "";

      // Khóa lại inputs
      row.querySelector(".input-giavon").disabled = true;
      row.querySelector(".input-loinhuan").disabled = true;
      row.querySelector(".input-giavon").style.background = "#f9f9f9";
      row.querySelector(".input-loinhuan").style.background = "#f9f9f9";

      // Toggle buttons
      row.querySelector(".btnSua").style.display = "inline-block";
      row.querySelector(".btnLuu").style.display = "none";
      row.querySelector(".btnHuy").style.display = "none";

      alert("Đã lưu giá bán mới!");
    }

    // Nút Hủy - Reset về giá trị cũ
    if (e.target.classList.contains("btnHuy")) {
      const row = e.target.closest("tr");

      // Reset giá trị
      row.querySelector(".input-giavon").value = data[index].giaVon;
      row.querySelector(".input-loinhuan").value = data[index].loiNhuan;

      const giaBan = data[index].giaVon * (1 + data[index].loiNhuan / 100);
      row.querySelector(".td-giaban").textContent =
        giaBan.toLocaleString("vi-VN") + " ₫";

      // Bỏ highlight
      row.style.backgroundColor = "";

      // Khóa lại inputs
      row.querySelector(".input-giavon").disabled = true;
      row.querySelector(".input-loinhuan").disabled = true;
      row.querySelector(".input-giavon").style.background = "#f9f9f9";
      row.querySelector(".input-loinhuan").style.background = "#f9f9f9";

      // Toggle buttons
      row.querySelector(".btnSua").style.display = "inline-block";
      row.querySelector(".btnLuu").style.display = "none";
      row.querySelector(".btnHuy").style.display = "none";
    }
  });
}

// Mở form nhập giá mới
function moFormNhapGiaMoi() {
  // Lấy danh sách sản phẩm chưa có giá
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const giaBan = JSON.parse(localStorage.getItem("giaBan")) || [];
  const productsWithoutPrice = products.filter(
    (p) => !giaBan.some((g) => g.id === p.id)
  );

  if (productsWithoutPrice.length === 0) {
    alert("Tất cả sản phẩm đã có giá bán!");
    return;
  }

  const productOptions = productsWithoutPrice
    .map((p) => `<option value="${p.id}">${p.id} - ${p.name}</option>`)
    .join("");

  const popupHTML = `
    <div id="priceManagementPopup" class="popup-backdrop">
      <div class="popup-content" style="width: 450px; max-width: 90%;">
        <h3>Nhập Giá Mới</h3>
        
        <div style="margin-bottom: 20px;">
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Chọn sản phẩm:</label>
            <select id="newPriceId" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
              <option value="">-- Chọn sản phẩm --</option>
              ${productOptions}
            </select>
          </div>
          
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Giá vốn (₫):</label>
            <input type="number" id="newPriceCost" placeholder="VD: 20000" min="0"
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" />
          </div>
          
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">% Lợi nhuận:</label>
            <input type="number" id="newPriceProfit" placeholder="VD: 20" min="0" max="100"
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" />
          </div>
          
          <div style="padding: 12px; background: #f0f8ff; border-radius: 6px; border-left: 4px solid var(--main-bg-color);">
            <strong>Giá bán dự kiến:</strong> <span id="previewPrice" style="color: var(--main-bg-color); font-size: 16px; font-weight: 600;">0 ₫</span>
          </div>
        </div>
        
        <div class="popup-actions">
          <button onclick="luuGiaMoi()" style="background: var(--main-bg-color); color: white;">
            <i class="ri-save-line"></i> Lưu
          </button>
          <button onclick="document.getElementById('priceManagementPopup').remove()">Hủy</button>
        </div>
      </div>
    </div>
  `;

  const existingPopup = document.getElementById("priceManagementPopup");
  if (existingPopup) existingPopup.remove();

  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Auto calculate preview price
  const costInput = document.getElementById("newPriceCost");
  const profitInput = document.getElementById("newPriceProfit");
  const previewPrice = document.getElementById("previewPrice");

  const updatePreview = () => {
    const cost = parseFloat(costInput.value) || 0;
    const profit = parseFloat(profitInput.value) || 0;
    const finalPrice = cost * (1 + profit / 100);
    previewPrice.textContent = finalPrice.toLocaleString("vi-VN") + " ₫";
  };

  costInput.addEventListener("input", updatePreview);
  profitInput.addEventListener("input", updatePreview);
}

// Lưu giá mới
function luuGiaMoi() {
  const productId = document.getElementById("newPriceId").value.trim();
  const giaVon = parseFloat(document.getElementById("newPriceCost").value);
  const loiNhuan = parseFloat(document.getElementById("newPriceProfit").value);

  if (!productId) {
    alert("Vui lòng chọn sản phẩm!");
    return;
  }

  if (!giaVon || giaVon <= 0) {
    alert("Vui lòng nhập giá vốn hợp lệ!");
    return;
  }

  if (loiNhuan === undefined || loiNhuan < 0) {
    alert("Vui lòng nhập % lợi nhuận hợp lệ!");
    return;
  }

  // Lấy thông tin sản phẩm
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);

  if (!product) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  // Kiểm tra xem giá đã tồn tại chưa
  const giaBan = JSON.parse(localStorage.getItem("giaBan")) || [];
  const existingIndex = giaBan.findIndex((item) => item.id === productId);

  if (existingIndex !== -1) {
    alert("Sản phẩm này đã có giá bán! Vui lòng sửa trực tiếp trong bảng.");
    return;
  }

  const giaBanValue = Math.round(giaVon * (1 + loiNhuan / 100));

  // Thêm vào localStorage
  giaBan.push({
    id: productId,
    name: product.name,
    giaVon: giaVon,
    loiNhuan: loiNhuan,
    giaBan: giaBanValue,
  });
  localStorage.setItem("giaBan", JSON.stringify(giaBan));

  // Thêm vào data array
  data.push({
    id: productId,
    ten: product.name,
    giaVon,
    loiNhuan,
  });

  // Refresh table
  trangHienTaiStats = 1;
  hienThiBangStats(data);

  // Close popup
  document.getElementById("priceManagementPopup").remove();

  alert(`Đã thêm "${ten}" thành công!`);
}

// Mở form sửa giá
function moFormSuaGia(index) {
  const sp = data[index];
  if (!sp) return;

  const popupHTML = `
    <div id="priceEditPopup" class="popup-backdrop">
      <div class="popup-content" style="width: 450px; max-width: 90%;">
        <h3>Sửa Giá Sản Phẩm</h3>
        
        <div style="margin-bottom: 20px;">
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Tên sản phẩm:</label>
            <input type="text" id="editPriceName" value="${sp.ten}" readonly
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; background: #f5f5f5;" />
          </div>
          
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Giá vốn (₫):</label>
            <input type="number" id="editPriceCost" value="${sp.giaVon}" min="0"
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" />
          </div>
          
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">% Lợi nhuận:</label>
            <input type="number" id="editPriceProfit" value="${sp.loiNhuan}" min="0" max="100"
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" />
          </div>
          
          <div style="padding: 12px; background: #f0f8ff; border-radius: 6px; border-left: 4px solid var(--main-bg-color);">
            <strong>Giá bán dự kiến:</strong> <span id="editPreviewPrice" style="color: var(--main-bg-color); font-size: 16px; font-weight: 600;"></span>
          </div>
        </div>
        
        <div class="popup-actions">
          <button onclick="luuSuaGia(${index})" style="background: var(--main-bg-color); color: white;">
            <i class="ri-save-line"></i> Lưu
          </button>
          <button onclick="document.getElementById('priceEditPopup').remove()">Hủy</button>
        </div>
      </div>
    </div>
  `;

  const existingPopup = document.getElementById("priceEditPopup");
  if (existingPopup) existingPopup.remove();

  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Auto calculate preview price
  const costInput = document.getElementById("editPriceCost");
  const profitInput = document.getElementById("editPriceProfit");
  const previewPrice = document.getElementById("editPreviewPrice");

  const updatePreview = () => {
    const cost = parseFloat(costInput.value) || 0;
    const profit = parseFloat(profitInput.value) || 0;
    const finalPrice = cost * (1 + profit / 100);
    previewPrice.textContent = finalPrice.toLocaleString("vi-VN") + " ₫";
  };

  costInput.addEventListener("input", updatePreview);
  profitInput.addEventListener("input", updatePreview);

  // Initial preview
  updatePreview();
}

// Lưu sửa giá
function luuSuaGia(index) {
  const giaVon = parseFloat(document.getElementById("editPriceCost").value);
  const loiNhuan = parseFloat(document.getElementById("editPriceProfit").value);

  if (!giaVon || giaVon <= 0) {
    alert("Vui lòng nhập giá vốn hợp lệ!");
    return;
  }

  if (!loiNhuan || loiNhuan < 0) {
    alert("Vui lòng nhập % lợi nhuận hợp lệ!");
    return;
  }

  // Update data
  data[index].giaVon = giaVon;
  data[index].loiNhuan = loiNhuan;

  // Refresh table
  hienThiBangStats(data);

  // Close popup
  document.getElementById("priceEditPopup").remove();

  alert(`Đã cập nhật "${data[index].ten}" thành công!`);
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
        <button class="btn btn-add" onclick="hienForm()">+ Thêm Phiếu Nhập</button>

        <input type="text" id="search" class="search-input" placeholder="Tìm theo ID / Mã SP / Tên sách / ngày / giá / số lượng..." />

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
              <th>Mã SP</th>
              <th>Tên sách</th>
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
      
      <div id="phieuPagination" class="pagination-container"></div>

      <form id="add-form" style="display: none; margin-top: 20px;">
        <h3 id="form-title">Thêm Phiếu Nhập</h3>
        
        <!-- Dropdown tìm sản phẩm -->
        <div class="form-row" style="margin-bottom: 15px;">
          <label style="font-weight: 500; margin-right: 10px;">Chọn sản phẩm:</label>
          <select id="product-select" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
            <option value="">-- Tìm và chọn sản phẩm --</option>
          </select>
        </div>
        
        <div class="form-row">
          <input type="date" id="ngay" required />
          <input type="number" id="gia" placeholder="Giá nhập (số nguyên)" required min="0" />
          <input type="number" id="soluong" placeholder="Số lượng" required min="1" />
          <button class="btn btn-save" type="button" onclick="luuPhieu(event)">Lưu</button>
          <button class="btn btn-clear" type="button" onclick="anForm()">Hủy</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("search").addEventListener("input", () => {
    phieuCurrentPage = 1;
    renderRows();
  });
  document.getElementById("status-filter").addEventListener("change", () => {
    phieuCurrentPage = 1;
    renderRows();
  });
  document.getElementById("btn-clear-search").addEventListener("click", () => {
    document.getElementById("search").value = "";
    document.getElementById("status-filter").value = "all";
    renderRows();
  });

  loadProductsToDropdown(); // Load sản phẩm vào dropdown
  renderRows();
}

// Load sản phẩm vào dropdown
function loadProductsToDropdown() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const select = document.getElementById("product-select");

  if (!select) return;

  // Tạo options với định dạng: Tên sách - Loại - Tác giả
  select.innerHTML =
    '<option value="">-- Tìm và chọn sản phẩm --</option>' +
    products
      .map(
        (p) =>
          `<option value="${p.id}">${p.name} - ${p.type} - ${p.author}</option>`
      )
      .join("");

  // Khi chọn sản phẩm → tự động điền giá (nếu có)
  select.addEventListener("change", function () {
    const selectedId = this.value;
    if (!selectedId) return;

    const product = products.find((p) => p.id === selectedId);
    if (product && product.cost) {
      document.getElementById("gia").value = product.cost;
    }
  });
}

// Lọc danh sách
function getFilteredList() {
  const q = (document.getElementById("search")?.value || "")
    .trim()
    .toLowerCase();
  const status = document.getElementById("status-filter")?.value || "all";
  const products = JSON.parse(localStorage.getItem("products")) || [];

  return danhSachPhieu.filter((p) => {
    if (status === "pending" && p.hoanthanh) return false;
    if (status === "complete" && !p.hoanthanh) return false;
    if (!q) return true;

    // Lấy tên sách từ productId
    const product = products.find((prod) => prod.id === p.productId);
    const productName = product ? product.name : "";

    const haystack = `${p.id} ${p.productId || ""} ${productName} ${
      p.ngay
    } ${formatDate(p.ngay)} ${p.gia} ${p.soluong}`.toLowerCase();
    return haystack.includes(q);
  });
}

// Render bảng
function renderRows() {
  const tbody = document.getElementById("phieu-body");
  const list = getFilteredList();

  if (!tbody) return;

  // Phân trang
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / phieuItemsPerPage);
  const startIndex = (phieuCurrentPage - 1) * phieuItemsPerPage;
  const endIndex = Math.min(startIndex + phieuItemsPerPage, totalItems);
  const displayList = list.slice(startIndex, endIndex);

  if (!displayList.length) {
    tbody.innerHTML = `<tr><td colspan="8">Không có phiếu nào khớp</td></tr>`;
    renderPhieuPagination(0, 0);
    return;
  }

  tbody.innerHTML = displayList
    .map((p) => {
      const index = danhSachPhieu.indexOf(p);
      // Lấy thông tin sản phẩm
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const product = products.find((prod) => prod.id === p.productId);
      const productName = product ? product.name : "(Không tìm thấy)";
      const productId = p.productId || "N/A";

      return `
      <tr>
        <td>${p.id}</td>
        <td>${productId}</td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${productName}">${productName}</td>
        <td>${formatDate(p.ngay)}</td>
        <td>${formatNumber(p.gia)}</td>
        <td>${p.soluong}</td>
        <td class="${p.hoanthanh ? "status-complete" : "status-pending"}">
          ${p.hoanthanh ? "Hoàn thành" : "Chưa hoàn thành"}
        </td>
        <td>
          ${
            p.hoanthanh
              ? `<button class="btn btn-delete" onclick="xoaPhieu(${index})">Xóa</button>`
              : `
            <button class="btn btn-edit" onclick="suaPhieu(${index})">Sửa</button>
            <button class="btn btn-complete" onclick="hoanThanh(${index})">Hoàn Thành</button>
            <button class="btn btn-delete" onclick="xoaPhieu(${index})">Xóa</button>
          `
          }
        </td>
      </tr>
    `;
    })
    .join("");

  renderPhieuPagination(totalItems, totalPages);
}

function renderPhieuPagination(totalItems, totalPages) {
  const paginationContainer = document.getElementById("phieuPagination");
  if (!paginationContainer) return;

  const startItem =
    totalItems === 0 ? 0 : (phieuCurrentPage - 1) * phieuItemsPerPage + 1;
  const endItem = Math.min(phieuCurrentPage * phieuItemsPerPage, totalItems);

  let paginationHTML = `
    <div class="pagination-info">
      Hiển thị ${startItem} - ${endItem} / ${totalItems} phiếu nhập
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <div class="pagination-controls">
        <button class="pagination-btn" onclick="changePhieuPage(1)" ${
          phieuCurrentPage === 1 ? "disabled" : ""
        }>
          <i class="ri-skip-back-mini-line"></i>
        </button>
        <button class="pagination-btn" onclick="changePhieuPage(${
          phieuCurrentPage - 1
        })" ${phieuCurrentPage === 1 ? "disabled" : ""}>
          <i class="ri-arrow-left-s-line"></i>
        </button>
  `;

  const maxButtons = 5;
  let startPage = Math.max(1, phieuCurrentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-btn ${
        i === phieuCurrentPage ? "active" : ""
      }" onclick="changePhieuPage(${i})">
        ${i}
      </button>
    `;
  }

  paginationHTML += `
        <button class="pagination-btn" onclick="changePhieuPage(${
          phieuCurrentPage + 1
        })" ${
    phieuCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-arrow-right-s-line"></i>
        </button>
        <button class="pagination-btn" onclick="changePhieuPage(${totalPages})" ${
    phieuCurrentPage === totalPages || totalPages === 0 ? "disabled" : ""
  }>
          <i class="ri-skip-forward-mini-line"></i>
        </button>
      </div>
      <div class="page-size-selector">
        <label>Hiển thị:</label>
        <select onchange="changePhieuPageSize(this.value)">
          <option value="10" ${
            phieuItemsPerPage === 10 ? "selected" : ""
          }>10</option>
          <option value="20" ${
            phieuItemsPerPage === 20 ? "selected" : ""
          }>20</option>
          <option value="50" ${
            phieuItemsPerPage === 50 ? "selected" : ""
          }>50</option>
        </select>
      </div>
    </div>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

window.changePhieuPage = function (page) {
  phieuCurrentPage = page;
  renderRows();
};

window.changePhieuPageSize = function (size) {
  phieuItemsPerPage = parseInt(size);
  phieuCurrentPage = 1;
  renderRows();
};

// Hiện form
function hienForm() {
  editIndex = null;
  document.getElementById("form-title").innerText = "Thêm Phiếu Nhập";
  document.getElementById("add-form").style.display = "block";
  document.getElementById("product-select").value = "";
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
  const productId = document.getElementById("product-select").value;
  const ngay = document.getElementById("ngay").value;
  const gia = document.getElementById("gia").value;
  const soluong = document.getElementById("soluong").value;

  // Validation
  if (!productId) return alert("Vui lòng chọn sản phẩm.");
  if (!ngay || gia < 0 || soluong < 1) return alert("Dữ liệu không hợp lệ.");

  if (editIndex !== null) {
    // Sửa phiếu hiện có
    danhSachPhieu[editIndex].productId = productId;
    danhSachPhieu[editIndex].ngay = ngay;
    danhSachPhieu[editIndex].gia = gia;
    danhSachPhieu[editIndex].soluong = soluong;
  } else {
    // Thêm phiếu mới - tạo ID không trùng
    let newNumber = 1;
    let newID;
    do {
      newID = "PNH" + newNumber;
      newNumber++;
    } while (danhSachPhieu.some((p) => p.id === newID));

    danhSachPhieu.push({
      id: newID,
      productId: productId,
      ngay,
      gia,
      soluong,
      hoanthanh: false,
    });
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
  document.getElementById("product-select").value = p.productId || "";
  document.getElementById("ngay").value = p.ngay;
  document.getElementById("gia").value = p.gia;
  document.getElementById("soluong").value = p.soluong;
}

// Hoàn thành
function hoanThanh(index) {
  if (confirm("Xác nhận hoàn thành phiếu này? Tồn kho sẽ được cập nhật.")) {
    const phieu = danhSachPhieu[index];

    // Đánh dấu hoàn thành
    phieu.hoanthanh = true;

    // Cập nhật tồn kho và giá vốn
    capNhatTonKho(phieu.productId, phieu.soluong, phieu.ngay, phieu.gia);

    saveData();
    renderRows();
    alert(`Phiếu ${phieu.id} đã hoàn thành và cập nhật tồn kho!`);
  }
}

// Xóa phiếu
function xoaPhieu(index) {
  const phieu = danhSachPhieu[index];

  if (
    confirm(
      `Bạn có chắc muốn xóa phiếu ${phieu.id}?\n\nLưu ý: Nếu phiếu đã hoàn thành, việc xóa sẽ KHÔNG hoàn trả tồn kho.`
    )
  ) {
    danhSachPhieu.splice(index, 1);
    saveData();
    renderRows();
    alert(`Đã xóa phiếu ${phieu.id}!`);
  }
}

// Cập nhật tồn kho khi hoàn thành phiếu nhập
function capNhatTonKho(productId, soLuongNhap, ngayNhap, giaNhap) {
  let tonKho = JSON.parse(localStorage.getItem("tonKho")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let giaBan = JSON.parse(localStorage.getItem("giaBan")) || [];

  // Tìm tồn kho của sản phẩm
  let item = tonKho.find((t) => t.productId === productId);

  if (item) {
    // Tăng số lượng tồn kho
    item.quantity = (parseInt(item.quantity) || 0) + parseInt(soLuongNhap);
    item.soLuongTon = item.quantity; // Đồng bộ với field soLuongTon
    item.ngayNhap = ngayNhap; // Cập nhật ngày nhập mới nhất
  } else {
    // Thêm mới vào tồn kho
    tonKho.push({
      productId: productId,
      quantity: parseInt(soLuongNhap),
      soLuongTon: parseInt(soLuongNhap), // Đồng bộ với field soLuongTon
      ngayNhap: ngayNhap,
    });
  }

  // Cập nhật stock trong products
  const product = products.find((p) => p.id === productId);
  if (product) {
    product.stock = (parseInt(product.stock) || 0) + parseInt(soLuongNhap);
  }

  // Cập nhật giá vốn trong giaBan (thống kê giá bán)
  if (giaNhap && product) {
    const productName = product.name;

    // Tìm entry trong giaBan array
    let giaBanItem = giaBan.find((g) => g.id === productId);

    if (giaBanItem) {
      // Cập nhật giá vốn
      giaBanItem.giaVon = parseInt(giaNhap);

      // Tính lại giá bán dựa trên lợi nhuận cũ (nếu có)
      if (giaBanItem.loiNhuan) {
        giaBanItem.giaBan = parseInt(giaNhap) + parseInt(giaBanItem.loiNhuan);
      } else {
        giaBanItem.giaBan = parseInt(giaNhap);
      }
    } else {
      // Tạo mới entry với giá vốn
      giaBan.push({
        id: productId,
        name: productName,
        giaVon: parseInt(giaNhap),
        loiNhuan: 0,
        giaBan: parseInt(giaNhap),
      });
    }
  }

  // Lưu lại cả 3 nơi
  localStorage.setItem("tonKho", JSON.stringify(tonKho));
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("giaBan", JSON.stringify(giaBan));

  console.log(
    `Đã cập nhật tồn kho cho sản phẩm ${productId}: +${soLuongNhap}`
  );
  console.log(`   - tonKho.quantity: ${item ? item.quantity : soLuongNhap}`);
  console.log(
    `   - tonKho.soLuongTon: ${item ? item.soLuongTon : soLuongNhap}`
  );
  console.log(`   - product.stock: ${product ? product.stock : "N/A"}`);
  console.log(`   - giaBan.giaVon: ${giaNhap || "N/A"}`);
}

// Export functions to window for onclick handlers
window.hienForm = hienForm;
window.anForm = anForm;
window.luuPhieu = luuPhieu;
window.suaPhieu = suaPhieu;
window.hoanThanh = hoanThanh;
window.xoaPhieu = xoaPhieu;

// Export pagination functions
window.changeProductPage = changeProductPage;
window.changeProductPageSize = changeProductPageSize;
window.changeInventoryPage = changeInventoryPage;
window.changeInventoryPageSize = changeInventoryPageSize;

// Export product management functions
window.moFormSua = moFormSua;
window.xoaSanPham = xoaSanPham;

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
    alert(`Đăng nhập thành công!\nChào mừng ${admin.name}!`);
  } else {
    // Login failed
    errorDiv.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
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

    // Cập nhật badge thông báo đơn hàng
    updateOrderNotificationBadge();

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
      console.log("Menu 'Người dùng' đã được highlight");
    }
  }

  // Initialize login button
  updateLoginButton();

  // Login modal events
  const closeLoginModal = document.getElementById("closeLoginModal");
  const submitLogin = document.getElementById("submitLogin");

  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", () => {
      hideLoginModal();
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
      hideLoginModal();
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

// ================================================
// PASSWORD RESET REQUESTS MANAGEMENT
// ================================================

function renderPasswordResetRequests() {
  const resetRequests =
    JSON.parse(localStorage.getItem("passwordResetRequests")) || [];

  // Lọc chỉ lấy các yêu cầu pending
  const pendingRequests = resetRequests.filter(
    (req) => req.status === "pending"
  );

  adminContent.innerHTML = `
    <div class="reset-requests-section" style="margin-top: 20px;">
      <h2>Yêu cầu Reset Mật khẩu</h2>
      <p style="margin-bottom: 20px; padding: 20px; font-size: 18px;">
        Tổng số yêu cầu chờ xử lý: <strong style="color: #ff4757;">${pendingRequests.length}</strong>
      </p>
      <div class="requests-container">
      </div>
    </div>
  `;

  const container = document.querySelector(".requests-container");

  if (pendingRequests.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 10px;">
        <i class="fa-solid fa-check-circle" style="font-size: 48px; color: #2ed573; margin-bottom: 10px;"></i>
        <p style="font-size: 18px; color: #666;">Không có yêu cầu nào đang chờ xử lý</p>
      </div>
    `;
    return;
  }

  let html = `
    <div style="display: grid; gap: 20px;">
  `;

  pendingRequests.forEach((request) => {
    html += `
      <div class="request-card" style="background: white; border: 2px solid #ddd; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
          <div>
            <h3 style="margin: 0; color: #2c3e50;">
              <i class="fa-solid fa-user"></i> ${
                request.fullName || request.username
              }
            </h3>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">
              <strong>Username:</strong> ${request.username}
            </p>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">
              <strong>Email:</strong> ${request.email || "Không có"}
            </p>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; padding: 6px 12px; background: #ffa502; color: white; border-radius: 5px; font-size: 12px; font-weight: bold;">
              <i class="fa-solid fa-clock"></i> Chờ xử lý
            </span>
            <p style="margin: 8px 0 0 0; color: #999; font-size: 12px;">
              ${request.timestamp}
            </p>
          </div>
        </div>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid #eee;">
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button 
            class="btn-approve-reset" 
            data-id="${request.id}" 
            data-username="${request.username}"
            style="padding: 10px 20px; background: #2ed573; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-check"></i> Chấp nhận & Reset MK
          </button>
          <button 
            class="btn-reject-reset" 
            data-id="${request.id}"
            style="padding: 10px 20px; background: #ff4757; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-times"></i> Từ chối
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;

  // Gắn sự kiện cho các nút
  attachResetRequestHandlers();
}

function attachResetRequestHandlers() {
  // Nút chấp nhận
  document.querySelectorAll(".btn-approve-reset").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const requestId = parseInt(e.currentTarget.dataset.id);
      const username = e.currentTarget.dataset.username;
      handleApproveReset(requestId, username);
    });
  });

  // Nút từ chối
  document.querySelectorAll(".btn-reject-reset").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const requestId = parseInt(e.currentTarget.dataset.id);
      handleRejectReset(requestId);
    });
  });
}

function handleApproveReset(requestId, username) {
  const newPassword = prompt(
    `Nhập mật khẩu mới cho user "${username}":\n\n` +
      `(Mật khẩu phải có ít nhất 6 ký tự và chứa ký tự đặc biệt)`
  );

  if (!newPassword) return;

  // Validate mật khẩu
  const kyTuDacBiet = /[!@#$%^&*(),.?":{}|<>]/;
  if (newPassword.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự!");
    return;
  }
  if (!kyTuDacBiet.test(newPassword)) {
    alert("Mật khẩu phải có ký tự đặc biệt (! @ # $ % ...)");
    return;
  }

  // Cập nhật mật khẩu user
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex === -1) {
    alert("Không tìm thấy user trong hệ thống!");
    return;
  }

  users[userIndex].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));

  // Cập nhật trạng thái request
  let requests =
    JSON.parse(localStorage.getItem("passwordResetRequests")) || [];
  const reqIndex = requests.findIndex((r) => r.id === requestId);

  if (reqIndex !== -1) {
    requests[reqIndex].status = "approved";
    requests[reqIndex].approvedAt = new Date().toLocaleString("vi-VN");
    requests[reqIndex].newPassword = newPassword; // Lưu để admin có thể xem lại
    localStorage.setItem("passwordResetRequests", JSON.stringify(requests));
  }

  alert(
    `Reset mật khẩu thành công!\n\n` +
      `User: ${username}\n` +
      `Mật khẩu mới: ${newPassword}\n\n` +
      `Vui lòng thông báo cho người dùng mật khẩu mới.`
  );

  // Reload lại trang
  renderPasswordResetRequests();
}

function handleRejectReset(requestId) {
  const xacNhan = confirm(
    "Bạn có chắc muốn TỪ CHỐI yêu cầu reset mật khẩu này không?"
  );

  if (!xacNhan) return;

  // Cập nhật trạng thái request
  let requests =
    JSON.parse(localStorage.getItem("passwordResetRequests")) || [];
  const reqIndex = requests.findIndex((r) => r.id === requestId);

  if (reqIndex !== -1) {
    requests[reqIndex].status = "rejected";
    requests[reqIndex].rejectedAt = new Date().toLocaleString("vi-VN");
    localStorage.setItem("passwordResetRequests", JSON.stringify(requests));
  }

  alert("Đã từ chối yêu cầu.");

  // Reload lại trang
  renderPasswordResetRequests();
}
