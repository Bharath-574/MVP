// Worker Profile Management Class
class WorkerProfile {
    constructor() {
        this.workerData = {
            personal: {
                fullName: "राम कुमार शर्मा",
                phone: "+91 98765 43210",
                email: "ram.kumar@wastemanagement.gov.in",
                dateOfBirth: "1985-08-15",
                gender: "male",
                house: "123",
                street: "Gandhi Nagar",
                city: "Indore",
                pincode: "452001",
                state: "Madhya Pradesh"
            },
            work: {
                employeeId: "WM2024001",
                department: "Door-to-Door Collection",
                designation: "Collection Worker",
                joiningDate: "2023-03-15",
                employmentType: "Full-time",
                assignedRoute: "Sector 12A - Residential",
                areaCoverage: "150 households",
                shiftTiming: "morning",
                vehicleType: "e-rickshaw",
                supervisor: "Mr. Rajesh Kumar (+91 98765 43200)"
            },
            performance: {
                totalCollections: 156,
                rating: 4.8,
                efficiency: 94,
                cityRank: 12,
                monthlyTarget: 160,
                satisfaction: 4.8,
                onTimePerformance: 94
            },
            settings: {
                language: "en",
                voiceGuidance: true,
                highContrast: false,
                autoBackup: true,
                notifications: {
                    routeUpdates: true,
                    newRequests: true,
                    performance: false,
                    schemes: true
                }
            }
        };

        this.dutyStatus = true; // On duty by default
        this.currentTab = 'personal';
        this.init();
    }

    init() {
        this.loadWorkerData();
        this.loadPerformanceData();
        this.loadFeedback();
        this.loadAchievements();
        this.setupEventListeners();
        this.showTab('personal');
    }

