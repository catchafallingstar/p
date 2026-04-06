const $ = (id) => document.getElementById(id);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  });
  children.forEach((c) => node.appendChild(c));
  return node;
}
function setupTheme() {
  const toggleBtn = $("themeToggle");

  // 1. Check if user saved a preference previously. If not, check their system OS preference.
  const storedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let currentTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

  // 2. Apply the theme on load
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateToggleText(currentTheme);

  // 3. Listen for clicks on the toggle button
  toggleBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme); // Save to local storage!
    updateToggleText(currentTheme);
  });

  // 4. Update the button text to show what they are switching TO
  function updateToggleText(theme) {
    toggleBtn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }
}
function renderLinks(data) {
  const wrap = $("links");
  data.links.forEach((l) => {
    wrap.appendChild(el("a", { class: "btn", href: l.url, target: "_blank", rel: "noreferrer", text: l.label }));
  });
}

function renderContact(data) {
  const wrap = $("contact");
  data.contact.forEach((c) => {
    const row = el("div", { class: "row" });
    row.appendChild(el("div", { class: "muted", text: c.label }));
    if (c.url) row.appendChild(el("a", { href: c.url, text: c.value }));
    else row.appendChild(el("div", { text: c.value }));
    wrap.appendChild(row);
  });
}

function renderEducation(data) {
  const wrap = $("education");
  data.education.forEach((e) => {
    const box = el("div", { class: "item" });
    box.appendChild(el("div", { class: "item-title", text: e.school }));
    box.appendChild(el("div", { class: "muted", text: `${e.degree} • ${e.years}` }));
    if (e.details) box.appendChild(el("div", { class: "small", text: e.details }));
    wrap.appendChild(box);
  });
}

function renderSkills(data) {
  const wrap = $("skills");
  data.skills.forEach((s) => wrap.appendChild(el("li", { class: "chip", text: s })));
}

function renderExperience(data) {
  const wrap = $("experience");
  data.experience.forEach((x) => {
    const box = el("div", { class: "item" });
    box.appendChild(el("div", { class: "item-title", text: `${x.role} — ${x.org}` }));
    box.appendChild(el("div", { class: "muted", text: x.years }));
    const ul = el("ul", { class: "bullets" });
    x.bullets.forEach((b) => ul.appendChild(el("li", { text: b })));
    box.appendChild(ul);
    wrap.appendChild(box);
  });
}

function projectCard(p) {
  const box = el("div", { class: "item" });
  const top = el("div", { class: "item-top" });

  top.appendChild(el("div", { class: "item-title", text: p.name }));

  const links = el("div", { class: "item-links" });
  (p.links || []).forEach((l) => {
    links.appendChild(el("a", { href: l.url, target: "_blank", rel: "noreferrer", text: l.label }));
  });
  top.appendChild(links);

  box.appendChild(top);

  if (p.tags?.length) {
    const tagWrap = el("div", { class: "chips-wrap" });
    p.tags.forEach((t) => tagWrap.appendChild(el("span", { class: "chip chip-small", text: t })));
    box.appendChild(tagWrap);
  }

  box.appendChild(el("div", { class: "small", text: p.description }));
  return box;
}

function renderProjects(data) {
  const wrap = $("projects");
  wrap.innerHTML = "";
  data.projects.forEach((p) => wrap.appendChild(projectCard(p)));
}

function renderPublications(data) {
  const wrap = $("publications");
  data.publications.forEach((p) => {
    const box = el("div", { class: "item" });
    const a = el("a", { href: p.url, target: "_blank", rel: "noreferrer", text: p.title });
    box.appendChild(a);
    box.appendChild(el("div", { class: "muted", text: `${p.venue} • ${p.year}` }));
    wrap.appendChild(box);
  });
}

// function setupProjectFilters(data) {
//   const searchInput = $("projectSearch");
//   const filterToggle = $("filterToggle");
//   const filtersWrap = $("projectFilters");
//   const projectsWrap = $("projects");

//   let currentSearch = "";
//   let currentCategory = "All";

//   // Toggle the visibility of the filter buttons
//   filterToggle.addEventListener("click", () => {
//     filtersWrap.classList.toggle("hidden");
//   });

//   // Extract unique tags from all projects
//   const allTags = new Set(["All"]);
//   data.projects.forEach(p => {
//     if (p.tags) p.tags.forEach(t => allTags.add(t));
//   });

//   // Render the category buttons inside the hidden container
//   allTags.forEach(tag => {
//     const btn = el("button", {
//       class: tag === "All" ? "filter-btn active" : "filter-btn",
//       text: tag
//     });

//     btn.addEventListener("click", () => {
//       // Update UI for buttons
//       Array.from(filtersWrap.children).forEach(child => child.classList.remove("active"));
//       btn.classList.add("active");

//       // Update the toggle button text and hide the menu again
//       filterToggle.textContent = `Filter: ${tag} ▾`;
//       filtersWrap.classList.add("hidden");

