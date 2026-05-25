const navbarToggler = document.querySelector(".navbar-toggle"),
  navbarMenu = document.querySelector(".navbar-menu");
navbarToggler.addEventListener("click", () => {
  (navbarToggler.classList.toggle("active"),
    navbarMenu.classList.toggle("active"));
});
const observer = new IntersectionObserver((e) => {
  e.forEach((e) => {
    e.isIntersecting && e.target.classList.add("visible");
  });
});
function renderGallery(e) {
  const t = document.getElementById("gallery-item");
  ((t.innerHTML = ""),
    e.forEach((e) => {
      const n = document.createElement("div");
      n.classList.add("card");
      const c = document.createElement("div");
      (c.classList.add("card-inner"), n.appendChild(c));
      const d = document.createElement("div");
      (d.classList.add("card-front"), c.appendChild(d));
      const a = document.createElement("img");
      ((a.src = e.image), (a.alt = e.alt), d.appendChild(a));
      const o = document.createElement("h3");
      ((o.textContent = e.title), d.appendChild(o));
      const l = document.createElement("p");
      ((l.textContent = e.description), d.appendChild(l));
      const r = document.createElement("div");
      (r.classList.add("border-card"), d.appendChild(r));
      const s = document.createElement("ul");
      (e.category.forEach((e) => {
        const t = document.createElement("li");
        ((t.textContent = e), s.appendChild(t));
      }),
        d.appendChild(s));
      const i = document.createElement("div");
      (i.classList.add("card-back"), c.appendChild(i));
      const m = document.createElement("h4");
      ((m.textContent = "objectifs:"), i.appendChild(m));
      const p = document.createElement("p");
      ((p.textContent = e.objectifs), i.appendChild(p));
      const u = document.createElement("h4");
      ((u.textContent = "stack:"), i.appendChild(u));
      const h = document.createElement("ul");
      (e.category.forEach((e) => {
        const t = document.createElement("li");
        ((t.textContent = e), h.appendChild(t));
      }),
        i.appendChild(h));
      const C = document.createElement("h4");
      ((C.textContent = "resultats:"), i.appendChild(C));
      const E = document.createElement("p");
      ((E.textContent = e.resultats), i.appendChild(E));
      const g = document.createElement("h4");
      ((g.textContent = "amélioration:"), i.appendChild(g));
      const b = document.createElement("p");
      if (((b.textContent = e.amelioration), i.appendChild(b), e.github)) {
        const t = document.createElement("a");
        ((t.href = e.github),
          (t.target = "_blank"),
          (t.rel = "noopener"),
          (t.textContent = "Voir sur gitHub"),
          i.appendChild(t));
      }
      (n.addEventListener("click", () => {
        c.classList.toggle("flipped");
      }),
        t.appendChild(n));
    }));
}
function renderFilters(e) {
  const t = document.getElementById("filter-btn"),
    n = document.createElement("button");
  ((n.textContent = "Tous"),
    n.addEventListener("click", () => renderGallery(e)),
    t.appendChild(n),
    [
      { label: "React", filter: (e) => e.category.includes("React") },
      { label: "JavaScript", filter: (e) => e.category.includes("JavaScript") },
      {
        label: "CSS / Sass",
        filter: (e) =>
          e.category.some((e) => ["CSS", "Sass", "Animation"].includes(e)),
      },
      {
        label: "SEO / Optimisation",
        filter: (e) =>
          e.category.some((e) =>
            ["SEO", "Lighthouse", "Accessibilité"].includes(e),
          ),
      },
    ].forEach((n) => {
      const c = document.createElement("button");
      ((c.textContent = n.label),
        c.addEventListener("click", () => {
          renderGallery(e.filter(n.filter));
        }),
        t.appendChild(c));
    }));
}
function renderSkills(e) {
  const t = document.getElementById("skills-content");
  ((t.innerHTML = ""),
    e.forEach((e) => {
      const n = document.createElement("details");
      (n.classList.add("skill-category"), t.appendChild(n));
      const c = document.createElement("summary");
      ((c.textContent = e.category),
        c.classList.add("title"),
        n.appendChild(c));
      const d = document.createElement("div");
      (d.classList.add("icone-grid"),
        n.appendChild(d),
        e.skills.forEach((e) => {
          const t = document.createElement("a");
          ((t.href = e.url),
            (t.target = "_blank"),
            (t.rel = "noopener noreferrer"));
          const n = document.createElement("img");
          ((n.src = e.icon), (n.alt = e.alt), t.appendChild(n));
          const c = document.createElement("span");
          ((c.textContent = e.name), t.appendChild(c), d.appendChild(t));
        }));
    }));
}
function renderExperiences(e) {
  const t = document.getElementById("experiences");
  ((t.innerHTML = ""),
    e.forEach((e) => {
      const n = document.createElement("div");
      (n.classList.add("exp-card"), t.appendChild(n));
      const c = document.createElement("h3");
      ((c.textContent = e.poste), n.appendChild(c));
      const d = document.createElement("p");
      ((d.textContent = e.entreprise), n.appendChild(d));
      const a = document.createElement("p");
      ((a.textContent = e.dates), n.appendChild(a));
      const o = document.createElement("ul");
      (e.description.forEach((e) => {
        const t = document.createElement("li");
        ((t.textContent = e), o.appendChild(t));
      }),
        n.appendChild(o),
        observer.observe(n));
    }));
}
function renderDiplomes(e) {
  const t = document.getElementById("diplomas");
  ((t.innerHTML = ""),
    e.forEach((e) => {
      const n = document.createElement("div");
      (n.classList.add("dip-card"), t.appendChild(n));
      const c = document.createElement("h3");
      ((c.textContent = e.diplome), n.appendChild(c));
      const d = document.createElement("p");
      ((d.textContent = e.etablissement), n.appendChild(d));
      const a = document.createElement("p");
      ((a.textContent = e.annee), n.appendChild(a), observer.observe(n));
    }));
}
(fetch("src/projects.json")
  .then((e) => e.json())
  .then((e) => {
    (renderGallery(e), renderFilters(e));
  }),
  fetch("src/skills.json")
    .then((e) => e.json())
    .then((e) => {
      renderSkills(e);
    }),
  fetch("src/courses.json")
    .then((e) => e.json())
    .then((e) => {
      (renderDiplomes(e.diplomes), renderExperiences(e.experiences));
    }));
