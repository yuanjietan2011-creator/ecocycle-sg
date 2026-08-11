// --- Section 1: Data Pool & First Two Expanded Game Engines ---
const gameDatabase = {
    1: {
        title: "01. BLUE BIN PIPELINE",
        desc: "Scan the domestic target item. Determine if it belongs inside the Blue Commingled Recycler or General Disposal Chutes.",
        tutorial: "Tutorial Rule: Only clean paper, plastics, glass, and metals can enter the blue bin. Food wrappers or tissue papers contaminate the batch.",
        items: [
            { name: "Clean Milk Carton", icon: "fa-box", target: "BLUE BIN", tip: "Pure clean paper composites accepted." },
            { name: "Oily Pizza Box Cover", icon: "fa-pizza-slice", target: "TRASH CHUTE", tip: "Organic grease cancels recyclability." },
            { name: "Rinsed Shampoo Bottle", icon: "fa-bottle-droplet", target: "BLUE BIN", tip: "High-density polymers are fully recyclable." },
            { name: "Dirty Facial Tissue", icon: "fa-box-tissue", target: "TRASH CHUTE", tip: "Degraded hygiene fibers disrupt batch filtering." },
            { name: "Clean Paper Envelope", icon: "fa-envelope", target: "BLUE BIN", tip: "Paper mail without plastic windows is accepted." },
            { name: "Greasy Char Kway Teow Box", icon: "fa-box-open", target: "TRASH CHUTE", tip: "Heavy oil and gravy soak into paper, ruining it." },
            { name: "Empty Metal Biscuit Tin", icon: "fa-square-poll-horizontal", target: "BLUE BIN", tip: "Tin containers can be infinitely recycled safely." },
            { name: "Used Paper Cupcake Liner", icon: "fa-cookie", target: "TRASH CHUTE", tip: "Baked-on grease makes it general waste." },
            { name: "Rinsed Glass Jam Jar", icon: "fa-jar", target: "BLUE BIN", tip: "Glass jars are safe once sugary paste is rinsed." },
            { name: "Plastic Snack Potato Chip Bag", icon: "fa-sheet-plastic", target: "TRASH CHUTE", tip: "Aluminized plastic linings are non-recyclable multi-layers." },
            { name: "Flattened Shipping Cardboard", icon: "fa-boxes-packing", target: "BLUE BIN", tip: "Always break down boxes to save bin space." },
            { name: "Sticky Bubble Tea Cup", icon: "fa-mug-hot", target: "TRASH CHUTE", tip: "Sugar liquid residue spoils paper batches inside bins." },
            { name: "Disposable Wooden Chopsticks", icon: "fa-lines-leaning", target: "TRASH CHUTE", tip: "Contaminated wood fibers belong in the general incinerator." },
            { name: "Empty Plastic Egg Carton", icon: "fa-egg", target: "BLUE BIN", tip: "Clean structural clear plastic packaging is highly recyclable." },
            { name: "Stained Food Wrapper Foil", icon: "fa-sheet-plastic", target: "TRASH CHUTE", tip: "Foil covered in grease or sauce cannot be processed safely." }
        ],
        targets: ["BLUE BIN", "TRASH CHUTE"]
    },
    2: {
        title: "02. RINSE & DRY BLITZ",
        desc: "Evaluate fluid volume contents. Packages containing residue must undergo clearing cycles.",
        tutorial: "Tutorial Rule: Packages holding residual foods or liquids need to be washed before they can go into recycling loops.",
        items: [
            { name: "Soda Can with Leftover Drink", icon: "fa-wine-bottle", target: "NEEDS RINSE", tip: "Liquid content spills damage paper mills downstream." },
            { name: "Bone-Dry Milk Jug", icon: "fa-prescription-bottle", target: "READY TO SORT", tip: "Dry, unsoiled hulls process cleanly." },
            { name: "Sticky Chili Sauce Bottle", icon: "fa-bottle-water", target: "NEEDS RINSE", tip: "Thick food sauces leave residue filters struggle to remove." },
            { name: "Unwashed Tuna Tin Can", icon: "fa-fish", target: "NEEDS RINSE", tip: "Pungent fish oils and scraps create odor and pest issues." },
            { name: "Drained Plastic Water Bottle", icon: "fa-faucet-drip", target: "READY TO SORT", tip: "Completely empty and shaken out, ready for sorting." },
            { name: "Clean Dried Aluminum Foil", icon: "fa-scroll", target: "READY TO SORT", tip: "Clean foil can be compressed into balls and recycled." },
            { name: "Honey Jar with Sweet Residue", icon: "fa-bowl-food", target: "NEEDS RINSE", tip: "Sticky honey attracts pests to the commingled blue bins." },
            { name: "Washed & Shaken Plastic Tray", icon: "fa-table-cells", target: "READY TO SORT", tip: "Rinsed clean of microwave meal stains." },
            { name: "Milo Packet with Leftover Drink", icon: "fa-box-tissue", target: "NEEDS RINSE", tip: "Milk residue turns sour and contaminates surrounding paper waste." },
            { name: "Bone-Dry Clear Glass Bottle", icon: "fa-glass-water", target: "READY TO SORT", tip: "Completely empty and ready to be loaded into glass processing." },
            { name: "Greasy Peanut Butter Jar", icon: "fa-jar-wheat", target: "NEEDS RINSE", tip: "Thick oil coatings prevent materials from washing down evenly." },
            { name: "Rinsed Detergent Dispenser", icon: "fa-soap", target: "READY TO SORT", tip: "Washed clean of active soap foam, perfectly safe for plastics." },
            { name: "Unwashed Condensed Milk Tin", icon: "fa-can-food", target: "NEEDS RINSE", tip: "Sticky sugar layers coat adjacent materials inside collection vehicles." },
            { name: "Bone-Dry Cardboard Pizza Box", icon: "fa-pizza-slice", target: "READY TO SORT", tip: "Unsoiled paper boxes can pass right into sorting channels." },
            { name: "Sticky Yogurt Container", icon: "fa-ice-cream", target: "NEEDS RINSE", tip: "Dairy paste must be rinsed away before placing in the bin." }
        ],
        targets: ["READY TO SORT", "NEEDS RINSE"]
    }
};

