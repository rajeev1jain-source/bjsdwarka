let catalog = {
  whatsappNumber: "919599221424",
  business: {},
  copy: {},
  homepage: {},
  categories: {}
};

const categoryLabels = {
  sarees: "Sarees",
  jewellery: "Jewellery",
  kurties: "Kurties",
  suits: "Suits"
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

const copyBindings = [
  ["home-hero-eyebrow", "home", "heroEyebrow"],
  ["home-intro-eyebrow", "home", "introEyebrow"],
  ["home-intro-title", "home", "introTitle"],
  ["home-intro-text", "home", "introText"],
  ["home-featured-eyebrow", "home", "featuredEyebrow"],
  ["home-featured-title", "home", "featuredTitle"],
  ["home-story-eyebrow", "home", "storyEyebrow"],
  ["home-story-link-text", "home", "storyLinkText"],
  ["home-visit-eyebrow", "home", "visitEyebrow"],
  ["home-visit-title", "home", "visitTitle"],
  ["home-visit-text", "home", "visitText"],
  ["home-hero-primary-text", "home", "heroPrimaryButtonText"],
  ["home-hero-whatsapp-text", "home", "heroWhatsappButtonText"],
  ["home-visit-primary-text", "home", "visitPrimaryButtonText"],
  ["home-visit-call-text", "home", "visitCallButtonText"],
  ["collections-hero-eyebrow", "collections", "heroEyebrow"],
  ["collections-hero-title", "collections", "heroTitle"],
  ["collections-hero-text", "collections", "heroText"],
  ["collections-sarees-eyebrow", "collections", "sareesEyebrow"],
  ["collections-sarees-title", "collections", "sareesTitle"],
  ["collections-jewellery-eyebrow", "collections", "jewelleryEyebrow"],
  ["collections-jewellery-title", "collections", "jewelleryTitle"],
  ["collections-kurties-eyebrow", "collections", "kurtiesEyebrow"],
  ["collections-kurties-title", "collections", "kurtiesTitle"],
  ["collections-suits-eyebrow", "collections", "suitsEyebrow"],
  ["collections-suits-title", "collections", "suitsTitle"],
  ["gallery-hero-eyebrow", "gallery", "heroEyebrow"],
  ["gallery-hero-title", "gallery", "heroTitle"],
  ["gallery-hero-text", "gallery", "heroText"],
  ["about-hero-eyebrow", "about", "heroEyebrow"],
  ["about-hero-title", "about", "heroTitle"],
  ["about-hero-text", "about", "heroText"],
  ["about-story-eyebrow", "about", "storyEyebrow"],
  ["about-story-title", "about", "storyTitle"],
  ["about-story-text-one", "about", "storyTextOne"],
  ["about-story-text-two", "about", "storyTextTwo"],
  ["about-values-eyebrow", "about", "valuesEyebrow"],
  ["about-values-title", "about", "valuesTitle"],
  ["about-value-one-title", "about", "valueOneTitle"],
  ["about-value-one-text", "about", "valueOneText"],
  ["about-value-two-title", "about", "valueTwoTitle"],
  ["about-value-two-text", "about", "valueTwoText"],
  ["about-value-three-title", "about", "valueThreeTitle"],
  ["about-value-three-text", "about", "valueThreeText"],
  ["contact-hero-eyebrow", "contact", "heroEyebrow"],
  ["contact-hero-title", "contact", "heroTitle"],
  ["contact-hero-text", "contact", "heroText"],
  ["contact-address-title", "contact", "addressTitle"],
  ["contact-phone-title", "contact", "phoneTitle"],
  ["contact-whatsapp-link-text", "contact", "whatsappLinkText"],
  ["contact-instagram-title", "contact", "instagramTitle"],
  ["contact-hours-title", "contact", "hoursTitle"]
];

function hasValue(value) {
  return value !== undefined && value !== null;
}

function getBusiness() {
  return catalog.business || {};
}

function getCopy(section) {
  return (catalog.copy && catalog.copy[section]) || {};
}

function getWhatsappNumber() {
  return getBusiness().whatsappNumber || catalog.whatsappNumber || "919599221424";
}

function whatsappUrl(message) {
  return `https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(message || "")}`;
}

async function loadCatalog() {
  const response = await fetch("catalog.json");

  if (!response.ok) {
    throw new Error(`Unable to load catalogue data (${response.status})`);
  }

  const data = await response.json();
  catalog = {
    whatsappNumber: data.business?.whatsappNumber || data.whatsappNumber || catalog.whatsappNumber,
    business: data.business || {},
    copy: data.copy || {},
    homepage: data.homepage || {},
    categories: data.categories || {}
  };
}

function setTextById(id, value) {
  const element = document.getElementById(id);

  if (!element || !hasValue(value)) {
    return;
  }

  element.textContent = String(value);
}

function setTextBySelector(selector, value) {
  if (!hasValue(value)) {
    return;
  }

  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = String(value);
  });
}

