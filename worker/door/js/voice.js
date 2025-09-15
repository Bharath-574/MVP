// Voice guidance system for workers
class VoiceGuidance {
    constructor() {
        this.isEnabled = false;
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.init();
    }

    init() {
        this.loadVoices();
        this.bindEvents();
        
        // Load voice preference from localStorage
        const savedPreference = localStorage.getItem('worker-voice-enabled');
        if (savedPreference === 'true') {
            this.enable();
        }
    }

    loadVoices() {
        this.voices = this.synthesis.getVoices();
        
        // Try to find a local language voice, fallback to English
        this.selectedVoice = this.voices.find(voice => 
            voice.lang.startsWith('hi') || voice.lang.startsWith('en')
        ) || this.voices[0];
        
        // If voices aren't loaded yet, wait for them
        if (this.voices.length === 0) {
            this.synthesis.addEventListener('voiceschanged', () => {
                this.loadVoices();
            });
        }
    }

    bindEvents() {
        const toggleButton = document.getElementById('voice-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggle();
            });
        }
    }

    enable() {
        this.isEnabled = true;
        const toggleButton = document.getElementById('voice-toggle');
        if (toggleButton) {
            toggleButton.classList.add('active');
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        localStorage.setItem('worker-voice-enabled', 'true');
        this.speak('Voice guidance enabled. I will help you navigate the dashboard.');
    }

    disable() {
        this.isEnabled = false;
        const toggleButton = document.getElementById('voice-toggle');
        if (toggleButton) {
            toggleButton.classList.remove('active');
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        localStorage.setItem('worker-voice-enabled', 'false');
        this.synthesis.cancel(); // Stop any ongoing speech
    }

    toggle() {
        if (this.isEnabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    speak(text, priority = 'normal') {
        if (!this.isEnabled || !this.synthesis) {
            return;
        }

        // Cancel previous speech if high priority
        if (priority === 'high') {
            this.synthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1;
        utterance.volume = 0.8;

        // Error handling
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
        };

        this.synthesis.speak(utterance);
    }

    // Predefined messages for common actions
    announceHouseStatus(houseNumber, status) {
        const messages = {
            'pending': `House ${houseNumber} is pending collection.`,
            'collected': `House ${houseNumber} waste collected successfully.`,
            'rejected': `House ${houseNumber} waste rejected due to poor segregation.`,
            'reported': `House ${houseNumber} has been reported for penalty.`
        };
        
        this.speak(messages[status] || `House ${houseNumber} status is ${status}.`);
    }

    announceRouteProgress(completed, total) {
        const percentage = Math.round((completed / total) * 100);
        this.speak(`Route progress: ${completed} out of ${total} houses completed. ${percentage} percent done.`);
    }

    announceCollectionComplete(houseNumber, wasteType) {
        this.speak(`Waste collection completed for house ${houseNumber}. ${wasteType} waste collected.`);
    }

    announcePenaltyIssued(houseNumber, reason) {
        this.speak(`Penalty issued to house ${houseNumber} for ${reason}.`);
    }

    announceNewRequest(location, urgency) {
        const urgencyText = urgency === 'high' ? 'urgent' : 'regular';
        this.speak(`New ${urgencyText} collection request received from ${location}.`, 'high');
    }

    announceEarnings(amount) {
        this.speak(`Today's earnings: ${amount} rupees.`);
    }

    // Interactive voice commands (future enhancement)
    startListening() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US'; // Can be changed based on locale
            
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };
            
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };
            
            recognition.start();
            this.speak('Listening for command...');
        } else {
            this.speak('Voice commands not supported on this device.');
        }
    }

    processVoiceCommand(command) {
        if (command.includes('collection') || command.includes('waste')) {
            window.nav.showSection('collection');
        } else if (command.includes('penalty') || command.includes('report')) {
            window.nav.showSection('penalties');
        } else if (command.includes('request')) {
            window.nav.showSection('requests');
        } else if (command.includes('scheme') || command.includes('benefit')) {
            window.nav.showSection('schemes');
        } else if (command.includes('profile')) {
            window.nav.showSection('profile');
        } else {
            this.speak('Command not recognized. Please try again.');
        }
    }

    // Help system
    provideHelp(section) {
        const helpTexts = {
            'collection': 'In this section, you can view your route, mark houses as collected, rejected, or pending. Tap on a house to see details and take action.',
            'penalties': 'Here you can report houses with poor waste segregation, issue penalties, and take photos as evidence.',
            'requests': 'This section shows special collection requests from residents. You can accept or schedule these requests.',
            'schemes': 'View your benefits, incentives, and earnings. Check your performance rewards and bonus schemes.',
            'profile': 'View and update your worker information, duty status, and contact details.'
        };
        
        this.speak(helpTexts[section] || 'Section help not available.');
    }
}

// Initialize voice guidance
window.VoiceGuide = new VoiceGuidance();