let currentActiveGame = 1;
let currentMode = "tutorial";
let globalScore = 0;
let consecutiveStreak = 0;
let currentExperienceXP = 0;
let currentLevelRank = 1;
let randomizedItemQueue = [];
let currentGameItemIndex = 0;
let playTimerInterval = null;
let playTimeRemaining = 30;
// --- Section 2: Appending Remaining Games With 15 Items Each ---
Object.assign(gameDatabase, {
    3: {
        title: "03. EPR CONTAINER RETURN",
        desc: "Identify items managed by Extended Producer Responsibility policies for barcode-deposit automated return systems.",
        tutorial: "Tutorial Rule: Under the latest rules, metal cans and plastic bottles earn a 10-cent refund at Reverse Vending Machines (RVMs).",
        items: [
            { name: "Aluminum Soft Drink Can", icon: "fa-can-food", target: "RVM CENTER", tip: "Barcoded aluminum qualifies for financial credit." },
            { name: "Glass Wine Bottle", icon: "fa-glass-water", target: "BLUE BIN", tip: "Glass jars enter traditional commingled routes." },
            { name: "PET Plastic Water Bottle", icon: "fa-bottle-water", target: "RVM CENTER", tip: "Clear beverage bottles with clear labels earn refunds." },
            { name: "Large Plastic Laundry Detergent Jug", icon: "fa-soap", target: "BLUE BIN", tip: "Household cleaning product jugs go to standard blue bins." },
            { name: "Chilled Green Tea Can", icon: "fa-beer-mug-empty", target: "RVM CENTER", tip: "All standard barcoded beverage metal cans go straight to RVMs." },
            { name: "Plastic Food Takeaway Container", icon: "fa-utensils", target: "BLUE BIN", tip: "Takeaway containers go into blue bins, not refund machines." },
            { name: "Plastic Cooking Oil Bottle", icon: "fa-oil-can", target: "BLUE BIN", tip: "Condiment and oil vessels go to normal plastic processes." },
            { name: "Empty Barcoded Soda Bottle", icon: "fa-wine-glass", target: "RVM CENTER", tip: "Returns to designated commercial reverse vending hardware panels." },
            { name: "Empty Plastic Cosmetic Bottle", icon: "fa-pump-soap", target: "BLUE BIN", tip: "Personal care plastic bottles belong in the blue bin stream." },
            { name: "Aluminum Beer Can", icon: "fa-square-poll-horizontal", target: "RVM CENTER", tip: "Metal alcoholic beverage cans are covered under deposit laws." },
            { name: "Glass Soy Sauce Bottle", icon: "fa-jar", target: "BLUE BIN", tip: "Condiment glass belongs in blue commingled recycling frameworks." },
            { name: "PET Plastic Juice Bottle", icon: "fa-bottle-droplet", target: "RVM CENTER", tip: "Juice bottles carry eligible return tags for reverse vending." },
            { name: "Paper Beverage Carton", icon: "fa-box", target: "BLUE BIN", tip: "Cartons are paper-based and go to the regular blue recycling bins." },
            { name: "Aluminum Sparkling Water Can", icon: "fa-faucet-drip", target: "RVM CENTER", tip: "Sparkling water cans pass the metal verification scans cleanly." },
            { name: "Glass Jam Jar Vessel", icon: "fa-prescription-bottle", target: "BLUE BIN", tip: "Regular container glass does not receive commercial RVM credits." }
        ],
        targets: ["RVM CENTER", "BLUE BIN"]
    },
    4: {
        title: "04. HAZARD REJECTION MODE",
        desc: "Isolate non-standard residential composites that compromise physical machinery networks.",
        tutorial: "Tutorial Rule: Household objects like styrofoam boxes, light bulbs, or clay pots do not belong in the public commingled bin.",
        items: [
            { name: "Styrofoam Lunch Box", icon: "fa-cubes", target: "HAZARD RISK", tip: "Expanded polystyrene foam breaks up and contaminates cycles." },
            { name: "Cardboard Box (Flat)", icon: "fa-square", target: "SAFE METRIC", tip: "Flattened cardboard passes structural test codes cleanly." },
            { name: "Ceramic Coffee Mug", icon: "fa-mug-saucer", target: "HAZARD RISK", tip: "Ceramics ruin regular container glass mixtures during melting." },
            { name: "Pyrex Glass Glassware", icon: "fa-fire-burner", target: "HAZARD RISK", tip: "Heat-resistant glass cannot be processed with conventional bottles." },
            { name: "Magazine or Glossy Catalog", icon: "fa-book-open-reader", target: "SAFE METRIC", tip: "High-grade printing sheets process beautifully into paper pulp." },
            { name: "Mirror Fragments", icon: "fa-border-all", target: "HAZARD RISK", tip: "Coated silver backings introduce severe factory impurities." },
            { name: "Plastic Bubble Wrap Sheet", icon: "fa-border-top-left", target: "HAZARD RISK", tip: "Soft plastic wrap sheets jam and wrap around sorting machinery wheels." },
            { name: "Metal Cooking Pot", icon: "fa-kitchen-set", target: "SAFE METRIC", tip: "Pure metal scrap items pass industrial sorting magnetic belts cleanly." },
            { name: "Clay Flower Pot", icon: "fa-seedling", target: "HAZARD RISK", tip: "Earthenware composites shatter and contaminate blue bins as dust residue." },
            { name: "Broken Drinking Glass", icon: "fa-wine-glass-crack", target: "HAZARD RISK", tip: "Lead crystal glass ruins the chemistry of packaging glass loops." },
            { name: "Clean Office Printing Paper", icon: "fa-file-lines", target: "SAFE METRIC", tip: "Dry documents are premium components for high-quality paper recycling." },
            { name: "Rubber Garden Hose", icon: "fa-circle-dot", target: "HAZARD RISK", tip: "Long elastic tubes wrap around rotating sorting drums and freeze gears." },
            { name: "Metal Window Frame Segment", icon: "fa-window-maximize", target: "SAFE METRIC", tip: "Scrap aluminum construction frameworks melt down safely." },
            { name: "Soiled Diaper Waste Pack", icon: "fa-baby", target: "HAZARD RISK", tip: "Bio-hazardous personal waste heavily contaminates sorting lines." },
            { name: "Aluminum Foil Pie Tray", icon: "fa-sheet-plastic", target: "SAFE METRIC", tip: "Clean baking metal dishes melt cleanly along scrap pipelines." }
        ],
        targets: ["SAFE METRIC", "HAZARD RISK"]
    },
    5: {
        title: "05. E-WASTE HARVEST",
        desc: "Route dangerous electrical components and spent batteries safely to separate recovery systems.",
        tutorial: "Tutorial Rule: E-waste has dedicated collection kiosks across supermarkets and malls. Do not drop items down the trash chute.",
        items: [
            { name: "AA Alkaline Battery", icon: "fa-battery-quarter", target: "TECH KIOSK", tip: "Spent cells release chemical elements if crushed in standard trucks." },
            { name: "Plain Paper Notebook", icon: "fa-book-open", target: "BLUE BIN", tip: "Organic writing fibers deploy down normal paper tracks." },
            { name: "Dead Smart Phone", icon: "fa-mobile-screen", target: "TECH KIOSK", tip: "Lithium-ion cells present major compression explosion hazards." },
            { name: "Burnt-out LED Bulb", icon: "fa-lightbulb", target: "TECH KIOSK", tip: "Internal diode circuitry requires specialized electronic recycling." },
            { name: "Broken Charging Cable", icon: "fa-cable-car", target: "TECH KIOSK", tip: "Copper wiring requires specialized extraction machine processors." },
            { name: "Corrugated Shoe Packing Box", icon: "fa-gift", target: "BLUE BIN", tip: "Basic dry shipping frames drop cleanly into paper processing loops." },
            { name: "Old Computer Mouse", icon: "fa-computer-mouse", target: "TECH KIOSK", tip: "Peripherals match supermarket and commercial electronics collection slots." },
            { name: "Old Desk Calculator", icon: "fa-calculator", target: "TECH KIOSK", tip: "Logic display microchips must be processed in targeted electronics streams." },
            { name: "Old Wired Keyboard", icon: "fa-keyboard", target: "TECH KIOSK", tip: "Plastic panels with inner silver contacts are sorted as ICT hardware." },
            { name: "Flattened Newspaper Stacks", icon: "fa-newspaper", target: "BLUE BIN", tip: "Standard print stock is a high-demand raw component for paper sorting." },
            { name: "Lithium Powerbank Block", icon: "fa-car-battery", target: "TECH KIOSK", tip: "High-density energy boxes belong in specialized battery collection bins." },
            { name: "Clean Cardboard Cereal Box", icon: "fa-bowl-rice", target: "BLUE BIN", tip: "Basic non-greasy food retail packaging breaks down into pulp cleanly." },
            { name: "Dead Wi-Fi Router Box", icon: "fa-wifi", target: "TECH KIOSK", tip: "Modems and consumer networking systems match general ICT drop slots." },
            { name: "Old Stereo Headphones", icon: "fa-headphones", target: "TECH KIOSK", tip: "Audio internal speaker coils require extraction via electronic loops." },
            { name: "Empty Paper Delivery Envelope", icon: "fa-envelope-open", target: "BLUE BIN", tip: "Unsoiled logistic mail sleeves process easily along paper paths." }
        ],
        targets: ["TECH KIOSK", "BLUE BIN"]
    }
});
// --- Section 3: Interface Navigation Layers & Shuffling Controllers ---
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

