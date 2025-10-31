//đóng form đăng ký và form đăng nhập nếu nhấn vào background bên ngoài form
var DongLogin = document.getElementById('DonDangNhap');
var DongDangKy = document.getElementById('DonDangKy');
window.onclick = function(click) {
    if (click.target == DongLogin) {
        DongLogin.style.display = "none";
    }
    if (click.target == DongDangKy) {
        DongDangKy.style.display = "none";
    }
}
let images = [
  "/TrangUser/Pictures/SGU logo.jpg",
  "/TrangUser/Pictures/Book2.jpg",
  "/TrangUser/Pictures/Book3.jpg"
];

let current = 0;
let imgAdvertise = document.querySelector(".QuangCao img");
let radioButtons = document.querySelectorAll(".rdoQuangCao input");
let interval;

// 👉 Hàm đổi ảnh theo index
function showImg(index) {
  current = index;
  imgAdvertise.src = images[current];
  // Cập nhật nút radio
  radioButtons.forEach((r, i) => r.checked = (i === current));
  resetAutoSlide();
}

// 👉 Chuyển sang ảnh kế
function nextImg() {
  current++;
  if (current >= images.length) current = 0;
  showImg(current);
}

// 👉 Chuyển về ảnh trước
function prevImg() {
  current--;
  if (current < 0) current = images.length - 1;
  showImg(current);
}

// 👉 Tự động chạy
function autoSlide() {
  interval = setInterval(() => {
    nextImg();
  }, 3000); // 3 giây đổi ảnh
}

// 👉 Reset lại đếm giờ mỗi khi người dùng nhấn
function resetAutoSlide() {
  clearInterval(interval);
  autoSlide();
}

// Bắt đầu
autoSlide();
