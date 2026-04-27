/* ===================================================================
   StudyForge – Main Application Logic
   Handles all interactivity, state management, and UI rendering
   =================================================================== */

// ─── State ─────────────────────────────────────────────────────────
const STATE_KEY = 'studyforge_state';
let state = loadState();
let currentSchedules = [];
let timerInterval = null;
let timerSeconds = 0;
let timerTotalSeconds = 25 * 60;
let timerRunning = false;

function defaultState() {
    return {
        mode: null,
        currentDay: 1,
        completedDays: {},        // { 1: true, 2: true, ... }
        checklistData: {},        // { 1: { coding: true, sql: false, ... }, ... }
        habitData: {},            // { 1: { wake: true, ... }, ... }
        notes: {},                // { 1: 'some notes', ... }
        pomodoroSessions: 0,
        pomodoroTotalMinutes: 0,
        soundEnabled: false,
        theme: 'dark',
        notesDay: 1,
        habitsDay: 1,
    };
}

function loadState() {
    try {
        const saved = localStorage.getItem(STATE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...defaultState(), ...parsed };
        }
    } catch(e) { console.warn('Failed to load state:', e); }
    return defaultState();
}

function saveState() {
    try {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch(e) { console.warn('Failed to save state:', e); }
}

// ─── Particles ─────────────────────────────────────────────────────
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.4 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDark ? '108,99,255' : '91,82,224';

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color},${p.opacity})`;
            ctx.fill();
        });

        // Draw lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${color},${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ─── Theme ─────────────────────────────────────────────────────────
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    saveState();
    playClick();
}

function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    // Both floating and nav toggles call the same function
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('float-theme-toggle').addEventListener('click', toggleTheme);
}

// ─── Sound ─────────────────────────────────────────────────────────
function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    document.body.classList.toggle('sound-enabled', state.soundEnabled);
    saveState();
}

function initSound() {
    if (state.soundEnabled) document.body.classList.add('sound-enabled');
    document.getElementById('sound-toggle').addEventListener('click', toggleSound);
    document.getElementById('float-sound-toggle').addEventListener('click', toggleSound);
}

function playClick() {
    if (!state.soundEnabled) return;
    try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.frequency.value = 600;
        gain.gain.value = 0.08;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
        osc.stop(ac.currentTime + 0.1);
    } catch(e) {}
}

function playSuccess() {
    if (!state.soundEnabled) return;
    try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        [523, 659, 784].forEach((freq, i) => {
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.frequency.value = freq;
            gain.gain.value = 0.06;
            osc.start(ac.currentTime + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.12 + 0.2);
            osc.stop(ac.currentTime + i * 0.12 + 0.2);
        });
    } catch(e) {}
}

function playAlarm() {
    if (!state.soundEnabled) return;
    try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        [880, 0, 880, 0, 880].forEach((freq, i) => {
            if (freq === 0) return;
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.frequency.value = freq;
            gain.gain.value = 0.1;
            osc.start(ac.currentTime + i * 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.3 + 0.25);
            osc.stop(ac.currentTime + i * 0.3 + 0.25);
        });
    } catch(e) {}
}

// ─── Toast Notifications ───────────────────────────────────────────
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ─── Page Navigation ───────────────────────────────────────────────
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    // Hide floating toggles on dashboard (they're in the nav bar there)
    const floats = document.getElementById('floating-toggles');
    if (id === 'dashboard') {
        floats.classList.add('hidden');
    } else {
        floats.classList.remove('hidden');
    }
}

// ─── Animated Counters ─────────────────────────────────────────────
function animateCounters() {
    document.querySelectorAll('.counter-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 60;
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            el.textContent = Math.floor(current);
        }, 25);
    });
}

// ─── Landing Page ──────────────────────────────────────────────────
function initLanding() {
    animateCounters();
    document.getElementById('start-btn').addEventListener('click', () => {
        playClick();
        if (state.mode) {
            currentSchedules = generateSchedules(state.mode);
            showPage('dashboard');
            initDashboard();
        } else {
            showPage('mode-select');
        }
    });
}

// ─── Mode Selection ────────────────────────────────────────────────
function initModeSelection() {
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.dataset.mode;
            state.mode = mode;
            currentSchedules = generateSchedules(mode);
            saveState();
            playSuccess();
            showPage('dashboard');
            initDashboard();
        });
    });
}

// ─── Dashboard Init ────────────────────────────────────────────────
function initDashboard() {
    if (!state.mode) return;
    currentSchedules = generateSchedules(state.mode);

    // Mode indicator
    const indicator = document.getElementById('mode-indicator');
    const modeNames = { hardcore: '🔥 Hardcore', balanced: '⚡ Balanced', consistency: '🎯 Consistency' };
    indicator.textContent = modeNames[state.mode] || state.mode;

    initNavTabs();
    initHamburger();
    renderOverview();
    renderDailyPlan();
    renderAnalytics();
    renderCalendar();
    renderRoadmaps();
    renderHabits();
    initTimer();
    renderNotes();
    renderBadges();
    initExportImport();
    initResetBtn();
}

// ─── Dashboard Nav Tabs ────────────────────────────────────────────
function initNavTabs() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById(`tab-${tab}`).classList.add('active');
            playClick();

            // Refresh specific tabs on switch
            if (tab === 'analytics') renderAnalytics();
            if (tab === 'calendar') renderCalendar();
            if (tab === 'achievements') renderBadges();
            if (tab === 'overview') renderOverview();
        });
    });
}

function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.dash-nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ─── Overview Tab ──────────────────────────────────────────────────
function renderOverview() {
    // Quote
    const quoteIdx = (new Date().getDate() + new Date().getMonth()) % QUOTES.length;
    document.getElementById('quote-text').textContent = QUOTES[quoteIdx].text;
    document.getElementById('quote-author').textContent = `— ${QUOTES[quoteIdx].author}`;

    // Stats
    const completedCount = Object.keys(state.completedDays).length;
    const streak = calculateStreak();
    const totalHours = calculateTotalHours();
    const percentage = Math.round((completedCount / 60) * 100);
    const problemsSolved = calculateProblemsSolved();

    document.getElementById('stat-streak').textContent = streak;
    document.getElementById('stat-completed').textContent = completedCount;
    document.getElementById('stat-percentage').textContent = `${percentage}%`;
    document.getElementById('stat-hours').textContent = `${totalHours}h`;
    document.getElementById('stat-remaining').textContent = 60 - completedCount;
    document.getElementById('stat-problems').textContent = problemsSolved;

    // Fire animation
    if (streak >= 3) {
        const fire = document.getElementById('streak-fire');
        fire.classList.add('animate');
        setTimeout(() => fire.classList.remove('animate'), 600);
    }

    // Progress Ring
    const ringFill = document.getElementById('progress-ring-fill');
    const circumference = 2 * Math.PI * 85;
    ringFill.style.strokeDasharray = circumference;
    const offset = circumference - (percentage / 100 * circumference);
    setTimeout(() => { ringFill.style.strokeDashoffset = offset; }, 100);
    // Set gradient via inline style
    ringFill.style.stroke = percentage > 50 ? '#00d4aa' : '#6c63ff';
    document.getElementById('progress-ring-text').textContent = `${percentage}%`;

    // Skill Progress
    const skillPcts = calculateSkillProgress();
    ['python', 'sql', 'dsa', 'excel', 'pbi', 'ml'].forEach(skill => {
        const pct = skillPcts[skill] || 0;
        document.getElementById(`${skill}-bar`).style.width = `${pct}%`;
        document.getElementById(`${skill}-pct`).textContent = `${pct}%`;
    });

    // Today's Quick View
    const todaySchedule = currentSchedules[state.currentDay - 1];
    const todayGrid = document.getElementById('today-grid');
    document.getElementById('today-day-label').textContent = `Day ${state.currentDay}`;
    document.getElementById('today-date').textContent = formatDate(new Date(todaySchedule.date));

    todayGrid.innerHTML = `
        <div class="today-item"><span class="today-item-icon">🐍</span><div class="today-item-info"><h4>Python</h4><p>${todaySchedule.python}</p></div></div>
        <div class="today-item"><span class="today-item-icon">🗄️</span><div class="today-item-info"><h4>SQL</h4><p>${todaySchedule.sql}</p></div></div>
        <div class="today-item"><span class="today-item-icon">🧩</span><div class="today-item-info"><h4>LeetCode</h4><p>${todaySchedule.leetcode}</p></div></div>
        <div class="today-item"><span class="today-item-icon">📊</span><div class="today-item-info"><h4>Excel / Power BI</h4><p>${todaySchedule.excel}</p></div></div>
        <div class="today-item"><span class="today-item-icon">🎯</span><div class="today-item-info"><h4>Target</h4><p>${todaySchedule.totalHours}h study, ${todaySchedule.codingProblems} problems</p></div></div>
        ${todaySchedule.projectTask ? `<div class="today-item"><span class="today-item-icon">🛠️</span><div class="today-item-info"><h4>Project</h4><p>${todaySchedule.projectTask}</p></div></div>` : ''}
    `;

    // Weekly Milestone
    const weekNum = Math.ceil(state.currentDay / 7);
    const weekData = WEEKLY_TARGETS[Math.min(weekNum - 1, WEEKLY_TARGETS.length - 1)];
    const milestoneEl = document.getElementById('weekly-milestone');
    milestoneEl.innerHTML = `
        <h4 style="margin-bottom:14px;color:var(--accent-1)">${weekData.title}</h4>
        <div class="milestone-list">
            ${weekData.targets.map(t => `
                <div class="milestone-item">
                    <div class="milestone-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <span class="milestone-text">${t}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ─── Daily Plan Tab ────────────────────────────────────────────────
function renderDailyPlan() {
    const day = state.currentDay;
    const schedule = currentSchedules[day - 1];

    document.getElementById('day-title').textContent = `Day ${day}`;
    document.getElementById('day-date-label').textContent = `${formatDate(new Date(schedule.date))} • ${schedule.totalHours}h Target • ${schedule.isRevision ? '📖 Revision Day' : `${schedule.codingProblems} Problems`}`;
    document.getElementById('day-picker').value = day;

    // Time blocks
    const scheduleEl = document.getElementById('day-schedule');
    scheduleEl.innerHTML = schedule.blocks.map(block => `
        <div class="time-block">
            <div class="time-block-header">
                <span class="time-block-icon">${block.icon}</span>
                <span class="time-block-title">${block.title}</span>
                <span class="time-block-hours">${block.hours}</span>
            </div>
            <div style="font-size:0.75rem;color:var(--text-tertiary);margin-bottom:10px">${block.time}</div>
            <ul class="time-block-tasks">
                ${block.tasks.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    // Checklist
    const checklistEl = document.getElementById('day-checklist');
    const dayChecklist = state.checklistData[day] || {};
    checklistEl.innerHTML = CHECKLIST_ITEMS.map(item => `
        <div class="checklist-item ${dayChecklist[item.id] ? 'checked' : ''}" data-check-id="${item.id}">
            <div class="checklist-box"></div>
            <span class="checklist-label">${item.label}</span>
        </div>
    `).join('');

    // Checklist click handlers
    checklistEl.querySelectorAll('.checklist-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.checkId;
            if (!state.checklistData[day]) state.checklistData[day] = {};
            state.checklistData[day][id] = !state.checklistData[day][id];
            el.classList.toggle('checked');
            saveState();
            playClick();
        });
    });

    // Mark complete button
    const completeBtn = document.getElementById('mark-day-complete');
    const isComplete = !!state.completedDays[day];
    completeBtn.textContent = isComplete ? '✅ Day Completed!' : 'Mark Day as Complete';
    completeBtn.className = `mark-complete-btn ${isComplete ? 'completed' : ''}`;

    completeBtn.onclick = () => {
        if (!state.completedDays[day]) {
            state.completedDays[day] = true;
            // Auto-check all checklist items
            if (!state.checklistData[day]) state.checklistData[day] = {};
            CHECKLIST_ITEMS.forEach(item => { state.checklistData[day][item.id] = true; });
            saveState();
            playSuccess();
            showToast(`🎉 Day ${day} completed! Keep the streak going!`, 'success');
            renderDailyPlan();
            renderOverview();
            renderBadges();
        } else {
            // Toggle off
            delete state.completedDays[day];
            saveState();
            renderDailyPlan();
            renderOverview();
            playClick();
        }
    };

    // Day navigation
    document.getElementById('prev-day').onclick = () => { if (state.currentDay > 1) { state.currentDay--; saveState(); renderDailyPlan(); playClick(); } };
    document.getElementById('next-day').onclick = () => { if (state.currentDay < 60) { state.currentDay++; saveState(); renderDailyPlan(); playClick(); } };
    document.getElementById('day-picker').onchange = (e) => {
        const val = parseInt(e.target.value);
        if (val >= 1 && val <= 60) { state.currentDay = val; saveState(); renderDailyPlan(); playClick(); }
    };
}

