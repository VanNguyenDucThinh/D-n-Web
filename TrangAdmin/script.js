const menuLi = document.querySelectorAll(
  ".admin-sidebar-content > ul > li > a"
);

menuLi.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const bookMenu = link.parentElement.querySelector("ul");
    if (bookMenu) {
      bookMenu.classList.toggle("active");
    }
  });
});
