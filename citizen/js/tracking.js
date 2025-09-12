// Tracking Section Logic
window.Tracking = {
    init() {
        console.log('Tracking section initialized');
        this.loadTrackingData();
        this.startLiveTracking();
    },

    loadTrackingData() {
        const nextCollection = this.getNextCollection();
        const container = document.getElementById('next-collection');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="font-medium">${nextCollection.date}, ${nextCollection.time}</div>
            <div class="text-sm text-gray-600">Vehicle: ${nextCollection.vehicle}</div>
            <div class="text-sm text-gray-600">Status: ${nextCollection.status}</div>
        `;
    },

    getNextCollection() {
        // Simulate getting next collection data
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        return {
            date: tomorrow.toLocaleDateString('en-US', { weekday: 'long' }),
            time: '8:00 AM',
            vehicle: 'WM-101',
            status: 'On Route'
        };
    },

    startLiveTracking() {
        // Simulate live tracking updates
        setInterval(() => {
            this.updateVehicleLocation();
        }, 5000); // Update every 5 seconds
    },

    updateVehicleLocation() {
        const mapContainer = document.getElementById('tracking-map');
        if (!mapContainer) return;
        
        // Simulate vehicle movement
        const statuses = ['On Route', 'Approaching', 'At Location', 'Collecting'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Update map placeholder text
        mapContainer.innerHTML = `
            <div class="text-center">
                <div class="text-gray-500">Live Vehicle Location</div>
                <div class="text-sm font-medium mt-2">Status: ${randomStatus}</div>
            </div>
        `;
    },

    getTrackingHistory() {
        const stored = localStorage.getItem('tracking_history');
        return stored ? JSON.parse(stored) : [];
    },

    saveTrackingEvent(event) {
        const history = this.getTrackingHistory();
        history.unshift(event);
        localStorage.setItem('tracking_history', JSON.stringify(history));
    }
};
