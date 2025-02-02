document.addEventListener("DOMContentLoaded", () => {
  const openIcon = document.getElementById("settings-icon");
  const addButton = document.getElementById("add-bookmark");

  openIcon.addEventListener("click", openSettingsTab);

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
      openSettingsTab();
    }
  });

  initializeBookmarksSettings();
  initializeSearchSettings();
});

function openSettingsTab() {
  const settings = document.querySelector(".settings");
  settings.classList.toggle("show");
}