function setHrefBySelector(selector, href) {
  if (typeof href !== "string" || href.trim() === "") {
    return;
  }

  document.querySelectorAll(selector).forEach((element) => {
    element.href = href;
  });
}

function setImageById(id, src, alt) {
  const image = document.getElementById(id);

  if (!image || typeof src !== "string" || src.trim() === "") {
    return;
  }

  image.src = src;

  if (hasValue(alt)) {
    image.alt = String(alt);
  }
}

function setLinesBySelector(selector, lines) {
  if (!Array.isArray(lines) || lines.length === 0) {
    return;
  }

  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = "";
    lines.forEach((line, index) => {
      if (index > 0) {
        element.append(document.createElement("br"));
      }

      element.append(document.createTextNode(String(line)));
    });
  });
}

function setHeroImage(src) {
  const hero = document.getElementById("hero-image");

  if (!hero || typeof src !== "string" || src.trim() === "") {
    return;
  }

  hero.style.backgroundImage = `linear-gradient(90deg, rgba(6, 47, 40, 0.9), rgba(6, 47, 40, 0.56) 48%, rgba(6, 47, 40, 0.18)), url("${src}")`;
}

function getPhoneHref() {
  const business = getBusiness();
  const phoneHref = business.phoneHref || business.phone || getWhatsappNumber();

  if (typeof phoneHref !== "string" || phoneHref.trim() === "") {
    return "";
  }

  if (phoneHref.startsWith("tel:")) {
    return phoneHref;
  }

  return `tel:${phoneHref}`;
}

function getAddressSingleLine() {
  const business = getBusiness();

  if (business.addressSingleLine) {
    return business.addressSingleLine;
  }

  if (Array.isArray(business.addressLines)) {
    return business.addressLines.join(", ");
  }

  return "";
}

