// Complaints Section Logic
window.Complaints = {
    init() {
        console.log('Complaints section initialized');
        this.loadComplaints();
    },

    submitComplaint() {
        const issueType = document.getElementById('issue-type').value;
        const description = document.getElementById('issue-description').value;
        
        if (!issueType || !description.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        const complaint = {
            id: Date.now(),
            type: issueType,
            description: description,
            status: 'Submitted',
            date: new Date().toLocaleDateString(),
            statusColor: 'yellow'
        };

        this.saveComplaint(complaint);
        this.loadComplaints();
        this.clearForm();
        alert('Complaint submitted successfully!');
    },

    saveComplaint(complaint) {
        const complaints = this.getComplaints();
        complaints.unshift(complaint); // Add to beginning of array
        localStorage.setItem('complaints', JSON.stringify(complaints));
    },

    getComplaints() {
        const stored = localStorage.getItem('complaints');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Return default complaints if none stored
        return [
            {
                id: 1,
                type: 'missed-collection',
                description: 'Missed Collection',
                status: 'In Progress',
                date: new Date().toLocaleDateString(),
                statusColor: 'yellow'
            },
            {
                id: 2,
                type: 'overflowing-bins',
                description: 'Overflowing Bins',
                status: 'Resolved',
                date: new Date(Date.now() - 86400000).toLocaleDateString(),
                statusColor: 'green'
            }
        ];
    },

    loadComplaints() {
        const complaints = this.getComplaints();
        const container = document.getElementById('complaints-list');
        
        if (!container) return;
        
        container.innerHTML = complaints.map(complaint => `
            <div class="p-3 bg-gray-50 rounded border-l-4 border-${complaint.statusColor}-400">
                <div class="font-medium">${this.formatComplaintType(complaint.type)}</div>
                <div class="text-sm text-gray-600">Status: ${complaint.status}</div>
                <div class="text-xs text-gray-500 mt-1">${complaint.date}</div>
            </div>
        `).join('');
    },

    formatComplaintType(type) {
        const types = {
            'missed-collection': 'Missed Collection',
            'overflowing-bins': 'Overflowing Bins',
            'illegal-dumping': 'Illegal Dumping',
            'other': 'Other Issue'
        };
        return types[type] || type;
    },

    clearForm() {
        document.getElementById('issue-type').value = '';
        document.getElementById('issue-description').value = '';
    }
};
