// --- Section 1: Gamified Core Database Pool ---
const gameDatabase = {
    1: {
        title: "01. BLUE BIN PIPELINE",
        desc: "Scan the domestic target item. Determine if it belongs inside the Blue Commingled Recycler or General Disposal Chutes.",
        tutorial: "Tutorial Rule: Only clean paper, plastics, glass, and metals can enter the blue bin. Food wrappers or tissue papers contaminate the batch.",
        items: [
            { name: "Clean Milk Carton", icon: "fa-box", target: "BLUE BIN", tip: "Pure clean paper composites accepted." },
            { name: "Oily Pizza Box Cover", icon: "fa-pizza-slice", target: "TRASH CHUTE", tip: "Organic grease cancels recyclability." },
            { name: "Rinsed Shampoo Bottle", icon: "fa-bottle-droplet", target: "BLUE BIN", tip: "High-density polymers are fully recyclable." },
            { name: "Dirty Facial Tissue", icon: "fa-box-tissue", target: "TRASH CHUTE", tip: "Degraded hygiene fibers disrupt batch filtering." }
        ],
        targets: ["BLUE BIN", "TRASH CHUTE"]
    },
    2: {
        title: "02. RINSE & DRY BLITZ",
        desc: "Evaluate fluid volume contents. Packages containing residue must undergo clearing cycles.",
        tutorial: "Tutorial Rule: Packages holding residual foods or liquids need to be washed before they can go into recycling loops.",
        items: [
            { name: "Soda Can with Leftover Drink", icon: "fa-wine-bottle", target: "NEEDS RINSE", tip: "Liquid content spills damage paper mills downstream." },
            { name: "Bone-Dry Milk Jug", icon: "fa-prescription-bottle", target: "READY TO SORT", tip: "Dry, unsoiled hulls process cleanly." }
        ],
        targets: ["READY TO SORT", "NEEDS RINSE"]
    },
    3: {
        title: "03. EPR CONTAINER RETURN",
        desc: "Identify items managed by Extended Producer Responsibility policies for barcode-deposit automated return systems.",
        tutorial: "Tutorial Rule: Under the latest rules, metal cans and plastic bottles earn a 10-cent refund at Reverse Vending Machines (RVMs).",
        items: [
            { name: "Aluminum Soft Drink Can", icon: "fa-can-food", target: "RVM CENTER", tip: "Barcoded aluminum qualifies for financial credit." },
            { name: "Glass Wine Bottle", icon: "fa-glass-water", target: "BLUE BIN", tip: "Glass jars enter traditional commingled routes." }
        ],
        targets: ["RVM CENTER", "BLUE BIN"]
    },
    4: {
        title: "04. HAZARD REJECTION MODE",
        desc: "Isolate non-standard residential composites that compromise physical machinery networks.",
        tutorial: "Tutorial Rule: Household objects like styrofoam boxes, light bulbs, or clay pots do not belong in the public commingled bin.",
        items: [
            { name: "Styrofoam Lunch Box", icon: "fa-cubes", target: "HAZARD RISK", tip: "Expanded polystyrene foam breaks up and contaminates cycles." },
            { name: "Cardboard Box (Flat)", icon: "fa-square", target: "SAFE METRIC", tip: "Flattened cardboard passes structural test codes cleanly." }
        ],
        targets: ["SAFE METRIC", "HAZARD RISK"]
    },
    5: {
        title: "05. E-WASTE HARVEST",
        desc: "Safely isolate heavy metal circuit cells from municipal trash processing networks.",
        tutorial: "Tutorial Rule: E-waste has dedicated collection kiosks across supermarkets and malls. Do not drop items down the trash chute.",
        items: [
            { name: "AA Alkaline Battery", icon: "fa-battery-quarter", target: "TECH KIOSK", tip: "Spent cells release chemical elements into ground layers." },
            { name: "Plain Paper Notebook", icon: "fa-book-open", target: "BLUE BIN", tip: "Organic writing fibers deploy down normal paper tracks." }
        ],
        targets: ["TECH KIOSK", "BLUE BIN"]
    }
};

