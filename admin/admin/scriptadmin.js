/* ===== DUMMY DATA ===== */
    const complaints = [
      {id:'C-101', category:'Garbage', ward:'Ward 1', status:'Open', priority:'High'},
      {id:'C-102', category:'Road Damage', ward:'Ward 2', status:'In Progress', priority:'Medium'},
      {id:'C-103', category:'Waterlogging', ward:'Ward 5', status:'Resolved', priority:'Low'}
    ];

    let users = [
      {name:'Ravi Kumar', id:'GC001', role:'Green Champion', status:'Active'},
      {name:'Anjali Sharma', id:'DA001', role:'Data Analyst', status:'Active'}
    ];

    let announcements = [
      {title:'Clean-up Drive', message:'Ward 3 clean-up drive on 15th Sept'},
      {title:'Composting Workshop', message:'Training for Green Champions on 18th Sept'}
    ];

    /* ===== DASHBOARD METRICS ===== */
    document.getElementById('total-complaints').textContent = complaints.length;
    document.getElementById('green-champions').textContent = users.filter(u=>u.role==='Green Champion').length;
    document.getElementById('pending-tasks').textContent = complaints.filter(c => c.status !== 'Resolved').length;

    /* ===== RENDER COMPLAINTS ===== */
    const complaintsTable = document.getElementById('complaints-table');
    complaints.forEach(c => {
      complaintsTable.innerHTML += `<tr>
        <td>${c.id}</td>
        <td>${c.category}</td>
        <td>${c.ward}</td>
        <td>${c.status}</td>
        <td>${c.priority}</td>
      </tr>`;
    });

    /* ===== USER MANAGEMENT ===== */
    function renderUsers() {
      const gcTable = document.getElementById('green-champions-table');
      const daTable = document.getElementById('data-analysts-table');
      gcTable.innerHTML = '';
      daTable.innerHTML = '';

      users.forEach(u => {
        const row = `<tr><td>${u.name}</td><td>${u.id}</td><td>${u.status}</td></tr>`;
        if (u.role === 'Green Champion') {
          gcTable.innerHTML += row;
        } else if (u.role === 'Data Analyst') {
          daTable.innerHTML += row;
        }
      });
    }
    renderUsers();

    function addUser(event) {
      event.preventDefault();
      const name = document.getElementById('user-name').value;
      const id = document.getElementById('user-id').value;
      const password = document.getElementById('user-password').value;
      const role = document.getElementById('user-role').value;
      users.push({name, id, password, role, status:'Active'});
      renderUsers();
      event.target.reset();
    }

    /* ===== ANNOUNCEMENTS ===== */
    const announcementsList = document.getElementById('announcements-list');
    function renderAnnouncements() {
      announcementsList.innerHTML = '';
      announcements.forEach((a, index) => {
        announcementsList.innerHTML += `<div class="card">
          <h3>${a.title}</h3>
          <p>${a.message}</p>
          <button class="delete-btn" onclick="deleteAnnouncement(${index})">Delete</button>
        </div>`;
      });
    }
    renderAnnouncements();

    function createAnnouncement(event) {
      event.preventDefault();
      const title = document.getElementById('announcement-title').value;
      const message = document.getElementById('announcement-message').value;
      announcements.push({title, message});
      renderAnnouncements();
      event.target.reset();
    }

    function deleteAnnouncement(index) {
      announcements.splice(index, 1);
      renderAnnouncements();
    }

    /* ===== NAVIGATION ===== */
    function showSection(section) {
      document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
      document.getElementById(section + '-section').classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      document.querySelector(`.nav-item[onclick="showSection('${section}')"]`).classList.add('active');
    }

    // Fake data for the dashboard
const dashboardData = {
  totalComplaints: 250,
  activeGreenChampions: 45,
  pendingTasks: 12
};

// Fake data for complaints
const complaintsData = [
  { id: 101, category: "Garbage", ward: "Ward 5", status: "Pending", priority: "High" },
  { id: 102, category: "Water Leakage", ward: "Ward 12", status: "In Progress", priority: "Medium" },
  { id: 103, category: "Road Repair", ward: "Ward 8", status: "Resolved", priority: "Low" }
];

// Fake data for users
const usersData = {
  greenChampions: [
    { name: "Ramesh Kumar", id: "GC001", status: "Active" },
    { name: "Priya Sharma", id: "GC002", status: "Active" },
    { name: "Anil Patel", id: "GC003", status: "Inactive" }
  ],
  dataAnalysts: [
    { name: "Sneha Gupta", id: "DA001", status: "Active" },
    { name: "Vikram Singh", id: "DA002", status: "Active" }
  ]
};

// Fake data for announcements
let announcementsData = [
  { title: "New Complaint System", message: "We have updated the complaint logging system for better tracking." },
  { title: "Green Champions Meeting", message: "A mandatory meeting for all Green Champions is scheduled for Friday." }
];

// New fake data for waste management
const wasteData = {
  total: 5000, // Total waste in Metric Tons
  recycled: 3500,
  wardData: [
    { ward: "Ward 1", recycled: 350, unrecycled: 150 },
    { ward: "Ward 2", recycled: 500, unrecycled: 100 },
    { ward: "Ward 3", recycled: 250, unrecycled: 250 },
    { ward: "Ward 4", recycled: 400, unrecycled: 200 },
    { ward: "Ward 5", recycled: 600, unrecycled: 50 },
    { ward: "Ward 6", recycled: 300, unrecycled: 200 },
    { ward: "Ward 7", recycled: 550, unrecycled: 50 }
  ],
  categoryData: {
    wet: { recycled: 1800, unrecycled: 700 },
    dry: { recycled: 1500, unrecycled: 800 },
    hazardous: { recycled: 200, unrecycled: 0 }
  }
};

