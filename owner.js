const categoryLabels = {
  sarees: "Sarees",
  jewellery: "Jewellery",
  kurties: "Kurties",
  suits: "Suits"
};

const categoryOrder = ["sarees", "jewellery", "kurties", "suits"];

let ownerCatalog = null;

function getStatusElement() {
  return document.querySelector("[data-owner-status]");
}

function setStatus(message, type = "") {
  const status = getStatusElement();

  if (!status) {
    return;
  }

  status.className = `owner-status${type ? ` is-${type}` : ""}`;
  status.textContent = message;
}

function getByPath(source, path) {
  return path.split(".").reduce((current, key) => {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      return current[key];
    }

    return undefined;
  }, source);
}

function setByPath(source, path, value) {
  const keys = path.split(".");
  const finalKey = keys.pop();
  let current = source;

  keys.forEach((key) => {
    if (!current[key] || typeof current[key] !== "object" || Array.isArray(current[key])) {
      current[key] = {};
    }

    current = current[key];
  });

  current[finalKey] = value;
}

function setInputValue(input, value) {
  if (input.matches("[data-lines]")) {
    input.value = Array.isArray(value) ? value.join("\n") : "";
    return;
  }

  input.value = value === undefined || value === null ? "" : String(value);
}

function normalizeNumber(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return null;
  }

  const number = Number(trimmed);
  return Number.isFinite(number) ? number : null;
}

function ensureCatalogShape() {
  ownerCatalog.business = ownerCatalog.business || {};
  ownerCatalog.homepage = ownerCatalog.homepage || {};
  ownerCatalog.homepage.hero = ownerCatalog.homepage.hero || {};
  ownerCatalog.homepage.story = ownerCatalog.homepage.story || {};
  ownerCatalog.copy = ownerCatalog.copy || {};
  ownerCatalog.copy.home = ownerCatalog.copy.home || {};
  ownerCatalog.categories = ownerCatalog.categories || {};

  categoryOrder.forEach((category) => {
    if (!Array.isArray(ownerCatalog.categories[category])) {
      ownerCatalog.categories[category] = [];
    }
  });
}

async function loadOwnerCatalog() {
  const response = await fetch("catalog.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Unable to load catalog.json (${response.status})`);
  }

  ownerCatalog = await response.json();
  ensureCatalogShape();
}

function populatePathFields() {
  document.querySelectorAll("[data-path]").forEach((input) => {
    setInputValue(input, getByPath(ownerCatalog, input.dataset.path));
  });
}

function getProductEntries() {
  return categoryOrder.flatMap((category) => {
    const products = ownerCatalog.categories[category] || [];

    return products.map((product, index) => ({
      category,
      index,
      product
    }));
  });
}

function productMatchesFilter(entry) {
  const categoryFilter = document.getElementById("category-filter")?.value || "all";
  const search = (document.getElementById("product-search")?.value || "").trim().toLowerCase();
  const product = entry.product || {};
  const text = [
    entry.category,
    categoryLabels[entry.category],
    product.code,
    product.name
  ].filter(Boolean).join(" ").toLowerCase();

  return (categoryFilter === "all" || entry.category === categoryFilter) && (!search || text.includes(search));
}

function getProductPriceValue(product, key) {
  const value = product[key];
  return value === undefined || value === null ? "" : String(value);
}

