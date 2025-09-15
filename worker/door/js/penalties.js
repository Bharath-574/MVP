// Penalties and Reports Management
class PenaltiesReportsManager {
    constructor() {
        this.currentReportType = null;
        this.selectedHouse = null;
        this.evidencePhotos = {
            before: null,
            after: null
        };
        this.currentLocation = null;
        this.reports = [];
        this.init();
    }

    init() {
        this.loadReportsData();
        this.bindEvents();
        this.getCurrentLocation();
    }

    bindEvents() {
        // Penalty amount selection
        const penaltyAmountSelect = document.getElementById('penalty-amount');
        if (penaltyAmountSelect) {
            penaltyAmountSelect.addEventListener('change', (e) => {
                const customInput = document.getElementById('custom-penalty');
                if (e.target.value === 'custom') {
                    customInput.classList.remove('hidden');
                    customInput.focus();
                } else {
                    customInput.classList.add('hidden');
                }
            });
        }
    }

    loadReportsData() {
        // Sample reports data - in real app, this would come from API
        this.reports = [
            {
                id: 1,
                type: 'penalty',
                houseNumber: 'A-104',
                residents: 'Singh Family',
                violation: 'Unsegregated waste',
                amount: 100,
                status: 'pending',
                timestamp: '2024-01-15 09:45 AM',
                description: 'Household mixed organic and plastic waste in same container',
                photos: ['before.jpg', 'after.jpg']
            },
            {
                id: 2,
                type: 'warning',
                houseNumber: 'A-107',
                residents: 'Gupta Family',
                violation: 'Improper timing',
                amount: 0,
                status: 'resolved',
                timestamp: '2024-01-15 08:30 AM',
                description: 'Waste placed outside collection time window',
                photos: ['warning.jpg']
            },
            {
                id: 3,
                type: 'complaint',
                houseNumber: 'A-110',
                residents: 'Sharma Family',
                violation: 'Excessive waste',
                amount: 0,
                status: 'pending',
                timestamp: '2024-01-14 04:20 PM',
                description: 'Household generating excessive waste beyond limit',
                photos: ['complaint.jpg']
            }
        ];

        this.renderRecentReports();
        this.renderPenaltyHouses();
        this.updateStats();
    }

    renderRecentReports() {
        const container = document.getElementById('recent-reports');
        if (!container) return;

        container.innerHTML = '';

        this.reports.slice(0, 5).forEach(report => {
            const reportCard = this.createReportCard(report);
            container.appendChild(reportCard);
        });
    }

    createReportCard(report) {
        const card = document.createElement('div');
        card.className = 'border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors';

        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'resolved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800'
        };

        const typeIcons = {
            'penalty': 'fas fa-gavel text-red-600',
            'warning': 'fas fa-exclamation-triangle text-orange-600',
            'complaint': 'fas fa-flag text-blue-600'
        };

