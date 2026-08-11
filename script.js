// --- Section 1: Item Framework Database ---
const gameDatabase = {
    1: {
        title: "1. Blue Bin Sorter",
        desc: "Identify if residential items belong in the Blue Recycling Bin or General Trash.",
        tutorial: "Rule: Only clean paper, plastics, glass, and metals can enter the blue bin.",
        items: [
            { name: "Clean Milk Carton", icon: "fa-box", target: "Blue Bin", tip: "Recyclable when empty." },
            { name: "Oily Pizza Box Cover", icon: "fa-pizza-slice", target: "Trash Chute", tip: "Food grease ruins cycles." },
            { name: "Rinsed Shampoo Bottle", icon: "fa-bottle-droplet", target: "Blue Bin", tip: "Plastic containers are accepted clean." },
            { name: "Dirty Facial Tissue", icon: "fa-box-tissue", target: "Trash Chute", tip: "Tissue papers lack recyclable fibers." }
        ],
        targets: ["Blue Bin", "Trash Chute"]
    },
    2: {
        title: "2. Rinse & Dry Blitz",
        desc: "Determine if a package requires processing before disposal.",
        tutorial: "Rule: Packages holding residual food liquids must be washed out first.",
        items: [
            { name: "Soda Can with Leftover Drink", icon: "fa-wine-bottle", target: "Needs Rinsing", tip: "Liquid spills disrupt equipment." },
            { name: "Bone-Dry Milk Jug", icon: "fa-prescription-bottle", target: "Ready to Recycle", tip: "Dry items are completely safe." },
            { name: "Sticky Chili Sauce Bottle", icon: "fa-bottle-water", target: "Needs Rinsing", tip: "Residue degrades sorting filters." }
        ],
        targets: ["Ready to Recycle", "Needs Rinsing"]
    },
    3: {
        title: "3. Container Return Match",
        desc: "Route bottles to standard collection bins or automated machine receptors.",
        tutorial: "Rule: Aluminum beverage cans earn credit balances at retail reverse vending stations.",
        items: [
            { name: "Aluminum Soft Drink Can", icon: "fa-can-food", target: "RVM Machine", tip: "Earns 10c refund credit." },
            { name: "Glass Wine Bottle", icon: "fa-glass-water", target: "Blue Bin", tip: "Glass jars enter normal blue bin lines." }
        ],
        targets: ["RVM Machine", "Blue Bin"]
    },
    4: {
        title: "4. Contamination Strike",
        desc: "Flag hazardous waste that triggers logistics contamination risks.",
        tutorial: "Rule: Styrofoam and ceramic dining components are dangerous inside blue containers.",
        items: [
            { name: "Styrofoam Lunch Box", icon: "fa-cubes", target: "Contamination Risk", tip: "Polystyrene cannot be recovered here." },
            { name: "Cardboard Box (Flat)", icon: "fa-square", target: "Safe Recyclable", tip: "Clean flat cardboard is perfect." }
        ],
        targets: ["Safe Recyclable", "Contamination Risk"]
    },
    5: {
        title: "5. E-Waste Collector",
        desc: "Separate dead circuitry blocks from conventional structural packages safely.",
        tutorial: "Rule: Electrical systems use specialized recycling channels.",
        items: [
            { name: "AA Alkaline Battery", icon: "fa-battery-quarter", target: "E-Waste Kiosk", tip: "Leaches dangerous heavy elements." },
            { name: "Plain Paper Notebook", icon: "fa-book-open", target: "Blue Bin", tip: "Standard writing note stock is safe." }
        ],
        targets: ["E-Waste Kiosk", "Blue Bin"]
    }
};

let currentActiveGame = 1;
let currentMode = "tutorial";
let currentPlayerName = "";
let globalScore = 0;
let currentGameItemIndex = 0;
let playTimerInterval = null;
let playTimeRemaining = 30;
// --- Section 2: Browser Storage & Leaderboard Data Engine ---
// Pre-populate competitive arcade records
const mockLeaderboardData = [
    { name: "SG_RECYCLE_PRO", score: 850 },
    { name: "GREEN_RUNNER", score: 620 },
    { name: "ECO_WARRIOR", score: 540 },
    { name: "MATRIX_GREEN", score: 410 },
    { name: "CLEAN_STREAM", score: 320 },
    { name: "ZERO_WASTE", score: 180 }
];

function initLeaderboardSystem() {
    let savedScores = localStorage.getItem("arcade_leaderboard");
    if (!savedScores) {
        localStorage.setItem("arcade_leaderboard", JSON.stringify(mockLeaderboardData));
    }
    renderLeaderboardView();
}

function updateLeaderboardScore(finalScore) {
    if (!currentPlayerName) return;
    let records = JSON.parse(localStorage.getItem("arcade_leaderboard")) || [];
    
    let existingUser = records.find(function(r) { return r.name === currentPlayerName; });
    if (existingUser) {
        if (finalScore > existingUser.score) existingUser.score = finalScore;
    } else {
        records.push({ name: currentPlayerName, score: finalScore });
    }
    
    // Sort high to low, keep top 100 entries
    records.sort(function(a, b) { return b.score - a.score; });
    records = records.slice(0, 100);
    
    localStorage.setItem("arcade_leaderboard", JSON.stringify(records));
    renderLeaderboardView();
}

