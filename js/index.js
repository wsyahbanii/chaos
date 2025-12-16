// --- 0. INISIALISASI EMAILJS ---
(function() {
    // Public Key Anda
    emailjs.init("vEkfJBukKK7hxdRW0"); 
})();

// --- 1. KONFIGURASI FORM SUBMIT (EMAILJS) ---
const form = document.getElementById("contact-form");
const statusTxt = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Mencegah reload halaman

        // UI Loading
        submitBtn.disabled = true;
        submitBtn.innerText = "Menerbangkan...";
        statusTxt.innerHTML = "";

        // Service & Template ID
        const serviceID = 'service_llora7l'; 
        const templateID = 'template_bu4yg2e';

        // Kirim Form via EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Sukses
                submitBtn.innerText = "Kirim Merpati";
                statusTxt.innerHTML = "Merpati berhasil sampai! Terima kasih.";
                statusTxt.style.color = "#333";
                form.reset();
            }, (err) => {
                // Gagal
                submitBtn.innerText = "Kirim Merpati";
                statusTxt.innerHTML = "Gagal mengirim: " + JSON.stringify(err);
                statusTxt.style.color = "red";
                console.error('FAILED...', err);
            })
            .finally(() => {
                submitBtn.disabled = false;
            });
    });
}

// --- 2. NAVIGASI SPA ---
function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    const target = document.getElementById(sectionId);
    if(target) target.classList.add('active');
    
    const navs = document.querySelectorAll('.nav-item');
    if(sectionId === 'mukadimah' && navs[0]) navs[0].classList.add('active');
    if(sectionId === 'karya' && navs[1]) navs[1].classList.add('active');
    if(sectionId === 'kanvas' && navs[2]) navs[2].classList.add('active');
    if(sectionId === 'surat' && navs[3]) navs[3].classList.add('active');
}

// --- 3. MODE PENA & TOGGLE ---
let isDrawingMode = false;
function togglePenMode() {
    isDrawingMode = !isDrawingMode;
    const btn = document.getElementById('toggle-pen-btn');
    const icon = btn.querySelector('i');
    
    if (isDrawingMode) {
        document.body.classList.add('drawing-mode');
        btn.classList.add('active');
        icon.classList.remove('fa-pen-nib'); 
        icon.classList.add('fa-hand-pointer'); 
    } else {
        document.body.classList.remove('drawing-mode');
        btn.classList.remove('active');
        icon.classList.remove('fa-hand-pointer'); 
        icon.classList.add('fa-pen-nib');
    }
}

// --- 4. CANVAS & HATCHING BACKGROUND ---
const bgCanvas = document.getElementById('hatch-canvas');
const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
const inkCanvas = document.getElementById('user-ink-canvas');
const inkCtx = inkCanvas ? inkCanvas.getContext('2d') : null;
const penTip = document.getElementById('pen-tip');
let w, h;

