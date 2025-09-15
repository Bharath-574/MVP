// Collection Requests Management
class CollectionRequestsManager {
    constructor() {
        this.requests = [];
        this.currentRequest = null;
        this.selectedQuality = null;
        this.completionPhoto = null;
        this.currentFilter = 'all';
        this.currentSort = 'urgency';
        this.init();
    }

    init() {
        this.loadRequestsData();
        this.bindEvents();
        this.setDefaultScheduleDate();
    }

    bindEvents() {
        // Set today's date as default
        this.setDefaultScheduleDate();
    }

    setDefaultScheduleDate() {
        const dateInput = document.getElementById('schedule-date');
        if (dateInput) {
            const today = new Date();
            dateInput.value = today.toISOString().split('T')[0];
            dateInput.min = today.toISOString().split('T')[0];
        }
    }

    loadRequestsData() {
        // Sample requests data - in real app, this would come from API
        this.requests = [
            {
                id: 1,
                title: "Bulk Furniture Disposal",
                requester: "Sharma Family",
                address: "A-205, Green Valley Apartments",
                phone: "+91 98765 43210",
                urgency: "high",
                status: "pending",
                requestDate: "2024-01-15",
                preferredDate: "2024-01-16",
                preferredTime: "09:00-12:00",
                estimatedWeight: "50kg",
                wasteType: "bulk",
                description: "Old sofa, dining table, and chairs need to be disposed. Items are heavy and require 2-3 people.",
                specialInstructions: "Please bring rope for tying furniture. Building has narrow staircase.",
                payment: "₹300",
                distance: "1.2 km",
                coordinates: { lat: 28.5355, lng: 77.3910 }
            },
            {
                id: 2,
                title: "Electronic Waste Collection",
                requester: "Tech Solutions Pvt. Ltd.",
                address: "Plot 15, Industrial Area Phase 2",
                phone: "+91 98765 43211",
                urgency: "medium",
                status: "accepted",
                requestDate: "2024-01-14",
                preferredDate: "2024-01-16",
                preferredTime: "14:00-17:00",
                estimatedWeight: "25kg",
                wasteType: "electronic",
                description: "Old computers, monitors, printers, and cables. Some items contain hazardous materials.",
                specialInstructions: "Handle with care. Some monitors may be fragile. Certificate of disposal required.",
                payment: "₹500",
                distance: "3.5 km",
                coordinates: { lat: 28.5400, lng: 77.3950 }
            },
            {
                id: 3,
                title: "Garden Waste Removal",
                requester: "Gupta Family",
                address: "B-101, Sunrise Homes",
                phone: "+91 98765 43212",
                urgency: "low",
                status: "pending",
                requestDate: "2024-01-15",
                preferredDate: "2024-01-17",
                preferredTime: "06:00-09:00",
                estimatedWeight: "30kg",
                wasteType: "organic",
                description: "Tree branches, leaves, and grass clippings from garden maintenance.",
                specialInstructions: "Access through back gate. Please bring garden waste bags.",
                payment: "₹150",
                distance: "0.8 km",
                coordinates: { lat: 28.5340, lng: 77.3890 }
            },
            {
                id: 4,
                title: "Construction Debris",
                requester: "Kumar Constructions",
                address: "Site 22, New Development Area",
                phone: "+91 98765 43213",
                urgency: "high",
                status: "pending",
                requestDate: "2024-01-15",
                preferredDate: "2024-01-15",
                preferredTime: "15:00-18:00",
                estimatedWeight: "100kg",
                wasteType: "construction",
                description: "Concrete chunks, broken tiles, and metal scraps from renovation work.",
                specialInstructions: "Heavy items require truck. Access from main road only.",
                payment: "₹800",
                distance: "2.1 km",
                coordinates: { lat: 28.5380, lng: 77.3920 }
            },
            {
                id: 5,
                title: "Medical Waste Disposal",
                requester: "City Healthcare Clinic",
                address: "12, Medical Complex, Sector 8",
                phone: "+91 98765 43214",
                urgency: "high",
                status: "pending",
                requestDate: "2024-01-15",
                preferredDate: "2024-01-15",
                preferredTime: "12:00-15:00",
                estimatedWeight: "15kg",
                wasteType: "hazardous",
                description: "Medical waste including syringes, bandages, and pharmaceutical waste.",
                specialInstructions: "URGENT: Requires special handling protocols. Bring protective equipment.",
                payment: "₹600",
                distance: "1.8 km",
                coordinates: { lat: 28.5365, lng: 77.3885 }
            },
            {
                id: 6,
                title: "Office Paper Shredding",
                requester: "DataSecure Ltd.",
                address: "Tower B, Business Park",
                phone: "+91 98765 43215",
                urgency: "medium",
                status: "completed",
                requestDate: "2024-01-14",
                preferredDate: "2024-01-15",
                preferredTime: "10:00-13:00",
                estimatedWeight: "40kg",
                wasteType: "recyclable",
                description: "Confidential documents requiring secure shredding and disposal.",
                specialInstructions: "Completed successfully. All documents shredded on-site.",
                payment: "₹350",
                distance: "2.8 km",
                coordinates: { lat: 28.5390, lng: 77.3960 },
                completedDate: "2024-01-15",
                actualWeight: "38kg",
                completionNotes: "All documents shredded securely. Client satisfied."
            }
        ];

        this.renderRequests();
        this.updateStats();
    }