function getMapUrl() {
  const business = getBusiness();

  if (business.mapEmbedUrl) {
    return business.mapEmbedUrl;
  }

  const address = getAddressSingleLine();
  if (!address) {
    return "";
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function populateBusinessDetails() {
  const business = getBusiness();
  const phone = business.phone || business.phoneHref || getWhatsappNumber();
  const whatsappMessage = business.whatsappMessage || "Hi, I'd like to enquire about BJS Boutique.";

  setTextBySelector("[data-business-name]", business.name);
  setTextBySelector("[data-business-tagline]", business.tagline);
  setTextBySelector("[data-business-address-single]", getAddressSingleLine());
  setLinesBySelector("[data-business-address-lines]", business.addressLines);
  setTextBySelector("[data-business-phone-link]", phone);
  setHrefBySelector("[data-business-phone-link]", getPhoneHref());
  setHrefBySelector("[data-business-call-link]", getPhoneHref());
  setHrefBySelector("[data-business-whatsapp-link]", whatsappUrl(whatsappMessage));
  setHrefBySelector("[data-business-instagram-link]", business.instagramUrl);
  setTextBySelector("[data-business-instagram-handle]", business.instagramHandle);
  setTextBySelector("[data-business-hours]", business.businessHours);

  document.querySelectorAll("[data-business-map]").forEach((map) => {
    const mapUrl = getMapUrl();
    if (mapUrl) {
      map.src = mapUrl;
    }
  });
}

function populatePageCopy() {
  copyBindings.forEach(([id, section, key]) => {
    setTextById(id, getCopy(section)[key]);
  });
}

function populateHomepage() {
  const homepage = catalog.homepage || {};
  const hero = homepage.hero || {};
  const featuredCategories = homepage.featuredCategories || {};
  const story = homepage.story || {};

  setHeroImage(hero.image);
  setTextById("hero-title", hero.title);
  setTextById("hero-subtitle", hero.subtitle);

  setImageById("featured-sarees-image", featuredCategories.sarees);
  setImageById("featured-jewellery-image", featuredCategories.jewellery);
  setImageById("featured-kurties-image", featuredCategories.kurties);
  setImageById("featured-suits-image", featuredCategories.suits);

  setImageById("story-image", story.image);
  setTextById("story-title", story.title);
  setTextById("story-text", story.text);
}

function toNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.]/g, "");
    const number = Number(cleaned);
    return Number.isFinite(number) ? number : null;
  }

  return null;
}

function formatMoney(value) {
  const amount = toNumber(value);

  if (amount === null) {
    return "";
  }

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: getBusiness().currency || "INR",
      maximumFractionDigits: 0
    }).format(amount);
  } catch (error) {
    return `Rs. ${Math.round(amount).toLocaleString("en-IN")}`;
  }
}

function getProductPrice(product) {
  return {
    mrp: toNumber(product.mrp ?? product.originalPrice),
    selling: toNumber(product.sellingPrice ?? product.salePrice ?? product.price)
  };
}

function createPriceElement(product) {
  const priceText = product.priceText || product.priceNote;
  const { mrp, selling } = getProductPrice(product);

  if (selling === null && !priceText) {
    return null;
  }

  const price = document.createElement("div");
  price.className = "product-price";

  if (selling !== null) {
    if (mrp !== null && mrp > selling) {
      const mrpElement = document.createElement("span");
      mrpElement.className = "product-mrp";
      mrpElement.textContent = formatMoney(mrp);
      price.append(mrpElement);
    }

    const sellingElement = document.createElement("span");
    sellingElement.className = "product-selling-price";
    sellingElement.textContent = formatMoney(selling);
    price.append(sellingElement);

    if (mrp !== null && mrp > selling) {
      const discount = Math.round(((mrp - selling) / mrp) * 100);
      if (discount > 0) {
        const discountElement = document.createElement("span");
        discountElement.className = "discount-badge";
        discountElement.textContent = `${discount}% off`;
        price.append(discountElement);
      }
    }
  }

  if (priceText) {
    const note = document.createElement("span");
    note.className = "product-price-note";
    note.textContent = priceText;
    price.append(note);
  }

  return price;
}

