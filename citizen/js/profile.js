// Profile Section Logic
window.Profile = {
    init() {
        console.log('Profile section initialized');
        this.loadDefaultData();
    },

    loadDefaultData() {
        // Load static user data
        const userData = {
            name: 'Priya Sharma',
            house: 'B-47',
            pincode: '110045',
            locality: 'Lajpat Nagar'
        };
        this.displayUserData(userData);
    },

    displayUserData(data) {
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-house').textContent = data.house;
        document.getElementById('user-pincode').textContent = data.pincode;
        document.getElementById('user-locality').textContent = data.locality;
    }
};
