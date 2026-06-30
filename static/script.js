let risks = [];

const riskForm = document.getElementById("riskForm");

const titleInput = document.getElementById("titleInput");
const componentInput = document.getElementById("componentInput");
const releaseInput = document.getElementById("releaseInput");
const ownerInput = document.getElementById("ownerInput");
const riskTypeInput = document.getElementById("riskTypeInput");
const priorityInput = document.getElementById("priorityInput");
const mitigationInput = document.getElementById("mitigationInput");
const targetClosureDateInput = document.getElementById("targetClosureDateInput");
const qapImpactInput = document.getElementById("qapImpactInput");
const escalationRequiredInput = document.getElementById("escalationRequiredInput");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const qapImpactFilter = document.getElementById("qapImpactFilter");
const escalationFilter = document.getElementById("escalationFilter");

const riskList = document.getElementById("riskList");
const errorBox = document.getElementById("errorBox");

const totalRisks = document.getElementById("totalRisks");
const openRisks = document.getElementById("openRisks");
const highPriorityRisks = document.getElementById("highPriorityRisks");
const overdueRisks = document.getElementById("overdueRisks");
const qapImpactRisks = document.getElementById("qapImpactRisks");
const escalationRisks = document.getElementById("escalationRisks");

const editModal = document.getElementById("editModal");
const editRiskForm = document.getElementById("editRiskForm");
const closeEditModalButton = document.getElementById("closeEditModalButton");
const cancelEditButton = document.getElementById("cancelEditButton");

const editRiskId = document.getElementById("editRiskId");
const editTitleInput = document.getElementById("editTitleInput");
const editComponentInput = document.getElementById("editComponentInput");
const editReleaseInput = document.getElementById("editReleaseInput");
const editOwnerInput = document.getElementById("editOwnerInput");
const editRiskTypeInput = document.getElementById("editRiskTypeInput");
const editPriorityInput = document.getElementById("editPriorityInput");
const editTargetClosureDateInput = document.getElementById("editTargetClosureDateInput");
const editQapImpactInput = document.getElementById("editQapImpactInput");
const editEscalationRequiredInput = document.getElementById("editEscalationRequiredInput");
const editMitigationInput = document.getElementById("editMitigationInput");

async function fetchRisks() {
    try {
        hideError();

        const response = await fetch("/api/risks");

        if (!response.ok) {
            showError("Failed to load risks.");
            return;
        }

        risks = await response.json();

        renderRisks();
        updateStats();
    } catch (error) {
        showError("Unable to load risks. Please check Flask server.");
    }
}

async function addRisk(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const component = componentInput.value.trim();
    const releaseName = releaseInput.value.trim();
    const owner = ownerInput.value.trim();
    const riskType = riskTypeInput.value;
    const priority = priorityInput.value;
    const mitigation = mitigationInput.value.trim();
    const targetClosureDate = targetClosureDateInput.value;
    const qapImpact = qapImpactInput.value;
    const escalationRequired = escalationRequiredInput.value;

    if (!title) {
        showError("Please enter risk title.");
        return;
    }

    if (!component) {
        showError("Please enter component.");
        return;
    }

    if (!releaseName) {
        showError("Please enter release.");
        return;
    }

    if (!owner) {
        showError("Please enter owner.");
        return;
    }

    try {
        hideError();

        const response = await fetch("/api/risks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                component: component,
                release_name: releaseName,
                owner: owner,
                risk_type: riskType,
                priority: priority,
                mitigation: mitigation,
                target_closure_date: targetClosureDate,
                qap_impact: qapImpact,
                escalation_required: escalationRequired
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            showError(errorData.error || "Failed to add risk.");
            return;
        }

        titleInput.value = "";
        componentInput.value = "";
        releaseInput.value = "";
        ownerInput.value = "";
        riskTypeInput.value = "Scope Risk";
        priorityInput.value = "Medium";
        mitigationInput.value = "";
        targetClosureDateInput.value = "";
        qapImpactInput.value = "No";
        escalationRequiredInput.value = "No";

        fetchRisks();
    } catch (error) {
        showError("Failed to add risk.");
    }
}

