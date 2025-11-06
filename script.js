require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: `fn main() {\n    println!("Hello, Zeta IDE!");\n}`,
    language: 'rust',
    theme: 'vs-dark',
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
  });

  // Simple file switcher
  document.querySelectorAll('.file').forEach(file => {
    file.addEventListener('click', () => {
      document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
      file.classList.add('active');

      const ext = file.textContent.split('.').pop();
      const lang = ext === 'py' ? 'python' : ext === 'js' ? 'javascript' : 'rust';
      const sample = {
        rust: `fn main() {\n    println!("Hello from Rust!");\n}`,
        python: `print("Hello from Python!")`,
        javascript: `console.log("Hello from JavaScript!");`
      };
      editor.setValue(sample[lang]);
      monaco.editor.setModelLanguage(editor.getModel(), lang);
    });
  });

  // Simple terminal
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      output.innerHTML += `<div>> ${cmd}</div>`;
      if (cmd === 'clear') output.innerHTML = '';
      input.value = '';
      output.scrollTop = output.scrollHeight;
    }
  });
});