const displayWindow = document.getElementById("interactive-display-window");
const actionRow = document.getElementById("action-targets-row");
const systemFeedback = document.getElementById("system-feedback");
const modeBadge = document.getElementById("mode-badge");
const crtScreen = document.getElementById("main-crt-screen");

// Fisher-Yates Randomizer to guarantee fully shuffled queues [1]
function buildRandomizedQueue(itemsArray) {
    let arrayClone = [...itemsArray];
    for (let i = arrayClone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = arrayClone[i];
        arrayClone[i] = arrayClone[j];
        arrayClone[j] = temp;
    }
    return arrayClone;
}

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
    randomizedItemQueue = buildRandomizedQueue(config.items);
    currentGameItemIndex = 0;
    renderInteractionInterface();
}
// --- Section 4: Input Process Loops, Scoring Systems, & Core Boots ---
function renderInteractionInterface() {
    const config = gameDatabase[currentActiveGame];
    const currentItem = randomizedItemQueue[currentGameItemIndex];
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

function spawnFloatingTextPopup(textValue) {
    const layer = document.getElementById("floating-score-layer");
    const label = document.createElement("div");
    label.className = "floating-bonus-text";
    label.innerText = textValue;
    label.style.left = (Math.random() * 40 + 30) + "%";
    layer.appendChild(label);
    setTimeout(() => { label.remove(); }, 800);
}

function processPlayerInput(selectedTarget) {
    const config = gameDatabase[currentActiveGame];
    const item = randomizedItemQueue[currentGameItemIndex];

    if (selectedTarget === item.target) {
        consecutiveStreak++;
        let currentMultiplier = Math.min(Math.floor(consecutiveStreak / 3) + 1, 4);
        let pointBase = (currentMode === "play") ? 25 : 10;
        let finalAward = pointBase * currentMultiplier;
        
        globalScore += finalAward;
        currentExperienceXP += 15;
        
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
        
        crtScreen.classList.add("screen-rumble-shake");
        setTimeout(() => { crtScreen.classList.remove("screen-rumble-shake"); }, 300);
    }

    setTimeout(function() {
        currentGameItemIndex = (currentGameItemIndex + 1) % randomizedItemQueue.length;
        if (currentGameItemIndex === 0) {
            randomizedItemQueue = buildRandomizedQueue(config.items);
        }
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