    renderRequests() {
        const container = document.getElementById('requests-container');
        if (!container) return;

        container.innerHTML = '';

        let filteredRequests = this.filterAndSortRequests();

        if (filteredRequests.length === 0) {
            container.innerHTML = `
                <div class="trust-card rounded-lg p-8 text-center">
                    <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-semibold text-gray-600 mb-2">No requests found</h3>
                    <p class="text-gray-500">No collection requests match your current filter.</p>
                </div>
            `;
            return;
        }

        filteredRequests.forEach(request => {
            const requestCard = this.createRequestCard(request);
            container.appendChild(requestCard);
        });
    }

    createRequestCard(request) {
        const card = document.createElement('div');
        card.className = 'trust-card rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer';
        card.onclick = () => this.openRequestModal(request);

        const urgencyColors = {
            'high': 'bg-red-100 text-red-800 border-red-200',
            'medium': 'bg-orange-100 text-orange-800 border-orange-200',
            'low': 'bg-blue-100 text-blue-800 border-blue-200'
        };

        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'accepted': 'bg-blue-100 text-blue-800',
            'scheduled': 'bg-purple-100 text-purple-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };

        const wasteIcons = {
            'bulk': 'fas fa-couch',
            'electronic': 'fas fa-laptop',
            'organic': 'fas fa-leaf',
            'construction': 'fas fa-hammer',
            'hazardous': 'fas fa-radiation',
            'recyclable': 'fas fa-recycle'
        };

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                        <i class="${wasteIcons[request.wasteType] || 'fas fa-trash'} text-primary-green text-lg"></i>
                        <h4 class="text-lg font-semibold">${request.title}</h4>
                        <span class="px-2 py-1 rounded-full text-xs font-medium border ${urgencyColors[request.urgency]}">
                            ${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-1">${request.requester}</p>
                    <p class="text-gray-500 text-sm">${request.address}</p>
                </div>
                <div class="text-right">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}">
                        ${request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <div class="text-lg font-bold text-primary-green mt-1">${request.payment}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                    <span class="text-gray-500">Weight:</span>
                    <div class="font-medium">${request.estimatedWeight}</div>
                </div>
                <div>
                    <span class="text-gray-500">Distance:</span>
                    <div class="font-medium">${request.distance}</div>
                </div>
                <div>
                    <span class="text-gray-500">Preferred Date:</span>
                    <div class="font-medium">${new Date(request.preferredDate).toLocaleDateString()}</div>
                </div>
                <div>
                    <span class="text-gray-500">Time:</span>
                    <div class="font-medium">${request.preferredTime}</div>
                </div>
            </div>
            
            <p class="text-gray-700 text-sm mb-4">${request.description}</p>
            
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span><i class="fas fa-calendar mr-1"></i>Requested: ${new Date(request.requestDate).toLocaleDateString()}</span>
                    <span><i class="fas fa-phone mr-1"></i>${request.phone}</span>
                </div>
                
                <div class="flex space-x-2">
                    ${request.status === 'pending' ? `
                        <button onclick="event.stopPropagation(); CollectionRequests.quickAccept(${request.id})" 
                                class="worker-btn bg-green-600 text-white text-sm py-2 px-4">
                            <i class="fas fa-check"></i>
                            Accept
                        </button>
                        <button onclick="event.stopPropagation(); CollectionRequests.openScheduleModal(${request.id})" 
                                class="worker-btn bg-blue-600 text-white text-sm py-2 px-4">
                            <i class="fas fa-calendar"></i>
                            Schedule
                        </button>
                    ` : ''}
                    
                    ${request.status === 'accepted' || request.status === 'scheduled' ? `
                        <button onclick="event.stopPropagation(); CollectionRequests.openCompletionModal(${request.id})" 
                                class="worker-btn bg-primary-green text-white text-sm py-2 px-4">
                            <i class="fas fa-flag-checkered"></i>
                            Complete
                        </button>
                    ` : ''}
                    
                    <button onclick="event.stopPropagation(); CollectionRequests.callRequester(${request.id})" 
                            class="worker-btn bg-secondary-blue text-white text-sm py-2 px-3">
                        <i class="fas fa-phone"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    filterAndSortRequests() {
        let filtered = [...this.requests];

        // Apply filter
        switch (this.currentFilter) {
            case 'urgent':
                filtered = filtered.filter(r => r.urgency === 'high');
                break;
            case 'today':
                const today = new Date().toISOString().split('T')[0];
                filtered = filtered.filter(r => r.preferredDate === today);
                break;
            case 'pending':
                filtered = filtered.filter(r => r.status === 'pending');
                break;
            case 'accepted':
                filtered = filtered.filter(r => r.status === 'accepted' || r.status === 'scheduled');
                break;
            case 'completed':
                filtered = filtered.filter(r => r.status === 'completed');
                break;
        }

        // Apply sort
        switch (this.currentSort) {
            case 'urgency':
                const urgencyOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                filtered.sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
                break;
            case 'time':
                filtered.sort((a, b) => new Date(a.preferredDate) - new Date(b.preferredDate));
                break;
            case 'distance':
                filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
                break;
            case 'amount':
                filtered.sort((a, b) => parseInt(b.payment.replace('₹', '')) - parseInt(a.payment.replace('₹', '')));
                break;
        }

        return filtered;
    }

    filterRequests() {
        const filter = document.getElementById('request-filter');
        if (filter) {
            this.currentFilter = filter.value;
            this.renderRequests();
            
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak(`Showing ${this.currentFilter} requests`);
            }
        }
    }

    sortRequests() {
        const sort = document.getElementById('request-sort');
        if (sort) {
            this.currentSort = sort.value;
            this.renderRequests();
            
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak(`Sorted by ${this.currentSort}`);
            }
        }
    }