// ─── Analytics Tab ─────────────────────────────────────────────────
function renderAnalytics() {
    renderWeeklyChart();
    renderSkillChart();
    renderStreakChart();
}

function renderWeeklyChart() {
    const canvas = document.getElementById('weekly-chart');
    const container = canvas.parentElement;
    container.innerHTML = '';

    const barChart = document.createElement('div');
    barChart.className = 'bar-chart';

    const weeks = [];
    for (let w = 1; w <= 9; w++) {
        const start = (w - 1) * 7 + 1;
        const end = Math.min(w * 7, 60);
        let completed = 0;
        let total = 0;
        for (let d = start; d <= end; d++) {
            total++;
            if (state.completedDays[d]) completed++;
        }
        weeks.push({ label: `W${w}`, pct: total > 0 ? Math.round((completed / total) * 100) : 0 });
    }

    weeks.forEach(w => {
        const col = document.createElement('div');
        col.className = 'bar-col';
        col.innerHTML = `
            <span class="bar-value">${w.pct}%</span>
            <div class="bar-fill" style="height:${Math.max(w.pct * 2, 4)}px"></div>
            <span class="bar-label">${w.label}</span>
        `;
        barChart.appendChild(col);
    });
    container.appendChild(barChart);
}

function renderSkillChart() {
    const canvas = document.getElementById('skill-chart');
    const container = canvas.parentElement;
    container.innerHTML = '';

    const pcts = calculateSkillProgress();
    const skills = [
        { name: 'Python', pct: pcts.python, color: '#6c63ff' },
        { name: 'SQL', pct: pcts.sql, color: '#00d4aa' },
        { name: 'DSA', pct: pcts.dsa, color: '#ff6b9d' },
        { name: 'Excel', pct: pcts.excel, color: '#2ed573' },
        { name: 'Power BI', pct: pcts.pbi, color: '#ffa502' },
        { name: 'ML', pct: pcts.ml, color: '#f093fb' }
    ];

    const chart = document.createElement('div');
    chart.className = 'donut-chart';

    // Simple vertical bar representation for skills
    const barsDiv = document.createElement('div');
    barsDiv.className = 'bar-chart';
    barsDiv.style.maxWidth = '300px';

    skills.forEach(s => {
        const col = document.createElement('div');
        col.className = 'bar-col';
        col.innerHTML = `
            <span class="bar-value">${s.pct}%</span>
            <div class="bar-fill" style="height:${Math.max(s.pct * 1.8, 4)}px; background:${s.color}"></div>
            <span class="bar-label">${s.name}</span>
        `;
        barsDiv.appendChild(col);
    });

    const legend = document.createElement('div');
    legend.className = 'donut-legend';
    skills.forEach(s => {
        legend.innerHTML += `<div class="legend-item"><span class="legend-dot-swatch" style="background:${s.color}"></span>${s.name}: ${s.pct}%</div>`;
    });

    chart.appendChild(barsDiv);
    chart.appendChild(legend);
    container.appendChild(chart);
}

