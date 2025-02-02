function initializeSearchSettings() {
  displaySearchPrefixes();
}

function displaySearchPrefixes() {
  const prefixesContainer = document.getElementById(
    "search-prefixes-container"
  );
  prefixesContainer.innerHTML = "";

  const storedPrefixes = localStorage.getItem("searchPrefixes");
  const prefixes = storedPrefixes ? JSON.parse(storedPrefixes) : "";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Prefix";
  addButton.classList.add("add-prefix");
  addButton.addEventListener("click", addSearchPrefix);

  prefixesContainer.appendChild(addButton);

  Object.entries(prefixes).forEach(([prefix, url]) => {
    const prefixDisplay = document.createElement("div");
    prefixDisplay.classList.add("prefix-display");
    prefixDisplay.classList.add("individual-setting");

    const prefixText = document.createElement("div");
    prefixText.classList.add("prefix-text");
    prefixText.innerHTML = `<strong>-${prefix}:</strong>`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("prefix-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-prefix");
    editButton.addEventListener("click", () => editSearchPrefix(prefix, url));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-prefix");
    deleteButton.addEventListener("click", () => deleteSearchPrefix(prefix));

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    prefixDisplay.appendChild(prefixText);
    prefixDisplay.appendChild(buttonContainer);
    prefixesContainer.appendChild(prefixDisplay);
  });
}

function addSearchPrefix() {
  const fields = {
    Prefix: "",
    "URL Template {query}": ["", "url"],
  };

  createForm(fields, (formData) => {
    const prefix = formData["Prefix"].toLowerCase().trim();
    const url = formData["URL Template {query}"].trim();

    if (prefix && url) {
      const prefixes = JSON.parse(
        localStorage.getItem("searchPrefixes") || "{}"
      );
      prefixes[prefix] = url;
      localStorage.setItem("searchPrefixes", JSON.stringify(prefixes));
      displaySearchPrefixes();
    }
  });
}

function editSearchPrefix(prefix, currentUrl) {
  const fields = {
    Prefix: prefix,
    "URL Template {query}": [currentUrl, "url"],
  };

  createForm(fields, (formData) => {
    const newPrefix = formData["Prefix"].toLowerCase().trim();
    const newUrl = formData["URL Template {query}"].trim();

    if (newPrefix && newUrl) {
      const prefixes = JSON.parse(
        localStorage.getItem("searchPrefixes") || "{}"
      );
      if (newPrefix !== prefix) {
        delete prefixes[prefix];
      }
      prefixes[newPrefix] = newUrl;
      localStorage.setItem("searchPrefixes", JSON.stringify(prefixes));
      displaySearchPrefixes();
    }
  });
}

function deleteSearchPrefix(prefix) {
  const prefixes = JSON.parse(localStorage.getItem("searchPrefixes") || "{}");
  delete prefixes[prefix];
  localStorage.setItem("searchPrefixes", JSON.stringify(prefixes));
  displaySearchPrefixes();
}
