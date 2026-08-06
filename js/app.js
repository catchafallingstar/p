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
  const box = el("article", {
    class: "project-card project-compact"
  });
  const media = el("div", { class: "project-media" });
  const content = el("div", { class: "project-content" });

  if (p.image) {
    const img = el("img", { src: p.image, alt: "Project preview: " + p.name, class: "project-img" });
    media.appendChild(img);
  } else {
    const imgPlaceholder = el("div", { class: "project-img-placeholder" });
    const icon = el("i", { class: "fas fa-code", style: "font-size: 3rem; color: var(--border); opacity: 0.6;" });
    const text = el("div", { 
      text: p.tags && p.tags.length > 0 ? p.tags[0] : "Project", 
      style: "margin-top: 10px; font-weight: bold; color: var(--border); opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;" 
    });
    
    imgPlaceholder.appendChild(icon);
    imgPlaceholder.appendChild(text);
    media.appendChild(imgPlaceholder);
  }

  box.appendChild(media);

  const primaryCategory = p.categories?.[0];
  if (primaryCategory || p.date) {
    const meta = el("div", { class: "project-meta" });
    if (primaryCategory) meta.appendChild(el("span", { class: "project-context", text: primaryCategory }));
    if (p.date) meta.appendChild(el("span", { class: "project-date", text: p.date }));
    content.appendChild(meta);
  }

  content.appendChild(el("h3", { class: "item-title", text: p.name }));

  content.appendChild(el("p", { class: "project-description", text: p.description }));

  if (p.tags?.length) {
    const tagWrap = el("div", { class: "chips-wrap" });
    p.tags.forEach((t) => tagWrap.appendChild(el("span", { class: "chip", text: t })));
    content.appendChild(tagWrap);
  }

  const links = el("div", { class: "project-links" });
  if (p.links && p.links.length > 0) {
    p.links.forEach((l) => {
      links.appendChild(el("a", { href: l.url, target: "_blank", rel: "noreferrer", text: l.label + " ↗" }));
    });
  } else {
    const privateSpan = el("span", { class: "project-private", text: "Code private — available upon request" });
    links.appendChild(privateSpan);
  }

  content.appendChild(links);
  box.appendChild(content);
  return box;
}