function renderStreakChart() {
    const canvas = document.getElementById('streak-chart');
    const container = canvas.parentElement;
    container.innerHTML = '';

    const chart = document.createElement('div');
    chart.style.display = 'flex';
    chart.style.flexWrap = 'wrap';
    chart.style.gap = '4px';
    chart.style.padding = '20px';
    chart.style.justifyContent = 'center';

    for (let d = 1; d <= 60; d++) {
        const box = document.createElement('div');
        box.style.width = '16px';
        box.style.height = '16px';
        box.style.borderRadius = '3px';
        box.style.transition = 'all 0.3s';
        box.title = `Day ${d}`;

        if (state.completedDays[d]) {
            box.style.background = '#00d4aa';
            box.style.boxShadow = '0 0 6px rgba(0,212,170,0.4)';
        } else if (d <= state.currentDay) {
            box.style.background = 'var(--danger)';
            box.style.opacity = '0.3';
        } else {
            box.style.background = 'var(--border-color)';
        }
        chart.appendChild(box);
    }
    container.appendChild(chart);
}

// ─── Calendar Tab ──────────────────────────────────────────────────
let calendarMonth = 4; // May = 4 (0-indexed)
let calendarYear = 2025;

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const label = document.getElementById('cal-month-label');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    label.textContent = `${months[calendarMonth]} ${calendarYear}`;

    grid.innerHTML = '';

    // Day headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
        const header = document.createElement('div');
        header.className = 'cal-header-cell';
        header.textContent = d;
        grid.appendChild(header);
    });

    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const startDate = new Date(2025, 4, 1); // May 1
    const today = new Date();

    // Empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-cell empty';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement('div');
        cell.className = 'cal-cell';
        cell.textContent = d;

        const cellDate = new Date(calendarYear, calendarMonth, d);
        const diffTime = cellDate.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays >= 1 && diffDays <= 60) {
            if (state.completedDays[diffDays]) {
                cell.classList.add('completed');
            } else if (cellDate.toDateString() === today.toDateString()) {
                cell.classList.add('today');
            } else if (cellDate < today) {
                cell.classList.add('missed');
            }

            cell.addEventListener('click', () => {
                state.currentDay = diffDays;
                saveState();
                // Switch to daily tab
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelector('[data-tab="daily"]').classList.add('active');
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                document.getElementById('tab-daily').classList.add('active');
                renderDailyPlan();
                playClick();
            });
        }
        grid.appendChild(cell);
    }

    // Calendar nav
    document.getElementById('cal-prev').onclick = () => {
        calendarMonth--;
        if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
        renderCalendar();
        playClick();
    };
    document.getElementById('cal-next').onclick = () => {
        calendarMonth++;
        if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
        renderCalendar();
        playClick();
    };
}