    // Tab Management
    showTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });

        // Remove active class from all tabs
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('active', 'border-primary-green', 'text-primary-green');
            tab.classList.add('border-transparent', 'text-gray-500');
        });

        // Show selected tab content
        const tabContent = document.getElementById(`${tabName}-tab`);
        if (tabContent) {
            tabContent.classList.remove('hidden');
        }

        // Add active class to selected tab
        const activeTab = document.querySelector(`[onclick="WorkerProfile.showTab('${tabName}')"]`);
        if (activeTab) {
            activeTab.classList.add('active', 'border-primary-green', 'text-primary-green');
            activeTab.classList.remove('border-transparent', 'text-gray-500');
        }

        this.currentTab = tabName;

        // Announce tab change for accessibility
        if (window.voiceGuidance) {
            window.voiceGuidance.speak(`${tabName} tab selected`);
        }
    }

    // Load Worker Data
    loadWorkerData() {
        // Header information
        document.getElementById('worker-name').textContent = this.workerData.personal.fullName;
        document.getElementById('worker-id').textContent = this.workerData.work.employeeId;
        document.getElementById('worker-department').textContent = this.workerData.work.department;
        document.getElementById('worker-experience').textContent = this.calculateExperience();
        document.getElementById('worker-shift').textContent = this.formatShiftTiming();

        // Quick stats
        document.getElementById('profile-collections').textContent = this.workerData.performance.totalCollections;
        document.getElementById('profile-rating').textContent = this.workerData.performance.rating;
        document.getElementById('profile-efficiency').textContent = `${this.workerData.performance.efficiency}%`;
        document.getElementById('profile-rank').textContent = this.workerData.performance.cityRank;

        // Personal information form
        this.populatePersonalForm();
        this.populateWorkForm();
        this.loadSettings();
    }

    populatePersonalForm() {
        const personal = this.workerData.personal;
        document.getElementById('worker-full-name').value = personal.fullName;
        document.getElementById('worker-phone').value = personal.phone;
        document.getElementById('worker-email').value = personal.email;
        document.getElementById('worker-dob').value = personal.dateOfBirth;
        document.getElementById('worker-gender').value = personal.gender;
        document.getElementById('worker-house').value = personal.house;
        document.getElementById('worker-street').value = personal.street;
        document.getElementById('worker-city').value = personal.city;
        document.getElementById('worker-pincode').value = personal.pincode;
        document.getElementById('worker-state').value = personal.state;
    }

    populateWorkForm() {
        const work = this.workerData.work;
        document.getElementById('employee-id').value = work.employeeId;
        document.getElementById('department').value = work.department;
        document.getElementById('designation').value = work.designation;
        document.getElementById('joining-date').value = work.joiningDate;
        document.getElementById('employment-type').value = work.employmentType;
        document.getElementById('assigned-route').value = work.assignedRoute;
        document.getElementById('area-coverage').value = work.areaCoverage;
        document.getElementById('shift-timing').value = work.shiftTiming;
        document.getElementById('vehicle-type').value = work.vehicleType;
        document.getElementById('supervisor').value = work.supervisor;
    }

    loadSettings() {
        const settings = this.workerData.settings;
        document.getElementById('voice-setting').checked = settings.voiceGuidance;
        document.getElementById('contrast-setting').checked = settings.highContrast;
    }

    // Performance Data
    loadPerformanceData() {
        // This would typically fetch from an API
        // For now, using mock data
        this.updatePerformanceDisplay();
    }

    updatePerformanceDisplay() {
        const performance = this.workerData.performance;
        
        // Update progress bars and statistics
        // This is handled by the existing data loading
        console.log('Performance data loaded:', performance);
    }

    // Load Recent Feedback
    loadFeedback() {
        const feedbackContainer = document.getElementById('recent-feedback');
        const feedbackData = [
            {
                rating: 5,
                comment: "Very punctual and professional service. Keep up the good work!",
                resident: "Mrs. Sharma",
                date: "2024-01-15",
                area: "Sector 12A"
            },
            {
                rating: 5,
                comment: "Excellent waste segregation guidance provided.",
                resident: "Mr. Patel",
                date: "2024-01-14",
                area: "Sector 12A"
            },
            {
                rating: 4,
                comment: "Good service, but could be more regular with timing.",
                resident: "Ms. Singh",
                date: "2024-01-13",
                area: "Sector 12A"
            }
        ];

        feedbackContainer.innerHTML = feedbackData.map(feedback => `
            <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <div class="flex text-yellow-400">
                            ${Array(5).fill(0).map((_, i) => 
                                `<i class="fas fa-star${i < feedback.rating ? '' : ' text-gray-300'}"></i>`
                            ).join('')}
                        </div>
                        <span class="text-sm text-gray-600">${feedback.rating}/5</span>
                    </div>
                    <span class="text-xs text-gray-500">${feedback.date}</span>
                </div>
                <p class="text-gray-700 mb-2">"${feedback.comment}"</p>
                <div class="text-sm text-gray-600">
                    <span class="font-medium">${feedback.resident}</span> • ${feedback.area}
                </div>
            </div>
        `).join('');
    }

    // Load Achievements
    loadAchievements() {
        const achievementsContainer = document.getElementById('achievements');
        const achievements = [
            { icon: 'trophy', title: 'Top Performer', description: 'Best collection rate this month', earned: true },
            { icon: 'clock', title: 'Punctuality King', description: '95% on-time performance', earned: true },
            { icon: 'users', title: 'Customer Favorite', description: '4.8+ rating for 3 months', earned: true },
            { icon: 'leaf', title: 'Green Champion', description: 'Environmental awareness leader', earned: false },
            { icon: 'star', title: 'Excellence Award', description: 'Annual recognition', earned: false },
            { icon: 'certificate', title: 'Safety First', description: 'Zero safety incidents', earned: true },
            { icon: 'handshake', title: 'Team Player', description: 'Best collaboration', earned: false },
            { icon: 'medal', title: 'Innovation Badge', description: 'Process improvement', earned: false }
        ];

        achievementsContainer.innerHTML = achievements.map(achievement => `
            <div class="text-center p-4 rounded-lg ${achievement.earned ? 'bg-green-50' : 'bg-gray-50'}">
                <div class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center
                           ${achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}">
                    <i class="fas fa-${achievement.icon} text-xl"></i>
                </div>
                <div class="text-sm font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}">
                    ${achievement.title}
                </div>
                <div class="text-xs text-gray-500 mt-1">${achievement.description}</div>
                ${achievement.earned ? '<div class="text-xs text-green-600 mt-1">✓ Earned</div>' : ''}
            </div>
        `).join('');
    }

    // Helper Functions
    calculateExperience() {
        const joinDate = new Date(this.workerData.work.joiningDate);
        const today = new Date();
        const diffMonths = (today.getFullYear() - joinDate.getFullYear()) * 12 + 
                          (today.getMonth() - joinDate.getMonth());
        
        if (diffMonths < 12) {
            return `${diffMonths} months`;
        } else {
            const years = Math.floor(diffMonths / 12);
            const months = diffMonths % 12;
            return months > 0 ? `${years}.${months} years` : `${years} years`;
        }
    }

    formatShiftTiming() {
        const shifts = {
            'morning': 'Morning',
            'afternoon': 'Afternoon', 
            'night': 'Night'
        };
        return shifts[this.workerData.work.shiftTiming] || 'Morning';
    }

    // Event Handlers
    setupEventListeners() {
        // Voice setting toggle
        const voiceSetting = document.getElementById('voice-setting');
        if (voiceSetting) {
            voiceSetting.addEventListener('change', (e) => {
                this.workerData.settings.voiceGuidance = e.target.checked;
                if (window.voiceGuidance) {
                    if (e.target.checked) {
                        window.voiceGuidance.speak("Voice guidance enabled");
                    } else {
                        window.voiceGuidance.speak("Voice guidance disabled");
                    }
                }
                this.saveSettings();
            });
        }

        // High contrast toggle
        const contrastSetting = document.getElementById('contrast-setting');
        if (contrastSetting) {
            contrastSetting.addEventListener('change', (e) => {
                this.workerData.settings.highContrast = e.target.checked;
                document.body.classList.toggle('high-contrast', e.target.checked);
                this.saveSettings();
            });
        }
    }

    // Save Functions
    savePersonalInfo() {
        const personalData = {
            fullName: document.getElementById('worker-full-name').value,
            phone: document.getElementById('worker-phone').value,
            email: document.getElementById('worker-email').value,
            dateOfBirth: document.getElementById('worker-dob').value,
            gender: document.getElementById('worker-gender').value,
            house: document.getElementById('worker-house').value,
            street: document.getElementById('worker-street').value,
            city: document.getElementById('worker-city').value,
            pincode: document.getElementById('worker-pincode').value,
            state: document.getElementById('worker-state').value
        };

        // Validate required fields
        if (!personalData.fullName || !personalData.phone) {
            alert('Please fill in all required fields');
            return;
        }

        // Update local data
        this.workerData.personal = { ...this.workerData.personal, ...personalData };

        // Show success message
        this.showSuccessMessage('Personal information updated successfully!');

        // Voice feedback
        if (window.voiceGuidance) {
            window.voiceGuidance.speak("Personal information saved successfully");
        }

        // In a real app, this would make an API call
        console.log('Saving personal info:', personalData);
    }

    saveWorkDetails() {
        const workData = {
            shiftTiming: document.getElementById('shift-timing').value,
            vehicleType: document.getElementById('vehicle-type').value
        };

        // Update local data
        this.workerData.work = { ...this.workerData.work, ...workData };

        // Show success message
        this.showSuccessMessage('Work details updated successfully!');

        // Voice feedback
        if (window.voiceGuidance) {
            window.voiceGuidance.speak("Work details saved successfully");
        }

        console.log('Saving work details:', workData);
    }

    saveSettings() {
        // In a real app, this would save to backend/localStorage
        localStorage.setItem('workerSettings', JSON.stringify(this.workerData.settings));
        console.log('Settings saved:', this.workerData.settings);
    }

    resetPersonalInfo() {
        if (confirm('Are you sure you want to reset all changes?')) {
            this.populatePersonalForm();
            this.showSuccessMessage('Information reset to original values');
            
            if (window.voiceGuidance) {
                window.voiceGuidance.speak("Information reset completed");
            }
        }
    }

    // Duty Status Management
    toggleDutyStatus() {
        this.dutyStatus = !this.dutyStatus;
        
        const statusIndicator = document.querySelector('.worker-status-indicator');
        const toggleButton = statusIndicator.nextElementSibling;
        
        if (this.dutyStatus) {
            statusIndicator.innerHTML = `
                <i class="fas fa-circle text-green-500"></i>
                <span class="text-sm font-medium">On Duty</span>
            `;
            toggleButton.innerHTML = `
                <i class="fas fa-power-off"></i>
                <span>End Shift</span>
            `;
            toggleButton.className = 'worker-btn bg-red-600 text-white text-sm';
        } else {
            statusIndicator.innerHTML = `
                <i class="fas fa-circle text-red-500"></i>
                <span class="text-sm font-medium">Off Duty</span>
            `;
            toggleButton.innerHTML = `
                <i class="fas fa-play"></i>
                <span>Start Shift</span>
            `;
            toggleButton.className = 'worker-btn bg-green-600 text-white text-sm';
        }

        if (window.voiceGuidance) {
            window.voiceGuidance.speak(this.dutyStatus ? "You are now on duty" : "You are now off duty");
        }
    }

    // Security Functions
    changePassword() {
        const newPassword = prompt('Enter new password:');
        if (newPassword && newPassword.length >= 6) {
            // In real app, this would make secure API call
            this.showSuccessMessage('Password changed successfully!');
            if (window.voiceGuidance) {
                window.voiceGuidance.speak("Password updated successfully");
            }
        } else if (newPassword) {
            alert('Password must be at least 6 characters long');
        }
    }

    setupBiometric() {
        // Check if biometric authentication is available
        if ('credentials' in navigator) {
            this.showSuccessMessage('Biometric setup initiated. Please follow the prompts.');
            if (window.voiceGuidance) {
                window.voiceGuidance.speak("Setting up biometric authentication");
            }
        } else {
            alert('Biometric authentication is not supported on this device');
        }
    }

    logoutAllDevices() {
        if (confirm('This will log you out from all devices. Continue?')) {
            this.showSuccessMessage('Logged out from all devices successfully');
            if (window.voiceGuidance) {
                window.voiceGuidance.speak("Logged out from all devices");
            }
        }
    }

    // Support Functions
    contactSupport() {
        const supportData = {
            phone: '+91 1800-123-4567',
            email: 'support@wastemanagement.gov.in',
            hours: '24/7 Available'
        };

        const message = `Support Contact Details:\n\nPhone: ${supportData.phone}\nEmail: ${supportData.email}\nAvailability: ${supportData.hours}`;
        alert(message);

        if (window.voiceGuidance) {
            window.voiceGuidance.speak("Support contact details displayed");
        }
    }

    viewFAQ() {
        const faqUrl = '/faq/worker-help';
        window.open(faqUrl, '_blank');
        
        if (window.voiceGuidance) {
            window.voiceGuidance.speak("Opening frequently asked questions");
        }
    }

    reportBug() {
        const bugReport = prompt('Please describe the issue you encountered:');
        if (bugReport) {
            // In real app, this would submit to bug tracking system
            this.showSuccessMessage('Bug report submitted. Reference ID: BUG' + Date.now());
            if (window.voiceGuidance) {
                window.voiceGuidance.speak("Bug report submitted successfully");
            }
        }
    }

    // Utility Functions
    showSuccessMessage(message) {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize Worker Profile
window.WorkerProfile = new WorkerProfile();