function resize() {
    if (!bgCanvas || !inkCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    
    bgCanvas.width = w * dpr; bgCanvas.height = h * dpr;
    inkCanvas.width = w * dpr; inkCanvas.height = h * dpr;
    
    bgCanvas.style.width = w + 'px'; bgCanvas.style.height = h + 'px';
    inkCanvas.style.width = w + 'px'; inkCanvas.style.height = h + 'px';
    
    bgCtx.scale(dpr, dpr); inkCtx.scale(dpr, dpr);
    drawHatching();
}
window.addEventListener('resize', resize);

function drawHatching() {
    if (!bgCtx) return;
    bgCtx.clearRect(0,0,w,h);
    bgCtx.strokeStyle = 'rgba(0,0,0,0.05)'; bgCtx.lineWidth = 1;
    for(let i=0; i<300; i++) {
        bgCtx.beginPath();
        let x = Math.random()*w; let y = Math.random()*h;
        let len = Math.random()*50 + 20;
        bgCtx.moveTo(x, y); bgCtx.lineTo(x+len, y+len); bgCtx.stroke();
    }
}

// --- 5. LOGIKA MENGGAMBAR (Mobile & Desktop) ---
let lastX = 0, lastY = 0, isDown = false;

function getPos(e) {
    const rect = inkCanvas.getBoundingClientRect();
    let clientX, clientY;
    if(e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX; clientY = e.clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
}

function handleStart(e) {
    if (e.target.closest('#toggle-pen-btn')) return;
    if (e.target.closest('nav')) return;
    if (!isDrawingMode) return;
    
    if(e.type === 'touchstart') e.preventDefault(); 
    
    const pos = getPos(e);
    lastX = pos.x; 
    lastY = pos.y;
    isDown = true;
    
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    if(penTip) {
        penTip.style.left = clientX + 'px';
        penTip.style.top = clientY + 'px';
    }
}

function handleMove(e) {
    if (!isDrawingMode) return;
    if (e.target.closest('#toggle-pen-btn')) return;
    if(e.type === 'touchmove') e.preventDefault();

    const pos = getPos(e);
    
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    if(penTip) {
        penTip.style.left = clientX + 'px';
        penTip.style.top = clientY + 'px';
    }

    if(!isDown) return;

    if(inkCtx) {
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
    }

    lastX = pos.x; lastY = pos.y;
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

// --- 6. FITUR CERITA TERSEMBUNYI (HIDDEN STORY) ---
const myStories = [
    {
        title: "Catharsis",
        date: "22:37 | 16 Desember 2025",
        content: "Ada kalanya, ketenangan justru ditemukan dalam gema distorsi gitar yang memekakkan telinga. Saat dunia luar terlalu bising dengan basa-basi yang melelahkan, menunduk menjadi satu-satunya pelarian. Membiarkan tinta hitam menari liar di atas kertas putih, menciptakan sebuah semesta kecil di mana tidak ada satu pun hal yang perlu dijelaskan kepada siapa saja."
    },
];

let currentStoryIndex = 0;
const modal = document.getElementById('story-modal');
const titleEl = document.getElementById('story-title');
const dateEl = document.getElementById('story-date');
const bodyEl = document.getElementById('story-body');
const indicatorEl = document.getElementById('story-indicator');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function openStory() {
    if(!modal) return;
    loadStory(currentStoryIndex);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Stop scroll background
}

function closeStory() {
    if(!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = 'auto'; // Resume scroll
}

function loadStory(index) {
    if (index < 0 || index >= myStories.length) return;
    
    const story = myStories[index];
    titleEl.innerText = story.title;
    dateEl.innerText = story.date;
    bodyEl.innerText = story.content;
    
    // Update Indikator Halaman
    indicatorEl.innerText = (index + 1) + " / " + myStories.length;

    // Atur tombol Next/Prev
    btnPrev.disabled = (index === 0);
    btnNext.disabled = (index === myStories.length - 1);
}

function nextStory() {
    if (currentStoryIndex < myStories.length - 1) {
        currentStoryIndex++;
        loadStory(currentStoryIndex);
    }
}

function prevStory() {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        loadStory(currentStoryIndex);
    }
}

// --- UPDATE JAVASCRIPT FITUR CERITA ---

// 1. Tambahkan variabel selector
const dateSearchInput = document.getElementById('story-date-search');

// 2. Modifikasi fungsi openStory untuk sekaligus mengisi daftar tanggal
function openStory() {
    if(!modal) return;
    
    populateDateSearch(); // <--- Panggil fungsi baru ini
    
    loadStory(currentStoryIndex);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// 3. Fungsi Baru: Mengisi Dropdown Tanggal
function populateDateSearch() {
    // Kosongkan dulu isinya
    dateSearchInput.innerHTML = "";
    
    // Tambahkan opsi default
    let defaultOpt = document.createElement('option');
    defaultOpt.text = "-- Pilih Tanggal --";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    dateSearchInput.add(defaultOpt);

    // Loop array myStories dan buat opsi untuk setiap tanggal
    myStories.forEach((story, index) => {
        let opt = document.createElement('option');
        opt.value = index; // Nilai opsinya adalah index array (0, 1, 2...)
        opt.text = story.date; // Teks yang muncul adalah Tanggalnya
        dateSearchInput.add(opt);
    });
}

// 4. Fungsi Baru: Lompat ke Cerita saat tanggal dipilih
function jumpToStory(indexVal) {
    currentStoryIndex = parseInt(indexVal); // Ubah string ke number
    loadStory(currentStoryIndex);
}

// 5. Update fungsi loadStory agar dropdown juga ikut berubah jika kita klik Next/Prev
// (Tambahkan baris ini di dalam fungsi loadStory yang sudah ada)
function loadStory(index) {
    if (index < 0 || index >= myStories.length) return;
    
    const story = myStories[index];
    titleEl.innerText = story.title;
    dateEl.innerText = story.date;
    bodyEl.innerText = story.content;
    indicatorEl.innerText = (index + 1) + " / " + myStories.length;
    
    btnPrev.disabled = (index === 0);
    btnNext.disabled = (index === myStories.length - 1);

    // --- TAMBAHAN BARU: Sinkronisasi Dropdown ---
    // Agar jika kita klik Next, dropdownnya ikut berubah sesuai tanggal cerita sekarang
    dateSearchInput.value = index; 
}


resize();



