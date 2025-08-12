// Theme handling (toggle, color picker, presets, localStorage)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const iconSun = document.getElementById("icon-light");
  const iconMoon = document.getElementById("icon-dark");
  const panelBtn = document.getElementById("color-panel-btn");
  const panel = document.getElementById("color-panel");
  const colorPicker = document.getElementById("primary-color-picker");
  const swatches = document.querySelectorAll(".color-presets .swatch");
  const root = document.documentElement;

  // Restore saved settings
  const savedTheme = localStorage.getItem("theme");
  const savedColor = localStorage.getItem("primaryColor");

  if (savedTheme) {
     document.body.classList.toggle("dark-mode", savedTheme === "dark");
    iconSun.style.display = savedTheme === "dark" ? "none" : "inline";
    iconMoon.style.display = savedTheme === "dark" ? "inline" : "none";
  }

  if (savedColor) {
    root.style.setProperty("--primary-color", savedColor);
    root.style.setProperty("--accent-color", savedColor);
    colorPicker.value = savedColor;
  } else {
    // ensure accent matches primary on first load
    const p = getComputedStyle(root).getPropertyValue("--primary-color").trim();
    root.style.setProperty("--accent-color", p || "#f9c265");
  }

  // Toggle dark/light
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    if (isDark) {
      iconSun.style.display = "none";
      iconMoon.style.display = "inline";
      localStorage.setItem("theme", "dark");
    } else {
      iconSun.style.display = "inline";
      iconMoon.style.display = "none";
      localStorage.setItem("theme", "light");
    }
  });
  
  // Panel open/close
  panelBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    panel.classList.toggle("open");
    panelBtn.classList.toggle("active");
  });

  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !panelBtn.contains(e.target)) {
      panel.classList.remove("open");
      panelBtn.classList.remove("active");
    }
  });

  // Color picker changes
  colorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    root.style.setProperty("--primary-color", color);
    root.style.setProperty("--accent-color", color);
    localStorage.setItem("primaryColor", color);
  });

  // Preset swatches
  swatches.forEach(s => {
    s.addEventListener("click", (e) => {
      const color = e.currentTarget.dataset.color;
      root.style.setProperty("--primary-color", color);
      root.style.setProperty("--accent-color", color);
      colorPicker.value = color;
      localStorage.setItem("primaryColor", color);
    });
  });

  // keyboard shortcut: "t" toggles theme (optional)
  document.addEventListener("keydown", (e) => {
    if (e.key === "t" || e.key === "T") {
      toggleBtn.click();
    }
  });
});