let currentActiveGame = 1;
let currentMode = "tutorial";
let globalScore = 0;
let consecutiveStreak = 0;
let currentExperienceXP = 0;
let currentLevelRank = 1;
let currentGameItemIndex = 0;
let playTimerInterval = null;
let playTimeRemaining = 30;

// --- Tab Selector Layer Controllers ---
document.querySelectorAll(".tab-toggle-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        switchTabsTo(this.getAttribute("data-target"));
    });
});

function switchTabsTo(tabId) {
    document.querySelectorAll(".tab-toggle-btn").forEach(function(b) {
        if (b.getAttribute("data-target") === tabId) b.classList.add("active");
        else b.classList.remove("active");
    });
    document.querySelectorAll(".tab-content").forEach(function(box) {
        if (box.id === tabId) box.classList.add("active-content");
        else box.classList.remove("active-content");
    });
}

document.getElementById("jump-to-games-btn").addEventListener("click", function() {
    switchTabsTo("arcade-tab");
    window.scrollTo(0, 0);
});
// --- Section 2: DOM Screen Elements & HUD Progress Systems ---
const displayWindow = document.getElementById("interactive-display-window");
const actionRow = document.getElementById("action-targets-row");
const systemFeedback = document.getElementById("system-feedback");
const modeBadge = document.getElementById("mode-badge");
const crtScreen = document.getElementById("main-crt-screen");

function bootActiveGameConfig() {
    const config = gameDatabase[currentActiveGame];
    clearInterval(playTimerInterval);
    document.getElementById("game-timer-wrapper").className = "hidden-hud-element";
    document.getElementById("game-title").innerText = config.title;
    
    if (currentMode === "tutorial") {
        modeBadge.className = "badge-status-training";
        modeBadge.innerText = "TRAINING MODULE ACTIVE";
        document.getElementById("game-description").innerText = config.tutorial;
    } else {
        modeBadge.className = "badge-status-speed";
        modeBadge.innerText = "LIVE TIME-TRIAL RUNNING";
        document.getElementById("game-description").innerText = config.desc;
        startCountdownTimer();
    }
    currentGameItemIndex = 0;
    renderInteractionInterface();
}

function renderInteractionInterface() {
    const config = gameDatabase[currentActiveGame];
    const currentItem = config.items[currentGameItemIndex];
    displayWindow.innerHTML = "";
    actionRow.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card-item";
    card.innerHTML = '<i class="fa-solid ' + currentItem.icon + '"></i><span>' + currentItem.name + '</span>';
    displayWindow.appendChild(card);

    config.targets.forEach(function(targetName) {
        const btn = document.createElement("button");
        btn.className = "action-btn";
        btn.innerText = targetName;
        btn.addEventListener("click", function() { processPlayerInput(targetName); });
        actionRow.appendChild(btn);
    });
}

