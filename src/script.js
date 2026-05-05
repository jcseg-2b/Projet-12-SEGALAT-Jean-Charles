const navbarToggler = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggler.addEventListener("click", () => {
  navbarToggler.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});
