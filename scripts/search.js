document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";

  document.addEventListener("keypress", function (event) {
    if (document.activeElement !== searchInput) {
      searchInput.value += event.key;
      searchInput.focus();
    }

    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default actions
      const searchValue = searchInput.value.toLowerCase();

      if (event.ctrlKey) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
          searchValue
        )}`;
        window.location.href = googleSearchUrl;
        return;
      }
      if (event.shiftKey) {
        const searchUrl = `https://www.${encodeURIComponent(
          searchValue
        )}`;
        window.location.href = searchUrl;
        return;
      }

      const links = document.querySelectorAll(".bookmark");
      for (let link of links) {
        if (link.textContent.toLowerCase() === searchValue) {
          searchInput.style.animation = "right 0.3s 1 forwards";

          window.location.href = link.href;
          return;
        }

        const keywords = link.getAttribute("data-keywords");
        const keywordArray = keywords.toLowerCase().split(" ");
        if (keywordArray.includes(searchValue)) {
          searchInput.style.animation = "right 0.3s 1 forwards";

          window.location.href = link.href;
          return;
        }
      }
      searchInput.style.animation = "wrong 1s 1";
      setTimeout(() => {
        searchInput.style.animation = "";
      }, 1000);
    }
  });
});
