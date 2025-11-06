const htmlInput = document.getElementById('htmlInput');
const previewFrame = document.getElementById('previewFrame');
const previewButton = document.getElementById('previewButton');
const openFullscreenBtn = document.getElementById('openFullscreenBtn');
const fileInput = document.getElementById('fileInput');

// Update iframe with HTML content
function updatePreview(content) {
    const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>body { font-family: 'Fira Code', monospace; padding: 1rem; background-color: #1e1e1e; color: #ccc; }</style>
        </head>
        <body>${content}</body>
        </html>
    `;
    previewFrame.srcdoc = fullHtml;
}

// Event listeners
previewButton.addEventListener('click', () => {
    updatePreview(htmlInput.value);
});

openFullscreenBtn.addEventListener('click', () => {
    const newWindow = window.open('', '_blank');
    if(newWindow) {
        newWindow.document.write(previewFrame.srcdoc);
        newWindow.document.close();
    }
});

fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = event => {
            htmlInput.value = event.target.result;
            updatePreview(event.target.result);
        };
        reader.readAsText(file);
    }
});

// Initial preview
updatePreview(htmlInput.value);
