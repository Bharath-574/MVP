// Profile Section Logic
window.Profile = {
    init() {
        console.log('Profile section initialized');
        this.loadDefaultData();
    },

    loadDefaultData() {
        // Load any default data or check local storage
        const userData = this.getUserData();
        if (userData) {
            this.displayUserData(userData);
        }
    },

    fetchUserData() {
        const apiUrl = document.getElementById('api-input').value;
        if (apiUrl) {
            // Simulate API call
            const mockData = {
                name: 'John Doe',
                house: 'A-123',
                pincode: '110001',
                locality: 'Green Valley'
            };
            
            this.displayUserData(mockData);
            this.saveUserData(mockData);
            alert('Data fetched successfully!');
        } else {
            alert('Please enter API endpoint');
        }
    },

    displayUserData(data) {
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-house').textContent = data.house;
        document.getElementById('user-pincode').textContent = data.pincode;
        document.getElementById('user-locality').textContent = data.locality;
    },

    getUserData() {
        const stored = localStorage.getItem('userData');
        return stored ? JSON.parse(stored) : null;
    },

    saveUserData(data) {
        localStorage.setItem('userData', JSON.stringify(data));
    }
};