// Function to populate dashboard data
function populateDashboard() {
  document.getElementById("total-complaints").innerText = dashboardData.totalComplaints;
  document.getElementById("green-champions").innerText = dashboardData.activeGreenChampions;
  document.getElementById("pending-tasks").innerText = dashboardData.pendingTasks;
}

// Function to populate complaints table
function populateComplaints() {
  const tableBody = document.getElementById("complaints-table");
  tableBody.innerHTML = '';
  complaintsData.forEach(complaint => {
    const row = `
      <tr>
        <td>${complaint.id}</td>
        <td>${complaint.category}</td>
        <td>${complaint.ward}</td>
        <td>${complaint.status}</td>
        <td>${complaint.priority}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Function to populate user management tables
function populateUsers() {
  const greenChampionsTable = document.getElementById("green-champions-table");
  greenChampionsTable.innerHTML = '';
  usersData.greenChampions.forEach(user => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.id}</td>
        <td>${user.status}</td>
      </tr>
    `;
    greenChampionsTable.innerHTML += row;
  });

  const dataAnalystsTable = document.getElementById("data-analysts-table");
  dataAnalystsTable.innerHTML = '';
  usersData.dataAnalysts.forEach(user => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.id}</td>
        <td>${user.status}</td>
      </tr>
    `;
    dataAnalystsTable.innerHTML += row;
  });
}

// Function to handle adding a new user
function addUser(event) {
  event.preventDefault();
  const name = document.getElementById("user-name").value;
  const id = document.getElementById("user-id").value;
  const role = document.getElementById("user-role").value;
  const password = document.getElementById("user-password").value;

  const newUser = { name, id, status: "Active" };
  if (role === "Green Champion") {
    usersData.greenChampions.push(newUser);
  } else if (role === "Data Analyst") {
    usersData.dataAnalysts.push(newUser);
  }
  populateUsers();
  alert(`${role} ${name} added successfully!`);
  event.target.reset();
}

// Function to populate announcements
function populateAnnouncements() {
  const announcementsList = document.getElementById("announcements-list");
  announcementsList.innerHTML = '';
  announcementsData.forEach(announcement => {
    const announcementDiv = document.createElement('div');
    announcementDiv.className = 'card announcement-card';
    announcementDiv.innerHTML = `
      <h4>${announcement.title}</h4>
      <p>${announcement.message}</p>
    `;
    announcementsList.appendChild(announcementDiv);
  });
}

// Function to create a new announcement
function createAnnouncement(event) {
  event.preventDefault();
  const title = document.getElementById("announcement-title").value;
  const message = document.getElementById("announcement-message").value;
  const newAnnouncement = { title, message };
  announcementsData.unshift(newAnnouncement); // Add to the top
  populateAnnouncements();
  alert("Announcement created successfully!");
  event.target.reset();
}

// Function to populate waste management data
function populateWasteManagement() {
  // General waste stats
  document.getElementById("total-waste").innerText = `${wasteData.total} MT`;
  document.getElementById("recycled-waste").innerText = `${wasteData.recycled} MT`;
  document.getElementById("unrecycled-waste").innerText = `${wasteData.total - wasteData.recycled} MT`;

  // Ward-wise table
  const wardTableBody = document.getElementById("ward-waste-table");
  wardTableBody.innerHTML = '';
  wasteData.wardData.forEach(ward => {
    const row = `
      <tr>
        <td>${ward.ward}</td>
        <td>${ward.recycled} MT</td>
        <td>${ward.unrecycled} MT</td>
      </tr>
    `;
    wardTableBody.innerHTML += row;
  });

  // Category-wise stats
  document.getElementById("wet-recycled").innerText = `${wasteData.categoryData.wet.recycled} MT`;
  document.getElementById("wet-unrecycled").innerText = `${wasteData.categoryData.wet.unrecycled} MT`;
  document.getElementById("dry-recycled").innerText = `${wasteData.categoryData.dry.recycled} MT`;
  document.getElementById("dry-unrecycled").innerText = `${wasteData.categoryData.dry.unrecycled} MT`;
  document.getElementById("hazardous-recycled").innerText = `${wasteData.categoryData.hazardous.recycled} MT`;
  document.getElementById("hazardous-unrecycled").innerText = `${wasteData.categoryData.hazardous.unrecycled} MT`;
}

// Function to show the selected section and hide others
function showSection(sectionId) {
  document.querySelectorAll('main section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(`${sectionId}-section`).classList.remove('hidden');

  // Update active state of sidebar items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`.nav-item[onclick="showSection('${sectionId}')"]`).classList.add('active');

  // Populate data for the active section
  if (sectionId === 'dashboard') {
    populateDashboard();
  } else if (sectionId === 'complaints') {
    populateComplaints();
  } else if (sectionId === 'users') {
    populateUsers();
  } else if (sectionId === 'announcements') {
    populateAnnouncements();
  } else if (sectionId === 'waste-management') {
    populateWasteManagement();
  }
}

// Initial call to populate the dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
  showSection('dashboard');
});