    openRequestModal(request) {
        this.currentRequest = request;
        const modal = document.getElementById('request-modal');
        const title = document.getElementById('request-modal-title');
        const details = document.getElementById('request-details');
        const actions = document.getElementById('request-actions');
        
        if (modal && title && details && actions) {
            title.textContent = request.title;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            this.populateRequestDetails(details, request);
            this.populateRequestActions(actions, request);
        }

        // Voice guidance
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Opening details for ${request.title} from ${request.requester}`);
        }
    }

    populateRequestDetails(container, request) {
        const urgencyColors = {
            'high': 'text-red-600',
            'medium': 'text-orange-600', 
            'low': 'text-blue-600'
        };

        container.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium text-gray-500">Requester</label>
                    <div class="text-gray-800">${request.requester}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Phone</label>
                    <div class="text-gray-800">${request.phone}</div>
                </div>
            </div>
            
            <div>
                <label class="text-sm font-medium text-gray-500">Address</label>
                <div class="text-gray-800">${request.address}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium text-gray-500">Urgency</label>
                    <div class="font-medium ${urgencyColors[request.urgency]}">${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Payment</label>
                    <div class="text-primary-green font-bold text-lg">${request.payment}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <label class="text-sm font-medium text-gray-500">Weight</label>
                    <div class="text-gray-800">${request.estimatedWeight}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Distance</label>
                    <div class="text-gray-800">${request.distance}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Waste Type</label>
                    <div class="text-gray-800 capitalize">${request.wasteType}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium text-gray-500">Preferred Date</label>
                    <div class="text-gray-800">${new Date(request.preferredDate).toLocaleDateString()}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Time Slot</label>
                    <div class="text-gray-800">${request.preferredTime}</div>
                </div>
            </div>
            
            <div>
                <label class="text-sm font-medium text-gray-500">Description</label>
                <div class="text-gray-800">${request.description}</div>
            </div>
            
            ${request.specialInstructions ? `
                <div>
                    <label class="text-sm font-medium text-gray-500">Special Instructions</label>
                    <div class="text-gray-800 bg-yellow-50 p-3 rounded-lg border border-yellow-200">${request.specialInstructions}</div>
                </div>
            ` : ''}
            
            ${request.completionNotes ? `
                <div>
                    <label class="text-sm font-medium text-gray-500">Completion Notes</label>
                    <div class="text-gray-800 bg-green-50 p-3 rounded-lg border border-green-200">${request.completionNotes}</div>
                </div>
            ` : ''}
        `;
    }

