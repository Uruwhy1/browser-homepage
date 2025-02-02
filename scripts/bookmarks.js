let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
saveBookmarks();

function setupBookmarks() {
  const bookmarkContainer = document.getElementById("bookmark-container");
  bookmarkContainer.innerHTML = "";

  bookmarks.map((b) => {
    const html = document.createElement("div");
    html.classList.add("bookmark-set");
    html.style.order = b.number;

    const title = document.createElement("div");
    title.classList.add("bookmark-title");
    title.textContent = b.title;

    if (b.hide) {
      html.style.display = "none";
      console.log("%cHIDDEN LINKS:", "color: red; font-size: x-large");
      b.links.map((l) => {
        console.log(l.name, l.keywords);
      });
    }

    const innerBookmarks = document.createElement("div");
    innerBookmarks.classList.add("bookmark-inner-container");

    b.links.map((l) => {
      const link = document.createElement("a");
      link.classList.add("bookmark");
      link.href = l.url;
      link.textContent = l.name;

      if (l.keywords) {
        link.setAttribute("data-keywords", l.keywords.join(" "));
      }

      if (l.hide) {
        link.style.display = "none";
      }

      innerBookmarks.appendChild(link);

      if (l.divide) {
        const divider = document.createElement("span");
        divider.classList.add("divider");
        innerBookmarks.appendChild(divider);
      }
    });

    html.appendChild(title);
    html.appendChild(innerBookmarks);

    bookmarkContainer.appendChild(html);

    if (b.color) {
      html.style.setProperty("--accent-container", b.color);
    }
  });
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
