// Mock Data
let trainedCitizens = 25;

let audit = { correct: 80, total: 100 };
let transports = [
    { truck: "Truck 1", status: "On Route" }
];

let championPoints = 120;
let leaderboardData = [
    { name: "Champion 1", points: 150 },
    { name: "Champion 2", points: 130 },
    { name: "You", points: championPoints }
];






// ===== SUBMIT COMPLAINT =====
let complaints = [
  {
    category: "Garbage Overflow",
    ward: "Ward 2",
    priority: "High",
    description: "Dustbin overflowing near main market.",
    photo: "",
  },
  {
    category: "Broken Bin",
    ward: "Ward 4",
    priority: "Medium",
    description: "Community bin is broken and unusable.",
    photo: "",
  }
];

let incentivePoints = 0;

// ===== RENDER FUNCTION =====
function renderComplaints() {
  const complaintsList = document.getElementById("complaints-list");
  complaintsList.innerHTML = "";

  complaints.forEach((c) => {
    complaintsList.innerHTML += `
      <div class="bg-white border border-[#e0e0e0] rounded-xl shadow-md p-5">
        <h4 class="text-lg font-bold text-[#263238] mb-2">${c.category}</h4>
        <p class="text-gray-600 text-sm"><strong>Ward:</strong> ${c.ward}</p>
        <p class="text-gray-600 text-sm"><strong>Priority:</strong> ${c.priority}</p>
        <p class="text-gray-700 text-sm mt-2">${c.description}</p>
        ${c.photo ? `<img src="${c.photo}" class="mt-3 rounded-lg border h-32 object-cover">` : ""}
      </div>
    `;
  });
}

  // ===== CREATE COMPLAINT FUNCTION =====
function createComplaint(event) {
  event.preventDefault();

  const category = document.getElementById("complaint-category").value;
  const ward = document.getElementById("complaint-ward").value;
  const priority = document.getElementById("complaint-priority").value;
  const description = document.getElementById("complaint-description").value;
  const photoInput = document.getElementById("complaint-photo");

  let photoUrl = "";
  if (photoInput.files && photoInput.files[0]) {
    photoUrl = URL.createObjectURL(photoInput.files[0]);
  }

  complaints.push({
    category,
    ward,
    priority,
    description,
    photo: photoUrl
  });

  // increase incentive points
  incentivePoints += 20;
  document.getElementById("incentive-points").textContent = incentivePoints;

  renderComplaints();
  document.getElementById("complaint-form").reset();
}

// ===== EVENT LISTENER =====
document.getElementById("complaint-form").addEventListener("submit", createComplaint);

// Initial render
renderComplaints();








// Show section
function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
    renderDashboard();
}







// Training
let events = [
  {
    title: "Ward 3 Clean Drive",
    time: "2025-09-12T09:00",
    location: "Ward 3 Park",
    volunteers: 10,
    description: "Community clean-up drive in Ward 3 to remove roadside garbage."
  },
  {
    title: "Composting Workshop",
    time: "2025-09-15T14:00",
    location: "Community Center Hall",
    volunteers: 20,
    description: "Training for citizens on home composting methods."
  },
  {
    title: "Composting Workshop",
    time: "2025-09-15T14:00",
    location: "Community Center Hall",
    volunteers: 20,
    description: "Training for citizens on home composting methods."
  }
];


 /* ===== EVENTS DATA ===== */

  /* ===== RENDER EVENTS ===== */
  function renderEvents() {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    events.forEach((e) => {
      eventsList.innerHTML += `
        <div class="bg-white border border-[#e0e0e0] rounded-xl shadow-md p-5">
          <h4 class="text-lg font-bold text-[#263238] mb-2">${e.title}</h4>
          <p class="text-gray-600 text-sm"><strong>Time:</strong> ${e.time}</p>
          <p class="text-gray-600 text-sm"><strong>Location:</strong> ${e.location}</p>
          <p class="text-gray-600 text-sm"><strong>Volunteers Needed:</strong> ${e.volunteers}</p>
          <p class="text-gray-700 text-sm mt-2">${e.description}</p>
        </div>
      `;
    });
  }

  // Create Event Function
  function createEvent(event) {
    event.preventDefault();

    const titlet = document.getElementById('event-title').value;
    const timet = document.getElementById('event-time').value;
    const locationt = document.getElementById('event-location').value;
    const volunteerst = parseInt(document.getElementById('event-volunteers').value);
    const descriptiont = document.getElementById('event-description').value;

    events.push({
      title: titlet,
      time: timet,
      location: locationt,
      volunteers: volunteerst,
      description: descriptiont
    });

    renderEvents();

    // reset form after submit
    document.getElementById("event-form").reset();
  }

  // Attach Form Listener
  document.getElementById("event-form").addEventListener("submit", createEvent);

  // Initial Render
  renderEvents();







// Workers CRUD




