// Training Section Logic
window.Training = {
    init() {
        console.log('Training section initialized');
        this.trackVideoViews();
    },

    trackVideoViews() {
        const iframes = document.querySelectorAll('#training-section iframe');
        iframes.forEach((iframe, index) => {
            iframe.addEventListener('load', () => {
                console.log(`Training video ${index + 1} loaded`);
            });
        });
    },

    markVideoAsCompleted(videoId) {
        const completed = this.getCompletedVideos();
        if (!completed.includes(videoId)) {
            completed.push(videoId);
            localStorage.setItem('completedVideos', JSON.stringify(completed));
        }
    },

    getCompletedVideos() {
        const stored = localStorage.getItem('completedVideos');
        return stored ? JSON.parse(stored) : [];
    },

    getProgress() {
        const completed = this.getCompletedVideos();
        const total = 2; // Total number of training videos
        return {
            completed: completed.length,
            total: total,
            percentage: Math.round((completed.length / total) * 100)
        };
    }
};