        card.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-3">
                    <i class="${typeIcons[report.type]}"></i>
                    <div>
                        <h5 class="font-semibold">${report.houseNumber} - ${report.residents}</h5>
                        <p class="text-sm text-gray-600">${report.violation}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[report.status]}">
                        ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                    ${report.amount > 0 ? `<div class="text-sm font-semibold text-red-600 mt-1">₹${report.amount}</div>` : ''}
                </div>
            </div>
            
            <p class="text-sm text-gray-700 mb-2">${report.description}</p>
            
            <div class="flex items-center justify-between text-xs text-gray-500">
                <span><i class="fas fa-clock mr-1"></i>${report.timestamp}</span>
                <div class="flex space-x-2">
                    <button onclick="PenaltiesReports.viewReport(${report.id})" 
                            class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-eye"></i> View
                    </button>
                    ${report.status === 'pending' ? `
                        <button onclick="PenaltiesReports.editReport(${report.id})" 
                                class="text-green-600 hover:text-green-800">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        return card;
    }

    renderPenaltyHouses() {
        const container = document.getElementById('penalty-houses');
        if (!container) return;

        // Get rejected houses from collection module
        const rejectedHouses = window.WasteCollection ? 
            window.WasteCollection.houses.filter(h => h.status === 'rejected') : [];

        container.innerHTML = '';

        if (rejectedHouses.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    <i class="fas fa-check-circle text-4xl mb-2"></i>
                    <p>No houses requiring penalty action</p>
                </div>
            `;
            return;
        }

        rejectedHouses.forEach(house => {
            const houseCard = this.createPenaltyHouseCard(house);
            container.appendChild(houseCard);
        });
    }

    createPenaltyHouseCard(house) {
        const card = document.createElement('div');
        card.className = 'house-card rejected';

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-lg font-semibold">${house.number}</h4>
                <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
            
            <div class="space-y-2 text-sm text-gray-600 mb-4">
                <div><i class="fas fa-home w-4"></i> ${house.address}</div>
                <div><i class="fas fa-users w-4"></i> ${house.residents}</div>
                <div class="text-red-600"><i class="fas fa-exclamation w-4"></i> ${house.rejectionReason}</div>
                <div><i class="fas fa-clock w-4"></i> ${house.collectionTime}</div>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="PenaltiesReports.quickPenalty(${house.id})" 
                        class="flex-1 worker-btn bg-red-600 text-white text-sm py-2">
                    <i class="fas fa-gavel"></i>
                    Issue Penalty
                </button>
                <button onclick="PenaltiesReports.giveWarning(${house.id})" 
                        class="flex-1 worker-btn bg-orange-600 text-white text-sm py-2">
                    <i class="fas fa-exclamation"></i>
                    Warning
                </button>
            </div>
        `;

        return card;
    }

    openReportModal(type) {
        this.currentReportType = type;
        const modal = document.getElementById('report-modal');
        const title = document.getElementById('report-modal-title');
        
        if (modal && title) {
            const titles = {
                'penalty': 'Issue Penalty',
                'warning': 'Issue Warning', 
                'complaint': 'File Complaint'
            };
            
            title.textContent = titles[type];
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        this.populateHouseSelect();
        this.setupReportTypeOptions(type);
        this.resetReportForm();

        // Voice guidance
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Opening ${type} form. Please fill in the required details.`);
        }
    }

    closeReportModal() {
        const modal = document.getElementById('report-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.resetReportForm();
    }

    populateHouseSelect() {
        const select = document.getElementById('report-house-select');
        if (!select) return;

        select.innerHTML = '<option value="">Choose a house...</option>';

        // Get houses from collection module
        const houses = window.WasteCollection ? window.WasteCollection.houses : [];
        
        houses.forEach(house => {
            const option = document.createElement('option');
            option.value = house.id;
            option.textContent = `${house.number} - ${house.residents}`;
            select.appendChild(option);
        });
    }

    setupReportTypeOptions(type) {
        const container = document.getElementById('report-type-container');
        const penaltySection = document.getElementById('penalty-amount-section');
        
        if (!container) return;

        container.innerHTML = '';

        if (type === 'penalty') {
            penaltySection.classList.remove('hidden');
            container.innerHTML = `
                <label class="flex items-center p-3 border border-red-200 rounded-lg hover:border-red-400 cursor-pointer">
                    <input type="radio" name="report-type" value="fine" class="mr-3" checked>
                    <div>
                        <div class="font-medium">Financial Penalty</div>
                        <div class="text-sm text-gray-600">Issue monetary fine for violation</div>
                    </div>
                </label>
            `;
        } else if (type === 'warning') {
            penaltySection.classList.add('hidden');
            container.innerHTML = `
                <label class="flex items-center p-3 border border-orange-200 rounded-lg hover:border-orange-400 cursor-pointer">
                    <input type="radio" name="report-type" value="verbal" class="mr-3" checked>
                    <div>
                        <div class="font-medium">Verbal Warning</div>
                        <div class="text-sm text-gray-600">Issue verbal warning to resident</div>
                    </div>
                </label>
                <label class="flex items-center p-3 border border-orange-200 rounded-lg hover:border-orange-400 cursor-pointer">
                    <input type="radio" name="report-type" value="written" class="mr-3">
                    <div>
                        <div class="font-medium">Written Warning</div>
                        <div class="text-sm text-gray-600">Formal written warning notice</div>
                    </div>
                </label>
            `;
        } else if (type === 'complaint') {
            penaltySection.classList.add('hidden');
            container.innerHTML = `
                <label class="flex items-center p-3 border border-blue-200 rounded-lg hover:border-blue-400 cursor-pointer">
                    <input type="radio" name="report-type" value="formal" class="mr-3" checked>
                    <div>
                        <div class="font-medium">Formal Complaint</div>
                        <div class="text-sm text-gray-600">Official complaint requiring investigation</div>
                    </div>
                </label>
                <label class="flex items-center p-3 border border-blue-200 rounded-lg hover:border-blue-400 cursor-pointer">
                    <input type="radio" name="report-type" value="escalation" class="mr-3">
                    <div>
                        <div class="font-medium">Escalate to Supervisor</div>
                        <div class="text-sm text-gray-600">Forward to higher authority</div>
                    </div>
                </label>
            `;
        }
    }

    resetReportForm() {
        this.selectedHouse = null;
        this.evidencePhotos = { before: null, after: null };
        
        // Clear form fields
        const fields = [
            'report-house-select',
            'report-description',
            'penalty-amount',
            'custom-penalty'
        ];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
            }
        });

        // Clear checkboxes
        document.querySelectorAll('.violation-checkbox').forEach(cb => {
            cb.checked = false;
        });

        // Reset photo elements
        ['before', 'after'].forEach(type => {
            const btn = document.getElementById(`${type}-photo-btn`);
            const img = document.getElementById(`${type}-photo`);
            
            if (btn && img) {
                btn.classList.remove('hidden');
                img.classList.add('hidden');
            }
        });
    }

    async captureEvidence(type) {
        try {
            const photo = await window.nav.capturePhoto();
            this.evidencePhotos[type] = photo;

            // Update UI
            const btn = document.getElementById(`${type}-photo-btn`);
            const img = document.getElementById(`${type}-photo`);
            
            if (btn && img) {
                btn.classList.add('hidden');
                img.src = photo.dataUrl;
                img.classList.remove('hidden');
            }

            // Voice feedback
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak(`${type} photo captured successfully`);
            }

            window.nav.showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} photo captured`, 'success');

        } catch (error) {
            console.error('Error capturing evidence:', error);
            window.nav.showNotification('Failed to capture photo', 'error');
        }
    }

    async getCurrentLocation() {
        try {
            const location = await window.nav.getCurrentLocation();
            this.currentLocation = location;
            
            const locationInput = document.getElementById('report-location');
            if (locationInput) {
                locationInput.value = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
            }
            
        } catch (error) {
            console.error('Error getting location:', error);
            const locationInput = document.getElementById('report-location');
            if (locationInput) {
                locationInput.value = 'Location unavailable';
            }
        }
    }

    validateReportForm() {
        const houseSelect = document.getElementById('report-house-select');
        const description = document.getElementById('report-description');
        
        if (!houseSelect.value) {
            window.nav.showNotification('Please select a house', 'warning');
            return false;
        }

        if (!description.value.trim()) {
            window.nav.showNotification('Please provide a description', 'warning');
            return false;
        }

        if (!this.evidencePhotos.before) {
            window.nav.showNotification('Before photo is required', 'warning');
            return false;
        }

        const violations = Array.from(document.querySelectorAll('.violation-checkbox:checked'));
        if (violations.length === 0) {
            window.nav.showNotification('Please select at least one violation', 'warning');
            return false;
        }

        if (this.currentReportType === 'penalty') {
            const penaltyAmount = document.getElementById('penalty-amount');
            const customPenalty = document.getElementById('custom-penalty');
            
            if (!penaltyAmount.value) {
                window.nav.showNotification('Please select penalty amount', 'warning');
                return false;
            }
            
            if (penaltyAmount.value === 'custom' && (!customPenalty.value || customPenalty.value <= 0)) {
                window.nav.showNotification('Please enter valid custom penalty amount', 'warning');
                return false;
            }
        }

        return true;
    }

    submitReport() {
        if (!this.validateReportForm()) {
            return;
        }

        // Collect form data
        const houseSelect = document.getElementById('report-house-select');
        const description = document.getElementById('report-description').value;
        const violations = Array.from(document.querySelectorAll('.violation-checkbox:checked'))
            .map(cb => cb.value);
        
        let amount = 0;
        if (this.currentReportType === 'penalty') {
            const penaltySelect = document.getElementById('penalty-amount');
            const customPenalty = document.getElementById('custom-penalty');
            
            amount = penaltySelect.value === 'custom' ? 
                parseInt(customPenalty.value) : 
                parseInt(penaltySelect.value);
        }

        const selectedHouse = window.WasteCollection.houses.find(h => h.id === parseInt(houseSelect.value));

        const newReport = {
            id: this.reports.length + 1,
            type: this.currentReportType,
            houseNumber: selectedHouse.number,
            residents: selectedHouse.residents,
            violation: violations.join(', '),
            amount: amount,
            status: 'pending',
            timestamp: new Date().toLocaleString('en-US', { 
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            description: description,
            photos: [this.evidencePhotos.before, this.evidencePhotos.after].filter(p => p),
            location: this.currentLocation
        };

        // Add to reports array
        this.reports.unshift(newReport);

        // Update UI
        this.renderRecentReports();
        this.updateStats();
        this.closeReportModal();

        // Voice feedback
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            const message = this.currentReportType === 'penalty' ?
                `Penalty of ${amount} rupees issued to house ${selectedHouse.number}` :
                `${this.currentReportType} issued to house ${selectedHouse.number}`;
            window.VoiceGuide.speak(message);
        }

        window.nav.showNotification(`${this.currentReportType.charAt(0).toUpperCase() + this.currentReportType.slice(1)} submitted successfully`, 'success');
    }

    saveDraft() {
        window.nav.showNotification('Report saved as draft', 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Report saved as draft. You can complete it later.');
        }
    }

    quickPenalty(houseId) {
        const house = window.WasteCollection.houses.find(h => h.id === houseId);
        if (!house) return;

        this.openReportModal('penalty');
        
        // Pre-fill form
        setTimeout(() => {
            const houseSelect = document.getElementById('report-house-select');
            if (houseSelect) {
                houseSelect.value = houseId;
            }
            
            // Check unsegregated waste violation
            const unsegregatedCheckbox = document.querySelector('.violation-checkbox[value="unsegregated"]');
            if (unsegregatedCheckbox) {
                unsegregatedCheckbox.checked = true;
            }
            
            // Set default penalty amount
            const penaltySelect = document.getElementById('penalty-amount');
            if (penaltySelect) {
                penaltySelect.value = '100';
            }
            
            // Pre-fill description
            const description = document.getElementById('report-description');
            if (description) {
                description.value = `House ${house.number} rejected due to poor waste segregation. Mixed organic and non-organic waste found.`;
            }
        }, 100);
    }

    giveWarning(houseId) {
        const house = window.WasteCollection.houses.find(h => h.id === houseId);
        if (!house) return;

        this.openReportModal('warning');
        
        // Pre-fill form
        setTimeout(() => {
            const houseSelect = document.getElementById('report-house-select');
            if (houseSelect) {
                houseSelect.value = houseId;
            }
            
            // Pre-fill description
            const description = document.getElementById('report-description');
            if (description) {
                description.value = `First warning issued to house ${house.number} for improper waste segregation. Please educate residents on proper segregation practices.`;
            }
        }, 100);
    }

    updateStats() {
        const penaltiesToday = this.reports.filter(r => 
            r.type === 'penalty' && 
            new Date(r.timestamp).toDateString() === new Date().toDateString()
        ).length;
        
        const warningsToday = this.reports.filter(r => 
            r.type === 'warning' && 
            new Date(r.timestamp).toDateString() === new Date().toDateString()
        ).length;
        
        const pendingReviews = this.reports.filter(r => r.status === 'pending').length;
        const resolvedIssues = this.reports.filter(r => r.status === 'resolved').length;

        // Update UI
        const elements = {
            'penalties-today': penaltiesToday,
            'warnings-today': warningsToday,
            'pending-reviews': pendingReviews,
            'resolved-issues': resolvedIssues
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        // Update dashboard penalty count
        const dashboardPenalties = document.getElementById('penalties-issued');
        if (dashboardPenalties) {
            dashboardPenalties.textContent = penaltiesToday;
        }
    }

    scanQRCode() {
        const modal = document.getElementById('qr-scanner-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('QR scanner opened. Position the house QR code within the frame.');
        }
    }

    startQRScan() {
        // In real implementation, this would start the camera and QR scanner
        window.nav.showNotification('QR scanning feature will be implemented with camera integration', 'info');
        
        // Simulate successful scan
        setTimeout(() => {
            this.closeQRModal();
            window.nav.showNotification('House A-105 scanned successfully', 'success');
            
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak('House A-105 scanned successfully. Opening report form.');
            }
            
            // Auto-open penalty form for scanned house
            this.openReportModal('penalty');
        }, 2000);
    }

    closeQRModal() {
        const modal = document.getElementById('qr-scanner-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    generateReport() {
        window.nav.showNotification('Generating PDF report...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            window.nav.showNotification('Daily report generated successfully', 'success');
            
            if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
                window.VoiceGuide.speak('Daily penalty report generated and ready for download.');
            }
        }, 2000);
    }

    viewHistory() {
        const modal = document.getElementById('history-modal');
        const content = document.getElementById('history-content');
        
        if (modal && content) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Populate history
            content.innerHTML = '';
            this.reports.forEach(report => {
                const reportCard = this.createReportCard(report);
                content.appendChild(reportCard);
            });
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Showing ${this.reports.length} reports in history.`);
        }
    }

    closeHistoryModal() {
        const modal = document.getElementById('history-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    viewReport(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (!report) return;

        window.nav.showNotification(`Viewing report #${reportId}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Viewing ${report.type} report for house ${report.houseNumber}`);
        }
    }

    editReport(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (!report) return;

        if (report.status !== 'pending') {
            window.nav.showNotification('Only pending reports can be edited', 'warning');
            return;
        }

        window.nav.showNotification(`Editing report #${reportId}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Opening edit form for ${report.type} report`);
        }

        // Open modal with pre-filled data
        this.openReportModal(report.type);
        // Implementation for pre-filling form data would go here
    }
}

// Initialize Penalties Reports Manager
window.PenaltiesReports = new PenaltiesReportsManager();