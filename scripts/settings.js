document.addEventListener("DOMContentLoaded", () => {
  const openIcon = document.getElementById("settings-icon");
  const addButton = document.getElementById("add-bookmark");

  openIcon.addEventListener("click", openSettingsTab);
  addButton.addEventListener("click", addBookmark);

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
      openSettingsTab();
    }
  });

  displayBookmarksInSettings();
});

function openSettingsTab() {
  const settings = document.querySelector(".settings");
  settings.classList.toggle("show");
}

function addBookmark() {
  const title = prompt("Enter the title of the new bookmark set:");
  if (title) {
    const color = prompt("Choose a color:", "#fff");
    const hide = confirm("Do you want to hide this bookmark set?");
    const newBookmarkSet = {
      title: title,
      links: [],
      hide: hide,
      color: color,
      open: false,
      number: bookmarks.length,
    };
    bookmarks.push(newBookmarkSet);
    saveBookmarks();
    displayBookmarksInSettings();
    setupBookmarks();
  }
}

function removeBookmark(index) {
  if (confirm("Are you sure you want to remove this bookmark set?")) {
    bookmarks.splice(index, 1);
    saveBookmarks();
    displayBookmarksInSettings();
    setupBookmarks();
  }
}

function displayBookmarksInSettings() {
  const bookmarksContainer = document.getElementById("bookmarks-container");
  bookmarksContainer.innerHTML = "";

  bookmarks.sort((a, b) => a.number - b.number);
  bookmarks.forEach((bookmarkSet, index) => {
    const bookmarkSetElement = document.createElement("div");
    bookmarkSetElement.classList.add("bookmark-set-settings");
    bookmarkSetElement.draggable = true;
    bookmarkSetElement.dataset.index = index;
    bookmarkSetElement.style.order = bookmarkSet.number;

    const topIndicator = document.createElement("div");
    topIndicator.classList.add("drop-indicator", "top");
    const bottomIndicator = document.createElement("div");
    bottomIndicator.classList.add("drop-indicator", "bottom");

    bookmarkSetElement.appendChild(topIndicator);
    bookmarkSetElement.appendChild(bottomIndicator);

    if (bookmarkSet.color) {
      bookmarkSetElement.style.setProperty(
        "--accent-container",
        bookmarkSet.color
      );
    }

    if (bookmarkSet.open) {
      bookmarkSetElement.classList.add("displayed");
    }

    bookmarkSetElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
      e.dataTransfer.effectAllowed = "move";
      bookmarkSetElement.classList.add("dragging");

      document.querySelectorAll(".drop-indicator").forEach((indicator) => {
        indicator.style.display = "none";
      });
    });

    bookmarkSetElement.addEventListener("dragend", () => {
      bookmarkSetElement.classList.remove("dragging");

      document.querySelectorAll(".drop-indicator").forEach((indicator) => {
        indicator.style.display = "none";
      });
    });

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("set-title-container");

    const titleElement = document.createElement("h4");
    titleElement.textContent = bookmarkSet.title;
    titleElement.textContent += bookmarkSet.number;

    titleElement.addEventListener("click", () => {
      bookmarkSet.open = !bookmarkSet.open;
      saveBookmarks();
      displayBookmarksInSettings();
    });

    const toggleHideButton = document.createElement("button");
    toggleHideButton.innerHTML = bookmarkSet.hide
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    toggleHideButton.classList.add("toggle-hide-set");
    toggleHideButton.addEventListener("click", () =>
      toggleBookmarkSetVisibility(index)
    );

    titleDiv.appendChild(titleElement);
    titleDiv.appendChild(toggleHideButton);
    bookmarkSetElement.appendChild(titleDiv);

    const linksContainer = document.createElement("div");
    linksContainer.classList.add("bookmark-links-container");

    bookmarkSet.links.forEach((link, linkIndex) => {
      const linkElement = document.createElement("div");
      linkElement.classList.add("bookmark-link");

      const titleLink = document.createElement("div");
      titleLink.classList.add("link-title-container");

      const linkName = document.createElement("span");
      linkName.textContent = link.name;

      const toggleLinkHideButton = document.createElement("button");
      toggleLinkHideButton.innerHTML = link.hide
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      toggleLinkHideButton.classList.add("toggle-hide");
      toggleLinkHideButton.addEventListener("click", () =>
        toggleLinkVisibility(index, linkIndex)
      );

      const toggleDivideButton = document.createElement("button");
      toggleDivideButton.innerHTML = link.divide
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
      toggleDivideButton.classList.add("toggle-divide");
      toggleDivideButton.addEventListener("click", () =>
        toggleLinkDivide(index, linkIndex)
      );

      titleLink.appendChild(linkName);
      titleLink.appendChild(toggleLinkHideButton);
      titleLink.appendChild(toggleDivideButton);
      linkElement.appendChild(titleLink);

      const removeLinkButton = document.createElement("button");
      removeLinkButton.textContent = "Edit Link";
      removeLinkButton.addEventListener("click", () =>
        removeLink(index, linkIndex)
      );
      linkElement.appendChild(removeLinkButton);

      // Keywords container
      const keywordsContainer = document.createElement("div");
      keywordsContainer.classList.add("keywords-container");

      const keywordsDisplay = document.createElement("span");
      keywordsDisplay.textContent = link.keywords
        ? link.keywords.join(", ")
        : "";
      keywordsContainer.appendChild(keywordsDisplay);

      // Edit keywords button
      const editKeywordsButton = document.createElement("button");
      editKeywordsButton.textContent = "Edit Keywords";
      editKeywordsButton.classList.add("edit-keywords");
      editKeywordsButton.addEventListener("click", () => {
        const keywordsInput = document.createElement("input");
        keywordsInput.type = "text";
        keywordsInput.value = link.keywords ? link.keywords.join(", ") : "";
        keywordsInput.classList.add("keywords-input");

        const saveKeywordsButton = document.createElement("button");
        saveKeywordsButton.textContent = "Save";
        saveKeywordsButton.classList.add("save-keywords");
        saveKeywordsButton.addEventListener("click", () => {
          const newKeywords = keywordsInput.value
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k.length > 0);
          bookmarks[index].links[linkIndex].keywords = newKeywords;
          saveBookmarks();
          displayBookmarksInSettings();
        });

        keywordsContainer.innerHTML = "";
        keywordsContainer.appendChild(keywordsInput);
        keywordsContainer.appendChild(saveKeywordsButton);
      });

      keywordsContainer.appendChild(editKeywordsButton);
      linkElement.appendChild(keywordsContainer);

      linksContainer.appendChild(linkElement);
    });

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("bookmark-actions");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-set");
    removeButton.addEventListener("click", () => removeBookmark(index));

    const addLinkButton = document.createElement("button");
    addLinkButton.textContent = "Add Link";
    addLinkButton.classList.add("add-link");
    addLinkButton.addEventListener("click", () => addLinkToBookmarkSet(index));

    actionButtons.appendChild(removeButton);
    actionButtons.appendChild(addLinkButton);
    bookmarkSetElement.appendChild(actionButtons);

    bookmarkSetElement.appendChild(linksContainer);
    bookmarksContainer.appendChild(bookmarkSetElement);
  });

  let lastDragOver = 0;
  bookmarksContainer.addEventListener("dragover", (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastDragOver < 50) return;
    lastDragOver = now;

    const draggingElement = document.querySelector(".dragging");
    if (!draggingElement) return;

    document.querySelectorAll(".drop-indicator").forEach((indicator) => {
      indicator.style.display = "none";
    });

    const afterElement = getDragAfterElement(bookmarksContainer, e.clientY);
    if (afterElement == null) {
      const lastElement = bookmarksContainer.lastElementChild;
      if (lastElement && !lastElement.classList.contains("dragging")) {
        lastElement.querySelector(".drop-indicator.bottom").style.display =
          "block";
      }
    } else {
      afterElement.querySelector(".drop-indicator.top").style.display = "block";
    }

    if (afterElement == null) {
      bookmarksContainer.appendChild(draggingElement);
    } else {
      bookmarksContainer.insertBefore(draggingElement, afterElement);
    }
  });

  bookmarksContainer.addEventListener("drop", (e) => {
    e.preventDefault();

    document.querySelectorAll(".drop-indicator").forEach((indicator) => {
      indicator.style.display = "none";
    });

    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (isNaN(draggedIndex)) return;

    const draggingElement = document.querySelector(".dragging");
    if (!draggingElement) return;

    const bookmarkElements = Array.from(
      bookmarksContainer.querySelectorAll(".bookmark-set-settings")
    );

    bookmarkElements.forEach((element, newIndex) => {
      const originalIndex = parseInt(element.dataset.index);
      if (!isNaN(originalIndex)) {
        bookmarks[originalIndex].number = newIndex;
      }
    });

    saveBookmarks();
    displayBookmarksInSettings();
    setupBookmarks();
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".bookmark-set-settings:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - (box.top + box.height / 2);

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function addLinkToBookmarkSet(bookmarkSetIndex) {
  const name = prompt("Enter the name of the new link:");
  const url = prompt("Enter the URL of the new link:");
  if (name && url) {
    const hide = confirm("Do you want to hide this link?");
    const divide = confirm("Do you want to add a divider after this link?");
    const keywords = prompt("Enter keywords (comma-separated):");
    const newLink = {
      name: name,
      url: url,
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
      hide: hide,
      divide: divide,
    };
    bookmarks[bookmarkSetIndex].links.push(newLink);
    saveBookmarks();
    displayBookmarksInSettings();
    setupBookmarks();
  }
}

function removeLink(bookmarkSetIndex, linkIndex) {
  const link = bookmarks[bookmarkSetIndex].links[linkIndex];

  const newName = prompt("Edit the name of the link:", link.name);
  const newUrl = prompt(
    "Edit the URL of the link (empty for delete):",
    link.url
  );

  if (newName && newUrl) {
    bookmarks[bookmarkSetIndex].links[linkIndex].name = newName;
    bookmarks[bookmarkSetIndex].links[linkIndex].url = newUrl;
    saveBookmarks();
    displayBookmarksInSettings();
    setupBookmarks();
  } else if (newName === "" || newUrl === "") {
    if (
      confirm("The link name or URL is empty. Do you want to delete this link?")
    ) {
      bookmarks[bookmarkSetIndex].links.splice(linkIndex, 1);
      saveBookmarks();
      displayBookmarksInSettings();
      setupBookmarks();
    }
  } else {
    console.log("Link editing canceled.");
  }
}

function toggleBookmarkSetVisibility(index) {
  bookmarks[index].hide = !bookmarks[index].hide;
  saveBookmarks();
  displayBookmarksInSettings();
  setupBookmarks();
}

function toggleLinkVisibility(bookmarkSetIndex, linkIndex) {
  bookmarks[bookmarkSetIndex].links[linkIndex].hide =
    !bookmarks[bookmarkSetIndex].links[linkIndex].hide;
  saveBookmarks();
  displayBookmarksInSettings();
  setupBookmarks();
}

function toggleLinkDivide(bookmarkSetIndex, linkIndex) {
  bookmarks[bookmarkSetIndex].links[linkIndex].divide =
    !bookmarks[bookmarkSetIndex].links[linkIndex].divide;
  saveBookmarks();
  displayBookmarksInSettings();
  setupBookmarks();
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
