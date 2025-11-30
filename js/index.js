const FORMSPREE_ENDPOINT = "https://formspree.io/f/kode_unik_kamu"; 

const form = document.getElementById("contact-form");
async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("form-status");
    const btn = document.getElementById("submit-btn");
    const data = new FormData(event.target);
    if(FORMSPREE_ENDPOINT.includes("kode_unik_kamu")){ alert("Wahyu belum memasang alamat Formspree!"); return; }
    btn.disabled = true; btn.innerText = "Menerbangkan...";
    fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { 'Accept': 'application/json' } })
    .then(response => {
        if (response.ok) { status.innerHTML = "Merpati berhasil sampai!"; status.style.color = "#333"; form.reset(); } 
        else { response.json().then(data => { status.innerHTML = "Merpati tersesat."; }) }
    }).catch(error => { status.innerHTML = "Ada badai, gagal terbang."; }).finally(() => { btn.disabled = false; btn.innerText = "Kirim Merpati"; });
}
form.addEventListener("submit", handleSubmit);

function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    const navs = document.querySelectorAll('.nav-item');
    if(sectionId === 'mukadimah') navs[0].classList.add('active');
    if(sectionId === 'karya') navs[1].classList.add('active');
    if(sectionId === 'kanvas') navs[2].classList.add('active');
    if(sectionId === 'surat') navs[3].classList.add('active');
}

let isDrawingMode = false;
function togglePenMode() {
    isDrawingMode = !isDrawingMode;
    const btn = document.getElementById('toggle-pen-btn');
    const icon = btn.querySelector('i');
    if (isDrawingMode) {
        document.body.classList.add('drawing-mode');
        btn.classList.add('active');
        icon.classList.remove('fa-pen-nib'); icon.classList.add('fa-hand-pointer'); 
    } else {
        document.body.classList.remove('drawing-mode');
        btn.classList.remove('active');
        icon.classList.remove('fa-hand-pointer'); icon.classList.add('fa-pen-nib');
    }
}

const bgCanvas = document.getElementById('hatch-canvas');
const bgCtx = bgCanvas.getContext('2d');
const inkCanvas = document.getElementById('user-ink-canvas');
const inkCtx = inkCanvas.getContext('2d');
const penTip = document.getElementById('pen-tip');
let w, h;

function resize() {
    const dpr = window.devicePixelRatio || 1;
    
    w = window.innerWidth;
    h = window.innerHeight;

    bgCanvas.width = w * dpr;
    bgCanvas.height = h * dpr;
    inkCanvas.width = w * dpr;
    inkCanvas.height = h * dpr;

    bgCanvas.style.width = w + 'px';
    bgCanvas.style.height = h + 'px';
    inkCanvas.style.width = w + 'px';
    inkCanvas.style.height = h + 'px';

    bgCtx.scale(dpr, dpr);
    inkCtx.scale(dpr, dpr);

    drawHatching();
}
window.addEventListener('resize', resize);

function drawHatching() {
    bgCtx.clearRect(0,0,w,h);
    bgCtx.strokeStyle = 'rgba(0,0,0,0.05)'; bgCtx.lineWidth = 1;
    for(let i=0; i<300; i++) {
        bgCtx.beginPath();
        let x = Math.random()*w; let y = Math.random()*h;
        let len = Math.random()*50 + 20;
        bgCtx.moveTo(x, y); bgCtx.lineTo(x+len, y+len); bgCtx.stroke();
    }
}

let lastX = 0, lastY = 0, isDown = false;

function getPos(e) {
    const rect = inkCanvas.getBoundingClientRect();
    let clientX, clientY;

    if(e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function handleStart(e) {
    if(!isDrawingMode) return;
    if(e.type === 'touchstart') e.preventDefault(); 
    
    const pos = getPos(e);
    lastX = pos.x; 
    lastY = pos.y;
    isDown = true;
    
    penTip.style.left = (e.touches ? e.touches[0].clientX : e.clientX) + 'px';
    penTip.style.top = (e.touches ? e.touches[0].clientY : e.clientY) + 'px';
}

function handleMove(e) {
    if(!isDrawingMode) return;
    if(e.type === 'touchmove') e.preventDefault();

    const pos = getPos(e);
    
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    penTip.style.left = clientX + 'px';
    penTip.style.top = clientY + 'px';

    if(!isDown) return;

    inkCtx.beginPath();
    inkCtx.moveTo(lastX, lastY);
    inkCtx.lineTo(pos.x, pos.y);
    
    inkCtx.lineWidth = Math.random() * 2 + 1;
    inkCtx.strokeStyle = '#0a0a0a';
    inkCtx.lineCap = 'round';
    inkCtx.lineJoin = 'round';
    inkCtx.stroke();

    if(Math.random() > 0.99) {
        inkCtx.beginPath();
        inkCtx.arc(pos.x, pos.y, Math.random()*3, 0, Math.PI*2);
        inkCtx.fill();
    }

    lastX = pos.x; 
    lastY = pos.y;
}

function handleEnd() { isDown = false; }

window.addEventListener('mousedown', handleStart);
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);

window.addEventListener('touchstart', handleStart, {passive: false});
window.addEventListener('touchmove', handleMove, {passive: false});
window.addEventListener('touchend', handleEnd);

window.addEventListener("contextmenu", function(e) {
    if (isDrawingMode) {
        e.preventDefault();
        return false;
    }

});

resize();


