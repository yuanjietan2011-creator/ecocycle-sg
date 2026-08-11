// --- Section 1: Data Pool and Initialization ---
const gameItems = [
    { name: "Clean Plastic Bottle", type: "recycle", icon: "fa-bottle-water", feedback: "Perfect! Clean plastics can be recycled." },
    { name: "Greasy Pizza Box", type: "trash", icon: "fa-box-open", feedback: "Correct! Food oil spoils paper batches." },
    { name: "Rinsed Soda Can", type: "recycle", icon: "fa-can-food", feedback: "Awesome! Metals are highly recyclable when clean." },
    { name: "Used Tissue Paper", type: "trash", icon: "fa-box-tissue", feedback: "Right! Tissues cannot be recycled due to fiber degradation." },
    { name: "Unwashed Coffee Cup", type: "trash", icon: "fa-cup-togo", feedback: "Correct! Liquid residues contaminate the blue bin." }
];

let userPoints = 0;
let totalCorrectRecycled = 0;
let currentGameScore = 0;
let currentItemIndex = 0;

function updatePointsUI() {
    document.getElementById('nav-points').innerText = userPoints;
    document.getElementById('stat-total-points').innerText = userPoints;
    document.getElementById('stat-total-recycled').innerText = totalCorrectRecycled;
}

window.addEventListener('DOMContentLoaded', function() {
    loadNextGameItem();
});
// --- Section 2: Sorting Logic Loop ---
function loadNextGameItem() {
    currentItemIndex = Math.floor(Math.random() * gameItems.length);
    const item = gameItems[currentItemIndex];
    const displayElement = document.getElementById('active-item');
    
    // Using standard concatenation to avoid template literal conflicts
    displayElement.innerHTML = '<i class="fa-solid ' + item.icon + '"></i><span id="item-name">' + item.name + '</span>';
}

document.querySelectorAll('.bin').forEach(function(binElement) {
    binElement.addEventListener('click', function() {
        const selectedBin = this.getAttribute('data-bin');
        const correctTarget = gameItems[currentItemIndex].type;
        const feedbackDiv = document.getElementById('game-feedback');

        if (selectedBin === correctTarget) {
            currentGameScore += 10;
            userPoints += 15;
            if (correctTarget === 'recycle') totalCorrectRecycled++;
            
            feedbackDiv.style.color = 'var(--success)';
            feedbackDiv.innerText = gameItems[currentItemIndex].feedback;
        } else {
            feedbackDiv.style.color = 'var(--danger)';
            feedbackDiv.innerText = "Oops! Contamination issue. Remember to separate dirty items.";
        }

        document.getElementById('game-score').innerText = currentGameScore;
        updatePointsUI();
        
        setTimeout(function() {
            feedbackDiv.innerText = "";
            loadNextGameItem();
        }, 1500);
    });
});
// --- Section 3: Household Log Tracker & Forum Events ---
document.getElementById('tracker-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const materialSelect = document.getElementById('item-select');
    const materialName = materialSelect.options[materialSelect.selectedIndex].text;
    const isClean = document.querySelector('input[name="item-clean"]:checked').value === 'yes';
    const logList = document.getElementById('log-list');
    
    const emptyPlaceholder = logList.querySelector('.empty-log');
    if (emptyPlaceholder) emptyPlaceholder.remove();

    const li = document.createElement('li');
    if (isClean) {
        userPoints += 20;
        totalCorrectRecycled++;
        li.innerHTML = '<span><i class="fa-solid fa-circle-check text-primary"></i> ' + materialName + '</span> <span class="badge" style="background:#dcfce7; color:var(--success)">+20 pts</span>';
    } else {
        li.innerHTML = '<span><i class="fa-solid fa-circle-xmark text-danger"></i> ' + materialName + ' (Contaminated)</span> <span class="badge" style="background:#fee2e2; color:var(--danger)">0 pts</span>';
    }
    
    logList.insertBefore(li, logList.firstChild);
    updatePointsUI();
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-like')) {
        const countSpan = e.target.closest('.btn-like').querySelector('.count');
        countSpan.innerText = parseInt(countSpan.innerText) + 1;
    }
    if (e.target.closest('.btn-rsvp')) {
        const countSpan = e.target.closest('.btn-rsvp').querySelector('.count');
        countSpan.innerText = parseInt(countSpan.innerText) + 1;
        userPoints += 50;
        updatePointsUI();
        alert("Registered! You earned 50 eco-points.");
    }
});

document.getElementById('btn-create-post').addEventListener('click', function() {
    const postTitle = prompt("Enter event title:");
    const postDescription = prompt("Enter event details:");
    if (!postTitle || !postDescription) return;

    const postsContainer = document.getElementById('posts-container');
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.innerHTML = '<div class="post-meta"><span class="post-author"><i class="fa-solid fa-circle-user"></i> Resident_Champion</span><span class="post-tag tag-cleanup">Community Action</span></div><h4>' + postTitle + '</h4><p>' + postDescription + '</p><div class="post-actions"><button class="btn-like"><i class="fa-regular fa-thumbs-up"></i> <span class="count">1</span></button><button class="btn-rsvp"><i class="fa-regular fa-calendar-check"></i> RSVP (<span class="count">1</span>)</button></div>';
    
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
});
