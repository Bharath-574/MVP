// Navigation functionality for Worker Dashboard
class WorkerNavigation {
    constructor() {
        this.sections = ['collection', 'penalties', 'requests', 'schemes', 'profile'];
        this.currentSection = 'collection';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSection('collection');
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.showSection('collection');
        });
    }

    showSection(section) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        
        // Show selected section
        const targetSection = document.getElementById(section + '-section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Update nav buttons
        document.querySelectorAll('.worker-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find and activate the clicked button
        const activeBtn = document.querySelector(`[onclick="showSection('${section}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.currentSection = section;
        
        // Initialize section-specific functionality
        this.initSectionSpecific(section);
        
        // Announce section change for voice guidance
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            this.announceSection(section);
        }
    }

    announceSection(section) {
        const announcements = {
            'collection': 'Waste Collection section opened. Here you can manage your daily collection route.',
            'penalties': 'Penalties and Reports section opened. Here you can report and penalize unsegregated waste.',
            'requests': 'Collection Requests section opened. Here you can view and manage special collection requests.',
            'schemes': 'Schemes and Benefits section opened. Here you can view your benefits and incentives.',
            'profile': 'Profile section opened. Here you can view and update your worker information.'
        };
        
        if (window.VoiceGuide) {
            window.VoiceGuide.speak(announcements[section] || 'Section changed.');
        }
    }

    initSectionSpecific(section) {
        switch(section) {
            case 'collection':
                if (window.WasteCollection) window.WasteCollection.init();
                break;
            case 'penalties':
                if (window.PenaltiesReports) window.PenaltiesReports.init();
                break;
            case 'requests':
                if (window.CollectionRequests) window.CollectionRequests.init();
                break;
            case 'schemes':
                if (window.SchemesBeifits) window.SchemesBeifits.init();
                break;
            case 'profile':
                if (window.WorkerProfile) window.WorkerProfile.init();
                break;
        }
    }

    // Method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Also announce via voice if enabled
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(message);
        }
    }

    // Method to show loading state
    showLoading(element) {
        const loader = document.createElement('div');
        loader.className = 'loading-spinner';
        loader.style.margin = '0 auto';
        
        const originalContent = element.innerHTML;
        element.innerHTML = '';
        element.appendChild(loader);
        
        return () => {
            element.innerHTML = originalContent;
        };
    }

    // Method to handle GPS location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        });
    }

    // Method to capture photo
    capturePhoto() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.capture = 'environment'; // Use rear camera if available
            
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve({
                            file: file,
                            dataUrl: e.target.result,
                            timestamp: new Date().toISOString()
                        });
                    };
                    reader.readAsDataURL(file);
                } else {
                    reject(new Error('No photo selected'));
                }
            };
            
            input.click();
        });
    }
}

// Global function for navigation (to maintain compatibility)
function showSection(section) {
    if (window.nav) {
        window.nav.showSection(section);
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.nav = new WorkerNavigation();
});