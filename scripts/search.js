document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const root = document.documentElement;
  let numberFind = 0;
  let keywordFound = false;
  const timerModal = document.querySelector(".timer-modal-container");
  let dividers;

  setTimeout(() => { // if I don't do this dividers is an empty node list :DD
    dividers = document.querySelectorAll(".divider");
  }, 0);

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

    dividers.forEach((elem) => {
      elem.style.backgroundColor = "";
    });
  };

  document.addEventListener("keydown", function (event) {
    if (timerModal.style.display == "flex") {
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

    // Handle Enter key
    if (event.key === "Enter") {
      if (event.ctrlKey) {
        redirectToUrl(
          `https://www.google.com/search?q=${encodeURIComponent(
            searchInput.value
          )}`
        );
        return;
      }
      if (event.shiftKey) {
        redirectToUrl(`https://www.${encodeURIComponent(searchInput.value)}`);
        return;
      }

      // if "flip" then do nothing (coin animation stuff has to be in the other js file as I can use imports)
      if (searchInput.value.toLowerCase() == "flip") {
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
      dividers.forEach((elem) => {
        elem.style.backgroundColor = "transparent";
      });

      links.forEach((link) => {
        if (link.textContent.toLowerCase().includes(searchInput.value)) {
          link.classList.add("on");

          link.style.position = "";
          link.style.bottom = "";
          link.style.opacity = "";

          numberFind++;
        } else {
          link.classList.remove("on");
          link.style.opacity = "0";
        }

        const keywords = link.getAttribute("data-keywords");
        if (
          keywords &&
          keywords.toLowerCase().split(" ").includes(searchInput.value)
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
