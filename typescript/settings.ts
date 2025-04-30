document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      openSettingsTab();
    }
  });

  initializeBookmarksSettings();
  initializeSearchSettings();
  initializeWallpaperSettings();
});

function openSettingsTab() {
  const settings = document.querySelector(".settings");

  if (settings instanceof HTMLElement) {
    settings.classList.toggle("show");
  }
}