//       // Apply the filter
//       currentCategory = tag;
//       renderFilteredProjects();
//     });

//     filtersWrap.appendChild(btn);
//   });

//   // Listen to the search bar
//   searchInput.addEventListener("input", (e) => {
//     currentSearch = e.target.value.toLowerCase().trim();
//     renderFilteredProjects();
//   });

//   // Render the projects based on search AND category
//   function renderFilteredProjects() {
//     projectsWrap.innerHTML = "";

//     const filtered = data.projects.filter(p => {
//       const matchesCategory = currentCategory === "All" || (p.tags && p.tags.includes(currentCategory));
//       const searchString = (p.name + " " + (p.description || "") + " " + (p.tags || []).join(" ")).toLowerCase();
//       const matchesSearch = !currentSearch || searchString.includes(currentSearch);

//       return matchesCategory && matchesSearch;
//     });

//     filtered.forEach(p => projectsWrap.appendChild(projectCard(p)));
//   }
// }

function setupProjectFilters(data) {
  const searchInput = $("projectSearch");
  const filterToggle = $("filterToggle");
  const filtersWrap = $("projectFilters");
  const projectsWrap = $("projects");

  let currentSearch = "";
  let currentCategory = "All";

  // Define which tags go into which category. 
  // (Make sure these match exactly what you type in your data.js tags!)
  const knownRoles = ["Machine Learning", "Automated Testing", "Web Development", "Accessibility", "Database", "AI & Systems"];
  const knownLanguages = ["Python", "C++", "SQL", "JavaScript", "HTML/CSS/JS"];

  // Toggle visibility of the filter menu
  filterToggle.addEventListener("click", () => {
    filtersWrap.classList.toggle("hidden");
  });

  // Extract and sort tags
  const extractedRoles = new Set();
  const extractedLanguages = new Set();

  data.projects.forEach(p => {
    if (p.tags) {
      p.tags.forEach(tag => {
        if (knownRoles.includes(tag)) extractedRoles.add(tag);
        else if (knownLanguages.includes(tag)) extractedLanguages.add(tag);
      });
    }
  });

  // Helper function to build a row of buttons
  function buildFilterRow(title, tagsSet) {
    if (tagsSet.size === 0) return; // Skip if no tags in this category

    const group = el("div", { class: "filter-group" });
    group.appendChild(el("div", { class: "filter-label", text: title }));

    const btnWrap = el("div", { class: "filter-btn-wrap" });

    tagsSet.forEach(tag => {
      const btn = el("button", { class: "filter-btn", text: tag });

      btn.addEventListener("click", () => {
        // Remove active class from ALL buttons
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        // Add active to the clicked button
        btn.classList.add("active");

        // Update state and re-render
        filterToggle.textContent = `Filter: ${tag} ▾`;
        filtersWrap.classList.add("hidden");
        currentCategory = tag;
        renderFilteredProjects();
      });

      btnWrap.appendChild(btn);
    });

    group.appendChild(btnWrap);
    filtersWrap.appendChild(group);
  }

  // Clear container
  filtersWrap.innerHTML = "";

  // 1. Create an "All Projects" reset button at the top
  const resetGroup = el("div", { class: "filter-group", style: "margin-bottom: 8px;" });
  const resetBtn = el("button", { class: "filter-btn active", text: "All Projects" });
  resetBtn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    resetBtn.classList.add("active");
    filterToggle.textContent = `Filter: All ▾`;
    filtersWrap.classList.add("hidden");
    currentCategory = "All";
    renderFilteredProjects();
  });
  resetGroup.appendChild(resetBtn);
  filtersWrap.appendChild(resetGroup);

  // 2. Build the Domain and Language rows
  buildFilterRow("Filter by Domain:", extractedRoles);
  buildFilterRow("Filter by Language:", extractedLanguages);

  // Search input listener
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderFilteredProjects();
  });

  // Filter and render logic
  function renderFilteredProjects() {
    projectsWrap.innerHTML = "";

    const filtered = data.projects.filter(p => {
      const matchesCategory = currentCategory === "All" || currentCategory === "All Projects" || (p.tags && p.tags.includes(currentCategory));
      const searchString = (p.name + " " + (p.description || "") + " " + (p.tags || []).join(" ")).toLowerCase();
      const matchesSearch = !currentSearch || searchString.includes(currentSearch);

      return matchesCategory && matchesSearch;
    });

    filtered.forEach(p => projectsWrap.appendChild(projectCard(p)));
  }
}

(function init() {
  const data = window.SITE_DATA;

  $("name").textContent = data.name;
  $("tagline").textContent = data.tagline;
  $("about").textContent = data.about;
  $("year").textContent = new Date().getFullYear();

  renderLinks(data);
  renderContact(data);
  renderSkills(data);
  renderEducation(data);
  renderExperience(data);
  renderProjects(data);
  renderPublications(data);
  setupProjectFilters(data);
  setupTheme();
})();
