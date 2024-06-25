document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";


  document.addEventListener("keypress", function (event) {
    if (searchInput.value == "") {
      searchInput.value += event.key;
      searchInput.focus();
    }

    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default actions
      const searchValue = searchInput.value.toLowerCase();

      const links = document.querySelectorAll(".bookmark");
      for (let link of links) {
        if (link.textContent.toLowerCase() === searchValue) {
          searchInput.style.animation = "right 0.3s 1 forwards";

          window.location.href = link.href;
          return;
        }
        if (link.id.toLowerCase() === searchValue) {
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
