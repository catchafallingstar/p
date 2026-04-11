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

function renderContact(data) {
  const wrap = $("contact");
  data.contact.forEach((c) => {
    const row = el("div", { style: "margin-bottom: 15px;" });
    row.appendChild(el("div", { class: "muted", text: c.label }));
    if (c.url) row.appendChild(el("a", { href: c.url, text: c.value, target: "_blank" }));
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
    if (e.details) box.appendChild(el("div", { style: "margin-top: 8px;", text: e.details }));
    wrap.appendChild(box);
  });
}

function renderSkills(data) {
  const wrap = $("skills");
  data.skills.forEach((s) => wrap.appendChild(el("li", { class: "skill-card", text: s })));
}

function renderExperience(data) {
  const wrap = $("experience");
  data.experience.forEach((x) => {
    const box = el("div", { class: "item" });
    box.appendChild(el("div", { class: "item-title", text: x.role }));
    box.appendChild(el("div", { class: "muted", text: `${x.org} | ${x.years}` }));
    const ul = el("ul", { class: "bullets" });
    x.bullets.forEach((b) => ul.appendChild(el("li", { text: b, style: "margin-bottom: 8px;" })));
    box.appendChild(ul);
    wrap.appendChild(box);
  });
}

function projectCard(p) {
  const box = el("div", { class: "project-card" });
  
  // Placeholder for an image (like in the screenshots)
  // If you add { image: "assets/proj1.jpg" } to data.js, you can swap this placeholder!
  const imgPlaceholder = el("div", { class: "project-img-placeholder" });
  box.appendChild(imgPlaceholder);

  box.appendChild(el("div", { class: "item-title", text: p.name }));
  box.appendChild(el("div", { style: "font-size: 0.9rem; color: var(--muted); margin-bottom: 15px;", text: p.description }));

  if (p.tags?.length) {
    const tagWrap = el("div", { class: "chips-wrap" });
    p.tags.forEach((t) => tagWrap.appendChild(el("span", { class: "chip", text: t })));
    box.appendChild(tagWrap);
  }

  const links = el("div", { class: "chips-wrap", style: "margin-top: 15px;" });
  (p.links || []).forEach((l) => {
    links.appendChild(el("a", { href: l.url, target: "_blank", rel: "noreferrer", text: "🔗 " + l.label }));
  });
  box.appendChild(links);

  return box;
}

function renderProjects(data) {
  const wrap = $("projects");
  wrap.innerHTML = "";
  data.projects.forEach((p) => wrap.appendChild(projectCard(p)));
}

function renderLinks(data) {
  const wrap = $("links");
  if (!wrap) return;
  wrap.innerHTML = ""; // Clear out any existing links

  data.links.forEach((l) => {
    // Check if the link has an icon defined in data.js
    if (l.icon) {
      // Create the Icon
      const iconEl = el("i", { class: l.icon });
      
      // Wrap it in the <a> tag
      const a = el("a", { class: "btn icon-link", href: l.url, target: "_blank", rel: "noreferrer", title: l.label }, [iconEl]);
      
      wrap.appendChild(a);
    } else {
      // Fallback: If you forgot to add an icon, it just draws text like before
      const a = el("a", { class: "btn icon-link", href: l.url, target: "_blank", rel: "noreferrer", text: l.label });
      wrap.appendChild(a);
    }
  });
}
function setupProjectFilters(data) {
  const searchInput = $("projectSearch");
  const filterToggle = $("filterToggle");
  const filtersWrap = $("projectFilters");
  const projectsWrap = $("projects");

  let currentSearch = "";
  let currentCategory = "All Projects";

  const knownRoles = ["Machine Learning", "Automated Testing", "Web Development", "Accessibility", "Database", "AI & Systems"];
  const knownLanguages = ["Python", "C++", "SQL", "JavaScript", "HTML/CSS/JS"];

  filterToggle.addEventListener("click", () => {
    filtersWrap.classList.toggle("hidden");
  });

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

  function buildFilterRow(title, tagsSet) {
    if (tagsSet.size === 0) return; 

    const group = el("div", { class: "filter-group", style: "margin-bottom: 15px;" });
    group.appendChild(el("div", { class: "filter-label", text: title, style: "font-size: 0.8rem; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;" }));

    const btnWrap = el("div", { class: "filter-btn-wrap", style: "display: flex; gap: 8px; flex-wrap: wrap;" });

    tagsSet.forEach(tag => {
      // Using the secondary-btn styling from the new layout
      const btn = el("button", { class: "btn secondary-btn", text: tag, style: "padding: 6px 12px; font-size: 0.8rem;" });

      btn.addEventListener("click", () => {
        // Remove active styling from all buttons
        document.querySelectorAll(".filter-btn-wrap .btn").forEach(b => {
            b.style.borderColor = "var(--border)";
            b.style.color = "var(--text)";
        });
        // Add active styling to clicked button (UMich Maize)
        btn.style.borderColor = "var(--maize)";
        btn.style.color = "var(--maize)";

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

  filtersWrap.innerHTML = "";

  const resetGroup = el("div", { class: "filter-group", style: "margin-bottom: 15px;"});
  const resetBtn = el("button", { class: "btn secondary-btn", text: "All Projects", style: "padding: 6px 12px; font-size: 0.8rem; border-color: var(--maize); color: var(--maize);" });
  
  resetBtn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn-wrap .btn").forEach(b => {
        b.style.borderColor = "var(--border)";
        b.style.color = "var(--text)";
    });
    resetBtn.style.borderColor = "var(--maize)";
    resetBtn.style.color = "var(--maize)";
    
    filterToggle.textContent = `Filter: All ▾`;
    filtersWrap.classList.add("hidden");
    currentCategory = "All Projects";
    renderFilteredProjects();
  });
  
  resetGroup.appendChild(resetBtn);
  filtersWrap.appendChild(resetGroup);

  buildFilterRow("Domain", extractedRoles);
  buildFilterRow("Language", extractedLanguages);

  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderFilteredProjects();
  });

  function renderFilteredProjects() {
    projectsWrap.innerHTML = "";

    const filtered = data.projects.filter(p => {
      const matchesCategory = currentCategory === "All Projects" || (p.tags && p.tags.includes(currentCategory));
      const searchString = (p.name + " " + (p.description || "") + " " + (p.tags || []).join(" ")).toLowerCase();
      const matchesSearch = !currentSearch || searchString.includes(currentSearch);

      return matchesCategory && matchesSearch;
    });

    // Make sure it uses the new card layout function
    filtered.forEach(p => projectsWrap.appendChild(projectCard(p)));
  }
  
  // Call it once to render projects initially based on default "All Projects"
  renderFilteredProjects();
}
function setupMobileMenu() {
  const toggleBtn = $("mobileToggle");
  const navLinks = $("navLinks");
  const icon = toggleBtn.querySelector("i");
  const links = navLinks.querySelectorAll("a");

  // Toggle the menu when clicking the hamburger icon
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    // Switch the icon between Hamburger (bars) and X (times)
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Automatically close the sidebar when a link is clicked
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
}
(function init() {
  const data = window.SITE_DATA;

  $("nav-name").textContent = data.name;
  $("tagline").textContent = data.tagline;
  $("about").textContent = data.about;
  $("year").textContent = new Date().getFullYear();

  renderContact(data);
  renderSkills(data);
  renderEducation(data);
  renderExperience(data);
  renderProjects(data);
  renderLinks(data);
  setupProjectFilters(data);
  setupMobileMenu(); 

})();