/* ================================================================= */
/* AKIRA CHAMPIONS HALL — MASTER JAVASCRIPT (script.js)             */
/* ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. SCROLL PROGRESS BAR --- */
    window.addEventListener('scroll', () => {
        const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    /* --- 2. BACKGROUND DIGITAL PARTICLES GENERATOR --- */
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 35;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'digital-particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? '#00f5ff' : '#9d4edd';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.7 + 0.2;
            particle.style.boxShadow = '0 0 8px ' + (particle.style.background === '#00f5ff' ? '#00f5ff' : '#9d4edd');
            
            // Animasi melayang acak
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;
            
            particlesContainer.appendChild(particle);
        }

        // Tambahkan keyframes partikel via style dinamis jika belum ada
        if (!document.getElementById('particle-keyframes')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'particle-keyframes';
            styleSheet.innerHTML = `
                @keyframes floatParticle {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(-80px) translateX(40px); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    /* --- 3. SCROLL REVEAL ANIMATION (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- 4. CERTIFICATE MODAL VIEWER --- */
    const certModal = document.getElementById('cert-modal');
    const openModalTriggers = [
        document.getElementById('open-modal-trigger'),
        document.getElementById('zoom-modal-btn')
    ];
    const closeModalTrigger = document.getElementById('modal-close-trigger');

    function openModal() {
        if (certModal) certModal.classList.add('active');
    }

    function closeModal() {
        if (certModal) certModal.classList.remove('active');
    }

    openModalTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', openModal);
        }
    });

    if (closeModalTrigger) {
        closeModalTrigger.addEventListener('click', closeModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeModal();
        });
    }

    /* --- 5. CELEBRATION & CONFETTI SYSTEM --- */
    const celebrateTriggers = [
        document.getElementById('hero-celebrate-btn'),
        document.getElementById('celebrate-trigger-btn')
    ];
    const confettiContainer = document.getElementById('confetti-canvas-container');

    function triggerConfetti() {
        if (!confettiContainer) return;
        
        const colors = ['#00f5ff', '#9d4edd', '#ffd700', '#5865F2', '#ffffff'];
        const pieceCount = 60;

        for (let i = 0; i < pieceCount; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.width = Math.random() * 8 + 6 + 'px';
            piece.style.height = Math.random() * 12 + 8 + 'px';
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            
            confettiContainer.appendChild(piece);

            // Hapus elemen setelah animasi selesai
            setTimeout(() => {
                piece.remove();
            }, 3500);
        }

        // Tampilkan alert sukses perayaan
        alert("🎉 SELAMAT KEPADA MAHESA! Grand Champion Turnamen Mobile Legends Discord Akira 2026! 🏆");
    }

    celebrateTriggers.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', triggerConfetti);
        }
    });

    /* --- 6. HERO MASTERY LAB (Interactive Tabs) --- */
    const roleData = {
        tank: {
            title: "TANK ROLE — THE SHIELD OF AKIRA",
            desc: "Tank adalah fondasi terdepan tim yang bertugas menyerap damage musuh, membuka map, dan melakukan zoning agar core leluasa menyerang.",
            guides: [
                { h: "Inisiasi Team Fight", p: "Tunggu momen pas saat skill CC musuh sudah keluar sebelum melakukan open war." },
                { h: "Zoning & Protection", p: "Lindungi Marksman dan Mage kamu dari serangan Assassin musuh yang mengincar backline." },
                { h: "Vision Check", p: "Jangan ragu membuka semak berbahaya untuk memastikan posisi musuh tidak melakukan gank tersembunyi." }
            ]
        },
        fighter: {
            title: "FIGHTER ROLE — THE SUSTAINED BRAWLER",
            desc: "Fighter memberikan keseimbangan antara damage dan durabilitas, sangat kuat dalam duel 1v1 serta memenangkan lane exp.",
            guides: [
                { h: "Exp Lane Dominance", p: "Fokus membersihkan minion tepat waktu dan ambil kelomang untuk keunggulan level." },
                { h: "Timing Split Push", p: "Lakukan tekanan di lane berlawanan saat Lord akan muncul jika situasi memungkinkan." },
                { h: "Sustain Mastery", p: "Ketahui batas HP dan item lifesteal kamu saat berada di tengah kerumunan musuh." }
            ]
        },
        assassin: {
            title: "ASSASSIN ROLE — THE BACKLINE PREDATOR",
            desc: "Assassin adalah eksekutor utama yang mengandalkan mobilitas tinggi untuk melumpuhkan core musuh dengan cepat.",
            guides: [
                { h: "Target Priority", p: "Selalu incar Mage atau Marksman musuh terlebih dahulu dalam team fight." },
                { h: "Jungle Efficiency", p: "Amankan buff dan rotasi cepat ke gold lane atau mid lane untuk mendapatkan first blood." },
                { h: "Masuk di Waktu Tepat", p: "Jangan buka war duluan; masuklah setelah musuh mengeluarkan skill penting (cooldown)." }
            ]
        },
        mage: {
            title: "MAGE ROLE — THE BURST & CC MASTER",
            desc: "Mage memberikan magic damage area yang besar serta crowd control menyebalkan untuk mengontrol jalannya pertempuran.",
            guides: [
                { h: "Clear Mid Lane Fast", p: "Selesaikan gelombang minion mid secepat mungkin agar bisa rotasi membantu turtle." },
                { h: "Positioning Aman", p: "Selalu jaga jarak aman di belakang Tank dan manfaatkan semak untuk melancarkan combo skill." },
                { h: "Area Denial", p: "Gunakan skill area untuk menutup jalur masuk musuh saat perebutan objektif." }
            ]
        },
        marksman: {
            title: "MARKSMAN ROLE — THE LATE GAME CARRY",
            desc: "Marksman adalah tumpuan utama pemberi physical damage konsisten di fase late game untuk merobohkan turret dan lord.",
            guides: [
                { h: "Farming Konsisten", p: "Prioritaskan gold dan item core di early hingga mid game; hindari mati sia-sia." },
                { h: "Jaga Jarak (Kiting)", p: "Selalu hit sambil bergerak mundur untuk menghindari serangan musuh." },
                { h: "Disiplin Posisi", p: "Jangan pernah berjalan sendirian di area tanpa vision saat late game." }
            ]
        },
        support: {
            title: "SUPPORT ROLE — THE TEAM ENABLER",
            desc: "Support menjaga nyawa rekan satu tim melalui heal, buff, atau crowd control penyelamat di saat kritis.",
            guides: [
                { h: "Roam Bersama Jungler", p: "Temani core atau jungler melakukan farming di awal permainan agar cepat kaya." },
                { h: "Timing Heal / Shield", p: "Simpan skill penyelamat untuk momen krusial saat core terkena burst damage." },
                { h: "Item Roam Aktif", p: "Gunakan item conceal atau favor secara optimal sesuai kebutuhan komposisi tim." }
            ]
        }
    };

    const roleTabBtns = document.querySelectorAll('.role-tab-btn');
    const roleDisplayArea = document.getElementById('role-display-area');

    function renderRoleContent(roleKey) {
        const data = roleData[roleKey];
        if (!data || !roleDisplayArea) return;

        let html = `
            <div class="role-detail-card">
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <div class="role-guides-grid">
        `;

        data.guides.forEach(g => {
            html += `
                <div class="guide-box">
                    <h4>${g.h}</h4>
                    <p>${g.p}</p>
                </div>
            `;
        });

        html += `</div></div>`;
        roleDisplayArea.innerHTML = html;
    }

    // Render default tank
    renderRoleContent('tank');

    roleTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const role = btn.getAttribute('data-role');
            renderRoleContent(role);
        });
    });

    /* --- 7. STRATEGY & MAP ACADEMY (Interactive Modals) --- */
    const strategyDetails = {
        "1": {
            title: "Rotasi Lane & Minion Control",
            text: "Rotasi yang benar dimulai setelah membersihkan gelombang minion di lane sendiri (fast clear). Jangan biarkan minion musuh menghancurkan turret sendiri. Waktu rotasi terbaik adalah setelah menit ke-2 setelah kelomang atau turtle pertama muncul, bergeraklah bersama roamer atau midlaner untuk memberikan keunggulan jumlah (overnumber) di lane sebelah."
        },
        "2": {
            title: "Pengambilan Objektif (Turtle & Lord)",
            text: "Sebelum Turtle atau Lord muncul (30 detik sebelumnya), pastikan area sekitar jungle telah dibersihkan dari vision musuh dan semak-semak sudah di-check. Jungler wajib memegang Retribution dan berkoordinasi dengan Tank untuk melakukan zone-out kepada jungler musuh. Jangan melakukan hit turtle jika posisi tim sedang kalah jumlah."
        },
        "3": {
            title: "Map Awareness & Vision Control",
            text: "Biasakan melirik minimap setiap 3-5 detik sekali. Jika hero musuh di lane lain hilang dari map (missing), bermainlah lebih aman dan mundur ke dekat turret. Selalu gunakan skill jarak jauh atau pastikan teman satu tim mendampingi saat ingin membuka semak yang dicurigai menjadi tempat bersembunyi musuh."
        },
        "4": {
            title: "Team Fight Timing & Positioning",
            text: "Dalam team fight besar, kemenangan ditentukan oleh siapa yang berhasil menumbangkan core musuh terlebih dahulu tanpa mengorbankan posisinya sendiri. Tank atau Fighter bertugas mengacaukan formasi belakang musuh, sementara Mage dan Marksman menyerang dari jarak aman (backline)."
        }
    };

    // Buat elemen modal strategi dinamis
    const stratModalBackdrop = document.createElement('div');
    stratModalBackdrop.className = 'strat-modal-backdrop';
    stratModalBackdrop.innerHTML = `
        <div class="strat-modal-content">
            <button class="strat-modal-close">&times;</button>
            <h3 id="strat-modal-title">Judul Strategi</h3>
            <p id="strat-modal-text">Penjelasan lengkap strategi...</p>
            <button class="cyber-btn-small" id="strat-modal-ok-btn">Mengerti & Siap Praktik</button>
        </div>
    `;
    document.body.appendChild(stratModalBackdrop);

    const stratModalTitle = document.getElementById('strat-modal-title');
    const stratModalText = document.getElementById('strat-modal-text');
    const stratModalCloseBtn = stratModalBackdrop.querySelector('.strat-modal-close');
    const stratModalOkBtn = document.getElementById('strat-modal-ok-btn');

    function openStratModal(stratId) {
        const info = strategyDetails[stratId];
        if (info) {
            stratModalTitle.textContent = info.title;
            stratModalText.textContent = info.text;
            stratModalBackdrop.classList.add('active');
        }
    }

    function closeStratModal() {
        stratModalBackdrop.classList.remove('active');
    }

    document.querySelectorAll('.strat-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const stratId = btn.getAttribute('data-strat');
            openStratModal(stratId);
        });
    });

    if (stratModalCloseBtn) stratModalCloseBtn.addEventListener('click', closeStratModal);
    if (stratModalOkBtn) stratModalOkBtn.addEventListener('click', closeStratModal);
    stratModalBackdrop.addEventListener('click', (e) => {
        if (e.target === stratModalBackdrop) closeStratModal();
    });

    /* --- 8. CHAMPION TRAINING & IMPROVEMENT (Checklist & LocalStorage) --- */
    const trainingChecklistData = [
        { id: "train_1", text: "Latihan Last Hit Minion di Practice Mode selama 10 menit tanpa item." },
        { id: "train_2", text: "Praktikkan combo hero jagoan minimal 20 kali tanpa jeda keliru." },
        { id: "train_3", text: "Review minimal 1 replay pertandingan terakhir untuk evaluasi kesalahan positioning." },
        { id: "train_4", text: "Latihan melihat minimap setiap 3 detik secara konsisten selama match." },
        { id: "train_5", text: "Komunikasi aktif dengan ping map dan call-out info posisi musuh bersama tim." },
        { id: "train_6", text: "Menjaga mental positif dan sportif menang maupun kalah dalam ranked match." }
    ];

    const trainingChecklistContainer = document.getElementById('training-checklist');
    const trainingProgressFill = document.getElementById('training-progress-fill');
    const progressPercentageText = document.getElementById('progress-percentage-text');

    function renderChecklist() {
        if (!trainingChecklistContainer) return;

        let html = "";
        trainingChecklistData.forEach(item => {
            const isChecked = localStorage.getItem(item.id) === 'true';
            html += `
                <label class="checklist-item ${isChecked ? 'completed' : ''}" data-id="${item.id}">
                    <input type="checkbox" ${isChecked ? 'checked' : ''}>
                    <span class="checklist-text">${item.text}</span>
                </label>
            `;
        });
        trainingChecklistContainer.innerHTML = html;

        updateProgress();
        attachChecklistEvents();
    }

    function updateProgress() {
        let completedCount = 0;
        trainingChecklistData.forEach(item => {
            if (localStorage.getItem(item.id) === 'true') {
                completedCount++;
            }
        });

        const percentage = Math.round((completedCount / trainingChecklistData.length) * 100);
        if (trainingProgressFill) trainingProgressFill.style.width = percentage + '%';
        if (progressPercentageText) progressPercentageText.textContent = percentage + '% Selesai';
    }

    function attachChecklistEvents() {
        const checklistLabels = trainingChecklistContainer.querySelectorAll('.checklist-item');
        checklistLabels.forEach(label => {
            const checkbox = label.querySelector('input[type="checkbox"]');
            const id = label.getAttribute('data-id');

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(id, 'true');
                    label.classList.add('completed');
                } else {
                    localStorage.setItem(id, 'false');
                    label.classList.remove('completed');
                }
                updateProgress();
            });
        });
    }

    renderChecklist();

    /* --- 9. BACK TO TOP BUTTON --- */
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
