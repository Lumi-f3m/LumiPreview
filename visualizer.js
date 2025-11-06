export function renderPreview(fileName, content) {
  const preview = document.getElementById('preview');
  if (!preview) return;

  if (fileName.endsWith('.html')) {
    preview.innerHTML = content;
  } else if (fileName.endsWith('.js')) {
    try {
      const output = eval(content);
      preview.innerText = JSON.stringify(output, null, 2);
    } catch (e) {
      preview.innerText = e.message;
    }
  } else if (fileName.endsWith('.json')) {
    try {
      preview.innerText = JSON.stringify(JSON.parse(content), null, 2);
    } catch (e) {
      preview.innerText = "Invalid JSON";
    }
  } else {
    preview.innerText = "No preview available";
  }
}