function renderLeaderboardView() {
    const box = document.getElementById("leaderboard-entries");
    box.innerHTML = "";
    let records = JSON.parse(localStorage.getItem("arcade_leaderboard")) || [];
    
    records.forEach(function(player, index) {
        const rank = index + 1;
        const row = document.createElement("div");
        
        // Highlight logic for top 3 positions
        let rankClass = "leaderboard-row";
        if (rank === 1) rankClass += " rank-1";
        else if (rank === 2) rankClass += " rank-2";
        else if (rank === 3) rankClass += " rank-3";
        
        row.className = rankClass;
        row.innerHTML = '<span class="leaderboard-rank">#' + rank + '</span>' +
                        '<span class="leaderboard-name">' + player.name + '</span>' +
                        '<span class="leaderboard-pts">' + player.score + ' pts</span>';
        box.appendChild(row);
    });
}
// --- Section 3: Interactive Display Panels & Gameplay Loop ---
const displayWindow = document.getElementById("interactive-display-window");
const actionRow = document.getElementById("action-targets-row");
const systemFeedback = document.getElementById("system-feedback");
const modeBadge = document.getElementById("mode-badge");

function checkUserIdentity() {
    let cachedName = localStorage.getItem("arcade_username");
    if (cachedName) {
        currentPlayerName = cachedName;
        document.getElementById("username-modal").classList.add("hidden");
        document.getElementById("player-welcome-tag").innerHTML = '<i class="fa-solid fa-user"></i> Player: <strong>' + currentPlayerName + '</strong>';
    }
}

document.getElementById("username-submit").addEventListener("click", function() {
    let nameVal = document.getElementById("username-input").value.trim().toUpperCase();
    if (nameVal.length < 2) {
        document.getElementById("modal-error").classList.remove("hidden");
        return;
    }
    localStorage.setItem("arcade_username", nameVal);
    currentPlayerName = nameVal;
    document.getElementById("username-modal").classList.add("hidden");
    document.getElementById("player-welcome-tag").innerHTML = '<i class="fa-solid fa-user"></i> Player: <strong>' + currentPlayerName + '</strong>';
    updateLeaderboardScore(globalScore);
});

document.getElementById("reset-player-data").addEventListener("click", function() {
    localStorage.removeItem("arcade_username");
    location.reload();
});

function bootActiveGameConfig() {
    const config = gameDatabase[currentActiveGame];
    clearInterval(playTimerInterval);
    document.getElementById("game-timer-wrapper").classList.add("hidden");
    document.getElementById("game-title").innerText = config.title;
    
    if (currentMode === "tutorial") {
        modeBadge.className = "badge-mode-tutorial";
        modeBadge.innerText = "Tutorial Active";
        document.getElementById("game-description").innerText = config.tutorial;
    } else {
        modeBadge.className = "badge-mode-play";
        modeBadge.innerText = "Play Mode Active - Speed Run!";
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

function processPlayerInput(selectedTarget) {
    const config = gameDatabase[currentActiveGame];
    const item = config.items[currentGameItemIndex];

    if (selectedTarget === item.target) {
        systemFeedback.style.color = "#34d399";
        systemFeedback.innerText = "★ Success! " + item.tip;
        globalScore += (currentMode === "play") ? 25 : 10;
        document.getElementById("global-points").innerText = globalScore;
        updateLeaderboardScore(globalScore);
    } else {
        systemFeedback.style.color = "#ef4444";
        systemFeedback.innerText = "⚠️ Correction needed: " + item.target;
    }

    setTimeout(function() {
        currentGameItemIndex = (currentGameItemIndex + 1) % config.items.length;
        if (currentMode === "play" && playTimeRemaining <= 0) endMatchCycle();
        else renderInteractionInterface();
    }, 1800);
}

function startCountdownTimer() {
    playTimeRemaining = 30;
    const element = document.getElementById("game-timer-wrapper");
    const countSpan = document.getElementById("game-countdown");
    element.classList.remove("hidden");
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
    displayWindow.innerHTML = '<div class="card-item"><i class="fa-solid fa-trophy text-warning"></i><span>Session Completed!</span></div>';
    systemFeedback.innerText = "Time limit reached! Your score has been pinned to the leaderboard table.";
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

document.querySelectorAll(".game-select-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".game-select-btn").forEach(function(b) { b.classList.remove("active"); });
        this.classList.add("active");
        currentActiveGame = parseInt(this.getAttribute("data-game"));
        bootActiveGameConfig();
    });
});

window.addEventListener("DOMContentLoaded", function() {
    checkUserIdentity();
    initLeaderboardSystem();
    bootActiveGameConfig();
});
