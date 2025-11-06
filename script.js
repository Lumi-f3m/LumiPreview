const htmlInput = document.getElementById('htmlInput');
const previewFrame = document.getElementById('previewFrame');
const previewButton = document.getElementById('previewButton');
const openFullscreenBtn = document.getElementById('openFullscreenBtn');
const fileList = document.getElementById('fileList');

let files = {
    'index.html': '<!DOCTYPE html>\n<html>\n<head>\n<title>Index</title>\n</head>\n<body>\nHello World!\n</body>\n</html>',
    'style.css': 'body { background-color: #1e1e1e; color: #ccc; }',
    'script.js': 'console.log("Hello from script.js");'
};

let currentFile = 'index.html';

// Function to update editor
function loadFile(filename) {
    currentFile = filename;
    htmlInput.value = files[filename];
    updatePreview(files['index.html']); // Only live preview for HTML
    updateActiveFile();
}

// Update active file in sidebar
function updateActiveFile() {
    document.querySelectorAll('#fileList li').forEach(li => {
        li.classList.toggle('active', li.dataset.filename === currentFile);
    });
}

// Update iframe preview
function updatePreview(content) {
    const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${files['style.css']}</style>
        </head>
        <body>${content}</body>
        <script>${files['script.js']}</script>
        </html>
    `;
    previewFrame.srcdoc = fullHtml;
}

// Listen to sidebar clicks
fileList.addEventListener('click', e => {
    if(e.target.tagName === 'LI') {
        loadFile(e.target.dataset.filename);
    }
});

// Listen to editor changes
htmlInput.addEventListener('input', () => {
    files[currentFile] = htmlInput.value;
    if(currentFile === 'index.html') {
        updatePreview(files['index.html']);
    }
});

// Toolbar buttons
previewButton.addEventListener('click', () => updatePreview(files['index.html']));

openFullscreenBtn.addEventListener('click', () => {
    const newWindow = window.open('', '_blank');
    if(newWindow) {
        newWindow.document.write(previewFrame.srcdoc);
        newWindow.document.close();
    }
});

// Initial load
loadFile(currentFile);
