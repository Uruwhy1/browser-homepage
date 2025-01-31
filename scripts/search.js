document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const root = document.documentElement;
  let numberFind = 0;
  let keywordFound = false;

  const settingsBar = document.querySelector(".settings");
  const timerModal = document.querySelector(".timer-modal-container");

  searchInput.value = "";

  // Function to handle URL redirection
  const redirectToUrl = (url) => {
    window.location.href = url;
  };

  // Function to reset bookmark styles
  const resetBookmarkStyles = (links) => {
    numberFind = 0;
    keywordFound = false;

    root.style.setProperty("--bookmark-color", "");
    links.forEach((link) => {
      link.classList.remove("on");
      link.style.color = "";

      link.style.position = "";
      link.style.bottom = "";
      link.style.opacity = "";
    });
  };

  const analyzeSearchInput = (searchValue) => {
    if (!searchValue) {
      return {
        type: "default",
        query: "",
      };
    }

    const prefixMatch = searchValue.match(/^-(\w+):\s*(.+)$/);

    if (prefixMatch) {
      const [_, prefix, query] = prefixMatch;
      return {
        type: prefix.toLowerCase(),
        query: query.trim(),
      };
    }

    return {
      type: "default",
      query: searchValue.trim(),
    };
  };

  document.addEventListener("keydown", function (event) {
    if (
      timerModal.style.display == "flex" ||
      settingsBar.classList.contains("show")
    ) {
      return;
    }

    const links = document.querySelectorAll(".bookmark");
    if (event.altKey) {
      return;
    }

    // Prevent default actions and handle special keys
    const isSpecialKey =
      event.key === "Enter" ||
      event.key === "+" ||
      event.key === "Backspace" ||
      event.ctrlKey;
    const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key);
    if (!isSpecialKey && !isAlphanumeric) {
      return;
    }
    keywordFound = false;
    event.preventDefault();

    // handle searching
    if (event.key === "Enter") {
      const searchAnalysis = analyzeSearchInput(searchInput.value);

      // if search has keyword
      if (searchAnalysis.type !== "default") {
        switch (searchAnalysis.type) {
          case "yt":
            redirectToUrl(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                searchAnalysis.query
              )}`
            );
            break;
          case "gh":
            redirectToUrl(
              `https://github.com/search?q=${encodeURIComponent(
                searchAnalysis.query
              )}&type=repositories`
            );
            break;
          case "img":
            redirectToUrl(
              `https://www.google.com/search?udm=2&q=${encodeURIComponent(
                searchAnalysis.query
              )}`
            );
            break;
          case "in":
            redirectToUrl(
              `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
                searchAnalysis.query
              )}`
            );
            break;
          case "ttv":
            redirectToUrl(
              `https://www.twitch.tv/search?term=${encodeURIComponent(
                searchAnalysis.query
              )}`
            );
            break;
          case "x":
            redirectToUrl(
              `https://x.com/search?q=${encodeURIComponent(
                searchAnalysis.query
              )}&src=typed_query`
            );
            break;
        }
        return;
      } else {
        // if search does not have keyword
        if (event.ctrlKey) {
          redirectToUrl(
            `https://www.google.com/search?q=${encodeURIComponent(
              searchInput.value
            )}`
          );
          return;
        }

        // if "flip" or "stopwatch" then do nothing (coin animation stuff has to be in the other js file as I can use imports)
        if (
          searchInput.value.toLowerCase() == "flip" ||
          searchInput.value.toLowerCase() == "stopwatch"
        ) {
          resetBookmarkStyles(links);
          return;
        }

        let found = false;
        links.forEach((link) => {
          if (
            link.textContent.toLowerCase() === searchInput.value ||
            (link.classList.contains("on") && numberFind === 1)
          ) {
            found = true;
            searchInput.style.animation = "right 0.1s 1 forwards";
            redirectToUrl(link.href);

            return;
          }
          const keywords = link.getAttribute("data-keywords");
          if (
            keywords &&
            keywords.toLowerCase().split(" ").includes(searchInput.value)
          ) {
            found = true;
            searchInput.style.animation = "right 0.1s 1 forwards";
            redirectToUrl(link.href);

            return;
          }
        });

        // if bookmark not found, wrong animation
        if (!found) {
          searchInput.style.animation = "wrong 1s 1";
        }
        setTimeout(() => (searchInput.style.animation = ""), 1000);
        return;
      }
    }

    // Handle Ctrl + A (select all)
    if (event.ctrlKey) {
      event.preventDefault();
    }
    if (event.key === "a" && event.ctrlKey) {
      searchInput.value = "";
      keywordFound = false;
      if (numberFind === 1) {
        document.querySelector(".on").style.color = "var(--bookmark-color)";
      }
      resetBookmarkStyles(links);

      return;
    }

    // Handle Backspace key
    if (event.key === "Backspace") {
      searchInput.value = searchInput.value.slice(0, -1);
      numberFind = 0;
    } else if (!event.ctrlKey) {
      searchInput.value += event.key;
    }

    if (document.activeElement !== searchInput) {
      searchInput.focus();
    }

    if (searchInput.value.length === 0) {
      resetBookmarkStyles(links);
    }

    numberFind = 0;
    document.querySelectorAll(".on").forEach((elem) => (elem.style.color = ""));

    if (searchInput.value.length > 0) {
      root.style.setProperty("--bookmark-color", "gray");

      links.forEach((link) => {
        if (
          link.textContent
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        ) {
          link.classList.add("on");

          link.style.position = "";
          link.style.bottom = "";
          link.style.opacity = "";

          numberFind++;
        } else {
          link.classList.remove("on");
          link.style.opacity = "0.5";
        }

        const keywords = link.getAttribute("data-keywords");
        if (
          keywords &&
          keywords
            .toLowerCase()
            .split(" ")
            .includes(searchInput.value.toLowerCase())
        ) {
          link.style.opacity = "";

          link.style.color = "var(--hover-color)";
          keywordFound = true;
        } else {
          link.style.color = "";
        }
      });
    }

    if (!keywordFound && numberFind !== 1 && document.querySelector(".on")) {
      document.querySelector(".on").style.color = "";
    } else if (numberFind == 1 && !keywordFound) {
      document.querySelector(".on").style.color = "var(--hover-color)";
    }
  });
});
