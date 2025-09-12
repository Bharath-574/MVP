// Navigation functionality
class Navigation {
    constructor() {
        this.sections = ['profile', 'training', 'complaints', 'marketplace', 'tracking', 'locations', 'blog'];
        this.currentSection = 'profile';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSection('profile');
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.showSection('profile');
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
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-white', 'text-primary-green', 'active');
        });
        
        // Find and activate the clicked button
        const activeBtn = document.querySelector(`[onclick="showSection('${section}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('bg-white', 'text-primary-green', 'active');
        }
        
        this.currentSection = section;
        
        // Initialize section-specific functionality
        this.initSectionSpecific(section);
    }

    initSectionSpecific(section) {
        switch(section) {
            case 'profile':
                if (window.Profile) window.Profile.init();
                break;
            case 'training':
                if (window.Training) window.Training.init();
                break;
            case 'complaints':
                if (window.Complaints) window.Complaints.init();
                break;
            case 'marketplace':
                if (window.Marketplace) window.Marketplace.init();
                break;
            case 'tracking':
                if (window.Tracking) window.Tracking.init();
                break;
            case 'locations':
                if (window.Locations) window.Locations.init();
                break;
            case 'blog':
                if (window.Blog) window.Blog.init();
                break;
        }
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
    window.nav = new Navigation();
});
