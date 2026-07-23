let catalog = {
  whatsappNumber: "919599221424",
  categories: {}
};

const emptyCategoryCopy = {
  jewellery: {
    title: "Jewellery selection available in boutique",
    message: "Ask on WhatsApp or visit the boutique to see current jewellery pieces and styling options."
  },
  kurties: {
    title: "Kurties catalogue coming soon",
    message: "New kurti photos can be added here as soon as the boutique images are ready."
  },
  suits: {
    title: "Suits catalogue coming soon",
    message: "Message the boutique for current suit availability, colors and visit guidance."
  }
};

function whatsappUrl(message) {
  return `https://wa.me/${catalog.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

async function loadCatalog() {
  const response = await fetch("catalog.json");

  if (!response.ok) {
    throw new Error(`Unable to load catalogue data (${response.status})`);
  }

  const data = await response.json();
  catalog = {
    whatsappNumber: data.whatsappNumber || catalog.whatsappNumber,
    categories: data.categories || {}
  };
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.alt;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "product-card-body";

  const code = document.createElement("p");
  code.className = "product-code";
  code.textContent = `Product Code: ${product.code}`;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.href = whatsappUrl(`Hi, I'm interested in product ${product.code}.`);
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Enquire on WhatsApp";

  body.append(code, title, link);
  article.append(image, body);
  return article;
}

function createEmptyCard(category) {
  const copy = emptyCategoryCopy[category] || {
    title: "Collection available in boutique",
    message: "Message BJS Boutique for current availability."
  };

  const article = document.createElement("article");
  article.className = "empty-card";

  const content = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Visit or message";

  const title = document.createElement("h3");
  title.textContent = copy.title;

  const message = document.createElement("p");
  message.textContent = copy.message;

  const link = document.createElement("a");
  link.className = "btn btn-outline";
  link.href = whatsappUrl(`Hi, I'd like to enquire about ${category} at BJS Boutique.`);
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Ask on WhatsApp";

  content.append(eyebrow, title, message);
  article.append(content, link);
  return article;
}

function renderProductGrids() {
  document.querySelectorAll("[data-product-grid]").forEach((grid) => {
    const category = grid.dataset.category;
    const products = catalog.categories[category] || [];
    grid.innerHTML = "";

    if (products.length === 0) {
      grid.append(createEmptyCard(category));
      return;
    }

    products.forEach((product) => {
      grid.append(createProductCard(product));
    });
  });
}

function renderGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) {
    return;
  }

  gallery.innerHTML = "";
  const products = [
  ...(catalog.categories.sarees || []),
  ...(catalog.categories.suits || []),
  ...(catalog.categories.jewellery || []),
  ...(catalog.categories.kurties || [])
];

  products.forEach((product) => {
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `Open ${product.code} in fullscreen`);

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt;
    image.loading = "lazy";

    const label = document.createElement("span");
    label.textContent = product.code;

    button.append(image, label);
    button.addEventListener("click", () => openLightbox(product));
    gallery.append(button);
  });
}

function renderCatalogError() {
  document.querySelectorAll("[data-product-grid], [data-gallery]").forEach((container) => {
    container.innerHTML = "";
    const article = document.createElement("article");
    article.className = "empty-card";

    const content = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "Catalogue unavailable";

    const title = document.createElement("h3");
    title.textContent = "Product data could not be loaded";

    const message = document.createElement("p");
    message.textContent = "Please open the website through a local server or deploy it to Vercel so catalog.json can be loaded.";

    content.append(eyebrow, title, message);
    article.append(content);
    container.append(article);
  });
}

function openLightbox(product) {
  const lightbox = document.querySelector("[data-lightbox]");
  const image = document.querySelector("[data-lightbox-image]");
  const caption = document.querySelector("[data-lightbox-caption]");

  if (!lightbox || !image || !caption) {
    return;
  }

  image.src = product.image;
  image.alt = product.alt;
  caption.textContent = product.code;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const image = document.querySelector("[data-lightbox-image]");

  if (!lightbox) {
    return;
  }

  lightbox.hidden = true;
  document.body.style.overflow = "";

  if (image) {
    image.removeAttribute("src");
    image.alt = "";
  }
}

function setupLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const closeButton = document.querySelector("[data-lightbox-close]");

  if (!lightbox) {
    return;
  }

  closeButton?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".primary-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

function setFooterYear() {
  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setupNavigation();
  setupLightbox();
  setFooterYear();

  try {
    await loadCatalog();
    renderProductGrids();
    renderGallery();
  } catch (error) {
    console.error(error);
    renderCatalogError();
  }
});
