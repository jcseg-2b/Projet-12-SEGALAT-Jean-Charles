// Navbar toggle functionality
const navbarToggler = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggler.addEventListener("click", () => {
  navbarToggler.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});

// Rendu visuel de mes projets et des filtres

function renderGallery(projects) {
  const gallery = document.getElementById("gallery-item");
  gallery.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = project.description;
    card.appendChild(description);

    const border = document.createElement("div");
    border.classList.add("border-card");
    card.appendChild(border);

    const categoryList = document.createElement("ul");
    project.category.forEach((cat) => {
      const li = document.createElement("li");
      li.textContent = cat;
      categoryList.appendChild(li);
    });
    card.appendChild(categoryList);

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

// Rendu visuel de mes compétences

function renderSkills(skills) {
  const skillsContainer = document.getElementById("skills-content");
  skillsContainer.innerHTML = "";

  skills.forEach((skill) => {
    const skilldetails = document.createElement("details");
    skilldetails.classList.add("skill-category");
    skillsContainer.appendChild(skilldetails);

    const skillsummary = document.createElement("summary");
    skillsummary.textContent = skill.category;
    skillsummary.classList.add("title");
    skilldetails.appendChild(skillsummary);

    const skillsGrid = document.createElement("div");
    skillsGrid.classList.add("icone-grid");
    skilldetails.appendChild(skillsGrid);

    skill.skills.forEach((skill) => {
      const itemLink = document.createElement("a");
      itemLink.href = skill.url;
      itemLink.target = "_blank";
      itemLink.rel = "noopener noreferrer";

      const skillIcon = document.createElement("img");
      skillIcon.src = skill.icon;
      skillIcon.alt = skill.alt;
      itemLink.appendChild(skillIcon);

      const skillName = document.createElement("span");
      skillName.textContent = skill.name;
      itemLink.appendChild(skillName);

      skillsGrid.appendChild(itemLink);
    });
  });
}

fetch("src/skills.json")
  .then((response) => response.json())
  .then((data) => {
    renderSkills(data);
  });
