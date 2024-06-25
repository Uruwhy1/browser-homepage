const bookmarks = [
  {
    title: "League & Games",
    links: [
      {
        name: "BR account",
        url: "https://www.op.gg/summoners/br/xd1234-BR1",
        id: "br",
      },
      {
        name: "LAS account",
        url: "https://www.op.gg/summoners/las/Fernando%20AIonso-ALO",
        id: "las",
        divide: true,
      },
      { name: "Elmiillor", url: "https://kick.com/elmiillor", id: "elm" },
      { name: "LPU", url: "https://www.twitch.tv/audvtv", id: "lpu" },

      { name: "Haxball", url: "https://www.haxball.com/play", id: "hax" },
    ],
    color: "#b847ff",
    hide: true,
  },
  {
    title: "Social & Media",
    links: [
      { name: "Twitter", url: "https://twitter.com", id: "tw" },
      { name: "Reddit", url: "https://reddit.com", id: "redd", divide: true },
      { name: "Youtube", url: "https://youtube.com", id: "yt" },
      { name: "Twitch", url: "https://twitch.tv", id: "tw", divide: true },
      {
        name: "Disney+",
        url: "https://www.starplus.com/es-419/home",
        id: "star",
      },
    ],
  },
  {
    title: "Hobbies",
    links: [
      { name: "Minesweeper", url: "https://buscaminas-pro.com/", id: "mine" },
      {
        name: "Piano Course",
        id: "piano",
        url: "https://www.udemy.com/course/curso-de-piano-completo-para-adultos-principiante-intermedio-avanzado/learn/lecture/23169430#announcements/9902440/",
        divide: true,
      },
      {
        name: "LastFM Profile",
        url: "https://www.last.fm/user/Uruwhy",
        id: "fm",
      },
      {
        name: "Goodreads",
        url: "https://www.goodreads.com/",
        id: "book",
        divide: true,
      },
      { name: "Google Photos", url: "https://photos.google.com", id: "pic" },
      {
        name: "Google Podcasts",
        url: "https://podcasts.google.com/",
        id: "podcast",
      },
    ],
    color: "#ff4747",
  },
  {
    title: "Programming",
    links: [
      { name: "Github", url: "https://github.com", id: "git" },
      {
        name: "Coursera Course",
        url: "https://www.coursera.org/learn/algorithms-divide-conquer/home/week/2",
        id: "course",
      },
      {
        name: "The Odin Project",
        url: "https://www.theodinproject.com",
        divide: true,
        id: "top",
      },
      {
        name: "Notion",
        url: "https://www.notion.so/facundotunas/Programming-23e30a812c6446d48b88a88aa579949b?pvs=4",
        id: "notion",
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com/?oai-dm=1",
        divide: true,
        id: "gpt",
      },
      { name: "Feather", url: "https://feathericons.com", id: "svg" },
      { name: "Icons", url: "https://icon-icons.com/", id: "icon" },
      {
        name: "Webfonts",
        url: "https://gwfh.mranftl.com/fonts/roboto?subsets=latin",
        id: "font",
      },
    ],
    color: "#ffed47",
  },
  {
    title: "Mail & Messages",
    links: [
      { name: "Gmail", url: "https://mail.google.com", id: "g" },
      {
        name: "Outlook",
        url: "https://outlook.live.com/mail/0/",
        id: "o",
      },
      {
        name: "Temp Mail",
        url: "https://temp-mail.org/en/",
        id: "temp",
        divide: true,
      },
      { name: "Whatsapp", url: "https://web.whatsapp.com", id: "wp" },
      { name: "Discord", url: "https://discord.com/channels/@me", id: "ds" },
    ],
    color: "#4dff47",
  },
];

// Handle writing out Bookmarks
function setupBookmarks() {
  const bookmarkContainer = document.getElementById("bookmark-container");
  bookmarks.map((b) => {
    const html = document.createElement("div");
    html.classList.add("bookmark-set");

    const title = document.createElement("div");
    title.classList.add("bookmark-title");
    title.textContent = b.title;

    if (b.color) {
      title.style.color = b.color;
    }
    if (b.hide) {
      html.style.display = "none";
    }

    const innerBookmarks = document.createElement("div");
    innerBookmarks.classList.add("bookmark-inner-container");

    // Iterate over each link in the bookmark and create anchor elements
    b.links.map((l) => {
      const link = document.createElement("a");
      link.classList.add("bookmark");
      link.href = l.url;
      link.textContent = l.name;

      if (l.divide) {
        link.style.borderBottom = "2px solid var(--secondaryFg)";
        if (b.color) {
          link.style.borderColor = b.color;
        }
        link.style.paddingBottom = "0.7em";
      }
      if (l.id) {
        link.setAttribute("id", l.id);
      }

      // Append each link to the innerBookmarks container
      innerBookmarks.appendChild(link);
    });

    // Append title and innerBookmarks to the main html container
    html.appendChild(title);
    html.appendChild(innerBookmarks);

    // Append the main html container to the bookmark container
    bookmarkContainer.appendChild(html);

    if (b.color) {
      html.style.setProperty("--accent-container", b.color);
    }
  });
}