// Sample workers array
let workers = [
  { name: "Ravi Kumar", ward: "Ward 12", status: "Active", fines: [] },
  { name: "Anita Sharma", ward: "Ward 7", status: "Active", fines: [] },
  { name: "Sunil Singh", ward: "Ward 3", status: "Inactive", fines: [] },
  { name: "Meena Patel", ward: "Ward 5", status: "Active", fines: [] },
  { name: "Arjun Verma", ward: "Ward 9", status: "Active", fines: [] }
];

// Render workers into cards
function renderWorkers() {
  const container = document.getElementById("workersList");
  container.innerHTML = "";

  workers.forEach((worker, index) => {
    // Fines list
    let finesHtml = "";
    if (worker.fines.length > 0) {
      finesHtml = `
        <div class="mt-2 bg-red-50 p-2 rounded">
          <strong>Fines:</strong>
          <ul class="list-disc ml-5 text-sm">
            ${worker.fines.map(f => `<li>₹${f.amount} - ${f.reason}</li>`).join("")}
          </ul>
        </div>`;
    }

    // Create card
    const card = document.createElement("div");
    card.className = "bg-white shadow p-4 rounded-lg mb-4";
    card.innerHTML = `
      <h3 class="text-lg font-semibold">${worker.name}</h3>
      <p><strong>Ward:</strong> ${worker.ward}</p>
      <p><strong>Status:</strong> ${worker.status}</p>

      <form onsubmit="addFine(event, ${index})" class="mt-3 space-y-2">
        <input type="number" id="fineAmount-${index}" placeholder="Fine Amount (₹)" class="border p-1 rounded w-full" required>
        <input type="text" id="fineReason-${index}" placeholder="Reason" class="border p-1 rounded w-full" required>
        <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded">Add Fine</button>
      </form>

      ${finesHtml}
    `;
    container.appendChild(card);
  });
}

// Add fine to a worker
function addFine(event, index) {
  event.preventDefault();
  const amount = document.getElementById(`fineAmount-${index}`).value;
  const reason = document.getElementById(`fineReason-${index}`).value;

  if (amount && reason) {
    workers[index].fines.push({ amount, reason });
    renderWorkers();
  }
}









// Audit i am currently not using this
function updateAudit(event) {
    event.preventDefault();
    const correct = parseInt(document.getElementById("correctWaste").value);
    const total = parseInt(document.getElementById("totalWaste").value);
    if (!isNaN(correct) && !isNaN(total) && total > 0) {
    audit.correct = correct;
    audit.total = total;
    renderDashboard();
    }
}






// Transport CRUD currently not using this section
function addTransport(event) {
    event.preventDefault();
    const truck = document.getElementById("truckName").value;
    const status = document.getElementById("truckStatus").value;
    if (truck && status) {
    transports.push({ truck, status });
    document.getElementById("truckName").value = "";
    document.getElementById("truckStatus").value = "";
    renderDashboard();
    }
}
function deleteTransport(index) {
    transports.splice(index, 1);
    renderDashboard();
}







// Complaints CRUD



  // ===== SUBMIT COMPLAINT =====
  function submitComplaint(event) {
    event.preventDefault();

    const category = document.getElementById('complaint-category').value;
    const ward = document.getElementById('complaint-ward').value;
    const priority = document.getElementById('complaint-priority').value;
    const description = document.getElementById('complaint-description').value;
    const photoInput = document.getElementById('complaint-photo');
    let photoURL = "";

    if (photoInput.files && photoInput.files[0]) {
      photoURL = URL.createObjectURL(photoInput.files[0]);
    }

    // Create new complaint
    const newComplaint = { category, ward, priority, description, photoURL, date: new Date().toLocaleString() };
    complaints.push(newComplaint);

    // Increment incentive points
    incentivePoints += 20;
    document.getElementById('incentive-points').innerText = incentivePoints;

    // Re-render complaints
    renderComplaints();

    // Reset form
    event.target.reset();
  }

  // ===== RENDER COMPLAINTS =====
  function renderComplaints() {
    const complaintsList = document.getElementById('complaints-list');
    complaintsList.innerHTML = '';
    complaints.forEach((c, index) => {
      complaintsList.innerHTML += `
        <div class="bg-white border border-[#e0e0e0] rounded-xl shadow-sm p-5">
          <h4 class="text-lg font-bold text-[#263238] mb-2">${c.category}</h4>
          <p class="text-gray-600 text-sm"><strong>Ward:</strong> ${c.ward}</p>
          <p class="text-gray-600 text-sm"><strong>Priority:</strong> ${c.priority}</p>
          <p class="text-gray-600 text-sm"><strong>Date:</strong> ${c.date}</p>
          <p class="text-gray-700 text-sm mt-2">${c.description}</p>
          ${c.photoURL ? `<img src="${c.photoURL}" alt="Complaint Photo" class="mt-3 rounded-lg max-h-40 object-cover">` : ''}
        </div>
      `;
    });
  }

  // ===== SUBMIT COMPLAINT =====
  function submitComplaint(event) {
    event.preventDefault();

    const category = document.getElementById('complaint-category').value;
    const ward = document.getElementById('complaint-ward').value;
    const priority = document.getElementById('complaint-priority').value;
    const description = document.getElementById('complaint-description').value;
    const photoInput = document.getElementById('complaint-photo');
    let photoURL = "";

    if (photoInput.files && photoInput.files[0]) {
      photoURL = URL.createObjectURL(photoInput.files[0]);
    }

    // Create new complaint
    const newComplaint = { category, ward, priority, description, photoURL, date: new Date().toLocaleString() };
    complaints.push(newComplaint);

    // Increment incentive points
    incentivePoints += 20;
    document.getElementById('incentive-points').innerText = incentivePoints;

    // Re-render complaints
    renderComplaints();

    // Reset form
    event.target.reset();
  }

  // ===== RENDER COMPLAINTS =====
  function renderComplaints() {
    const complaintsList = document.getElementById('complaints-list');
    complaintsList.innerHTML = '';
    complaints.forEach((c, index) => {
      complaintsList.innerHTML += `
        <div class="bg-white border border-[#e0e0e0] rounded-xl shadow-sm p-5">
          <h4 class="text-lg font-bold text-[#263238] mb-2">${c.category}</h4>
          <p class="text-gray-600 text-sm"><strong>Ward:</strong> ${c.ward}</p>
          <p class="text-gray-600 text-sm"><strong>Priority:</strong> ${c.priority}</p>
          <p class="text-gray-600 text-sm"><strong>Date:</strong> ${c.date}</p>
          <p class="text-gray-700 text-sm mt-2">${c.description}</p>
          ${c.photoURL ? `<img src="${c.photoURL}" alt="Complaint Photo" class="mt-3 rounded-lg max-h-40 object-cover">` : ''}
        </div>
      `;
    });
  }



