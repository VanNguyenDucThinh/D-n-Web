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
