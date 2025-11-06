let files = {};   // { filename: { type: 'html' | 'js' | 'css' | 'txt', content: '...' } }
let currentFile = null;

const fileList = document.getElementById('fileList');
const codeEditor = document.getElementById('codeEditor');
const previewFrame = document.getElementById('previewFrame');
const openFolderBtn = document.getElementById('openFolderBtn');

// 1. Open files (user selects multiple files)
openFolderBtn.addEventListener('click', async () => {
    const [handle] = await window.showOpenFilePicker({ multiple: true });
    for (const fileHandle of handle) {
        const file = await fileHandle.getFile();
        const content = await file.text();
        const type = file.name.split('.').pop(); // crude type detection
        files[file.name] = { type, content };
    }
    renderFileList();
});

// 2. Render sidebar
function renderFileList() {
    fileList.innerHTML = '';
    for (const filename in files) {
        const li = document.createElement('li');
        li.textContent = filename;
        li.dataset.filename = filename;
        li.addEventListener('click', () => openFile(filename));
        if (filename === currentFile) li.classList.add('active');
        fileList.appendChild(li);
    }
}

// 3. Open file in editor
function openFile(filename) {
    currentFile = filename;
    codeEditor.value = files[filename].content;
    updatePreview();
    renderFileList();
}

// 4. Save changes live
codeEditor.addEventListener('input', () => {
    if (!currentFile) return;
    files[currentFile].content = codeEditor.value;
    updatePreview();
});

// 5. Update preview for HTML/CSS/JS
function updatePreview() {
    if (!currentFile) return;
    const ext = files[currentFile].type.toLowerCase();
    if (['html', 'js', 'css'].includes(ext)) {
        const html = files['index.html']?.content || '';
        const css = files['style.css']?.content || '';
        const js = files['script.js']?.content || '';
        previewFrame.srcdoc = `
            <html>
            <head><style>${css}</style></head>
            <body>${html}</body>
            <script>${js}</script>
            </html>
        `;
        previewFrame.style.display = 'block';
    } else {
        previewFrame.style.display = 'none'; // hide iframe for non-web languages
    }
}
