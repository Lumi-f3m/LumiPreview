const fileTree = document.getElementById('file-tree');
const clock = document.getElementById('clock');
const status = document.getElementById('status-text');

let structure = JSON.parse(localStorage.getItem('zeta-structure') || '[]');

// 🕒 Live Clock
setInterval(() => {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);

// 🗂️ Render the file tree
function renderTree() {
  fileTree.innerHTML = '';
  structure.forEach(node => fileTree.appendChild(createNodeElement(node)));
  localStorage.setItem('zeta-structure', JSON.stringify(structure));
}

function createNodeElement(node) {
  const li = document.createElement('li');
  li.className = node.type;

  const icon = document.createElement('i');
  icon.className = `codicon codicon-${node.type === 'folder' ? 'folder' : 'file-code'}`;
  li.appendChild(icon);

  const span = document.createElement('span');
  span.textContent = node.name;
  li.appendChild(span);

  // Rename on double click
  span.ondblclick = () => renameNode(node, span);

  // Context menu (right click)
  li.oncontextmenu = e => {
    e.preventDefault();
    showContextMenu(node);
  };

  if (node.type === 'folder') {
    li.classList.add('folder');
    li.onclick = e => {
      e.stopPropagation();
      li.classList.toggle('open');
    };

    const ul = document.createElement('ul');
    ul.className = 'folder-contents';
    node.children.forEach(child => ul.appendChild(createNodeElement(child)));
    li.appendChild(ul);
  }

  return li;
}

// 🧩 Node Operations
function addNode(type) {
  const name = prompt(`New ${type} name:`);
  if (!name) return;
  const newNode = type === 'folder' ? { type, name, children: [] } : { type, name };
  structure.push(newNode);
  renderTree();
  status.textContent = `${type} "${name}" created`;
}

function deleteNode(nodeName) {
  structure = structure.filter(n => n.name !== nodeName);
  renderTree();
  status.textContent = `"${nodeName}" deleted`;
}

function renameNode(node, span) {
  const input = document.createElement('input');
  input.className = 'rename-input';
  input.value = node.name;
  span.replaceWith(input);
  input.focus();
  input.onblur = () => {
    node.name = input.value || node.name;
    renderTree();
    status.textContent = `"${node.name}" renamed`;
  };
}

function showContextMenu(node) {
  const confirmDel = confirm(`Delete ${node.name}?`);
  if (confirmDel) deleteNode(node.name);
}

// ➕ Buttons
document.getElementById('new-file').onclick = () => addNode('file');
document.getElementById('new-folder').onclick = () => addNode('folder');

// First render
renderTree();
status.textContent = "Explorer loaded";