// ─── Roadmaps Tab ──────────────────────────────────────────────────
function renderRoadmaps() {
    const roadmaps = {
        python: PYTHON_ROADMAP,
        leetcode: LEETCODE_ROADMAP,
        sql: SQL_ROADMAP,
        excel: EXCEL_PBI_ROADMAP,
        ml: ML_ROADMAP
    };

    document.querySelectorAll('.roadmap-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.roadmap-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderRoadmapContent(tab.dataset.roadmap, roadmaps[tab.dataset.roadmap]);
            playClick();
        });
    });

    // Default render
    renderRoadmapContent('python', PYTHON_ROADMAP);
}

function renderRoadmapContent(name, data) {
    const container = document.getElementById('roadmap-content');
    const phases = { beginner: [], intermediate: [], advanced: [] };
    data.forEach(item => {
        if (phases[item.phase]) phases[item.phase].push(item);
    });

    const phaseLabels = {
        beginner: { title: 'Beginner Phase', badge: 'beginner' },
        intermediate: { title: 'Intermediate Phase', badge: 'intermediate' },
        advanced: { title: 'Advanced Phase', badge: 'advanced' }
    };

    container.innerHTML = Object.entries(phases).map(([phase, items]) => {
        if (items.length === 0) return '';
        const info = phaseLabels[phase];
        return `
            <div class="roadmap-phase glass-card">
                <div class="roadmap-phase-header">
                    <span class="phase-badge ${info.badge}">${info.badge}</span>
                    <h3>${info.title}</h3>
                </div>
                <div class="roadmap-items">
                    ${items.map(item => `
                        <div class="roadmap-item">
                            <span class="day-range">Day ${item.days}</span>
                            <span class="topic-name">${item.topic}</span>
                            <span class="difficulty ${item.difficulty}">${item.difficulty}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ─── Habits Tab ────────────────────────────────────────────────────
function renderHabits() {
    const day = state.habitsDay;
    document.getElementById('habit-day-label').textContent = `Day ${day} Habits`;

    const grid = document.getElementById('habits-grid');
    const dayHabits = state.habitData[day] || {};

    grid.innerHTML = HABITS.map(h => `
        <div class="habit-card ${dayHabits[h.id] ? 'done' : ''}" data-habit-id="${h.id}">
            <span class="habit-icon">${h.icon}</span>
            <div class="habit-info">
                <h4>${h.name}</h4>
                <p>${h.desc}</p>
            </div>
            <div class="habit-check"></div>
        </div>
    `).join('');

    grid.querySelectorAll('.habit-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.habitId;
            if (!state.habitData[day]) state.habitData[day] = {};
            state.habitData[day][id] = !state.habitData[day][id];
            card.classList.toggle('done');
            saveState();
            playClick();
            renderHabitStats();
        });
    });

    // Navigation
    document.getElementById('habit-prev').onclick = () => {
        if (state.habitsDay > 1) { state.habitsDay--; saveState(); renderHabits(); playClick(); }
    };
    document.getElementById('habit-next').onclick = () => {
        if (state.habitsDay < 60) { state.habitsDay++; saveState(); renderHabits(); playClick(); }
    };

    renderHabitStats();
}

