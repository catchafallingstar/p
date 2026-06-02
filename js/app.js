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
  const box = el("div", { class: "project-card", });

  if (p.image) {
    const img = el("img", { src: p.image, alt: "cover image of " + p.name, class: "project-img" });
    box.appendChild(img);
  } else {
    // NEW: Interactive Placeholder for empty states
    const imgPlaceholder = el("div", { class: "project-img-placeholder" });
    const icon = el("i", { class: "fas fa-code", style: "font-size: 3rem; color: var(--border); opacity: 0.6;" });
    const text = el("div", { 
      text: p.tags && p.tags.length > 0 ? p.tags[0] : "Project", 
      style: "margin-top: 10px; font-weight: bold; color: var(--border); opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;" 
    });
    
    imgPlaceholder.appendChild(icon);
    imgPlaceholder.appendChild(text);
    box.appendChild(imgPlaceholder);
  }

  box.appendChild(el("div", { class: "item-title", text: p.name }));
  box.appendChild(el("div", { style: "font-size: 0.9rem; color: var(--muted); margin-bottom: 15px;", text: p.description }));

  if (p.tags?.length) {
    const tagWrap = el("div", { class: "chips-wrap" });
    p.tags.forEach((t) => tagWrap.appendChild(el("span", { class: "chip", text: t })));
    box.appendChild(tagWrap);
  }

  const links = el("div", { class: "chips-wrap", style: "margin-top: 15px;" });
  if (p.links && p.links.length > 0) {
    p.links.forEach((l) => {
      links.appendChild(el("a", { href: l.url, target: "_blank", rel: "noreferrer", text: "🔗 " + l.label }));
    });
  } else {
    const privateSpan = el("span", { style: "font-size: 0.85rem; color: var(--muted);", text: " Code Private (Available upon request)" });
    links.appendChild(privateSpan);
  }
  
  box.appendChild(links);
  return box;
}

function renderProjects(data) {
  const wrap = $("projects");
  wrap.innerHTML = "";
  // NEW: Save the DOM element directly to the data object so we can animate it later
  data.projects.forEach((p) => {
    p.domNode = projectCard(p);
    wrap.appendChild(p.domNode);
  });
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

  let currentSearch = "";
  let currentCategory = "All Projects";

  // Note: I added Linux and Databases so your filter bugs are fixed too!
  const knownRoles = ["Machine Learning", "Automated Testing", "Web Development", "Accessibility", "Database", "Databases", "AI & Systems", "Django", "AWS", "Linux"];
  const knownLanguages = ["Python", "C++", "SQL", "JavaScript", "HTML/CSS/JS", "Java"];

  filterToggle.addEventListener("click", () => filtersWrap.classList.toggle("hidden"));

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
      const btn = el("button", { class: "btn secondary-btn", text: tag, style: "padding: 6px 12px; font-size: 0.8rem;" });
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn-wrap .btn").forEach(b => {
          b.style.borderColor = "var(--border)";
          b.style.color = "var(--text)";
        });
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
  const resetGroup = el("div", { class: "filter-group", style: "margin-bottom: 15px;" });
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
    data.projects.forEach(p => {
      const matchesCategory = currentCategory === "All Projects" || (p.tags && p.tags.includes(currentCategory));
      const searchString = (p.name + " " + (p.description || "") + " " + (p.tags || []).join(" ")).toLowerCase();
      const matchesSearch = !currentSearch || searchString.includes(currentSearch);

      // NEW: Smoothly toggle classes instead of erasing the HTML
      if (matchesCategory && matchesSearch) {
        p.domNode.classList.remove("hidden-card");
        void p.domNode.offsetWidth; // Triggers browser reflow to restart animation
        p.domNode.classList.add("fade-in");
      } else {
        p.domNode.classList.add("hidden-card");
        p.domNode.classList.remove("fade-in");
      }
    });
  }

  renderFilteredProjects();
}

// NEW: A11y feature logic
function setupA11y() {
  const toggle = $("a11yToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dyslexia-mode");
    const isActive = document.body.classList.contains("dyslexia-mode");
    toggle.setAttribute("aria-pressed", isActive);
    
    // Optional: Switch icon styling so the user knows it's active
    if (isActive) {
      toggle.style.backgroundColor = "var(--maize)";
      toggle.style.color = "var(--bg)";
    } else {
      toggle.style.backgroundColor = "transparent";
      toggle.style.color = "var(--text)";
    }
  });
}



function setupMobileMenu() {
  const toggleBtn = $("mobileToggle");
  const navLinks = $("navLinks");
  const icon = toggleBtn.querySelector("i");
  const links = navLinks.querySelectorAll("a");

  // Toggle the menu when clicking the hamburger icon
  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    
    // Toggle the visual menu
    navLinks.classList.toggle("active");

    // Toggle ARIA attributes for screen readers
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    toggleBtn.setAttribute("aria-label", !isExpanded ? "Close navigation menu" : "Open navigation menu");

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
      
      // Reset ARIA attributes when a link closes the menu
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Open navigation menu");
    });
  });
}
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1 });

  // Add the 'reveal' class to sections, cards, and titles in your HTML or JS
  document.querySelectorAll('.section, .project-card, .item').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
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
  renderProjects(data); // Renders the DOM elements first
  renderLinks(data);
  setupProjectFilters(data); // Attaches animations and logic to those elements
  setupMobileMenu();
  setupA11y(); // Initialize Accessibility toggle
  setupScrollAnimations()
})();