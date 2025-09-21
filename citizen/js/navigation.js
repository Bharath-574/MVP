// Navigation functionality
class Navigation {
    constructor() {
        this.sections = ['profile', 'training', 'complaints', 'marketplace', 'tracking', 'locations', 'blog'];
        this.currentSection = 'profile';
    }

    showSection(section) {
        console.log(`Attempting to show section: ${section}`);
        
        // Hide all sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(s => {
            s.classList.add('hidden');
            s.style.display = 'none';
        });
        
        // Show selected section
        const targetSection = document.getElementById(section + '-section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.style.display = 'block';
            console.log(`Section ${section} is now visible`);
        } else {
            console.error(`Section ${section}-section not found`);
        }
        
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-white', 'text-primary-green', 'active');
            btn.classList.add('bg-transparent', 'text-white');
        });
        
        // Find and activate the clicked button
        const activeBtn = document.querySelector(`[onclick="showSection('${section}')"]`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-transparent', 'text-white');
            activeBtn.classList.add('bg-white', 'text-primary-green', 'active');
        }
        
        this.currentSection = section;
        
        // Initialize section-specific functionality
        setTimeout(() => {
            this.initSectionSpecific(section);
        }, 100);
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

// Global function for navigation buttons
function showSection(section) {
    if (window.nav) {
        window.nav.showSection(section);
    } else {
        console.error('Navigation not initialized');
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (!window.nav) {
        window.nav = new Navigation();
    }
});
