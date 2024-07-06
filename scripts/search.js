document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const root = document.documentElement;
  let numberFind = 0;

  searchInput.value = "";

  document.addEventListener("keydown", function (event) {
    const links = document.querySelectorAll(".bookmark");

    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default actions

      if (event.ctrlKey) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
          searchInput.value
        )}`;
        window.location.href = googleSearchUrl;
        return;
      }
      if (event.shiftKey) {
        const searchUrl = `https://www.${encodeURIComponent(
          searchInput.value
        )}`;
        window.location.href = searchUrl;
        return;
      }

      for (let link of links) {
        if (
          link.textContent.toLowerCase() === searchInput.value ||
          (link.classList.contains("on") && numberFind == 1)
        ) {
          searchInput.style.animation = "right 0.3s 1 forwards";

          window.location.href = link.href;
          return;
        }
        const keywords = link.getAttribute("data-keywords");
        const keywordArray = keywords.toLowerCase().split(" ");
        if (keywordArray.includes(searchInput.value)) {
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
    // Check if the key is alphanumeric or backspace
    const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key);
    if (!isAlphanumeric && event.key !== "Backspace") {
      return;
    }

    event.preventDefault();
 
    if (event.key == "Backspace") {
      searchInput.value = searchInput.value.slice(0, -1);
    } else {
      searchInput.value += event.key;
    }
   
    if (event.key == "a" && event.ctrlKey) {
      console.log("xDDD")
      searchInput.value = "";
    }

    if (document.activeElement !== searchInput) {
      searchInput.focus();
    }

    if (searchInput.value.length == 0) {
      root.style.setProperty("--bookmark-color", "");

      for (let link of links) {
        link.classList.remove("on");
      }
    }

    numberFind = 0;
    const onElements = document.querySelectorAll(".on");
    if (onElements) {
      onElements.forEach((elem) => {
        elem.style.color = "";
      });
    }

    if (searchInput.value.length > 0) {
      root.style.setProperty("--bookmark-color", "gray");
      for (let link of links) {
        if (link.textContent.toLowerCase().includes(searchInput.value)) {
          link.classList.add("on");
          numberFind++;
        } else {
          link.classList.remove("on");
        }

        const keywords = link.getAttribute("data-keywords");
        const keywordArray = keywords.toLowerCase().split(" ");
        if (keywordArray.includes(searchInput.value)) {
          link.style.color = "var(--hover-color)";
          return;
        } else {
          link.style.color = "";
        }
      }
    }

    if (numberFind == 1) {
      document.querySelector(".on").style.color = "var(--hover-color)";
    } else {
      const onElements = document.querySelectorAll(".on");
      onElements.forEach((elem) => {
        elem.style.color = "";
      });
    }
  });
});