    populateRequestActions(container, request) {
        let actions = '';

        switch (request.status) {
            case 'pending':
                actions = `
                    <button onclick="CollectionRequests.acceptRequest(${request.id})" 
                            class="flex-1 worker-btn bg-green-600 text-white">
                        <i class="fas fa-check"></i>
                        <span>Accept Request</span>
                    </button>
                    <button onclick="CollectionRequests.openScheduleModal(${request.id})" 
                            class="flex-1 worker-btn bg-blue-600 text-white">
                        <i class="fas fa-calendar"></i>
                        <span>Schedule</span>
                    </button>
                    <button onclick="CollectionRequests.rejectRequest(${request.id})" 
                            class="worker-btn bg-red-600 text-white px-4">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                break;
            case 'accepted':
            case 'scheduled':
                actions = `
                    <button onclick="CollectionRequests.openCompletionModal(${request.id})" 
                            class="flex-1 worker-btn bg-primary-green text-white">
                        <i class="fas fa-flag-checkered"></i>
                        <span>Mark Completed</span>
                    </button>
                    <button onclick="CollectionRequests.getDirectionsToRequest(${request.id})" 
                            class="flex-1 worker-btn bg-secondary-blue text-white">
                        <i class="fas fa-directions"></i>
                        <span>Get Directions</span>
                    </button>
                `;
                break;
            case 'completed':
                actions = `
                    <button onclick="CollectionRequests.viewCompletion(${request.id})" 
                            class="flex-1 worker-btn bg-gray-600 text-white">
                        <i class="fas fa-eye"></i>
                        <span>View Details</span>
                    </button>
                    <button onclick="CollectionRequests.generateInvoice(${request.id})" 
                            class="flex-1 worker-btn bg-primary-green text-white">
                        <i class="fas fa-file-invoice"></i>
                        <span>Generate Invoice</span>
                    </button>
                `;
                break;
        }

        actions += `
            <button onclick="CollectionRequests.callRequester(${request.id})" 
                    class="worker-btn bg-accent-orange text-white px-4">
                <i class="fas fa-phone"></i>
            </button>
        `;

        container.innerHTML = actions;
    }

    closeModal() {
        const modal = document.getElementById('request-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.currentRequest = null;
    }

    acceptRequest(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        request.status = 'accepted';
        this.renderRequests();
        this.updateStats();
        this.closeModal();

        window.nav.showNotification(`Request "${request.title}" accepted successfully`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Request from ${request.requester} accepted. Payment: ${request.payment}`);
        }
    }

    quickAccept(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        request.status = 'accepted';
        this.renderRequests();
        this.updateStats();

        window.nav.showNotification(`Request "${request.title}" accepted`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.announceNewRequest(request.address, request.urgency);
        }
    }

    rejectRequest(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        const reason = prompt('Please provide a reason for rejection:');
        if (!reason) return;

        request.status = 'cancelled';
        request.rejectionReason = reason;
        
        this.renderRequests();
        this.updateStats();
        this.closeModal();

        window.nav.showNotification(`Request "${request.title}" rejected`, 'warning');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Request rejected. Reason: ${reason}`);
        }
    }

    openScheduleModal(requestId) {
        this.currentRequest = this.requests.find(r => r.id === requestId);
        if (!this.currentRequest) return;

        const modal = document.getElementById('schedule-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        // Pre-fill with request's preferred date and time
        const dateInput = document.getElementById('schedule-date');
        const timeSelect = document.getElementById('schedule-time');
        
        if (dateInput) {
            dateInput.value = this.currentRequest.preferredDate;
        }
        
        if (timeSelect) {
            timeSelect.value = this.currentRequest.preferredTime;
        }

        this.closeModal();

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Opening schedule form. Set your preferred collection time.');
        }
    }

    closeScheduleModal() {
        const modal = document.getElementById('schedule-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    confirmSchedule() {
        if (!this.currentRequest) return;

        const date = document.getElementById('schedule-date').value;
        const time = document.getElementById('schedule-time').value;
        const duration = document.getElementById('schedule-duration').value;
        const notes = document.getElementById('schedule-notes').value;

        if (!date || !time) {
            window.nav.showNotification('Please select date and time', 'warning');
            return;
        }

        // Update request
        this.currentRequest.status = 'scheduled';
        this.currentRequest.scheduledDate = date;
        this.currentRequest.scheduledTime = time;
        this.currentRequest.estimatedDuration = duration;
        this.currentRequest.schedulingNotes = notes;

        this.renderRequests();
        this.updateStats();
        this.closeScheduleModal();

        window.nav.showNotification(`Collection scheduled for ${new Date(date).toLocaleDateString()} ${time}`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Collection scheduled for ${new Date(date).toLocaleDateString()} at ${time}`);
        }
    }

    openCompletionModal(requestId) {
        this.currentRequest = this.requests.find(r => r.id === requestId);
        if (!this.currentRequest) return;

        const modal = document.getElementById('completion-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        // Reset form
        this.selectedQuality = null;
        this.completionPhoto = null;
        
        const weightInput = document.getElementById('actual-weight');
        const notesInput = document.getElementById('completion-notes');
        
        if (weightInput) {
            weightInput.value = this.currentRequest.estimatedWeight.replace('kg', '');
        }
        
        if (notesInput) {
            notesInput.value = '';
        }

        // Reset photo elements
        const photoCapture = document.getElementById('completion-photo-capture');
        const photo = document.getElementById('completion-photo');
        
        if (photoCapture && photo) {
            photoCapture.classList.remove('hidden');
            photo.classList.add('hidden');
        }

        this.closeModal();

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Opening completion form. Please fill in the collection details.');
        }
    }

    closeCompletionModal() {
        const modal = document.getElementById('completion-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    setCompletionQuality(quality) {
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

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`${quality} quality selected`);
        }
    }

    async captureCompletionPhoto() {
        try {
            const photo = await window.nav.capturePhoto();
            this.completionPhoto = photo;

            // Update UI
            const photoCapture = document.getElementById('completion-photo-capture');
            const photoImg = document.getElementById('completion-photo');
            
            if (photoCapture && photoImg) {
                photoCapture.classList.add('hidden');
                photoImg.src = photo.dataUrl;
                photoImg.classList.remove('hidden');
            }

            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak('Completion photo captured successfully');
            }

        } catch (error) {
            console.error('Error capturing completion photo:', error);
            window.nav.showNotification('Failed to capture photo', 'error');
        }
    }

    markCompleted() {
        if (!this.currentRequest) return;

        const weight = document.getElementById('actual-weight').value;
        const notes = document.getElementById('completion-notes').value;

        if (!weight || weight <= 0) {
            window.nav.showNotification('Please enter valid weight', 'warning');
            return;
        }

        if (!this.selectedQuality) {
            window.nav.showNotification('Please select collection quality', 'warning');
            return;
        }

        if (!this.completionPhoto) {
            window.nav.showNotification('Please take a completion photo', 'warning');
            return;
        }

        // Update request
        this.currentRequest.status = 'completed';
        this.currentRequest.completedDate = new Date().toISOString().split('T')[0];
        this.currentRequest.actualWeight = `${weight}kg`;
        this.currentRequest.completionQuality = this.selectedQuality;
        this.currentRequest.completionPhoto = this.completionPhoto;
        this.currentRequest.completionNotes = notes || 'Collection completed successfully';

        this.renderRequests();
        this.updateStats();
        this.closeCompletionModal();

        // Update earnings
        const earningsElement = document.getElementById('earnings-today');
        if (earningsElement) {
            const currentEarnings = parseInt(earningsElement.textContent.replace('₹', ''));
            const requestPayment = parseInt(this.currentRequest.payment.replace('₹', ''));
            earningsElement.textContent = `₹${currentEarnings + requestPayment}`;
        }

        window.nav.showNotification(`Request "${this.currentRequest.title}" completed successfully`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Collection completed. Earned ${this.currentRequest.payment}.`);
        }
    }

    acceptAllUrgent() {
        const urgentRequests = this.requests.filter(r => r.urgency === 'high' && r.status === 'pending');
        
        if (urgentRequests.length === 0) {
            window.nav.showNotification('No urgent requests to accept', 'info');
            return;
        }

        urgentRequests.forEach(request => {
            request.status = 'accepted';
        });

        this.renderRequests();
        this.updateStats();

        window.nav.showNotification(`${urgentRequests.length} urgent requests accepted`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`${urgentRequests.length} urgent requests accepted automatically`);
        }
    }

    callRequester(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        window.nav.showNotification(`Calling ${request.requester} at ${request.phone}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Calling ${request.requester}`);
        }
    }

    updateStats() {
        const urgent = this.requests.filter(r => r.urgency === 'high' && r.status === 'pending').length;
        const scheduled = this.requests.filter(r => 
            (r.status === 'accepted' || r.status === 'scheduled') && 
            r.preferredDate === new Date().toISOString().split('T')[0]
        ).length;
        const completed = this.requests.filter(r => r.status === 'completed').length;
        const total = this.requests.length;

        // Update UI
        const elements = {
            'urgent-requests': urgent,
            'scheduled-requests': scheduled,
            'completed-requests': completed,
            'total-requests': total
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        // Update dashboard pending requests
        const dashboardPending = document.getElementById('pending-requests');
        if (dashboardPending) {
            dashboardPending.textContent = urgent + scheduled;
        }
    }

    refreshRequests() {
        const hideLoading = window.nav.showLoading(document.querySelector('.trust-card'));
        
        // Simulate API call
        setTimeout(() => {
            this.loadRequestsData();
            hideLoading();
            window.nav.showNotification('Requests refreshed successfully', 'success');
            
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak('Requests updated');
            }
        }, 1500);
    }

    viewMap() {
        const modal = document.getElementById('map-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Opening map view with all request locations');
        }
    }

    closeMapModal() {
        const modal = document.getElementById('map-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    getDirections() {
        window.nav.showNotification('Opening directions in navigation app...', 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Opening navigation for optimal route');
        }
    }

    getDirectionsToRequest(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        window.nav.showNotification(`Getting directions to ${request.address}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Getting directions to ${request.requester} location`);
        }
    }

    viewCompletion(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        this.openRequestModal(request);
    }

    generateInvoice(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (!request) return;

        window.nav.showNotification(`Generating invoice for ${request.payment}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Generating invoice for ${request.payment}`);
        }
    }
}

// Initialize Collection Requests Manager
window.CollectionRequests = new CollectionRequestsManager();