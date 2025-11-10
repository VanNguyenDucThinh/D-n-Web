document.addEventListener("DOMContentLoaded", () => {
  const adminContent = document.querySelector(".admin-content");
  const sidebar = document.querySelector(".admin-sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  //bảng dữ liệu của người dùng
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

  const sections = {
    "Người dùng": `
      <div class="user-section" style="margin-top: 20px;">
        <h2>Quản lý Người Dùng</h2>
        <p style="margin-bottom: 20px;padding:20px;font-size:20px;">Tổng số người dùng: ${danhSachNguoiDung.length}</p>
        <div class="search-bar"><b>Tìm kiếm:</b><input type="text" placeholder="Nhập thông tin" />
        </div>
        <div class="khuVucBangNguoiDung">
          </div>
      </div>
    `,
    Sách: `
      <div class="book-section" style="margin-top: 20px;">
        <h2>Quản lý sách</h2>
        <ul>
          <li>Danh mục sách</li>
          <li>Phiếu nhập sách</li>
          <li>Số lượng tồn kho</li>
        </ul>
      </div>
    `,
    "Danh mục sách(Hoàng)": `
      <div style="margin-top: 20px;">
        <h2>Danh mục sách</h2>
      </div>
    `,
    "Phiếu nhập sách(Thắng)": `
      <div style="margin-top: 20px;">
        <h2>Phiếu nhập sách</h2>
      </div>
    `,
    "Số lượng tồn kho(Thịnh)": `
      <div style="margin-top: 20px;">
        <h2>Số lượng sách tồn kho</h2>
      </div>
    `,
    "Đơn hàng(Tân)": `
      <div class="order-section" style="margin-top: 20px;">
        <h2>Quản lý đơn hàng</h2>
      </div>
    `,
    "Thống kê giá bán(Thành)": `
      <div class="stats-section" style="margin-top: 20px;">
        <h2>Thống kê</h2>
      </div>
    `,
  };

  /* BẢNG NGƯỜI DÙNG */
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

    // Tạo từng hàng dữ liệu
    danhSach.forEach((nguoiDung) => {
      const mauTrangThai =
        nguoiDung.trangThai === "Hoạt động" ? "green" : "red";
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
  //Dùng để mình tìm kiếm người dùng
  function ganChucNangTimKiem() {
    const thanhTimKiem = adminContent.querySelector(".search-bar");
    if (!thanhTimKiem) return;
    const oNhap = thanhTimKiem.querySelector("input");
    const nutTimKiem = thanhTimKiem.querySelector(".btn-search");
    const nutXoaTimKiem = thanhTimKiem.querySelector(".btn-reset-search");

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

    const thucHienXoaTimKiem = () => {
      oNhap.value = "";
      thucHienTimKiem();
    };

    oNhap && oNhap.addEventListener("input", thucHienTimKiem);
    nutTimKiem && nutTimKiem.addEventListener("click", thucHienTimKiem);

    nutXoaTimKiem &&
      nutXoaTimKiem.addEventListener("click", thucHienXoaTimKiem);
  }
  //này là để reset và mở hoặc khóa
  function xuLyHanhDong(id, hanhDong) {
    const nguoiDungCanXuLy = danhSachNguoiDung.find((u) => u.id === id);
    if (!nguoiDungCanXuLy) return;

    switch (hanhDong) {
      case "reset":
        if (
          confirm(
            `Bạn có chắc muốn làm lại cuộc đời không ${nguoiDungCanXuLy.tenDangNhap}? Cuộc đời bạn được đặt lại về '0'.`
          )
        ) {
          nguoiDungCanXuLy.matKhau = "0";
          alert(
            `Đã làm lại cuộc đời cho ${nguoiDungCanXuLy.tenDangNhap} thành công! cuộc đời bắt đầu lại từ '0'.`
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

  //Chuyển menu

  function getSectionNameFromLink(link) {
    if (link.dataset && link.dataset.section)
      return link.dataset.section.trim();
    return link.textContent.replace(/\s+/g, " ").trim();
  }

  function loadSectionContent(sectionName) {
    if (sections[sectionName]) {
      adminContent.innerHTML = sections[sectionName];
    } else {
      console.warn(
        `Section "${sectionName}" không tồn tại trong object sections.`
      );
      adminContent.innerHTML = `<h2>Nội dung "${sectionName}" không tìm thấy.</h2>`;
      return;
    }

    // Sau khi tải nội dung, gọi hàm hiển thị tương ứng
    if (sectionName === "Người dùng") {
      hienThiNguoiDung(danhSachNguoiDung);
      ganChucNangTimKiem();
    }
  }

  //Hiển thị Người dùng khi ta mở trang admin
  loadSectionContent("Người dùng");

  //Lấy tất cả link trong sidebar và thiết lập mặc định
  const menuLinks = document.querySelectorAll(".admin-sidebar-content ul li a");
  menuLinks.forEach((link) => link.classList.remove("active"));
  const defaultMenu = document.querySelector(".user");
  if (defaultMenu) defaultMenu.classList.add("active");

  //Gắn sự kiện cho nút toggle sidebar
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // 4. Gắn sự kiện cho các link menu
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

      // Nếu là menu cha có submenu:
      if (submenu) {
        submenu.classList.toggle("active");
        parentLi.classList.toggle("expanded");
        return;
      }

      // Nếu không phải menu cha:
      //Tô  menu hiện tại và tải nội dung
      menuLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const sectionName = getSectionNameFromLink(link);
      loadSectionContent(sectionName);

      // - Đóng sidebar trên mobile
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
});
