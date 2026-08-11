// --- Section 1: Game Engines & Expanded Item Database ---
const gameDatabase = {
    1: {
        title: "1. Blue Bin Sorter",
        desc: "Check everyday residential sorting items. Identify if they belong in the Blue Recycling Bin or the General Trash chute.",
        tutorial: "Tutorial Rule: Only clean paper, plastics, glass, and metals can enter the blue bin. Food wrappers or tissue papers contaminate the batch.",
        items: [
            { name: "Clean Milk Carton", icon: "fa-box", target: "Blue Bin", ok: true, tip: "Correct! Empty beverage boxes are recyclable." },
            { name: "Oily Pizza Box Cover", icon: "fa-pizza-slice", target: "Trash Chute", ok: false, tip: "Correct! Food stains cause whole-bin contamination." },
            { name: "Rinsed Shampoo Bottle", icon: "fa-bottle-droplet", target: "Blue Bin", ok: true, tip: "Correct! Plastic care bottles are acceptable when empty." },
            { name: "Dirty Facial Tissue", icon: "fa-box-tissue", target: "Trash Chute", ok: false, tip: "Correct! Used papers lose fiber density and belong in trash." },
            { name: "Rinsed Glass Jam Jar", icon: "fa-jar", target: "Blue Bin", ok: true, tip: "Correct! Glass containers are highly recyclable if empty." },
            { name: "Sticky Bubble Tea Cup", icon: "fa-mug-hot", target: "Trash Chute", ok: false, tip: "Correct! Residual sugar spoils the batch." },
            { name: "Clean Paper Envelope", icon: "fa-envelope", target: "Blue Bin", ok: true, tip: "Correct! Clean mail and envelopes go into the blue bin." },
            { name: "Food Leftovers / Waste", icon: "fa-apple-whole", target: "Trash Chute", ok: false, tip: "Correct! Organic waste goes to general incinerators." }
        ],
        targets: ["Blue Bin", "Trash Chute"]
    },
    2: {
        title: "2. Rinse & Dry Blitz",
        desc: "Determine if an item is ready to be recycled. Contaminated packages must be treated before disposal.",
        tutorial: "Tutorial Rule: Packages holding residual foods or liquids need to be washed before they can go into recycling loops.",
        items: [
            { name: "Soda Can with Leftover Drink", icon: "fa-wine-bottle", target: "Needs Rinsing", ok: false, tip: "Correct! Liquid spills disrupt paper recycling machinery." },
            { name: "Bone-Dry Milk Jug", icon: "fa-prescription-bottle", target: "Ready to Recycle", ok: true, tip: "Correct! Completely dry materials can securely enter bins." },
            { name: "Sticky Chili Sauce Bottle", icon: "fa-bottle-water", target: "Needs Rinsing", ok: false, tip: "Correct! Sugary residue damages processing filters." },
            { name: "Unwashed Tuna Tin Can", icon: "fa-sheet-plastic", target: "Needs Rinsing", ok: false, tip: "Correct! Fish oils contaminate other porous materials." },
            { name: "Drained Water Bottle", icon: "fa-bottle-water", target: "Ready to Recycle", ok: true, tip: "Correct! No residue means it is safe to sort." },
            { name: "Clean Dried Aluminum Foil", icon: "fa-scroll", target: "Ready to Recycle", ok: true, tip: "Correct! Clean metal foil can be compressed and recycled." }
        ],
        targets: ["Ready to Recycle", "Needs Rinsing"]
    },
    3: {
        title: "3. Container Return Match",
        desc: "Follow Singapore's 'Return Right' Extended Producer Responsibility policy guidelines. Match containers to their valid destination.",
        tutorial: "Tutorial Rule: Under the latest rules, metal cans and plastic bottles earn a 10-cent refund at Reverse Vending Machines (RVMs).",
        items: [
            { name: "Aluminum Soft Drink Can", icon: "fa-can-food", target: "RVM Machine", ok: true, tip: "Correct! Clean beverage cans earn 10c credit at RVM centers." },
            { name: "Glass Wine Bottle", icon: "fa-glass-water", target: "Blue Bin", ok: false, tip: "Correct! Glass is processed via the regular blue bin system, not RVMs." },
            { name: "Plastic Water Bottle", icon: "fa-bottle-water", target: "RVM Machine", ok: true, tip: "Correct! PET bottles are collected separately at retail reverse bins." },
            { name: "Plastic Detergent Pouch", icon: "fa-soap", target: "Blue Bin", ok: false, tip: "Correct! Refill packets are blue bin waste, not for vending devices." },
            { name: "Metallic Biscuit Tin Box", icon: "fa-box-archive", target: "Blue Bin", ok: false, tip: "Correct! Large household canisters belong in general blue bins." },
            { name: "Empty Sprite Bottle", icon: "fa-bottle-droplet", target: "RVM Machine", ok: true, tip: "Correct! Barcoded beverage items go right to reverse systems." }
        ],
        targets: ["RVM Machine", "Blue Bin"]
    },
    4: {
        title: "4. Contamination Strike",
        desc: "Spot hazardous and non-recyclable materials that break down machines or cause fires.",
        tutorial: "Tutorial Rule: Household objects like styrofoam boxes, light bulbs, or clay pots do not belong in the public commingled bin.",
        items: [
            { name: "Styrofoam Lunch Box", icon: "fa-cubes", target: "Contamination Risk", ok: true, tip: "Correct! Expanded polystyrene foam is not recyclable in blue bins." },
            { name: "Cardboard Box (Flat)", icon: "fa-square", target: "Safe Recyclable", ok: false, tip: "Correct! Flattened, dry cardboard is highly welcome." },
            { name: "Ceramic Coffee Mug", icon: "fa-mug-saucer", target: "Contamination Risk", ok: true, tip: "Correct! Ceramics possess different melting thresholds than glass jars." },
            { name: "Pyrex Glass Baking Dish", icon: "fa-plate-wheat", target: "Contamination Risk", ok: true, tip: "Correct! Heat-resistant glass ruins recycled container flows." },
            { name: "Clean Office Printing Paper", icon: "fa-file-lines", target: "Safe Recyclable", ok: true, tip: "Correct! Non-greasy office sheet stocks are perfect." },
            { name: "Broken Window Pane Glass", icon: "fa-heart-crack", target: "Contamination Risk", ok: true, tip: "Correct! Structural panel pieces injure logistics crew members." }
        ],
        targets: ["Safe Recyclable", "Contamination Risk"]
    },
    5: {
        title: "5. E-Waste Collector",
        desc: "Route dangerous electrical components and spent batteries safely to separate recovery systems.",
        tutorial: "Tutorial Rule: E-waste has dedicated collection kiosks across supermarkets and malls. Do not drop items down the trash chute.",
        items: [
            { name: "AA Alkaline Battery", icon: "fa-battery-quarter", target: "E-Waste Kiosk", ok: true, tip: "Correct! Leaking batteries leach toxic heavy chemicals." },
            { name: "Broken Charging Cable", icon: "fa-cable-car", target: "E-Waste Kiosk", ok: true, tip: "Correct! Copper wires are handled in specialized streams." },
            { name: "Plain Paper Notebook", icon: "fa-book-open", target: "Blue Bin", ok: false, tip: "Correct! Clean writing notebook sheets go to normal paper paths." },
            { name: "Dead Smart Phone", icon: "fa-mobile-screen", target: "E-Waste Kiosk", ok: true, tip: "Correct! Electronics contain rare earth metals that must be salvaged safely." },
            { name: "Burnt-Out LED Light Bulb", icon: "fa-lightbulb", target: "E-Waste Kiosk", ok: true, tip: "Correct! Gas and component assemblies need isolated collection pipelines." },
            { name: "Empty Cardboard Shoe Box", icon: "fa-gift", target: "Blue Bin", ok: false, tip: "Correct! Plain structural packaging is simple blue bin material." }
        ],
        targets: ["E-Waste Kiosk", "Blue Bin"]
    }
};

