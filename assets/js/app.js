// App configuration
const ANIMATIONS = [
    { id: 'typing', label: 'Typing', description: 'Character-by-character typing with cursor.' },
    { id: 'fade', label: 'Fade', description: 'Each line fades in and out softly.' },
    { id: 'slide', label: 'Slide', description: 'Lines slide vertically in sequence.' },
    { id: 'bounce', label: 'Bounce', description: 'Text bounces with dynamic motion.' },
    { id: 'pulse', label: 'Pulse', description: 'Breathing pulse by scaling text.' },
    { id: 'blink', label: 'Blink', description: 'Hard on/off blinking effect.' },
    { id: 'shake', label: 'Shake', description: 'Quick horizontal shake movement.' },
    { id: 'rainbow', label: 'Rainbow', description: 'Continuous full-spectrum hue cycle.' },
    { id: 'glitch', label: 'Glitch', description: 'Chromatic split glitch distortion.' },
    { id: 'stroke', label: 'Stroke', description: 'Draws text outline then fills it.' },
    { id: 'wave', label: 'Wave', description: 'Characters move in a wave rhythm.' },
    { id: 'flip', label: 'Flip', description: 'Text flips in 3D on the X-axis.' },
    { id: 'neon', label: 'Neon', description: 'Neon glow with flickering light.' },
    { id: 'matrix', label: 'Matrix', description: 'Digital rain inspired character effect.' },
    { id: 'zoom', label: 'Zoom', description: 'Zoom in and out transition motion.' },
    { id: 'blur', label: 'Blur', description: 'Comes into focus then blurs away.' },
    { id: 'float', label: 'Float', description: 'Gentle vertical floating drift.' },
    { id: 'swing', label: 'Swing', description: 'Pendulum-like text rotation.' },
    { id: 'pop', label: 'Pop', description: 'Quick pop-in overshoot scale.' },
    { id: 'skew', label: 'Skew', description: 'Stylized skew burst and settle.' },
];

let selectedAnim = 'typing';
let updateTimer = null;

// App initialization
window.addEventListener('DOMContentLoaded', () => {
    renderAnimationGrid();
    refreshSelectedAnimationLabel();

    // Toggle groups setup
    document.querySelectorAll('.toggle-group').forEach(group => {
        group.querySelectorAll('.toggle-opt').forEach(opt => {
            opt.onclick = () => {
                group.querySelectorAll('.toggle-opt').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                scheduleUpdate();
            };
        });
    });

    // Restore values from URL parameters
    loadFromURL();
    highlightSelectedAnimation();
    refreshSelectedAnimationLabel();

    update();
});


function renderAnimationGrid() {
    const grid = document.getElementById('animGrid');
    grid.innerHTML = '';

    ANIMATIONS.forEach(a => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'anim-chip' + (a.id === selectedAnim ? ' active' : '');
        chip.dataset.anim = a.id;
        chip.innerHTML = `<span class="anim-chip-title">${a.label}</span><span class="anim-chip-desc">${a.description}</span>`;
        chip.onclick = () => {
            selectedAnim = a.id;
            highlightSelectedAnimation();
            refreshSelectedAnimationLabel();
            closeAnimModal();
            scheduleUpdate();
        };
        grid.appendChild(chip);
    });
}

function highlightSelectedAnimation() {
    document.querySelectorAll('.anim-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.anim === selectedAnim);
    });
}

function refreshSelectedAnimationLabel() {
    const current = ANIMATIONS.find(a => a.id === selectedAnim);
    document.getElementById('selectedAnimLabel').textContent = current ? current.label : selectedAnim;
}

function openAnimModal() {
    document.getElementById('animModal').classList.add('open');
}

function closeAnimModal() {
    document.getElementById('animModal').classList.remove('open');
}

function onAnimModalBackdrop(event) {
    if (event.target.id === 'animModal') {
        closeAnimModal();
    }
}

// Color sync helpers
function syncColor(picker) {
    const hex = picker.value.replace('#', '');
    document.getElementById('colorHex').value = hex;
    document.getElementById('colorSwatch').style.background = picker.value;
    scheduleUpdate();
}

function syncColorHex(input) {
    const val = input.value.replace('#','');
    if (/^[0-9a-fA-F]{6}$/.test(val)) {
        document.getElementById('colorPicker').value = '#' + val;
        document.getElementById('colorSwatch').style.background = '#' + val;
    }
    scheduleUpdate();
}

function syncBg(picker) {
    const hex = picker.value.replace('#', '');
    document.getElementById('bgHex').value = hex;
    document.getElementById('bgSwatch').style.background = picker.value;
    document.getElementById('bgSwatch').style.backgroundImage = 'none';
    scheduleUpdate();
}