function renderHabitStats() {
    const statsEl = document.getElementById('habit-stats');
    let totalChecked = 0, totalPossible = 0;
    let perfectDays = 0;

    for (let d = 1; d <= 60; d++) {
        const dh = state.habitData[d] || {};
        const checked = Object.values(dh).filter(Boolean).length;
        totalChecked += checked;
        totalPossible += HABITS.length;
        if (checked === HABITS.length) perfectDays++;
    }

    const completionRate = totalPossible > 0 ? Math.round((totalChecked / totalPossible) * 100) : 0;

    statsEl.innerHTML = `
        <div class="habit-stat-item"><span class="habit-stat-value">${completionRate}%</span><span class="habit-stat-label">Completion Rate</span></div>
        <div class="habit-stat-item"><span class="habit-stat-value">${totalChecked}</span><span class="habit-stat-label">Total Habits Done</span></div>
        <div class="habit-stat-item"><span class="habit-stat-value">${perfectDays}</span><span class="habit-stat-label">Perfect Days</span></div>
        <div class="habit-stat-item"><span class="habit-stat-value">${HABITS.length}</span><span class="habit-stat-label">Habits / Day</span></div>
    `;
}

// ─── Timer (Pomodoro) ──────────────────────────────────────────────
function initTimer() {
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    const resetBtn = document.getElementById('timer-reset');
    const timerText = document.getElementById('timer-text');
    const ringFill = document.getElementById('timer-ring-fill');
    const circumference = 2 * Math.PI * 120;
    ringFill.style.strokeDasharray = circumference;

    // Presets
    document.querySelectorAll('.timer-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.timer-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            timerTotalSeconds = parseInt(btn.dataset.minutes) * 60;
            timerSeconds = timerTotalSeconds;
            updateTimerDisplay();
            resetTimerRing();
            playClick();
        });
    });

    startBtn.onclick = () => {
        if (timerRunning) return;
        if (timerSeconds <= 0) timerSeconds = timerTotalSeconds;
        timerRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            updateTimerRing();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                state.pomodoroSessions++;
                state.pomodoroTotalMinutes += Math.round(timerTotalSeconds / 60);
                saveState();
                document.getElementById('pomo-count').textContent = state.pomodoroSessions;
                document.getElementById('pomo-total-time').textContent = `${state.pomodoroTotalMinutes}m`;
                playAlarm();
                showToast('⏰ Timer complete! Take a break.', 'success');
            }
        }, 1000);
        playClick();
    };

    pauseBtn.onclick = () => {
        clearInterval(timerInterval);
        timerRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        playClick();
    };

    resetBtn.onclick = () => {
        clearInterval(timerInterval);
        timerRunning = false;
        timerSeconds = timerTotalSeconds;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        updateTimerDisplay();
        resetTimerRing();
        playClick();
    };

    // Init display
    timerSeconds = timerTotalSeconds;
    updateTimerDisplay();
    document.getElementById('pomo-count').textContent = state.pomodoroSessions;
    document.getElementById('pomo-total-time').textContent = `${state.pomodoroTotalMinutes}m`;

    function updateTimerDisplay() {
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        timerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateTimerRing() {
        const progress = 1 - (timerSeconds / timerTotalSeconds);
        ringFill.style.strokeDashoffset = circumference * (1 - progress);
    }

    function resetTimerRing() {
        ringFill.style.strokeDashoffset = 0;
    }
}

