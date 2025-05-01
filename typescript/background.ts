interface Wallpaper {
  name: string;
  path: string;
  isActive: boolean;
  mode: "light" | "dark" | "both" | "none";
}

const definedWallpapers: Wallpaper[] = [
  {
    name: "Beach",
    path: "./assets/wallpapers/beach.jpg",
    isActive: false,
    mode: "none",
  },
  {
    name: "Clouds",
    path: "./assets/wallpapers/clouds.jpg",
    isActive: false,
    mode: "none",
  },
  {
    name: "Evening Sky",
    path: "./assets/wallpapers/evening-sky.jpg",
    isActive: false,
    mode: "none",
  },
  {
    name: "Night Sky",
    path: "./assets/wallpapers/night-sky.jpg",
    isActive: false,
    mode: "none",
  },
  {
    name: "Space (Catppuccin)",
    path: "./assets/wallpapers/space-catppuccin.jpg",
    isActive: false,
    mode: "none",
  },
  {
    name: "Room Day",
    path: "./assets/wallpapers/room-day.jpg",
    isActive: false,
    mode: "light",
  },
  {
    name: "Room Night",
    path: "./assets/wallpapers/room-night.jpg",
    isActive: false,
    mode: "none",
  },
  {
    name: "Solarized (Light)",
    path: "./assets/wallpapers/solarized-light.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Solarized (Dark)",
    path: "./assets/wallpapers/solarized-dark.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Space (Nord)",
    path: "./assets/wallpapers/space-nord.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Café Night",
    path: "./assets/wallpapers/cafe-night.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Stripes (Tokyo)",
    path: "./assets/wallpapers/tokyo-night.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Dracula",
    path: "./assets/wallpapers/dracula.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Birds",
    path: "./assets/wallpapers/birds.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Gruvbox (Light)",
    path: "./assets/wallpapers/gruvbox-light.png",
    isActive: false,
    mode: "none",
  },
  {
    name: "Gruvbox (Dark)",
    path: "./assets/wallpapers/gruvbox-dark.png",
    isActive: false,
    mode: "none",
  },
];

function loadWallpaperSettings(): Wallpaper[] {
  const stored = localStorage.getItem("wallpapers");
  if (!stored) {
    saveWallpapers(definedWallpapers);
    return definedWallpapers;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<Wallpaper>[];

    return definedWallpapers.map((wallpaper) => {
      const storedWallpaper = parsed.find((w) => w.name === wallpaper.name);
      if (storedWallpaper) {
        return {
          ...wallpaper,
          isActive: storedWallpaper.isActive ?? wallpaper.isActive,
          mode: storedWallpaper.mode ?? wallpaper.mode,
        };
      }
      return wallpaper;
    });
  } catch {
    return definedWallpapers;
  }
}

let wallpapers: Wallpaper[] = loadWallpaperSettings();

function saveWallpapers(wallpapers: Wallpaper[]): void {
  const settingsToSave = wallpapers.map(({ name, isActive, mode }) => ({
    name,
    isActive,
    mode,
  }));
  localStorage.setItem("wallpapers", JSON.stringify(settingsToSave));
}

function loadAndApplyActiveWallpapers() {
  let activeLight = wallpapers.find(
    (wp) => wp.isActive && (wp.mode === "light" || wp.mode === "both")
  );
  let activeDark = wallpapers.find(
    (wp) => wp.isActive && (wp.mode === "dark" || wp.mode === "both")
  );

  // Set defaults if no active wallpapers
  if (!activeLight && !activeDark) {
    activeLight = wallpapers[0];
    activeDark = wallpapers[1] || wallpapers[0];

    if (activeLight) {
      activeLight.isActive = true;
      activeLight.mode = "light";
    }
    if (activeDark) {
      activeDark.isActive = true;
      activeDark.mode = "dark";
    }
    saveWallpapers(wallpapers);
  }

  const preloadImage = (path: string | undefined) => {
    if (path) {
      const img = new Image();
      img.src = path;
    }
  };

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    preloadImage(activeDark?.path);
  } else {
    preloadImage(activeLight?.path);
  }

  if (activeLight) {
    document.documentElement.style.setProperty(
      "--bg-image-light",
      `url("${activeLight.path}")`
    );
  }
  if (activeDark) {
    document.documentElement.style.setProperty(
      "--bg-image-dark",
      `url("${activeDark.path}")`
    );
  }
}

function displayWallpapersInSettings() {
  const container = document.getElementById("wallpaper-container");
  if (!container) return;
  container.innerHTML = "";

  wallpapers.forEach((wp, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("preview-option-item");
    wrapper.classList.add("individual-setting");

    const preview = document.createElement("div");
    preview.classList.add("preview-display");

    const img = document.createElement("img");
    img.alt = wp.name;

    const isActive =
      isWallpaperActiveForMode(wp, "light") ||
      isWallpaperActiveForMode(wp, "dark");
    img.loading = isActive ? "eager" : "lazy";
    img.src = wp.path;

    img.onerror = () => (img.alt = "Image not found");
    preview.appendChild(img);

    const details = document.createElement("div");
    details.classList.add("option-details");

    const nameEl = document.createElement("h4");
    nameEl.textContent = wp.name;

    const description = document.createElement("div");
    description.classList.add("option-description");
    description.textContent =
      isWallpaperActiveForMode(wp, "light") ||
      isWallpaperActiveForMode(wp, "dark")
        ? `Active for ${wp.mode} mode`
        : "Not active";

    details.append(nameEl, description);

    const actions = document.createElement("div");
    actions.classList.add("option-actions");

    const lightBtn = document.createElement("button");
    const isLightActive = isWallpaperActiveForMode(wp, "light");
    lightBtn.textContent = isLightActive ? "Light ✓" : "Light";

    if (isLightActive) lightBtn.classList.add("selected");
    lightBtn.addEventListener("click", () =>
      setWallpaperForMode(index, "light")
    );

    const darkBtn = document.createElement("button");
    const isDarkActive = isWallpaperActiveForMode(wp, "dark");
    darkBtn.textContent = isDarkActive ? "Dark ✓" : "Dark";

    if (isDarkActive) darkBtn.classList.add("selected");
    darkBtn.addEventListener("click", () => setWallpaperForMode(index, "dark"));

    actions.append(lightBtn, darkBtn);
    wrapper.append(preview, details, actions);
    container.appendChild(wrapper);
  });
}

function isWallpaperActiveForMode(wp: Wallpaper, mode: "light" | "dark") {
  return wp.isActive && (wp.mode === mode || wp.mode === "both");
}

function setWallpaperForMode(index: number, mode: "light" | "dark") {
  const selected = wallpapers[index];

  wallpapers.forEach((wp) => {
    if (wp.name === selected.name) return;

    if (wp.isActive && (wp.mode === mode || wp.mode === "both")) {
      if (wp.mode === "both") {
        wp.mode = mode === "light" ? "dark" : "light";
      } else {
        wp.mode = "none";
        wp.isActive = false;
      }
    }
  });

  selected.isActive = true;

  if (selected.mode === "none") {
    selected.mode = mode;
  } else if (selected.mode !== mode) {
    selected.mode = "both";
  }

  saveWallpapers(wallpapers);
  loadAndApplyActiveWallpapers();
  displayWallpapersInSettings();
}

function initializeWallpaperSettings() {
  // first active wallpaper for faster loadng
  loadAndApplyActiveWallpapers();

  // the other stuff
  setTimeout(() => {
    displayWallpapersInSettings();
  }, 100);
}

document.addEventListener("DOMContentLoaded", initializeWallpaperSettings);