// Query parameter builders
function getParams() {
    const rawLines = document.getElementById('linesInput').value
        .split('\n').map(l => l.trim()).filter(Boolean);

    const get = id => document.getElementById(id);
    const toggle = param => {
        const active = document.querySelector(`.toggle-group[data-param="${param}"] .toggle-opt.active`);
        return active ? active.dataset.val : 'false';
    };

    const colorHex = get('colorHex').value.replace('#','') || '36BCF7';
    const bgHex = get('bgHex').value.replace('#','').trim();

    return {
        lines:        rawLines.map(l => encodeURIComponent(l)).join(';'),
        animation:    selectedAnim,
        color:        colorHex,
        background:   bgHex || '00000000',
        size:         get('size').value,
        font:         get('font').value,
        duration:     get('duration').value,
        pause:        get('pause').value,
        width:        get('width').value,
        height:       get('height').value,
        letterSpacing: get('letterSpacing').value,
        center:       toggle('center'),
        vCenter:      toggle('vCenter'),
        multiline:    toggle('multiline'),
        repeat:       toggle('repeat'),
        random:       toggle('random'),
    };
}

function buildQuery(params) {
    return Object.entries(params)
        .map(([k,v]) => `${k}=${v}`)
        .join('&');
}

// Preview and output updates
function scheduleUpdate() {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(update, 350);
}

function update() {
    const params = getParams();
    const query = buildQuery(params);
    const base = window.location.origin + '/api';
    const apiUrl = `${base}?${query}&_t=${Date.now()}`;
    const cleanUrl = `${base}?${query}`;

    // Update preview size
    document.getElementById('previewSize').textContent =
        `${params.width} × ${params.height} px`;

    // Refresh preview image
    const img = document.getElementById('previewImg');
    const loading = document.getElementById('previewLoading');
    loading.classList.remove('hidden');
    img.style.display = 'none';

    img.onload = () => {
        loading.classList.add('hidden');
        img.style.display = 'block';
    };
    img.onerror = () => {
        loading.textContent = 'Preview failed — check your server is running';
    };
    img.src = apiUrl;

    // Refresh permalink
    document.getElementById('permalinkInput').value = cleanUrl;

    // Refresh output snippets
    const altText = 'SVG Animation';
    const md = `[![${altText}](${cleanUrl})](https://github.com/OstinUA)`;
    const html = `<a href="https://github.com/OstinUA">\n  <img src="${cleanUrl}" alt="${altText}" />\n</a>`;

    document.getElementById('code-md').textContent = md;
    document.getElementById('code-html').textContent = html;
    document.getElementById('code-url').textContent = cleanUrl;
}

// Clipboard helpers
function copyCode(id, btn) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
    });
}

function copyPermalink() {
    const text = document.getElementById('permalinkInput').value;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.perm-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy URL', 2000);
    });
}

// Code tab switching
function switchTab(el, id) {
    document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.code-pane').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.add('active');
}

// URL state restoration
function loadFromURL() {
    const p = new URLSearchParams(window.location.search);
    if (!p.has('lines')) return;

    const lines = (p.get('lines') || '')
        .split(';')
        .map(l => decodeURIComponent(l.replace(/\+/g,' ')))
        .join('\n');
    document.getElementById('linesInput').value = lines;

    if (p.has('animation')) {
        const requestedAnim = p.get('animation');
        if (ANIMATIONS.some(a => a.id === requestedAnim)) {
            selectedAnim = requestedAnim;
            highlightSelectedAnimation();
            refreshSelectedAnimationLabel();
        }
    }
    if (p.has('color')) {
        const h = p.get('color');
        document.getElementById('colorHex').value = h;
        document.getElementById('colorPicker').value = '#' + h;
        document.getElementById('colorSwatch').style.background = '#' + h;
    }
    if (p.has('size')) {
        document.getElementById('size').value = p.get('size');
        document.getElementById('sizeVal').textContent = p.get('size') + 'px';
    }
    if (p.has('duration')) {
        document.getElementById('duration').value = p.get('duration');
        document.getElementById('durVal').textContent = p.get('duration') + 'ms';
    }
    if (p.has('pause')) {
        document.getElementById('pause').value = p.get('pause');
        document.getElementById('pauseVal').textContent = p.get('pause') + 'ms';
    }
    if (p.has('width')) document.getElementById('width').value = p.get('width');
    if (p.has('height')) document.getElementById('height').value = p.get('height');
    if (p.has('font')) document.getElementById('font').value = p.get('font');
    if (p.has('letterSpacing')) document.getElementById('letterSpacing').value = p.get('letterSpacing');

    ['center','vCenter','multiline','repeat','random'].forEach(param => {
        if (p.has(param)) {
            const val = p.get(param);
            const group = document.querySelector(`.toggle-group[data-param="${param}"]`);
            if (group) {
                group.querySelectorAll('.toggle-opt').forEach(o => {
                    o.classList.toggle('active', o.dataset.val === val);
                });
            }
        }
    });
}