// ─── Notes Tab ─────────────────────────────────────────────────────
function renderNotes() {
    const day = state.notesDay;
    document.getElementById('notes-day-label').textContent = `Day ${day} Notes`;
    document.getElementById('notes-textarea').value = state.notes[day] || '';

    document.getElementById('save-notes').onclick = () => {
        state.notes[day] = document.getElementById('notes-textarea').value;
        saveState();
        showToast('📝 Notes saved!', 'success');
        playClick();
    };

    document.getElementById('notes-prev').onclick = () => {
        // Save current before switching
        state.notes[state.notesDay] = document.getElementById('notes-textarea').value;
        if (state.notesDay > 1) state.notesDay--;
        saveState();
        renderNotes();
        playClick();
    };
    document.getElementById('notes-next').onclick = () => {
        state.notes[state.notesDay] = document.getElementById('notes-textarea').value;
        if (state.notesDay < 60) state.notesDay++;
        saveState();
        renderNotes();
        playClick();
    };
}

// ─── Badges Tab ────────────────────────────────────────────────────
function renderBadges() {
    const grid = document.getElementById('badges-grid');
    const stats = getBadgeStats();

    grid.innerHTML = BADGES.map(badge => {
        const unlocked = badge.condition(stats);
        return `
            <div class="badge-card ${unlocked ? 'unlocked' : 'locked'}">
                <span class="badge-emoji">${badge.emoji}</span>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-desc">${badge.desc}</div>
                <span class="badge-status">${unlocked ? '✓ Unlocked' : '🔒 Locked'}</span>
            </div>
        `;
    }).join('');
}

