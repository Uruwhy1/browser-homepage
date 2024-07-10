document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const root = document.documentElement;
  let numberFind = 0;
  let keywordFound = false;
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
    });
  };

  document.addEventListener("keydown", function (event) {

    if (timerModal.style.display == "flex") {
      console.log(timerModal.style.display)
      return;
    }

    const links = document.querySelectorAll(".bookmark");
    if (event.altKey) {
      return;
    }

    // Prevent default actions and handle special keys
    const isSpecialKey =
      event.key === "Enter" || event.key === "Backspace" || event.ctrlKey;
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
      links.forEach((link) => {
        if (link.textContent.toLowerCase().includes(searchInput.value)) {
          link.classList.add("on");
          numberFind++;
        } else {
          link.classList.remove("on");
        }

        const keywords = link.getAttribute("data-keywords");
        if (
          keywords &&
          keywords.toLowerCase().split(" ").includes(searchInput.value)
        ) {
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
