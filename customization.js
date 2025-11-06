export const themes = {
  zetaDark: {
    "--bg": "#1e1e1e",
    "--panel": "#252526",
    "--text": "#ddd",
    "--accent": "#007acc",
    "--muted": "#999",
  },
  zetaLight: {
    "--bg": "#f5f5f5",
    "--panel": "#ddd",
    "--text": "#111",
    "--accent": "#0066cc",
    "--muted": "#555",
  },
};

export function applyTheme(name = 'zetaDark') {
  const theme = themes[name];
  if (!theme) return;
  Object.entries(theme).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
  localStorage.setItem('theme', name);
  document.getElementById('theme-name').textContent = name;
}

export function loadUserSettings() {
  const saved = JSON.parse(localStorage.getItem('settings') || '{}');
  return Object.assign({ theme: 'zetaDark' }, saved);
}
