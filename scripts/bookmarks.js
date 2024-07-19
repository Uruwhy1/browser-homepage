const bookmarks = [
  {
    title: "League & Games",
    links: [
      {
        name: "BR account",
        url: "https://www.op.gg/summoners/br/xd1234-BR1",
        keywords: ["br"],
      },
      {
        name: "LAS account",
        url: "https://www.op.gg/summoners/las/Fernando%20AIonso-ALO",
        keywords: ["las"],
        divide: true,
      },
      {
        name: "Elmiillor",
        url: "https://kick.com/elmiillor",
        keywords: ["elm"],
      },
      { name: "LPU", url: "https://www.twitch.tv/audvtv", keywords: ["lpu"] },
      {
        name: "Haxball",
        url: "https://www.haxball.com/play",
        keywords: ["hax"],
      },
    ],
    color: "#b847ff",
    hide: true,
  },
  {
    title: "Social & Media",
    links: [
      { name: "Twitter", url: "https://twitter.com", keywords: ["x"] },
      {
        name: "Reddit",
        url: "https://reddit.com",
        keywords: ["redd"],
        divide: true,
      },
      { name: "Youtube", url: "https://youtube.com", keywords: ["yt"] },
      {
        name: "Twitch",
        url: "https://twitch.tv",
        keywords: ["tw"],
        divide: true,
      },
      {
        name: "Disney+",
        url: "https://www.disneyplus.com/home",
        keywords: ["disney", "+"],
      },
    ],
  },
  {
    title: "Hobbies",
    links: [
      {
        name: "Minesweeper",
        url: "https://buscaminas-pro.com/",
        keywords: ["mine"],
      },
      {
        name: "Piano Course",
        keywords: ["piano"],
        url: "https://www.udemy.com/course/curso-de-piano-completo-para-adultos-principiante-intermedio-avanzado/learn/lecture/23169430#announcements/9902440/",
        divide: true,
      },
      {
        name: "LastFM Profile",
        url: "https://www.last.fm/user/Uruwhy",
        keywords: ["fm"],
      },
      {
        name: "Goodreads",
        url: "https://www.goodreads.com/",
        keywords: ["book"],
        divide: true,
      },
      {
        name: "Google Photos",
        url: "https://photos.google.com",
        keywords: ["pic"],
      },
      {
        name: "Google Podcasts",
        url: "https://podcasts.google.com/",
        keywords: ["podcast", "rome", "stoic"],
      },
    ],
    color: "#ff4747",
  },
  {
    title: "Programming",
    links: [
      { name: "Github", url: "https://github.com", keywords: ["git"] },
      {
        name: "The Odin Project",
        url: "https://www.theodinproject.com",
        keywords: ["top"],
      },
      {
        name: "Codewars",
        url: "https://www.codewars.com/dashboard",
        keywords: ["code"],
        divide: true,
      },
      {
        name: "Notion",
        url: "https://www.notion.so/facundotunas/Programming-23e30a812c6446d48b88a88aa579949b?pvs=4",
        keywords: ["notion"],
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com/?oai-dm=1",
        divide: true,
        keywords: ["gpt"],
      },
      { name: "Feather", url: "https://feathericons.com", keywords: ["svg"] },
      { name: "Icons", url: "https://icon-icons.com/", keywords: ["icon"] },
      {
        name: "Webfonts",
        url: "https://gwfh.mranftl.com/fonts/roboto?subsets=latin",
        keywords: ["font"],
      },
    ],
    color: "#ffed47",
  },
  {
    title: "Mail & Messages",
    links: [
      { name: "Gmail", url: "https://mail.google.com", keywords: ["g"] },
      {
        name: "Outlook",
        url: "https://outlook.live.com/mail/0/",
        keywords: ["o"],
      },
      {
        name: "Temp Mail",
        url: "https://temp-mail.org/en/",
        keywords: ["temp"],
        divide: true,
      },
      { name: "Whatsapp", url: "https://web.whatsapp.com", keywords: ["wp"] },
      {
        name: "Discord",
        url: "https://discord.com/channels/@me",
        keywords: ["ds"],
      },
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
      if (l.keywords) {
        link.setAttribute("data-keywords", l.keywords.join(" "));
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
