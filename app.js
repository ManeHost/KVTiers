// ===== MCTiers Purple Edition =====

let currentMode = "overall";
let searchQuery = "";

// ----- Helpers -----
function getPoints(player) {
    let total = 0;
    for (const mode of GAMEMODES) {
        const tier = player.tiers[mode.id];
        if (tier && tier !== "none" && TIER_POINTS[tier]) {
            total += TIER_POINTS[tier];
        }
    }
    return total;
}

function getBestTier(player) {
    let bestIdx = TIER_ORDER.length;
    let best = null;
    for (const mode of GAMEMODES) {
        const t = player.tiers[mode.id];
        if (t) {
            const idx = TIER_ORDER.indexOf(t);
            if (idx !== -1 && idx < bestIdx) {
                bestIdx = idx;
                best = t;
            }
        }
    }
    return best;
}

function getSkinUrl(player) {
    // Uses mc-heads.net (public Minecraft skin service)
    if (player.uuid) {
        return `https://mc-heads.net/avatar/${player.uuid}/64`;
    }
    return `https://mc-heads.net/avatar/${encodeURIComponent(player.name)}/64`;
}

function getModeById(id) {
    return GAMEMODES.find(m => m.id === id);
}

// ----- Sorting & Filtering -----
function getSortedPlayers() {
    let list = [...PLAYERS];

    // Search
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    if (currentMode === "overall") {
        list.sort((a, b) => getPoints(b) - getPoints(a));
    } else {
        // Sort by tier in this mode (best first), then by points
        list = list.filter(p => p.tiers[currentMode] && p.tiers[currentMode] !== "none");
        list.sort((a, b) => {
            const ta = TIER_ORDER.indexOf(a.tiers[currentMode] || "LT5");
            const tb = TIER_ORDER.indexOf(b.tiers[currentMode] || "LT5");
            if (ta !== tb) return ta - tb;
            return getPoints(b) - getPoints(a);
        });
    }

    return list;
}

// ----- Render Tabs -----
function renderTabs() {
    const container = document.getElementById("gamemodeTabs");
    // Keep Overall button, add the rest
    const overallBtn = container.querySelector('[data-mode="overall"]');
    container.innerHTML = "";
    container.appendChild(overallBtn);

    GAMEMODES.forEach(mode => {
        const btn = document.createElement("button");
        btn.className = "tab" + (currentMode === mode.id ? " active" : "");
        btn.dataset.mode = mode.id;
        btn.innerHTML = `<span class="tab-icon">${mode.icon}</span> ${mode.name}`;
        btn.addEventListener("click", () => switchMode(mode.id));
        container.appendChild(btn);
    });

    overallBtn.classList.toggle("active", currentMode === "overall");
    overallBtn.onclick = () => switchMode("overall");
}

// ----- Render Table -----
function renderTable() {
    const tbody = document.getElementById("rankingsBody");
    const players = getSortedPlayers();
    const title = document.getElementById("pageTitle");
    const countEl = document.getElementById("playerCount");

    countEl.textContent = players.length;

    if (currentMode === "overall") {
        title.textContent = "Overall Rankings";
        document.getElementById("tiersHeader").textContent = "Tiers";
    } else {
        const mode = getModeById(currentMode);
        title.textContent = `${mode.icon} ${mode.name} Rankings`;
        document.getElementById("tiersHeader").textContent = "Tier";
    }

    if (players.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="empty-state">
                        <div class="icon">🔍</div>
                        <div>No players found</div>
                    </div>
                </td>
            </tr>`;
        return;
    }

    tbody.innerHTML = players.map((player, index) => {
        const rank = index + 1;
        const points = getPoints(player);
        let tiersHtml = "";

        if (currentMode === "overall") {
            // Show top few tiers (best ones)
            const entries = Object.entries(player.tiers)
                .map(([id, tier]) => ({ id, tier, order: TIER_ORDER.indexOf(tier) }))
                .filter(e => e.order !== -1)
                .sort((a, b) => a.order - b.order)
                .slice(0, 8); // show max 8 badges

            tiersHtml = `<div class="tiers-list">
                ${entries.map(e => {
                    const mode = getModeById(e.id);
                    return `<span class="tier-badge tier-${e.tier}" title="${mode.name}: ${e.tier}">
                        <span class="mode-icon">${mode.icon}</span>
                        <span class="tier-label">${e.tier}</span>
                    </span>`;
                }).join("")}
                ${Object.keys(player.tiers).length > 8 ? `<span class="tier-badge">+${Object.keys(player.tiers).length - 8}</span>` : ""}
            </div>`;
        } else {
            const tier = player.tiers[currentMode];
            tiersHtml = `<span class="tier-badge single-tier tier-${tier}">${tier}</span>`;
        }

        return `
            <tr data-name="${player.name}">
                <td class="col-rank">${rank}</td>
                <td class="col-player">
                    <div class="player-cell">
                        <img class="player-avatar" src="${getSkinUrl(player)}" alt="${player.name}" loading="lazy"
                             onerror="this.src='https://mc-heads.net/avatar/MHF_Steve/64'">
                        <span class="player-name">${player.name}</span>
                    </div>
                </td>
                <td class="col-region">
                    <span class="region-badge">${player.region || "—"}</span>
                </td>
                <td class="col-tiers">${tiersHtml}</td>
            </tr>`;
    }).join("");

    // Click handlers for rows
    tbody.querySelectorAll("tr[data-name]").forEach(row => {
        row.addEventListener("click", () => {
            const name = row.dataset.name;
            const player = PLAYERS.find(p => p.name === name);
            if (player) openModal(player);
        });
    });
}

// ----- Modal -----
function openModal(player) {
    const modal = document.getElementById("playerModal");
    document.getElementById("modalAvatar").src = getSkinUrl(player);
    document.getElementById("modalName").textContent = player.name;
    document.getElementById("modalRegion").textContent = player.region || "Unknown";
    document.getElementById("modalPoints").textContent = `${getPoints(player)} points`;

    const tiersContainer = document.getElementById("modalTiers");
    tiersContainer.innerHTML = GAMEMODES.map(mode => {
        const tier = player.tiers[mode.id];
        if (!tier || tier === "none") {
            return `
                <div class="modal-tier-item" style="opacity:0.4">
                    <span class="mode-icon-lg">${mode.icon}</span>
                    <span class="mode-name">${mode.name}</span>
                    <span class="tier-value" style="color:var(--text-dim)">—</span>
                </div>`;
        }
        return `
            <div class="modal-tier-item">
                <span class="mode-icon-lg">${mode.icon}</span>
                <span class="mode-name">${mode.name}</span>
                <span class="tier-value tier-${tier}" style="color:inherit">${tier}</span>
            </div>`;
    }).join("");

    modal.classList.add("open");
}

function closeModal() {
    document.getElementById("playerModal").classList.remove("open");
}

// ----- Mode switch -----
function switchMode(mode) {
    currentMode = mode;
    renderTabs();
    renderTable();
}

// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
    renderTabs();
    renderTable();

    // Search
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderTable();
    });

    // Modal close
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("playerModal").addEventListener("click", (e) => {
        if (e.target.id === "playerModal") closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // Copy server IP
    document.getElementById("serverIp").parentElement.addEventListener("click", () => {
        const ip = document.getElementById("serverIp").textContent;
        navigator.clipboard.writeText(ip).then(() => {
            const el = document.getElementById("serverIp");
            const old = el.textContent;
            el.textContent = "Copied!";
            setTimeout(() => el.textContent = old, 1200);
        });
    });
});
