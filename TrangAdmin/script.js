document.addEventListener("DOMContentLoaded", () => {
  const adminContent = document.querySelector(".admin-content");
  const sidebar = document.querySelector(".admin-sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  const sections = {
    "Người dùng(Kiên)": `
      <div class="user-section" style="margin-top: 20px;">
        <h2>Quản lý người dùng</h2>
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
    "Phiếu nhập sách(Hoàng)": `
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

  // Hiển thị Người dùng khi mở trang admin
  adminContent.innerHTML = sections["Người dùng(Kiên)"] || "";

  //Mình lấy tất cả link trong sidebar
  const menuLinks = document.querySelectorAll(".admin-sidebar-content ul li a");

  menuLinks.forEach((link) => link.classList.remove("active"));
  const defaultMenu = document.querySelector(".user");
  if (defaultMenu) defaultMenu.classList.add("active");

  // Toggle sidebar trên mobile (nếu có nút)
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  function getSectionNameFromLink(link) {
    if (link.dataset && link.dataset.section)
      return link.dataset.section.trim();
    return link.textContent.replace(/\s+/g, " ").trim();
  }

  // Gắn sự kiện cho từng link
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

      // Nếu link là menu cha (có submenu): toggle submenu và dừng (không load nội dung)
      if (submenu) {
        submenu.classList.toggle("active");
        parentLi.classList.toggle("expanded");
        return;
      }

      // Nếu không có submenu: highlight menu hiện tại và load nội dung
      menuLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const sectionName = getSectionNameFromLink(link);
      if (sections[sectionName]) {
        adminContent.innerHTML = sections[sectionName];
      } else {
        // không found thì log rõ để debug
        console.warn(
          `Section "${sectionName}" không tồn tại trong object sections.`
        );
      }

      // Đóng sidebar trên mobile
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
});
