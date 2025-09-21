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
      {title:'Composting Workshop', message:'Training for Green Champions on 28th Sept'}
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

    /* ===== LOGOUT FUNCTIONALITY ===== */
    function logout() {
      // Clear any stored session data
      localStorage.removeItem('adminData');
      localStorage.removeItem('sessionData');
      sessionStorage.clear();
      
      // Show confirmation and redirect
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../../login.html';
      }
    }

    /* ===== NAVIGATION ===== */
    function showSection(section) {
      document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
      document.getElementById(section + '-section').classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      document.querySelector(`.nav-item[onclick="showSection('${section}')"]`).classList.add('active');
    }