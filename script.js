import { applyTheme, loadUserSettings } from './customization.js';
import { renderPreview } from './visualizer.js';

let editor;
let activeFile = 'index.html';

// Initialize Monaco
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: "<!-- Welcome to Zeta IDE -->\n<h1>Hello World</h1>",
    language: "html",
    theme: "vs-dark",
    automaticLayout: true,
  });
});

// File switching
document.querySelectorAll('.file').forEach(file => {
  file.addEventListener('click', () => {
    document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
    file.classList.add('active');
    activeFile = file.textContent.trim();

    if (activeFile.endsWith('.html')) {
      editor.setValue("<h1>Hello from HTML</h1>");
      monaco.editor.setModelLanguage(editor.getModel(), 'html');
    } else if (activeFile.endsWith('.js')) {
      editor.setValue("console.log('Hello from JS');");
      monaco.editor.setModelLanguage(editor.getModel(), 'javascript');
    } else if (activeFile.endsWith('.json')) {
      editor.setValue('{\n  "theme": "zetaDark"\n}');
      monaco.editor.setModelLanguage(editor.getModel(), 'json');
    }

    document.getElementById('status-text').textContent = `Editing ${activeFile}`;
  });
});

// Preview live updates
setInterval(() => {
  renderPreview(activeFile, editor?.getValue() || '');
}, 1000);

// Apply saved theme
const settings = loadUserSettings();
applyTheme(settings.theme);
