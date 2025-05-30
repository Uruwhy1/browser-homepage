interface Bookmark {
  title: string;
  links: Link[];
  hide: boolean;
  open: boolean;
  number: number;
  color: string;
}

interface Link {
  name: string;
  url: string;
  hide: boolean;
  divide: boolean;
  keywords: string[];
}

let bookmarks: Bookmark[] = (() => {
  const stored = localStorage.getItem("bookmarks");
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
})();
saveBookmarks();

function setupBookmarks(): void {
  const bookmarkContainer = document.getElementById("bookmark-container");
  if (bookmarkContainer) bookmarkContainer.innerHTML = "";

  bookmarks.map((b) => {
    const html = document.createElement("div");
    html.classList.add("bookmark-set");
    html.style.order = `${b.number}`;

    const title = document.createElement("div");
    title.classList.add("bookmark-title");
    title.textContent = b.title;

    if (b.hide) {
      html.style.display = "none";
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

    if (bookmarkContainer) bookmarkContainer.appendChild(html);

    if (b.color) {
      html.style.setProperty("--accent-container", b.color);
    }
  });
}

function saveBookmarks(): void {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