// Global Execution State Managers
let currentActiveGame = 1;
let currentMode = "tutorial";
let globalScore = 0;
let currentGameItemIndex = 0;
let playTimerInterval = null;
let playTimeRemaining = 30;
// --- Section 2: DOM Target Selection & Game Configurations ---
const displayWindow = document.getElementById("interactive-display-window");
const actionRow = document.getElementById("action-targets-row");
const systemFeedback = document.getElementById("system-feedback");
const modeBadge = document.getElementById("mode-badge");

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
    systemFeedback.innerText = "Evaluate the target item shown below...";

    const card = document.createElement("div");
    card.className = "card-item";
    card.innerHTML = '<i class="fa-solid ' + currentItem.icon + '"></i><span>' + currentItem.name + '</span>';
    displayWindow.appendChild(card);

    config.targets.forEach(function(targetName) {
        const btn = document.createElement("button");
        btn.className = "action-btn";
        btn.innerText = targetName;
        btn.addEventListener("click", function() {
            processPlayerInput(targetName);
        });
        actionRow.appendChild(btn);
    });
}
// --- Section 3: Input Processing, Game Loop Mechanics & Listeners ---
function processPlayerInput(selectedTarget) {
    const config = gameDatabase[currentActiveGame];
    const item = config.items[currentGameItemIndex];

    if (selectedTarget === item.target) {
        systemFeedback.style.color = "#34d399";
        systemFeedback.innerText = "★ Success! " + item.tip;
        
        globalScore += (currentMode === "play") ? 25 : 10;
        document.getElementById("global-points").innerText = globalScore;
    } else {
        systemFeedback.style.color = "#ef4444";
        systemFeedback.innerText = "⚠️ Correction needed. Correct option was: " + item.target;
    }

    setTimeout(function() {
        currentGameItemIndex = (currentGameItemIndex + 1) % config.items.length;
        if (currentMode === "play" && playTimeRemaining <= 0) {
            endMatchCycle();
        } else {
            renderInteractionInterface();
        }
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
    displayWindow.innerHTML = '<div class="card-item"><i class="fa-solid fa-trophy text-warning"></i><span>Game Session Completed!</span></div>';
    systemFeedback.style.color = "#ffffff";
    systemFeedback.innerText = "Time limit reached! Switch games above or shift modes to continue training.";
}

// Menu Controls Trigger Listeners
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
        document.querySelectorAll(".game-select-btn").forEach(function(b) {
            b.classList.remove("active");
        });
        this.classList.add("active");
        currentActiveGame = parseInt(this.getAttribute("data-game"));
        bootActiveGameConfig();
    });
});

// Initialization Launch
window.addEventListener("DOMContentLoaded", function() {
    bootActiveGameConfig();
});