function renderProjects(data) {
  const wrap = $("projects");
  wrap.innerHTML = "";
  const orderedProjects = data.projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const aTime = a.project.startDate ? Date.parse(a.project.startDate) : NaN;
      const bTime = b.project.startDate ? Date.parse(b.project.startDate) : NaN;
      const aHasDate = Number.isFinite(aTime);
      const bHasDate = Number.isFinite(bTime);

      if (aHasDate && bHasDate) return bTime - aTime;
      if (aHasDate) return -1;
      if (bHasDate) return 1;
      return a.index - b.index;
    })
    .map(({ project }) => project);

  orderedProjects.forEach((p) => {
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
  const searchClear = $("projectSearchClear");
  const filterToggle = $("filterToggle");
  const filtersWrap = $("projectFilters");
  const resultsStatus = $("projectResultsStatus");

  let currentSearch = "";
  let currentCategory = "All Projects";
  const knownDomains = ["Machine Learning", "Automated Testing", "Web Development", "Accessibility", "Database", "Databases", "AI & Systems", "Web Scraping"];
  const knownTechnologies = ["Python", "C++", "SQL", "JavaScript", "HTML/CSS/JS", "Java", "React", "Vite", "Django", "Streamlit", "PostgreSQL", "AWS", "Linux"];

  const normalizeSearch = (value) => value
    .toLocaleLowerCase()
    .trim()
    .replace(/[–—-]/g, " ")
    .replace(/[^\p{L}\p{N}+#]+/gu, " ")
    .replace(/\s+/g, " ");

  filterToggle.addEventListener("click", () => {
    const isOpening = filtersWrap.classList.contains("hidden");
    filtersWrap.classList.toggle("hidden");
    filterToggle.setAttribute("aria-expanded", String(isOpening));
  });

  filtersWrap.innerHTML = "";
  const extractedDomains = new Set();
  const extractedTechnologies = new Set();

  data.projects.forEach((project) => {
    (project.tags || []).forEach((tag) => {
      if (knownDomains.includes(tag)) extractedDomains.add(tag);
      else if (knownTechnologies.includes(tag)) extractedTechnologies.add(tag);
    });
  });

  function selectFilter(button, value) {
    currentCategory = value;
    filtersWrap.querySelectorAll(".project-filter-btn").forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });
    filterToggle.textContent = `Filter: ${value === "All Projects" ? "All" : value} ▾`;
    filterToggle.setAttribute("aria-expanded", "false");
    filtersWrap.classList.add("hidden");
    renderFilteredProjects();
  }

  function buildFilterRow(title, values) {
    if (values.size === 0) return;
    const group = el("div", { class: "filter-group" });
    group.appendChild(el("div", { class: "filter-label", text: title }));
    const buttonWrap = el("div", { class: "filter-btn-wrap" });

    values.forEach((value) => {
      const button = el("button", {
        class: "btn secondary-btn project-filter-btn",
        type: "button",
        text: value,
        "aria-pressed": "false"
      });
      button.addEventListener("click", () => selectFilter(button, value));
      buttonWrap.appendChild(button);
    });

    group.appendChild(buttonWrap);
    filtersWrap.appendChild(group);
  }

  const allGroup = el("div", { class: "filter-group" });
  allGroup.appendChild(el("div", { class: "filter-label", text: "Show" }));
  const allButtonWrap = el("div", { class: "filter-btn-wrap" });
  const allButton = el("button", {
    class: "btn secondary-btn project-filter-btn is-active",
    type: "button",
    text: "All Projects",
    "aria-pressed": "true"
  });
  allButton.addEventListener("click", () => selectFilter(allButton, "All Projects"));
  allButtonWrap.appendChild(allButton);
  allGroup.appendChild(allButtonWrap);
  filtersWrap.appendChild(allGroup);

  buildFilterRow("Domain", extractedDomains);
  buildFilterRow("Technology", extractedTechnologies);

  /*
   * Search stays independent from the filters, so visitors can combine a
   * technology/domain filter with words from a project title or description.
   */
  const updateSearch = () => {
    currentSearch = normalizeSearch(searchInput.value);
    searchClear.classList.toggle("hidden", !currentSearch);
    renderFilteredProjects();
  };

  searchInput.addEventListener("input", updateSearch);
  searchInput.addEventListener("search", updateSearch);
  searchInput.addEventListener("change", updateSearch);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateSearch();
    }
  });
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    currentSearch = "";
    searchClear.classList.add("hidden");
    renderFilteredProjects();
    searchInput.focus();
  });

  function renderFilteredProjects() {
    data.projects.forEach(p => {
      const matchesCategory = currentCategory === "All Projects" || (p.tags || []).some((tag) => tag.toLocaleLowerCase() === currentCategory.toLocaleLowerCase());
      const searchString = normalizeSearch([
        p.name,
        p.date,
        p.description,
        ...(p.categories || []),
        ...(p.tags || [])
      ].filter(Boolean).join(" "));
      const searchTerms = currentSearch.split(" ").filter(Boolean);
      const matchesSearch = searchTerms.length === 0 || searchTerms.every((term) => searchString.includes(term));

      if (matchesCategory && matchesSearch) {
        p.domNode.classList.remove("hidden-card");
        void p.domNode.offsetWidth; // Triggers browser reflow to restart animation
        p.domNode.classList.add("fade-in");
      } else {
        p.domNode.classList.add("hidden-card");
        p.domNode.classList.remove("fade-in");
      }
    });

    const noResultsMessage = $("noProjectResults");
    const projectsContainer = $("projects");
    const visibleProjects = Array.from(projectsContainer.children).filter(node => !node.classList.contains("hidden-card"));
    noResultsMessage.classList.toggle("hidden", visibleProjects.length > 0);
    resultsStatus.textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"} shown`;
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

  // Smooth scroll progress bar logic
  window.addEventListener('scroll', () => {
    const bar = $('scrollProgress');
    if (!bar) return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

function setupActiveNavigation() {
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = navAnchors
    .map((anchor) => document.querySelector(anchor.getAttribute('href')))
    .filter(Boolean);

  if (!navAnchors.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    const activeEntry = entries.find((entry) => entry.isIntersecting);
    if (!activeEntry) return;

    navAnchors.forEach((anchor) => {
      const isCurrent = anchor.getAttribute('href') === `#${activeEntry.target.id}`;
      if (isCurrent) anchor.setAttribute('aria-current', 'true');
      else anchor.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

// Function to create the typing effect
function typeEffect(elementId, text, speed) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const terminalBody = element.closest('.terminal-body');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = text;
    if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    return;
  }
  
  let i = 0;
  element.innerHTML = ""; // Clear it initially
  
  function type() {
    if (i < text.length) {
      // Handle line breaks correctly so it formats beautifully
      if (text.charAt(i) === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += text.charAt(i);
      }

      // Keep the newest typed text and cursor visible inside the terminal.
      if (terminalBody) {
        requestAnimationFrame(() => {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        });
      }

      i++;
      setTimeout(type, speed);
    }
  }
  
  // Start typing after a short delay so the user sees it begin
  setTimeout(type, 500); 
}
(function init() {
  const data = window.SITE_DATA;

  $("nav-name").textContent = data.name;
  $("tagline").textContent = data.tagline;

  $("year").textContent = new Date().getFullYear();
  typeEffect("typed-about", data.about, 25); // NEW: Start the typing effect on page load
  renderContact(data);
  renderSkills(data);
  renderEducation(data);
  renderExperience(data);
  renderProjects(data); // Renders the DOM elements first
  renderLinks(data);
  setupProjectFilters(data); // Attaches animations and logic to those elements
  setupMobileMenu();
  setupA11y(); // Initialize Accessibility toggle
  setupScrollAnimations();
  setupActiveNavigation();
})();