function openEditModal(riskId) {
    const risk = risks.find(item => item.id === riskId);

    if (!risk) {
        showError("Risk not found for editing.");
        return;
    }

    editRiskId.value = risk.id;
    editTitleInput.value = risk.title;
    editComponentInput.value = risk.component;
    editReleaseInput.value = risk.release_name;
    editOwnerInput.value = risk.owner;
    editRiskTypeInput.value = risk.risk_type;
    editPriorityInput.value = risk.priority;
    editTargetClosureDateInput.value = risk.target_closure_date || "";
    editQapImpactInput.value = risk.qap_impact;
    editEscalationRequiredInput.value = risk.escalation_required;
    editMitigationInput.value = risk.mitigation || "";

    editModal.classList.remove("hidden");
}

function closeEditModal() {
    editModal.classList.add("hidden");
}

async function updateRisk(event) {
    event.preventDefault();

    const riskId = editRiskId.value;

    const title = editTitleInput.value.trim();
    const component = editComponentInput.value.trim();
    const releaseName = editReleaseInput.value.trim();
    const owner = editOwnerInput.value.trim();
    const riskType = editRiskTypeInput.value;
    const priority = editPriorityInput.value;
    const targetClosureDate = editTargetClosureDateInput.value;
    const qapImpact = editQapImpactInput.value;
    const escalationRequired = editEscalationRequiredInput.value;
    const mitigation = editMitigationInput.value.trim();

    if (!title) {
        showError("Please enter risk title.");
        return;
    }

    if (!component) {
        showError("Please enter component.");
        return;
    }

    if (!releaseName) {
        showError("Please enter release.");
        return;
    }

    if (!owner) {
        showError("Please enter owner.");
        return;
    }

    try {
        hideError();

        const response = await fetch(`/api/risks/${riskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                component: component,
                release_name: releaseName,
                owner: owner,
                risk_type: riskType,
                priority: priority,
                mitigation: mitigation,
                target_closure_date: targetClosureDate,
                qap_impact: qapImpact,
                escalation_required: escalationRequired
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            showError(errorData.error || "Failed to update risk.");
            return;
        }

        closeEditModal();
        fetchRisks();
    } catch (error) {
        showError("Failed to update risk.");
    }
}

async function toggleStatus(riskId) {
    try {
        hideError();

        const response = await fetch(`/api/risks/${riskId}/status`, {
            method: "PATCH"
        });

        if (!response.ok) {
            showError("Failed to update risk status.");
            return;
        }

        fetchRisks();
    } catch (error) {
        showError("Failed to update risk status.");
    }
}

async function deleteRisk(riskId) {
    const confirmDelete = confirm("Are you sure you want to delete this risk?");

    if (!confirmDelete) {
        return;
    }

    try {
        hideError();

        const response = await fetch(`/api/risks/${riskId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            showError("Failed to delete risk.");
            return;
        }

        fetchRisks();
    } catch (error) {
        showError("Failed to delete risk.");
    }
}

function isRiskOverdue(risk) {
    if (!risk.target_closure_date) {
        return false;
    }

    if (risk.status === "Closed") {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(risk.target_closure_date);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate < today;
}

function renderRisks() {
    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;
    const selectedQapImpact = qapImpactFilter.value;
    const selectedEscalation = escalationFilter.value;

    const filteredRisks = risks.filter(risk => {
        const searchableText = `
            ${risk.title}
            ${risk.component}
            ${risk.release_name}
            ${risk.owner}
            ${risk.risk_type}
            ${risk.priority}
            ${risk.status}
            ${risk.mitigation || ""}
            ${risk.target_closure_date || ""}
            ${risk.qap_impact}
            ${risk.escalation_required}
        `.toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesStatus =
            selectedStatus === "All" || risk.status === selectedStatus;

        const matchesPriority =
            selectedPriority === "All" || risk.priority === selectedPriority;

        const matchesQapImpact =
            selectedQapImpact === "All" || risk.qap_impact === selectedQapImpact;

        const matchesEscalation =
            selectedEscalation === "All" || risk.escalation_required === selectedEscalation;

        return matchesSearch &&
            matchesStatus &&
            matchesPriority &&
            matchesQapImpact &&
            matchesEscalation;
    });

    riskList.innerHTML = "";

    if (filteredRisks.length === 0) {
        riskList.innerHTML = `<div class="empty">No release risks found.</div>`;
        return;
    }

    filteredRisks.forEach(risk => {
        const riskElement = document.createElement("div");

        const overdue = isRiskOverdue(risk);
        riskElement.className = overdue ? "risk overdue" : "risk";

        const priorityClass = `priority-${risk.priority.toLowerCase()}`;
        const statusClass = `status-${risk.status.toLowerCase()}`;
        const qapClass = risk.qap_impact === "Yes" ? "flag-yes" : "flag-no";
        const escalationClass = risk.escalation_required === "Yes" ? "flag-yes" : "flag-no";
        const titleClass = risk.status === "Closed" ? "closed" : "";

        const mitigationText = risk.mitigation
            ? risk.mitigation
            : "No mitigation plan added.";

        const targetDateText = risk.target_closure_date
            ? risk.target_closure_date
            : "No target date";

        const overdueBadge = overdue
            ? `<span class="overdue-badge">Overdue</span>`
            : "";

        riskElement.innerHTML = `
            <div>
                <h3 class="${titleClass}">${risk.title}</h3>

                <div class="meta">
                    <span>${risk.release_name}</span>
                    <span>${risk.component}</span>
                    <span>Owner: ${risk.owner}</span>
                    <span>${risk.risk_type}</span>
                    <span class="${priorityClass}">${risk.priority}</span>
                    <span class="${statusClass}">${risk.status}</span>
                    <span class="date-badge">Target: ${targetDateText}</span>
                    ${overdueBadge}
                    <span class="${qapClass}">QAP Impact: ${risk.qap_impact}</span>
                    <span class="${escalationClass}">Escalation: ${risk.escalation_required}</span>
                </div>

                <div class="mitigation">
                    <strong>Mitigation:</strong> ${mitigationText}
                </div>
            </div>

            <div class="actions">
                <button class="edit" onclick="openEditModal(${risk.id})">
                    Edit
                </button>

                <button onclick="toggleStatus(${risk.id})">
                    Mark ${risk.status === "Open" ? "Closed" : "Open"}
                </button>

                <button class="delete" onclick="deleteRisk(${risk.id})">
                    Delete
                </button>
            </div>
        `;

        riskList.appendChild(riskElement);
    });
}

function updateStats() {
    totalRisks.textContent = risks.length;

    openRisks.textContent = risks.filter(risk =>
        risk.status === "Open"
    ).length;

    highPriorityRisks.textContent = risks.filter(risk =>
        risk.priority === "Blocker" || risk.priority === "Critical"
    ).length;

    overdueRisks.textContent = risks.filter(risk =>
        isRiskOverdue(risk)
    ).length;

    qapImpactRisks.textContent = risks.filter(risk =>
        risk.qap_impact === "Yes"
    ).length;

    escalationRisks.textContent = risks.filter(risk =>
        risk.escalation_required === "Yes"
    ).length;
}

function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

function hideError() {
    errorBox.textContent = "";
    errorBox.classList.add("hidden");
}

riskForm.addEventListener("submit", addRisk);
editRiskForm.addEventListener("submit", updateRisk);

closeEditModalButton.addEventListener("click", closeEditModal);
cancelEditButton.addEventListener("click", closeEditModal);

editModal.addEventListener("click", function(event) {
    if (event.target === editModal) {
        closeEditModal();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeEditModal();
    }
});

searchInput.addEventListener("input", renderRisks);
statusFilter.addEventListener("change", renderRisks);
priorityFilter.addEventListener("change", renderRisks);
qapImpactFilter.addEventListener("change", renderRisks);
escalationFilter.addEventListener("change", renderRisks);

fetchRisks();