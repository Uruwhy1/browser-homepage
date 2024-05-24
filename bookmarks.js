const bookmarks = [
  // {
  //   title: "League & Games",
  //   links: [
  //     { name: "BR account", url: "https://www.op.gg/summoners/br/xd1234-BR1" },
  //     {
  //       name: "LAS account",
  //       url: "https://www.op.gg/summoners/las/Fernando%20AIonso-ALO",
  //       divide: true,
  //     },
  //     { name: "Elmiillor", url: "https://kick.com/elmiillor" },
  //     { name: "Caedrel", url: "https://www.twitch.tv/caedrel", divide: true },
  //     { name: "Haxball", url: "https://www.haxball.com" },
  //     { name: "Minesweeper", url: "https://buscaminas-pro.com/" },
  //   ],
  //   color: "#b847ff",
  // },
  {
    title: "Social & Media",
    links: [
      { name: "Twitter", url: "https://twitter.com" },
      { name: "Reddit", url: "https://reddit.com", divide: true },
      { name: "Youtube", url: "https://youtube.com" },
      { name: "Twitch", url: "https://twitch.tv", divide: true },
      { name: "Star+", url: "https://www.starplus.com/es-419/home" },
    ],
  },
  {
    title: "Hobbies",
    links: [
      { name: "Minesweeper", url: "https://buscaminas-pro.com/" },
      {
        name: "Piano Course",
        url: "https://www.udemy.com/course/curso-de-piano-completo-para-adultos-principiante-intermedio-avanzado/learn/lecture/23169430#announcements/9902440/",
        divide: true,
      },
      { name: "LastFM Profile", url: "https://www.last.fm/user/Uruwhy" },
      { name: "Goodreads", url: "https://www.goodreads.com/", divide: true },
      { name: "Google Photos", url: "https://photos.google.com" },
      { name: "Google Podcasts", url: "https://podcasts.google.com/" },
    ],
    color: "#ff4747",
  },
  {
    title: "Programming",
    links: [
      { name: "Github", url: "https://github.com" },
      {
        name: "Udemy Course",
        url: "https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11198358#questions",
      },
      {
        name: "The Odin Project",
        url: "https://www.theodinproject.com",
        divide: true,
      },
      {
        name: "Notion",
        url: "https://www.notion.so/facundotunas/Programming-23e30a812c6446d48b88a88aa579949b?pvs=4",
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com/?oai-dm=1",
        divide: true,
      },
      { name: "Feather", url: "https://feathericons.com" },
      {
        name: "Webfonts",
        url: "https://gwfh.mranftl.com/fonts/roboto?subsets=latin",
      },
    ],
    color: "#ffed47",
  },
  {
    title: "Mail & Messages",
    links: [
      { name: "Gmail", url: "https://mail.google.com" },
      {
        name: "Outlook",
        url: "https://outlook.live.com/mail/0/",
      },
      { name: "Temp Mail", url: "https://temp-mail.org/en/", divide: true },
      { name: "Whatsapp", url: "https://web.whatsapp.com" },
      { name: "Discord", url: "https://discord.com/channels/@me" },
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
