// 搜索过滤工具
function filterTools() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.tool-card');
  const sections = document.querySelectorAll('.tools-grid');

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    const match = !query || title.includes(query) || desc.includes(query);
    card.classList.toggle('hidden', !match);
  });

  // 隐藏空分类
  sections.forEach(section => {
    const visibleCards = section.querySelectorAll('.tool-card:not(.hidden)');
    const title = section.previousElementSibling;
    if (title && title.classList.contains('section-title')) {
      title.style.display = visibleCards.length === 0 && query ? 'none' : '';
    }
  });
}

// 复制到剪贴板
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('已复制到剪贴板'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('已复制到剪贴板');
  }
}

// Toast 提示
function showToast(msg, duration = 2000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
      background: #1e293b; color: #fff; padding: 12px 24px; border-radius: 10px;
      font-size: 0.95em; z-index: 9999; opacity: 0; transition: opacity 0.3s;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.style.opacity = '0', duration);
}

// 文件下载
function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// 文件读取
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// 格式化文件大小
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 防抖
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 初始化广告（如果有的话）
function initAds() {
  try {
    if (typeof adsbygoogle !== 'undefined') {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (e) {}
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // 搜索框快捷键
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('searchInput');
      if (input) input.focus();
    }
  });
});