// profile

// Mock Profile Data
let profile = {
  name: "Sushant kumari",
  email: "sushant@example.com",
  phone: "+1234567890",
  role: "Green Champion",
  points: championPoints // coming from your incentives system
};

// Render Profile (updates the screen with latest data)
function renderProfile() {
  const nameEl = document.getElementById("profileName");
  if (!nameEl) return; // prevent error if section not loaded yet

  document.getElementById("profileName").innerText = profile.name;
  document.getElementById("profileEmail").innerText = profile.email;
  document.getElementById("profilePhone").innerText = profile.phone;
  document.getElementById("profileRole").innerText = profile.role;
  document.getElementById("profilePoints").innerText = profile.points;

  // Pre-fill form inputs too
  document.getElementById("editName").value = profile.name;
  document.getElementById("editEmail").value = profile.email;
  document.getElementById("editPhone").value = profile.phone;
  document.getElementById("editRole").value = profile.role;
}

// Update Profile when form is submitted
function updateProfile(event) {
  event.preventDefault();
  profile.name = document.getElementById("editName").value;
  profile.email = document.getElementById("editEmail").value;
  profile.phone = document.getElementById("editPhone").value;
  profile.role = document.getElementById("editRole").value;

  renderProfile();
  alert("Profile updated!");
}

// Call renderProfile ONLY when profile section is visible
function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");

  // Re-render data only for profile
  if (sectionId === "profile") {
    renderProfile();
  }
  if (sectionId === "workers") {
    renderWorkers();
  }else {
    renderDashboard(); // your existing dashboard render
  }
}

  







// Render
function renderDashboard() {
    document.getElementById("trainedCount").innerText = trainedCitizens;

    document.getElementById("workerList").innerHTML =
    workers.map((w, i) => `
        <li>
        ${w.name} - ${w.status}
        <button onclick="toggleWorkerStatus(${i})" class="text-blue-500">Toggle</button>
        <button onclick="deleteWorker(${i})" class="text-red-500">Delete</button>
        </li>`).join("");

    document.getElementById("auditPercent").innerText =
    Math.round((audit.correct / audit.total) * 100);

    document.getElementById("transportList").innerHTML =
    transports.map((t, i) => `
        <li>
        ${t.truck} - ${t.status}
        <button onclick="deleteTransport(${i})" class="text-red-500">Delete</button>
        </li>`).join("");

    document.getElementById("complaintList").innerHTML =
    complaints.map((c, i) => `
        <li>
        ${c}
        <button onclick="deleteComplaint(${i})" class="text-red-500">Delete</button>
        </li>`).join("");

    document.getElementById("points").innerText = championPoints;

    document.getElementById("leaderboard").innerHTML =
    leaderboardData.map(l => `<li>${l.name}: ${l.points} pts</li>`).join("");
}

// Logout functionality
function logout() {
    // Clear any stored session data
    localStorage.removeItem('championData');
    localStorage.removeItem('sessionData');
    sessionStorage.clear();
    
    // Show confirmation and redirect
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../../login.html';
    }
}

// Show dashboard default
showSection("events-section");