function createStatusBadges(product) {
  const badges = [];
  const statusMap = [
    ["outOfStock", "Out of stock"],
    ["comingSoon", "Coming soon"],
    ["newArrival", "New arrival"],
    ["featured", "Featured"],
    ["bestSeller", "Best seller"]
  ];

  if (Array.isArray(product.status)) {
    badges.push(...product.status);
  } else if (product.status) {
    badges.push(product.status);
  }

  statusMap.forEach(([key, label]) => {
    if (product[key]) {
      badges.push(label);
    }
  });

  if (badges.length === 0) {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "product-statuses";

  [...new Set(badges)].forEach((label) => {
    const badge = document.createElement("span");
    badge.className = "status-badge";
    badge.textContent = String(label);
    wrapper.append(badge);
  });

  return wrapper;
}

function getVisibleProducts(category) {
  const products = catalog.categories?.[category];

  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .filter((product) => product && product.visible !== false)
    .slice()
    .sort((first, second) => {
      const firstOrder = toNumber(first.displayOrder) ?? Number.MAX_SAFE_INTEGER;
      const secondOrder = toNumber(second.displayOrder) ?? Number.MAX_SAFE_INTEGER;

      return firstOrder - secondOrder;
    });
}

function getProductMessage(product, category) {
  const baseMessage = product.whatsappMessage || getBusiness().productWhatsappMessage || "Hi, I'm interested in this product.";
  const { selling } = getProductPrice(product);
  const details = [
    product.name,
    product.code ? `Code: ${product.code}` : "",
    categoryLabels[category] ? `Category: ${categoryLabels[category]}` : "",
    selling !== null ? `Price: ${formatMoney(selling)}` : ""
  ].filter(Boolean);

  return `${baseMessage}\n${details.join(" | ")}\n${window.location.href}`.trim();
}

function createProductCard(product, category) {
  const article = document.createElement("article");
  article.className = "product-card";

  if (product.image) {
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt || product.name || product.code || categoryLabels[category] || "BJS Boutique product";
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.remove();
    });
    article.append(image);
  }

  const body = document.createElement("div");
  body.className = "product-card-body";

  const statusBadges = createStatusBadges(product);
  if (statusBadges) {
    body.append(statusBadges);
  }

  if (product.code) {
    const code = document.createElement("p");
    code.className = "product-code";
    code.textContent = `Product Code: ${product.code}`;
    body.append(code);
  }

  const title = document.createElement("h3");
  title.textContent = product.name || product.code || categoryLabels[category] || "BJS Boutique product";
  body.append(title);

  if (product.description) {
    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;
    body.append(description);
  }

  const price = createPriceElement(product);
  if (price) {
    body.append(price);
  }

  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.href = whatsappUrl(getProductMessage(product, category));
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = product.outOfStock ? "Ask Availability" : "Enquire on WhatsApp";

  body.append(link);
  article.append(body);
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
  link.href = whatsappUrl(`Hi, I'd like to enquire about ${categoryLabels[category] || category} at BJS Boutique.`);
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
    const products = getVisibleProducts(category);
    grid.innerHTML = "";

    if (products.length === 0) {
      grid.append(createEmptyCard(category));
      return;
    }

    products.forEach((product) => {
      grid.append(createProductCard(product, category));
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
    ...getVisibleProducts("sarees"),
    ...getVisibleProducts("suits"),
    ...getVisibleProducts("jewellery"),
    ...getVisibleProducts("kurties")
  ].filter((product) => product.image);

  products.forEach((product) => {
    const button = document.createElement("button");
    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute("aria-label", `Open ${product.code || product.name || "product"} in fullscreen`);

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt || product.name || product.code || "BJS Boutique product";
    image.loading = "lazy";
    image.addEventListener("error", () => {
      button.hidden = true;
    });

    const label = document.createElement("span");
    label.textContent = product.code || product.name || "Product";

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

function getHashTarget() {
  if (!window.location.hash) {
    return null;
  }

  try {
    return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  } catch (error) {
    return null;
  }
}

function scrollToHashTarget() {
  const target = getHashTarget();

  if (!target) {
    return;
  }

  const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "auto"
  });
}

function scheduleHashScroll() {
  requestAnimationFrame(() => {
    requestAnimationFrame(scrollToHashTarget);
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
  image.alt = product.alt || product.name || product.code || "BJS Boutique product";
  caption.textContent = product.code || product.name || "";
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
    populateBusinessDetails();
    populatePageCopy();
    populateHomepage();
    renderProductGrids();
    renderGallery();
    scheduleHashScroll();
  } catch (error) {
    console.error(error);
    renderCatalogError();
  }
});

window.addEventListener("hashchange", scheduleHashScroll);
