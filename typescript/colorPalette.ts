interface ColorPalette {
  name: string;
  cssClass: string;
  isActive: boolean;
  mode: "light" | "dark" | "both" | "none";
  previewColors: string[];
}

const definedPalettes: ColorPalette[] = [
  {
    name: "Default",
    cssClass: "palette-default",
    isActive: true,
    mode: "both",
    previewColors: ["#ffffff", "#d4d4d4", "#272727", "rgb(25, 228, 255)"],
  },
  {
    name: "Catppuccin Latte",
    cssClass: "palette-catppuccin-latte",
    isActive: false,
    mode: "none",
    previewColors: ["#4c4f69", "#9ca0b0", "#eff1f5", "#dc8a78"],
  },

  {
    name: "Catppuccin Mocha",
    cssClass: "palette-mocha",
    isActive: false,
    mode: "none",
    previewColors: ["#cdd6f4", "#a6adc8", "#1e1e2e", "#89dceb"],
  },
  {
    name: "Nord",
    cssClass: "palette-nord",
    isActive: false,
    mode: "none",
    previewColors: ["#eceff4", "#d8dee9", "#2e3440", "#81a1c1"],
  },
  {
    name: "Solarized Light",
    cssClass: "palette-solarized-light",
    isActive: false,
    mode: "none",
    previewColors: ["#586e75", "#657b83", "#fdf6e3", "#2aa198"],
  },
  {
    name: "Solarized Dark",
    cssClass: "palette-solarized-dark",
    isActive: false,
    mode: "none",
    previewColors: ["#93a1a1", "#839496", "#002b36", "#268bd2"],
  },
  {
    name: "Tokyo Night",
    cssClass: "palette-tokyo-night",
    isActive: false,
    mode: "none",
    previewColors: ["#a9b1d6", "#787c99", "#1a1b26", "#2ac3de"],
  },
  {
    name: "Dracula",
    cssClass: "palette-dracula",
    isActive: false,
    mode: "none",
    previewColors: ["#f8f8f2", "#bfbfbf", "#282a36", "#8be9fd"],
  },
  {
    name: "Gruvbox Light",
    cssClass: "palette-gruvbox-light",
    isActive: false,
    mode: "none",
    previewColors: ["#282828", "#d65d0e", "#fb4934", "#458588"],
  },

  {
    name: "Gruvbox Dark",
    cssClass: "palette-gruvbox-dark",
    isActive: false,
    mode: "none",
    previewColors: ["#ebdbb2", "#bdae93", "#282828", "#8ec07c"],
  },
];

function loadPaletteSettings(): ColorPalette[] {
  const stored = localStorage.getItem("palettes");
  if (!stored) {
    savePalettes(definedPalettes);
    return definedPalettes;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<ColorPalette>[];

    return definedPalettes.map((palette) => {
      const storedPalette = parsed.find((p) => p.name === palette.name);
      if (storedPalette) {
        return {
          ...palette,
          isActive: storedPalette.isActive ?? palette.isActive,
          mode: storedPalette.mode ?? palette.mode,
        };
      }
      return palette;
    });
  } catch {
    return definedPalettes;
  }
}

let palettes: ColorPalette[] = loadPaletteSettings();

function savePalettes(palettes: ColorPalette[]): void {
  const settingsToSave = palettes.map(({ name, isActive, mode }) => ({
    name,
    isActive,
    mode,
  }));
  localStorage.setItem("palettes", JSON.stringify(settingsToSave));
}

function initializePaletteSettings(): void {
  applyActivePalettes();
  displayPalettesInSettings();
}

function displayPalettesInSettings() {
  const container = document.getElementById("palettes-container");
  if (!container) return;
  container.innerHTML = "";

  palettes.forEach((palette, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("preview-option-item");
    wrapper.classList.add("individual-setting");

    const preview = document.createElement("div");
    preview.classList.add("preview-display");

    // Create color swatches container
    const swatchContainer = document.createElement("div");
    swatchContainer.classList.add("color-swatch-container");

    // Create color swatches for preview
    palette.previewColors.forEach((color) => {
      const swatch = document.createElement("div");
      swatch.classList.add("color-swatch");
      swatch.style.backgroundColor = color;
      swatchContainer.appendChild(swatch);
    });

    preview.appendChild(swatchContainer);

    const details = document.createElement("div");
    details.classList.add("option-details");

    const nameEl = document.createElement("h4");
    nameEl.textContent = palette.name;

    const description = document.createElement("div");
    description.classList.add("option-description");
    description.textContent =
      isPaletteActiveForMode(palette, "light") ||
      isPaletteActiveForMode(palette, "dark")
        ? `Active for ${palette.mode} mode`
        : "Not active";

    details.append(nameEl, description);

    const actions = document.createElement("div");
    actions.classList.add("option-actions");

    const lightBtn = document.createElement("button");
    const isLightActive = isPaletteActiveForMode(palette, "light");
    lightBtn.textContent = "Light";
    if (isLightActive) lightBtn.classList.add("selected");
    lightBtn.addEventListener("click", () => setPaletteForMode(index, "light"));

    const darkBtn = document.createElement("button");
    const isDarkActive = isPaletteActiveForMode(palette, "dark");
    darkBtn.textContent = "Dark";
    if (isDarkActive) darkBtn.classList.add("selected");
    darkBtn.addEventListener("click", () => setPaletteForMode(index, "dark"));

    actions.append(lightBtn, darkBtn);
    wrapper.append(preview, details, actions);
    container.appendChild(wrapper);
  });
}

function isPaletteActiveForMode(palette: ColorPalette, mode: "light" | "dark") {
  return palette.isActive && (palette.mode === mode || palette.mode === "both");
}

function setPaletteForMode(index: number, mode: "light" | "dark") {
  const selected = palettes[index];

  palettes.forEach((palette) => {
    if (palette.name === selected.name) return;

    if (
      palette.isActive &&
      (palette.mode === mode || palette.mode === "both")
    ) {
      if (palette.mode === "both") {
        palette.mode = mode === "light" ? "dark" : "light";
      } else {
        palette.mode = "none";
        palette.isActive = false;
      }
    }
  });

  selected.isActive = true;

  // Adjust mode based on existing mode
  if (selected.mode === "none") {
    selected.mode = mode;
  } else if (selected.mode !== mode) {
    selected.mode = "both";
  }

  savePalettes(palettes);
  displayPalettesInSettings();
  applyActivePalettes();
}

function applyActivePalettes() {
  // Remove all palette classes first
  const htmlElement = document.documentElement;
  palettes.forEach((palette) => {
    htmlElement.classList.remove(palette.cssClass);
  });

  // Apply appropriate palette based on system preference and settings
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = prefersDark ? "dark" : "light";

  const activePalette = palettes.find(
    (palette) =>
      palette.isActive && (palette.mode === mode || palette.mode === "both")
  );

  if (activePalette) {
    htmlElement.classList.add(activePalette.cssClass);
  }
}

// Listen for system theme changes
function setupMediaQueryListener() {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Apply immediately and add listener for changes
  darkModeMediaQuery.addEventListener("change", applyActivePalettes);
}

document.addEventListener("DOMContentLoaded", () => {
  setupMediaQueryListener();
  initializePaletteSettings();
});
