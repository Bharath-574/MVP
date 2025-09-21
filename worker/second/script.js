// SAMPLE WORKERS
let monitoredWorkers = [
    { name: "Ravi Kumar", ward: "Ward 12", status: "Active", fines: [] },
    { name: "Anita Sharma", ward: "Ward 7", status: "Leave", fines: [] },
    { name: "Sunil Singh", ward: "Ward 3", status: "Offline", fines: [] },
    { name: "Meena Patel", ward: "Ward 5", status: "Active", fines: [] },
    { name: "Arjun Verma", ward: "Ward 9", status: "Active", fines: [] }
];

// GARBAGE RECORDS
let garbageRecords = [
    { worker: "Ravi Kumar", expectedWeight: 50, priority: "High" },
    { worker: "Anita Sharma", expectedWeight: 30, priority: "Medium" },
    { worker: "Sunil Singh", expectedWeight: 40, priority: "Low" }
];

// OUTGOING WASTE
let outgoingWaste = [
    { industry: "Green Energy Plant", weight: 20, purpose: "Waste to Energy", date: "2025-09-12" },
    { industry: "Compost Yard", weight: 15, purpose: "Decomposition", date: "2025-09-12" },
    { industry: "Plastic Recycler", weight: 10, purpose: "Recycling", date: "2025-09-12" }
];

// SECTION SWITCHER
function showSection(id) {
    document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden-section"));
    document.getElementById(id).classList.remove("hidden-section");

    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active-tab"));
    document.getElementById("tab-" + id).classList.add("active-tab");
}

// RENDER WORKERS
function renderMonitoredWorkers() {
    const container = document.getElementById("monitoredWorkersList");
    container.innerHTML = "";

    monitoredWorkers.forEach((worker, index) => {
    const finesHtml = worker.fines.length
        ? `<div class="mt-2 bg-red-50 p-2 rounded">
            <strong>Fines:</strong>
            <ul class="list-disc ml-5 text-sm">
            ${worker.fines.map(f => `<li>₹${f.amount} - ${f.reason}</li>`).join("")}
            </ul>
        </div>`
        : "";

    const card = document.createElement("div");
    card.className = "flex bg-white shadow p-4 rounded-lg mb-4";

    card.innerHTML = `
        <!-- Worker Info -->
        <div class="flex-1">
        <h3 class="text-lg font-semibold">${worker.name}</h3>
        <p><strong>Ward:</strong> ${worker.ward}</p>
        <p><strong>Status:</strong> ${worker.status}</p>
        
        <form onsubmit="addWorkerFine(event, ${index})" class="mt-3 space-y-2">
            <input type="number" id="fineAmount-${index}" placeholder="Fine Amount (₹)" class="border p-1 rounded w-full" required>
            <input type="text" id="fineReason-${index}" placeholder="Reason" class="border p-1 rounded w-full" required>
            <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded">Add Fine</button>
        </form>
        
        ${finesHtml}
        </div>

        <!-- GPS Placeholder -->
        <div class="w-[70%] h-32 bg-gray-200 ml-4 flex items-center justify-center text-sm text-gray-600 rounded">
        GPS Tracking (Coming Soon)
        </div>
    `;
    container.appendChild(card);
    });
}

function addWorkerFine(event, index) {
    event.preventDefault();
    const amount = document.getElementById(`fineAmount-${index}`).value;
    const reason = document.getElementById(`fineReason-${index}`).value;
    monitoredWorkers[index].fines.push({ amount, reason });
    renderMonitoredWorkers();
}

// ADD GARBAGE RECORD
function addGarbageRecord(event) {
    event.preventDefault();
    const worker = document.getElementById("garbageWorker").value;
    const weight = document.getElementById("expectedWeight").value;
    const priority = document.getElementById("priority").value;

    garbageRecords.push({ worker, expectedWeight: weight, priority });
    renderSummary();
    event.target.reset();
}

// ADD OUTGOING WASTE
function addOutgoingWaste(event) {
    event.preventDefault();
    const industry = document.getElementById("industry").value;
    const weight = document.getElementById("outWeight").value;
    const purpose = document.getElementById("purpose").value;
    const date = new Date().toISOString().split("T")[0];

    outgoingWaste.push({ industry, weight, purpose, date });
    renderSummary();
    event.target.reset();
}

// RENDER SUMMARY
function renderSummary() {
    const total = garbageRecords.reduce((sum, g) => sum + Number(g.expectedWeight), 0);
    document.getElementById("totalWaste").textContent = total;

    document.getElementById("dryWaste").textContent = Math.round(total * 0.4);
    document.getElementById("wetWaste").textContent = Math.round(total * 0.3);
    document.getElementById("recycleWaste").textContent = Math.round(total * 0.2);
    document.getElementById("hazardWaste").textContent = Math.round(total * 0.1);

    const container = document.getElementById("outgoingList");
    container.innerHTML = outgoingWaste.map(o => `
    <div class="flex bg-white shadow p-4 rounded-lg items-center">
        <img src="industry.png" alt="Industry" class="w-16 h-16 rounded mr-4 object-cover">
        <div class="flex-1">
        <h4 class="text-lg font-semibold">${o.industry}</h4>
        <p class="text-sm text-gray-600">Date: ${o.date}</p>
        <p><strong>Weight:</strong> ${o.weight} kg</p>
        <p><strong>Purpose:</strong> ${o.purpose}</p>
        </div>
    </div>
    `).join("");
}

// INIT
function init() {
    // Render workers
    renderMonitoredWorkers();

    // Populate workers dropdown in Garbage Updates form
    const workerSelect = document.getElementById("garbageWorker");
    monitoredWorkers.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w.name;
    opt.textContent = w.name;
    workerSelect.appendChild(opt);
    });

    // Render summary
    renderSummary();

    // Default section
    showSection("monitor");
}

// Logout functionality
function logout() {
    // Clear any stored session data
    localStorage.removeItem('workerData');
    localStorage.removeItem('sessionData');
    sessionStorage.clear();
    
    // Show confirmation and redirect
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../../login.html';
    }
}

init();