// Visual Floating Points Engine Popup Generator
function spawnFloatingTextPopup(textValue) {
    const layer = document.getElementById("floating-score-layer");
    const label = document.createElement("div");
    label.className = "floating-bonus-text";
    label.innerText = textValue;
    label.style.left = (Math.random() * 40 + 30) + "%"; // Center variation
    layer.appendChild(label);
    setTimeout(() => { label.remove(); }, 800);
}
// --- Section 3: Input Check Logic, Combo Tracking & Level Scaling ---
function processPlayerInput(selectedTarget) {
    const config = gameDatabase[currentActiveGame];
    const item = config.items[currentGameItemIndex];

    if (selectedTarget === item.target) {
        consecutiveStreak++;
        let currentMultiplier = Math.min(Math.floor(consecutiveStreak / 3) + 1, 4);
        let pointBase = (currentMode === "play") ? 25 : 10;
        let finalAward = pointBase * currentMultiplier;
        
        globalScore += finalAward;
        currentExperienceXP += 15;
        
        // Zero pads global arcade points display ticker
        document.getElementById("global-points").innerText = String(globalScore).padStart(4, '0');
        document.getElementById("global-multiplier").innerText = currentMultiplier + "x";
        
        systemFeedback.style.color = "#34d399";
        systemFeedback.innerText = "★ STREAK BONUS! " + item.tip;
        spawnFloatingTextPopup("+" + finalAward + " PTS");
        
        verifyPlayerXPRankUp();
    } else {
        consecutiveStreak = 0;
        document.getElementById("global-multiplier").innerText = "1x";
        
        systemFeedback.style.color = "#ef4444";
        systemFeedback.innerText = "⚠️ INCORRECT PATH ROUTE. TARGET DESTINATION: " + item.target;
        
        // Triggers Screen Rumble Shake effect on false inputs
        crtScreen.classList.add("screen-rumble-shake");
        setTimeout(() => { crtScreen.classList.remove("screen-rumble-shake"); }, 300);
    }

    setTimeout(function() {
        currentGameItemIndex = (currentGameItemIndex + 1) % config.items.length;
        if (currentMode === "play" && playTimeRemaining <= 0) endMatchCycle();
        else renderInteractionInterface();
    }, 1500);
}

function verifyPlayerXPRankUp() {
    const fill = document.getElementById("xp-bar-fill");
    const display = document.getElementById("xp-numerical-display");
    const rankLabel = document.getElementById("player-rank-title");
    
    if (currentExperienceXP >= 100) {
        currentLevelRank++;
        currentExperienceXP = currentExperienceXP % 100;
        
        // Level rank names progression matrix
        if (currentLevelRank === 2) rankLabel.innerHTML = '<i class="fa-solid fa-user-shield text-neon-cyan"></i> SORTING COMMANDER';
        else if (currentLevelRank >= 3) rankLabel.innerHTML = '<i class="fa-solid fa-crown text-neon-orange"></i> RECYCLING ELITE';
        
        alert("⚡ LEVEL UP! You reached Rank level " + currentLevelRank + "!");
    }
    fill.style.width = currentExperienceXP + "%";
    display.innerText = "LEVEL PROGRESS: " + currentExperienceXP + "/100 XP";
}

function startCountdownTimer() {
    playTimeRemaining = 30;
    const element = document.getElementById("game-timer-wrapper");
    const countSpan = document.getElementById("game-countdown");
    element.className = "";
    countSpan.innerText = playTimeRemaining;

    playTimerInterval = setInterval(function() {
        playTimeRemaining--;
        countSpan.innerText = playTimeRemaining;
        if (playTimeRemaining <= 0) {
            clearInterval(playTimerInterval);
            endMatchCycle();
        }
    }, 1000);
}

function endMatchCycle() {
    actionRow.innerHTML = "";
    displayWindow.innerHTML = '<div class="card-item"><i class="fa-solid fa-trophy text-neon-orange"></i><span>SESSION COMPLETED</span></div>';
    systemFeedback.style.color = "#fff";
    systemFeedback.innerText = "TIME OUT: Pilot score metrics logged. Select alternative streams above to run again.";
}

document.getElementById("mode-tutorial").addEventListener("click", function() {
    document.getElementById("mode-play").classList.remove("active");
    this.classList.add("active");
    currentMode = "tutorial";
    bootActiveGameConfig();
});

document.getElementById("mode-play").addEventListener("click", function() {
    document.getElementById("mode-tutorial").classList.remove("active");
    this.classList.add("active");
    currentMode = "play";
    bootActiveGameConfig();
});

document.querySelectorAll(".arcade-game-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".arcade-game-btn").forEach(function(b) { b.classList.remove("active"); });
        this.classList.add("active");
        currentActiveGame = parseInt(this.getAttribute("data-game"));
        bootActiveGameConfig();
    });
});

window.addEventListener("DOMContentLoaded", function() {
    bootActiveGameConfig();
});