function renderProducts() {
  const list = document.getElementById("product-list");
  const template = document.getElementById("product-row-template");

  if (!list || !template) {
    return;
  }

  list.innerHTML = "";
  const entries = getProductEntries().filter(productMatchesFilter);

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "owner-status";
    empty.textContent = "No products found.";
    list.append(empty);
    return;
  }

  entries.forEach(({ category, index, product }) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const image = row.querySelector("[data-product-image]");
    const code = row.querySelector("[data-product-code]");
    const heading = row.querySelector("[data-product-heading]");

    row.dataset.category = category;
    row.dataset.index = String(index);
    row.classList.toggle("is-hidden-product", product.visible === false);

    if (image) {
      image.src = product.image || "";
      image.alt = product.alt || product.name || product.code || "";
      image.addEventListener("error", () => {
        image.hidden = true;
      });
      if (!product.image) {
        image.hidden = true;
      }
    }

    if (code) {
      code.textContent = `${categoryLabels[category] || category} ${product.code || ""}`.trim();
    }

    if (heading) {
      heading.textContent = product.name || product.code || "Product";
    }

    row.querySelector('[data-product-field="name"]').value = product.name || "";
    row.querySelector('[data-product-field="mrp"]').value = getProductPriceValue(product, "mrp");
    row.querySelector('[data-product-field="sellingPrice"]').value = getProductPriceValue(product, "sellingPrice");
    row.querySelector('[data-product-field="visible"]').checked = product.visible !== false;
    row.querySelector('[data-product-field="featured"]').checked = product.featured === true;
    row.querySelector('[data-product-field="newArrival"]').checked = product.newArrival === true;
    row.querySelector('[data-product-field="outOfStock"]').checked = product.outOfStock === true;

    list.append(row);
  });
}

function getProductFromRow(row) {
  const products = ownerCatalog.categories[row.dataset.category] || [];
  return products[Number(row.dataset.index)];
}

function setProductBoolean(product, field, checked) {
  if (field === "visible") {
    if (checked) {
      delete product.visible;
    } else {
      product.visible = false;
    }

    return;
  }

  if (checked) {
    product[field] = true;
  } else {
    delete product[field];
  }
}

function updateProductField(input) {
  const row = input.closest("[data-category][data-index]");
  const product = row ? getProductFromRow(row) : null;

  if (!product) {
    return;
  }

  const field = input.dataset.productField;

  if (input.type === "checkbox") {
    setProductBoolean(product, field, input.checked);
    row.classList.toggle("is-hidden-product", product.visible === false);
  } else if (field === "mrp" || field === "sellingPrice") {
    const number = normalizeNumber(input.value);

    if (number === null) {
      delete product[field];
    } else {
      product[field] = number;
    }
  } else {
    product[field] = input.value;

    if (field === "name") {
      const heading = row.querySelector("[data-product-heading]");
      if (heading) {
        heading.textContent = input.value || product.code || "Product";
      }
    }
  }
}

function updatePathField(input) {
  const value = input.matches("[data-lines]")
    ? input.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    : input.value;

  setByPath(ownerCatalog, input.dataset.path, value);
}

function markChanged() {
  setStatus("Changes are ready. Download catalog.json when finished.", "ready");
}

function handleFormInput(event) {
  const input = event.target;

  if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement)) {
    return;
  }

  if (input.matches("[data-path]")) {
    updatePathField(input);
    markChanged();
    return;
  }

  if (input.matches("[data-product-field]")) {
    updateProductField(input);
    markChanged();
  }
}

function downloadCatalog() {
  const blob = new Blob([`${JSON.stringify(ownerCatalog, null, 2)}\n`], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "catalog.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("catalog.json downloaded.", "ready");
}

function setupOwnerEvents() {
  document.getElementById("owner-form")?.addEventListener("input", handleFormInput);
  document.getElementById("category-filter")?.addEventListener("change", renderProducts);
  document.getElementById("product-search")?.addEventListener("input", renderProducts);
  document.getElementById("download-catalog")?.addEventListener("click", downloadCatalog);
}

async function initOwner() {
  setupOwnerEvents();

  try {
    await loadOwnerCatalog();
    populatePathFields();
    renderProducts();
    document.getElementById("owner-form").hidden = false;
    document.getElementById("download-catalog").disabled = false;
    setStatus("catalog.json loaded.", "ready");
  } catch (error) {
    console.error(error);
    setStatus("Could not load catalog.json. Open this page from Vercel or a local server.", "error");
  }
}

document.addEventListener("DOMContentLoaded", initOwner);
