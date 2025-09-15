// Waste Collection Management
class WasteCollectionManager {
    constructor() {
        this.currentRoute = null;
        this.houses = [];
        this.currentHouse = null;
        this.selectedWasteType = null;
        this.selectedQuality = null;
        this.capturedPhoto = null;
        this.routeStatus = 'not-started'; // not-started, active, paused, completed
        this.init();
    }

    init() {
        this.loadRouteData();
        this.bindEvents();
    }

    bindEvents() {
        // Voice command integration
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.startVoiceCommand();
            }
        });
    }

    loadRouteData() {
        // Sample route data - in real app, this would come from API
        this.houses = [
            {
                id: 1,
                number: "A-101",
                address: "Block A, House 101",
                residents: "Sharma Family",
                phone: "+91 98765 43210",
                status: "collected",
                wasteType: "organic",
                weight: 2.5,
                quality: "excellent",
                collectionTime: "09:15 AM",
                location: { lat: 28.5355, lng: 77.3910 }
            },
            {
                id: 2,
                number: "A-102",
                address: "Block A, House 102",
                residents: "Gupta Family",
                phone: "+91 98765 43211",
                status: "collected",
                wasteType: "recyclable",
                weight: 1.8,
                quality: "good",
                collectionTime: "09:25 AM",
                location: { lat: 28.5356, lng: 77.3912 }
            },
            {
                id: 3,
                number: "A-103",
                address: "Block A, House 103",
                residents: "Kumar Family",
                phone: "+91 98765 43212",
                status: "pending",
                wasteType: null,
                weight: null,
                quality: null,
                collectionTime: null,
                location: { lat: 28.5357, lng: 77.3914 }
            },
            {
                id: 4,
                number: "A-104",
                address: "Block A, House 104",
                residents: "Singh Family",
                phone: "+91 98765 43213",
                status: "rejected",
                wasteType: "mixed",
                weight: 0,
                quality: "poor",
                collectionTime: "09:45 AM",
                rejectionReason: "Poor segregation",
                location: { lat: 28.5358, lng: 77.3916 }
            },
            {
                id: 5,
                number: "A-105",
                address: "Block A, House 105",
                residents: "Patel Family",
                phone: "+91 98765 43214",
                status: "pending",
                wasteType: null,
                weight: null,
                quality: null,
                collectionTime: null,
                location: { lat: 28.5359, lng: 77.3918 }
            }
        ];
        
        this.renderHouses();
        this.updateRouteStats();
    }

    renderHouses() {
        const container = document.getElementById('houses-container');
        if (!container) return;

        container.innerHTML = '';

        this.houses.forEach(house => {
            const houseCard = this.createHouseCard(house);
            container.appendChild(houseCard);
        });
    }

    createHouseCard(house) {
        const card = document.createElement('div');
        card.className = `house-card ${house.status}`;
        card.onclick = () => this.openCollectionModal(house);

        const statusIcons = {
            'pending': '<i class="fas fa-clock text-yellow-600"></i>',
            'collected': '<i class="fas fa-check-circle text-green-600"></i>',
            'rejected': '<i class="fas fa-times-circle text-red-600"></i>',
            'reported': '<i class="fas fa-exclamation-triangle text-orange-600"></i>'
        };

        const statusTexts = {
            'pending': 'Pending Collection',
            'collected': 'Collected',
            'rejected': 'Rejected',
            'reported': 'Reported'
        };

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-lg font-semibold">${house.number}</h4>
                <div class="flex items-center space-x-2">
                    ${statusIcons[house.status]}
                    <span class="text-sm font-medium">${statusTexts[house.status]}</span>
                </div>
            </div>
            
            <div class="space-y-2 text-sm text-gray-600">
                <div><i class="fas fa-home w-4"></i> ${house.address}</div>
                <div><i class="fas fa-users w-4"></i> ${house.residents}</div>
                <div><i class="fas fa-phone w-4"></i> ${house.phone}</div>
                ${house.collectionTime ? `<div><i class="fas fa-clock w-4"></i> ${house.collectionTime}</div>` : ''}
                ${house.weight ? `<div><i class="fas fa-weight w-4"></i> ${house.weight} kg</div>` : ''}
                ${house.rejectionReason ? `<div class="text-red-600"><i class="fas fa-exclamation w-4"></i> ${house.rejectionReason}</div>` : ''}
            </div>
            
            <div class="mt-4 flex space-x-2">
                ${house.status === 'pending' ? `
                    <button onclick="event.stopPropagation(); WasteCollection.quickCollect(${house.id})" 
                            class="flex-1 worker-btn bg-green-600 text-white text-sm py-2">
                        <i class="fas fa-check"></i>
                        Quick Collect
                    </button>
                ` : ''}
                
                ${house.status === 'rejected' ? `
                    <button onclick="event.stopPropagation(); WasteCollection.reportHouse(${house.id})" 
                            class="flex-1 worker-btn bg-red-600 text-white text-sm py-2">
                        <i class="fas fa-flag"></i>
                        Report
                    </button>
                ` : ''}
                
                <button onclick="event.stopPropagation(); WasteCollection.callResident(${house.id})" 
                        class="worker-btn bg-blue-600 text-white text-sm py-2 px-3">
                    <i class="fas fa-phone"></i>
                </button>
            </div>
        `;

        return card;
    }

    openCollectionModal(house) {
        this.currentHouse = house;
        const modal = document.getElementById('collection-modal');
        const title = document.getElementById('modal-house-title');
        
        if (modal && title) {
            title.textContent = `House ${house.number} - ${house.residents}`;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        // Reset form
        this.resetCollectionForm();

        // Announce via voice
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Opening collection details for house ${house.number}`);
        }
    }

    closeModal() {
        const modal = document.getElementById('collection-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.currentHouse = null;
        this.resetCollectionForm();
    }

    resetCollectionForm() {
        this.selectedWasteType = null;
        this.selectedQuality = null;
        this.capturedPhoto = null;

        // Reset UI elements
        document.querySelectorAll('.waste-type-btn').forEach(btn => {
            btn.classList.remove('border-green-500', 'border-blue-500', 'border-red-500', 'border-gray-500');
            btn.classList.add('border-green-200', 'border-blue-200', 'border-red-200', 'border-gray-200');
        });

        document.querySelectorAll('.quality-btn').forEach(btn => {
            btn.classList.remove('bg-green-500', 'bg-blue-500', 'bg-red-500', 'text-white');
        });

        const weightInput = document.getElementById('waste-weight');
        if (weightInput) weightInput.value = '';

        const photoCapture = document.getElementById('photo-capture');
        const capturedPhoto = document.getElementById('captured-photo');
        if (photoCapture && capturedPhoto) {
            photoCapture.classList.remove('hidden');
            capturedPhoto.classList.add('hidden');
        }
    }

    selectWasteType(type) {
        this.selectedWasteType = type;
        
        // Update UI
        document.querySelectorAll('.waste-type-btn').forEach(btn => {
            btn.classList.remove('border-green-500', 'border-blue-500', 'border-red-500', 'border-gray-500');
        });

        const colorMap = {
            'organic': 'border-green-500',
            'recyclable': 'border-blue-500',
            'hazardous': 'border-red-500',
            'mixed': 'border-gray-500'
        };

        event.target.closest('.waste-type-btn').classList.add(colorMap[type]);

        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`${type} waste type selected`);
        }
    }

    setQuality(quality) {
        this.selectedQuality = quality;
        
        // Update UI
        document.querySelectorAll('.quality-btn').forEach(btn => {
            btn.classList.remove('bg-green-500', 'bg-blue-500', 'bg-red-500', 'text-white');
        });

        const qualityBtn = event.target;
        const colorMap = {
            'excellent': 'bg-green-500',
            'good': 'bg-blue-500',
            'poor': 'bg-red-500'
        };

        qualityBtn.classList.add(colorMap[quality], 'text-white');

        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`${quality} quality selected`);
        }
    }

    async capturePhoto() {
        try {
            const photo = await window.nav.capturePhoto();
            this.capturedPhoto = photo;

            // Update UI
            const photoCapture = document.getElementById('photo-capture');
            const capturedPhoto = document.getElementById('captured-photo');
            
            if (photoCapture && capturedPhoto) {
                photoCapture.classList.add('hidden');
                capturedPhoto.src = photo.dataUrl;
                capturedPhoto.classList.remove('hidden');
            }

            // Voice feedback
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak('Photo captured successfully');
            }

        } catch (error) {
            console.error('Error capturing photo:', error);
            window.nav.showNotification('Failed to capture photo', 'error');
        }
    }

    markCollected() {
        if (!this.currentHouse) return;

        const weight = document.getElementById('waste-weight').value;
        
        if (!this.selectedWasteType) {
            window.nav.showNotification('Please select waste type', 'warning');
            return;
        }

        if (!weight || weight <= 0) {
            window.nav.showNotification('Please enter valid weight', 'warning');
            return;
        }

        if (!this.selectedQuality) {
            window.nav.showNotification('Please select segregation quality', 'warning');
            return;
        }

        // Update house data
        const house = this.houses.find(h => h.id === this.currentHouse.id);
        if (house) {
            house.status = 'collected';
            house.wasteType = this.selectedWasteType;
            house.weight = parseFloat(weight);
            house.quality = this.selectedQuality;
            house.collectionTime = new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            house.photo = this.capturedPhoto;
        }

        // Update UI
        this.renderHouses();
        this.updateRouteStats();
        this.closeModal();

        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.announceCollectionComplete(house.number, this.selectedWasteType);
        }

        window.nav.showNotification(`House ${house.number} marked as collected`, 'success');
    }

    rejectWaste() {
        if (!this.currentHouse) return;

        if (!this.selectedQuality || this.selectedQuality !== 'poor') {
            window.nav.showNotification('Please select "Poor" quality to reject waste', 'warning');
            return;
        }

        // Update house data
        const house = this.houses.find(h => h.id === this.currentHouse.id);
        if (house) {
            house.status = 'rejected';
            house.quality = this.selectedQuality;
            house.rejectionReason = 'Poor segregation';
            house.collectionTime = new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            house.photo = this.capturedPhoto;
        }

        // Update UI
        this.renderHouses();
        this.updateRouteStats();
        this.closeModal();

        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`House ${house.number} waste rejected due to poor segregation`);
        }

        window.nav.showNotification(`House ${house.number} waste rejected`, 'warning');
    }

    quickCollect(houseId) {
        const house = this.houses.find(h => h.id === houseId);
        if (!house) return;

        // Quick collection with default values
        house.status = 'collected';
        house.wasteType = 'mixed';
        house.weight = 2.0;
        house.quality = 'good';
        house.collectionTime = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });

        this.renderHouses();
        this.updateRouteStats();

        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.announceCollectionComplete(house.number, 'mixed');
        }

        window.nav.showNotification(`House ${house.number} quick collection completed`, 'success');
    }

    callResident(houseId) {
        const house = this.houses.find(h => h.id === houseId);
        if (!house) return;

        // In real app, this would integrate with phone dialer
        window.nav.showNotification(`Calling ${house.residents} at ${house.phone}`, 'info');
        
        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Calling ${house.residents}`);
        }
    }

    reportHouse(houseId) {
        // This will be implemented when we create the penalties section
        window.nav.showNotification('Redirecting to penalties section...', 'info');
        setTimeout(() => {
            window.nav.showSection('penalties');
        }, 1000);
    }

    updateRouteStats() {
        const total = this.houses.length;
        const completed = this.houses.filter(h => h.status === 'collected').length;
        const pending = this.houses.filter(h => h.status === 'pending').length;
        const percentage = Math.round((completed / total) * 100);

        // Update UI elements
        const totalEl = document.getElementById('route-total');
        const completedEl = document.getElementById('route-completed');
        const pendingEl = document.getElementById('route-pending');
        const progressEl = document.getElementById('route-progress');
        const percentageEl = document.getElementById('route-percentage');

        if (totalEl) totalEl.textContent = total;
        if (completedEl) completedEl.textContent = completed;
        if (pendingEl) pendingEl.textContent = pending;
        if (progressEl) progressEl.style.width = `${percentage}%`;
        if (percentageEl) percentageEl.textContent = `${percentage}%`;

        // Update dashboard stats
        const todayCollections = document.getElementById('today-collections');
        if (todayCollections) todayCollections.textContent = completed;
    }

    async getCurrentLocation() {
        const modal = document.getElementById('location-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        try {
            const location = await window.nav.getCurrentLocation();
            
            // Voice feedback
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak('Location found successfully');
            }

            window.nav.showNotification(`Location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`, 'success');
            
        } catch (error) {
            console.error('Error getting location:', error);
            window.nav.showNotification('Failed to get location. Please check GPS settings.', 'error');
        } finally {
            this.closeLocationModal();
        }
    }

    closeLocationModal() {
        const modal = document.getElementById('location-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    startRoute() {
        this.routeStatus = 'active';
        window.nav.showNotification('Route started successfully', 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Route started. Begin waste collection.');
        }
    }

    pauseRoute() {
        this.routeStatus = 'paused';
        window.nav.showNotification('Route paused', 'warning');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Route paused. You can resume anytime.');
        }
    }

    emergencyStop() {
        this.routeStatus = 'emergency';
        window.nav.showNotification('Emergency stop activated. Contact supervisor.', 'error');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Emergency stop activated. Please contact your supervisor immediately.', 'high');
        }
    }

    endRoute() {
        const completed = this.houses.filter(h => h.status === 'collected').length;
        const total = this.houses.length;
        
        if (completed < total) {
            const confirm = window.confirm(`Only ${completed} out of ${total} houses completed. Are you sure you want to end the route?`);
            if (!confirm) return;
        }

        this.routeStatus = 'completed';
        window.nav.showNotification('Route completed successfully', 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.announceRouteProgress(completed, total);
            window.VoiceGuide.speak('Route completed. Great work!');
        }
    }

    refreshRoute() {
        const hideLoading = window.nav.showLoading(document.querySelector('.trust-card'));
        
        // Simulate API call
        setTimeout(() => {
            this.loadRouteData();
            hideLoading();
            window.nav.showNotification('Route data refreshed', 'success');
        }, 1500);
    }

    startVoiceCommand() {
        if (window.VoiceGuide) {
            window.VoiceGuide.startListening();
        }
    }
}

// Initialize Waste Collection Manager
window.WasteCollection = new WasteCollectionManager();