function getBadgeStats() {
    const completedCount = Object.keys(state.completedDays).length;
    let noteDays = 0;
    for (let d = 1; d <= 60; d++) {
        if (state.notes[d] && state.notes[d].trim().length > 0) noteDays++;
    }
    let perfectHabitDays = 0;
    for (let d = 1; d <= 60; d++) {
        const dh = state.habitData[d] || {};
        if (Object.values(dh).filter(Boolean).length === HABITS.length) perfectHabitDays++;
    }

    return {
        completedDays: completedCount,
        maxStreak: calculateMaxStreak(),
        totalHours: calculateTotalHours(),
        problemsSolved: calculateProblemsSolved(),
        noteDays,
        perfectHabitDays
    };
}

// ─── Export / Import ───────────────────────────────────────────────
function initExportImport() {
    document.getElementById('export-btn').addEventListener('click', () => {
        const data = JSON.stringify(state, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `studyforge-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('📦 Progress exported!', 'success');
        playClick();
    });

    const fileInput = document.getElementById('import-file');
    document.getElementById('import-btn').addEventListener('click', () => {
        fileInput.click();
    });
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const imported = JSON.parse(ev.target.result);
                state = { ...defaultState(), ...imported };
                saveState();
                showToast('📥 Progress imported!', 'success');
                playSuccess();
                initDashboard();
            } catch (err) {
                showToast('❌ Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
        fileInput.value = '';
    });
}

function initResetBtn() {
    document.getElementById('reset-btn').addEventListener('click', () => {
        if (confirm('⚠️ Are you sure you want to reset ALL progress? This cannot be undone!')) {
            if (confirm('Really? This will delete everything — streaks, notes, habits, all progress.')) {
                state = defaultState();
                saveState();
                showToast('🔄 All progress reset.', 'info');
                location.reload();
            }
        }
    });
}

// ─── Utility Functions ─────────────────────────────────────────────
function calculateStreak() {
    let streak = 0;
    for (let d = state.currentDay; d >= 1; d--) {
        if (state.completedDays[d]) streak++;
        else break;
    }
    return streak;
}

function calculateMaxStreak() {
    let max = 0, current = 0;
    for (let d = 1; d <= 60; d++) {
        if (state.completedDays[d]) {
            current++;
            if (current > max) max = current;
        } else {
            current = 0;
        }
    }
    return max;
}

function calculateTotalHours() {
    let hours = 0;
    for (const d in state.completedDays) {
        if (currentSchedules[d - 1]) {
            hours += currentSchedules[d - 1].totalHours;
        }
    }
    return hours;
}

function calculateProblemsSolved() {
    let problems = 0;
    for (const d in state.completedDays) {
        if (currentSchedules[d - 1]) {
            problems += currentSchedules[d - 1].codingProblems;
        }
    }
    return problems;
}

function calculateSkillProgress() {
    const completedCount = Object.keys(state.completedDays).length;
    const base = Math.round((completedCount / 60) * 100);

    // Slightly vary each skill based on checklist data
    let pythonBoost = 0, sqlBoost = 0, dsaBoost = 0, excelBoost = 0, pbiBoost = 0, mlBoost = 0;
    for (const d in state.checklistData) {
        const cl = state.checklistData[d];
        if (cl.coding) pythonBoost++;
        if (cl.sql) sqlBoost++;
        if (cl.leetcode) dsaBoost++;
        if (cl.excel) excelBoost++;
        if (cl.pbi) pbiBoost++;
        if (cl.revision) mlBoost++;
    }

    const cap = (v) => Math.min(100, Math.max(0, v));
    return {
        python: cap(Math.round(base * 1.1 + pythonBoost * 0.5)),
        sql: cap(Math.round(base * 0.95 + sqlBoost * 0.5)),
        dsa: cap(Math.round(base * 0.9 + dsaBoost * 0.5)),
        excel: cap(Math.round(base * 0.85 + excelBoost * 0.5)),
        pbi: cap(Math.round(base * 0.75 + pbiBoost * 0.5)),
        ml: cap(Math.round(base * 0.7 + mlBoost * 0.5)),
    };
}

function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ─── Auto Resume ───────────────────────────────────────────────────
function autoResume() {
    if (state.mode) {
        currentSchedules = generateSchedules(state.mode);
        showPage('dashboard');
        initDashboard();
    }
}

// ─── Initialize App ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTheme();
    initSound();
    initLanding();
    initModeSelection();

    // Auto resume if user already selected a mode
    if (state.mode) {
        autoResume();
    }
});
