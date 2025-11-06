// Initialize Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: `// Welcome to Zeta IDE!\n// Start coding below...\n\nconsole.log("Hello, world!");`,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
  });

  // Handle file clicks
  document.querySelectorAll('.file').forEach(file => {
    file.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
      file.classList.add('active');

      const ext = file.textContent.split('.').pop();
      const langMap = { js: 'javascript', html: 'html', css: 'css', rs: 'rust', json: 'json' };
      monaco.editor.setModelLanguage(editor.getModel(), langMap[ext] || 'plaintext');
      editor.setValue(`// Editing ${file.textContent}\n`);
    });
  });
});

// Folder toggle
document.querySelectorAll('.folder').forEach(folder => {
  folder.addEventListener('click', e => {
    e.stopPropagation();
    folder.classList.toggle('open');
    const icon = folder.querySelector('.codicon');
    icon.classList.toggle('codicon-folder');
    icon.classList.toggle('codicon-folder-opened');
  });
});

// Page switching
const icons = document.querySelectorAll('.tool-icon');
const pages = document.querySelectorAll('.page');
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    icons.forEach(i => i.classList.remove('active'));
    icon.classList.add('active');

    const target = icon.getAttribute('data-page');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Open editor from welcome
document.getElementById('openEditor').addEventListener('click', () => {
  document.querySelector('[data-page="editor"]').click();
});
