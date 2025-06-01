const config = {
  showDate: true,
  showSearch: true,
};

function loadConfig() {
  const savedConfig = localStorage.getItem("config");
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      if (parsedConfig.showSearch === undefined) {
        parsedConfig.showSearch = true;
      }

      Object.assign(config, parsedConfig);
    } catch (e) {
      console.warn("Failed to parse saved config, using defaults");
    }
  }
}

function saveConfig() {
  localStorage.setItem("config", JSON.stringify(config));
}

document.addEventListener("DOMContentLoaded", function () {
  setupBookmarks();
  loadConfig();

  const clockElement = document.getElementById("clock");
  const dateCheckbox = document.getElementById(
    "toggle-date-checkbox"
  ) as HTMLInputElement;
  const searchCheckbox = document.getElementById(
    "toggle-search-checkbox"
  ) as HTMLInputElement;

  dateCheckbox.checked = config.showDate;
  searchCheckbox.checked = config.showSearch;

  dateCheckbox.addEventListener("change", () => {
    config.showDate = dateCheckbox.checked;
    saveConfig();
    if (clockElement) updateClockDisplay(clockElement);
  });

  searchCheckbox.addEventListener("change", () => {
    config.showSearch = searchCheckbox.checked;
    saveConfig();
    const searchWrapper = document.querySelector(
      ".message-container"
    ) as HTMLElement;
    if (searchWrapper) {
      searchWrapper.style.display = config.showSearch ? "block" : "none";
    }
  });

  if (clockElement) {
    clockElement.innerHTML = getTime();
    updateClockDisplay(clockElement);
    setInterval(() => {
      clockElement.innerHTML = getTime();
    }, 100);
  }

  const searchWrapper = document.querySelector(
    ".message-container"
  ) as HTMLElement;
  if (searchWrapper) {
    searchWrapper.style.display = config.showSearch ? "block" : "none";
  }
});
