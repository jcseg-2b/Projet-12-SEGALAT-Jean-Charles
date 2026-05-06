// Navbar toggle functionality
const navbarToggler = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggler.addEventListener("click", () => {
  navbarToggler.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});

function renderGallery(projects) {
  const gallery = document.getElementById("gallery-item");
  gallery.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul>
        ${project.category.map((cat) => `<li>${cat}</li>`).join("")}
      </ul>
    `;

    gallery.appendChild(card);
  });
}

function renderFilters(projects) {
  const filterContainer = document.getElementById("filter-btn");
  const categories = [
    { label: "React", filter: (p) => p.category.includes("React") },
    { label: "JavaScript", filter: (p) => p.category.includes("JavaScript") },
    {
      label: "CSS / Sass",
      filter: (p) =>
        p.category.some((c) => ["CSS", "Sass", "Animation"].includes(c)),
    },
    {
      label: "SEO / Optimisation",
      filter: (p) =>
        p.category.some((c) =>
          ["SEO", "Lighthouse", "Accessibilité"].includes(c),
        ),
    },
  ];

  const btnAll = document.createElement("button");
  btnAll.textContent = "Tous";
  btnAll.addEventListener("click", () => renderGallery(projects));
  filterContainer.appendChild(btnAll);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.label;
    btn.addEventListener("click", () => {
      const filteredProjects = projects.filter(cat.filter);
      renderGallery(filteredProjects);
    });
    filterContainer.appendChild(btn);
  });
}

fetch("src/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    renderGallery(projects);
    renderFilters(projects);
  });
