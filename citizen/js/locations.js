// Locations Section Logic
window.Locations = {
    facilities: [
        {
            id: 1,
            name: 'Collection Point',
            address: 'Main Street Junction',
            distance: '0.5 km',
            type: 'collection',
            color: 'text-primary-green'
        },
        {
            id: 2,
            name: 'Recycling Center',
            address: 'Green Valley',
            distance: '2.3 km',
            type: 'recycling',
            color: 'text-secondary-blue'
        },
        {
            id: 3,
            name: 'Dump Area',
            address: 'Industrial Zone',
            distance: '5.1 km',
            type: 'dump',
            color: 'text-accent-orange'
        },
        {
            id: 4,
            name: 'WtoE Plant',
            address: 'Tech Park',
            distance: '8.7 km',
            type: 'plant',
            color: 'text-red-500'
        }
    ],

    init() {
        console.log('Locations section initialized');
        this.loadLocations();
    },

    loadLocations() {
        const container = document.getElementById('locations-grid');
        if (!container) return;

        container.innerHTML = this.facilities.map(facility => `
            <div class="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                 onclick="Locations.showLocationDetails(${facility.id})">
                <h4 class="font-medium ${facility.color}">${facility.name}</h4>
                <p class="text-sm text-gray-600 mt-2">${facility.address}<br>${facility.distance} away</p>
            </div>
        `).join('');
    },

    showLocationDetails(facilityId) {
        const facility = this.facilities.find(f => f.id === facilityId);
        if (facility) {
            alert(`${facility.name}\nLocation: ${facility.address}\nDistance: ${facility.distance}`);
        }
    },

    getNearbyFacilities(userLocation) {
        // Simulate finding nearby facilities based on user location
        return this.facilities.map(facility => ({
            ...facility,
            distance: this.calculateDistance(userLocation, facility)
        })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    },

    calculateDistance(from, to) {
        // Simulate distance calculation
        return (Math.random() * 10).toFixed(1) + ' km';
    },

    getDirections(facilityId) {
        const facility = this.facilities.find(f => f.id === facilityId);
        if (facility) {
            // Simulate opening directions
            alert(`Opening directions to ${facility.name}...`);
        }
    }
};
