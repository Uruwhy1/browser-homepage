const config = {
  showDate: true,
  blurAmount: {
    light: 8,
    dark: 8,
  },
  transparencyAmount: {
    light: 0.6,
    dark: 0.6,
  },
};

function loadConfig() {
  const savedConfig = localStorage.getItem("config");
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      Object.assign(config, parsedConfig);
    } catch (e) {
      console.warn("Failed to parse saved config, using defaults");
    }
  }
}

function saveConfig() {
  localStorage.setItem("config", JSON.stringify(config));
}
