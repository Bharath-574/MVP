// Schemes and Benefits Management  
class SchemesBeifitsManager {
    constructor() {
        this.schemes = [];
        this.incentives = [];
        this.challenges = [];
        this.governmentBenefits = [];
        this.rewardStore = [];
        this.userStats = {};
        this.selectedItem = null;
        this.selectedRewards = [];
        this.init();
    }

    init() {
        this.loadSchemesData();
        this.bindEvents();
    }

    bindEvents() {
        // Add any specific event bindings here
    }

    loadSchemesData() {
        // Sample schemes data
        this.schemes = [
            {
                id: 1,
                title: "Daily Collection Bonus",
                description: "Complete your daily route with 95%+ houses collected",
                reward: "₹50 bonus",
                icon: "fas fa-calendar-day",
                color: "bg-green-500",
                progress: 92,
                target: 95,
                status: "active",
                timeLeft: "6 hours",
                type: "daily"
            },
            {
                id: 2,
                title: "Zero Rejection Week",
                description: "Complete 7 consecutive days without any waste rejections",
                reward: "₹500 bonus + 100 points",
                icon: "fas fa-check-circle",
                color: "bg-blue-500",
                progress: 5,
                target: 7,
                status: "active",
                timeLeft: "2 days",
                type: "weekly"
            },
            {
                id: 3,
                title: "Customer Satisfaction",
                description: "Maintain 4.5+ star rating from residents",
                reward: "₹200 bonus",
                icon: "fas fa-star",
                color: "bg-yellow-500",
                progress: 4.7,
                target: 4.5,
                status: "completed",
                claimable: true,
                type: "ongoing"
            },
            {
                id: 4,
                title: "Weekend Warrior",
                description: "Work on weekend for extra collection requests",
                reward: "₹300 + Double points",
                icon: "fas fa-weekend",
                color: "bg-purple-500",
                progress: 0,
                target: 2,
                status: "available",
                timeLeft: "This weekend",
                type: "special"
            }
        ];

        this.incentives = [
            {
                id: 1,
                title: "Top Performer of the Month",
                description: "Highest collection efficiency and customer satisfaction",
                currentRank: 3,
                totalParticipants: 50,
                reward: "₹2000 + Gold Badge",
                deadline: "2024-01-31",
                criteria: ["95%+ collection rate", "4.5+ star rating", "Zero complaints"]
            },
            {
                id: 2,
                title: "Eco Champion",
                description: "Promote waste segregation and environmental awareness",
                currentRank: 1,
                totalParticipants: 30,
                reward: "₹1000 + Certificate",
                deadline: "2024-01-31",
                criteria: ["Educate 50+ households", "Zero segregation penalties", "Submit 10+ reports"]
            }
        ];

        this.challenges = [
            {
                id: 1,
                title: "Plastic-Free Collection",
                description: "Collect only properly segregated plastic waste",
                progress: 85,
                target: 100,
                reward: "₹300",
                timeLeft: "12 days",
                difficulty: "medium"
            },
            {
                id: 2,
                title: "Early Bird Challenge",
                description: "Start your route before 7 AM for 10 days",
                progress: 7,
                target: 10,
                reward: "₹250 + Badge",
                timeLeft: "18 days",
                difficulty: "easy"
            },
            {
                id: 3,
                title: "Heavy Duty Hero",
                description: "Handle 5 bulk waste collection requests",
                progress: 2,
                target: 5,
                reward: "₹500 + Points",
                timeLeft: "20 days",
                difficulty: "hard"
            }
        ];

        this.governmentBenefits = [
            {
                id: 1,
                title: "Pradhan Mantri Shram Yogi Maandhan",
                description: "Monthly pension scheme for unorganized workers",
                eligibility: "Age 18-40, Monthly income ≤ ₹15,000",
                benefit: "₹3000/month after age 60",
                status: "enrolled",
                nextAction: "Continue contributions",
                applicationLink: "#"
            },
            {
                id: 2,
                title: "Ayushman Bharat Health Insurance",
                description: "Health insurance coverage for families",
                eligibility: "BPL families and eligible workers",
                benefit: "₹5 lakh coverage per family",
                status: "eligible",
                nextAction: "Apply now",
                applicationLink: "#"
            },
            {
                id: 3,
                title: "Worker Skill Development Scheme",
                description: "Free training programs for skill enhancement",
                eligibility: "All registered waste management workers",
                benefit: "Free training + Certificate + ₹500 allowance",
                status: "available",
                nextAction: "Enroll in next batch",
                applicationLink: "#"
            },
            {
                id: 4,
                title: "Emergency Financial Assistance",
                description: "Financial support during emergencies",
                eligibility: "Workers with 6+ months experience",
                benefit: "Up to ₹5000 emergency fund",
                status: "available",
                nextAction: "Keep for emergencies",
                applicationLink: "#"
            }
        ];

        this.rewardStore = [
            {
                id: 1,
                name: "Safety Gloves Premium",
                description: "High-quality protective gloves",
                price: 50,
                image: "fas fa-hand-paper",
                category: "safety",
                inStock: true
            },
            {
                id: 2,
                name: "Reflective Vest",
                description: "High-visibility safety vest",
                price: 100,
                image: "fas fa-vest",
                category: "safety",
                inStock: true
            },
            {
                id: 3,
                name: "Mobile Phone Credit",
                description: "₹100 mobile recharge",
                price: 80,
                image: "fas fa-mobile-alt",
                category: "utility",
                inStock: true
            },
            {
                id: 4,
                name: "Grocery Voucher",
                description: "₹500 grocery store voucher",
                price: 400,
                image: "fas fa-shopping-basket",
                category: "voucher",
                inStock: true
            },
            {
                id: 5,
                name: "Training Course Access",
                description: "Online skill development course",
                price: 200,
                image: "fas fa-graduation-cap",
                category: "education",
                inStock: true
            },
            {
                id: 6,
                name: "Health Checkup Voucher",
                description: "Free basic health checkup",
                price: 300,
                image: "fas fa-heartbeat",
                category: "health",
                inStock: false
            }
        ];

        this.userStats = {
            totalEarnings: 12450,
            bonusEarned: 2100,
            rewardPoints: 850,
            workerLevel: "Gold",
            completedChallenges: 15,
            monthlyRank: 3
        };

        this.renderAllSections();
        this.updateStats();
    }

    renderAllSections() {
        this.renderActiveSchemes();
        this.renderPerformanceIncentives();
        this.renderMonthlyChallenges();
        this.renderGovernmentBenefits();
        this.renderRewardStore();
    }

    renderActiveSchemes() {
        const container = document.getElementById('active-schemes');
        if (!container) return;

        container.innerHTML = '';

        this.schemes.forEach(scheme => {
            const schemeCard = this.createSchemeCard(scheme);
            container.appendChild(schemeCard);
        });
    }

    createSchemeCard(scheme) {
        const card = document.createElement('div');
        card.className = 'scheme-card';

        const progressPercent = scheme.target ? Math.min((scheme.progress / scheme.target) * 100, 100) : 0;
        const isCompleted = scheme.status === 'completed';
        const isClaimable = scheme.claimable;

        card.innerHTML = `
            <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 ${scheme.color} rounded-full flex items-center justify-center">
                            <i class="${scheme.icon} text-white text-lg"></i>
                        </div>
                        <div>
                            <h5 class="text-lg font-semibold text-white">${scheme.title}</h5>
                            <p class="text-sm text-white/80">${scheme.type.charAt(0).toUpperCase() + scheme.type.slice(1)}</p>
                        </div>
                    </div>
                    ${isCompleted ? '<i class="fas fa-check-circle text-white text-2xl"></i>' : ''}
                </div>
                
                <p class="text-white/90 text-sm mb-4">${scheme.description}</p>
                
                <div class="mb-4">
                    <div class="flex justify-between text-sm text-white/80 mb-1">
                        <span>Progress</span>
                        <span>${scheme.progress}/${scheme.target}</span>
                    </div>
                    <div class="w-full bg-white/20 rounded-full h-2">
                        <div class="bg-white h-2 rounded-full transition-all duration-500" 
                             style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-white font-bold text-lg">${scheme.reward}</div>
                        ${scheme.timeLeft ? `<div class="text-white/70 text-xs">${scheme.timeLeft}</div>` : ''}
                    </div>
                    
                    ${isClaimable ? `
                        <button onclick="SchemesBeifits.claimScheme(${scheme.id})" 
                                class="worker-btn bg-white text-primary-green font-semibold">
                            <i class="fas fa-gift"></i>
                            <span>Claim</span>
                        </button>
                    ` : `
                        <button onclick="SchemesBeifits.viewSchemeDetails(${scheme.id})" 
                                class="worker-btn bg-white/20 text-white border border-white/30">
                            <i class="fas fa-info-circle"></i>
                        </button>
                    `}
                </div>
            </div>
        `;

        return card;
    }

    renderPerformanceIncentives() {
        const container = document.getElementById('performance-incentives');
        if (!container) return;

        container.innerHTML = '';

        this.incentives.forEach(incentive => {
            const incentiveCard = this.createIncentiveCard(incentive);
            container.appendChild(incentiveCard);
        });
    }

    createIncentiveCard(incentive) {
        const card = document.createElement('div');
        card.className = 'trust-card rounded-lg p-6';

        const rankColor = incentive.currentRank <= 3 ? 'text-green-600' : 
                         incentive.currentRank <= 10 ? 'text-blue-600' : 'text-gray-600';

        card.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-lg font-semibold">${incentive.title}</h5>
                <div class="text-center">
                    <div class="text-2xl font-bold ${rankColor}">
                        #${incentive.currentRank}
                    </div>
                    <div class="text-xs text-gray-500">of ${incentive.totalParticipants}</div>
                </div>
            </div>
            
            <p class="text-gray-700 text-sm mb-4">${incentive.description}</p>
            
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-700 mb-2">Reward:</div>
                <div class="text-primary-green font-bold text-lg">${incentive.reward}</div>
            </div>
            
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-700 mb-2">Criteria:</div>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${incentive.criteria.map(criterion => `
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2 text-xs"></i>
                            ${criterion}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">Deadline: ${new Date(incentive.deadline).toLocaleDateString()}</span>
                <button onclick="SchemesBeifits.viewLeaderboard(${incentive.id})" 
                        class="text-primary-green hover:text-green-700">
                    <i class="fas fa-trophy mr-1"></i>Leaderboard
                </button>
            </div>
        `;

        return card;
    }

    renderMonthlyChallenges() {
        const container = document.getElementById('monthly-challenges');
        if (!container) return;

        container.innerHTML = '';

        this.challenges.forEach(challenge => {
            const challengeCard = this.createChallengeCard(challenge);
            container.appendChild(challengeCard);
        });
    }

    createChallengeCard(challenge) {
        const card = document.createElement('div');
        card.className = 'trust-card rounded-lg p-4';

        const progressPercent = (challenge.progress / challenge.target) * 100;
        const difficultyColors = {
            'easy': 'bg-green-100 text-green-800',
            'medium': 'bg-yellow-100 text-yellow-800',
            'hard': 'bg-red-100 text-red-800'
        };

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h5 class="font-semibold">${challenge.title}</h5>
                <span class="px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}">
                    ${challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </span>
            </div>
            
            <p class="text-gray-700 text-sm mb-3">${challenge.description}</p>
            
            <div class="mb-3">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>${challenge.progress}/${challenge.target}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary-green h-2 rounded-full transition-all duration-500" 
                         style="width: ${progressPercent}%"></div>
                </div>
            </div>
            
            <div class="flex items-center justify-between text-sm">
                <div>
                    <div class="font-semibold text-primary-green">${challenge.reward}</div>
                    <div class="text-gray-500">${challenge.timeLeft}</div>
                </div>
                <button onclick="SchemesBeifits.joinChallenge(${challenge.id})" 
                        class="text-primary-green hover:text-green-700">
                    <i class="fas fa-play mr-1"></i>Continue
                </button>
            </div>
        `;

        return card;
    }

    renderGovernmentBenefits() {
        const container = document.getElementById('government-benefits');
        if (!container) return;

        container.innerHTML = '';

        this.governmentBenefits.forEach(benefit => {
            const benefitCard = this.createBenefitCard(benefit);
            container.appendChild(benefitCard);
        });
    }

    createBenefitCard(benefit) {
        const card = document.createElement('div');
        card.className = 'trust-card rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow';
        card.onclick = () => this.viewBenefitDetails(benefit);

        const statusColors = {
            'enrolled': 'bg-green-100 text-green-800',
            'eligible': 'bg-blue-100 text-blue-800',
            'available': 'bg-gray-100 text-gray-800',
            'pending': 'bg-yellow-100 text-yellow-800'
        };

        const statusIcons = {
            'enrolled': 'fas fa-check-circle text-green-600',
            'eligible': 'fas fa-clock text-blue-600',
            'available': 'fas fa-info-circle text-gray-600',
            'pending': 'fas fa-hourglass-half text-yellow-600'
        };

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h5 class="text-lg font-semibold mb-2">${benefit.title}</h5>
                    <p class="text-gray-700 text-sm">${benefit.description}</p>
                </div>
                <div class="text-center ml-4">
                    <i class="${statusIcons[benefit.status]} text-2xl mb-2"></i>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[benefit.status]}">
                        ${benefit.status.charAt(0).toUpperCase() + benefit.status.slice(1)}
                    </span>
                </div>
            </div>
            
            <div class="space-y-2 text-sm">
                <div>
                    <span class="text-gray-500">Benefit:</span>
                    <span class="font-semibold text-primary-green ml-2">${benefit.benefit}</span>
                </div>
                <div>
                    <span class="text-gray-500">Eligibility:</span>
                    <span class="text-gray-700 ml-2">${benefit.eligibility}</span>
                </div>
                <div>
                    <span class="text-gray-500">Next Action:</span>
                    <span class="text-blue-600 font-medium ml-2">${benefit.nextAction}</span>
                </div>
            </div>
        `;

        return card;
    }

    renderRewardStore() {
        const container = document.getElementById('reward-store');
        if (!container) return;

        container.innerHTML = '';

        this.rewardStore.forEach(item => {
            const itemCard = this.createStoreItemCard(item);
            container.appendChild(itemCard);
        });
    }

    createStoreItemCard(item) {
        const card = document.createElement('div');
        card.className = `trust-card rounded-lg p-4 ${item.inStock ? 'cursor-pointer hover:shadow-lg' : 'opacity-50'} transition-all`;
        
        if (item.inStock) {
            card.onclick = () => this.openPurchaseModal(item);
        }

        const categoryColors = {
            'safety': 'bg-red-100 text-red-800',
            'utility': 'bg-blue-100 text-blue-800',
            'voucher': 'bg-green-100 text-green-800',
            'education': 'bg-purple-100 text-purple-800',
            'health': 'bg-pink-100 text-pink-800'
        };

        card.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="${item.image} text-2xl text-gray-600"></i>
                </div>
                
                <h5 class="font-semibold text-sm mb-2">${item.name}</h5>
                <p class="text-gray-600 text-xs mb-3">${item.description}</p>
                
                <div class="flex items-center justify-between">
                    <span class="px-2 py-1 rounded-full text-xs ${categoryColors[item.category]}">
                        ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <div class="text-right">
                        <div class="font-bold text-primary-green">${item.price} pts</div>
                        <div class="text-xs ${item.inStock ? 'text-green-600' : 'text-red-600'}">
                            ${item.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    updateStats() {
        const elements = {
            'total-earnings': `₹${this.userStats.totalEarnings.toLocaleString()}`,
            'bonus-earned': `₹${this.userStats.bonusEarned.toLocaleString()}`,
            'reward-points': this.userStats.rewardPoints,
            'level-rank': this.userStats.workerLevel
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    claimScheme(schemeId) {
        const scheme = this.schemes.find(s => s.id === schemeId);
        if (!scheme || !scheme.claimable) return;

        // Update scheme status
        scheme.claimable = false;
        scheme.status = 'claimed';

        // Add to earnings (simulate)
        const rewardAmount = parseInt(scheme.reward.match(/₹(\d+)/)?.[1] || 0);
        this.userStats.totalEarnings += rewardAmount;
        this.userStats.bonusEarned += rewardAmount;
        
        // Add points if mentioned
        const points = parseInt(scheme.reward.match(/(\d+) points?/)?.[1] || 0);
        this.userStats.rewardPoints += points;

        this.renderActiveSchemes();
        this.updateStats();

        window.nav.showNotification(`Claimed ${scheme.reward} successfully!`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Congratulations! You have claimed ${scheme.reward}`);
        }
    }

    claimRewards() {
        const claimableSchemes = this.schemes.filter(s => s.claimable);
        
        if (claimableSchemes.length === 0) {
            window.nav.showNotification('No rewards available to claim', 'info');
            return;
        }

        const modal = document.getElementById('claim-modal');
        const container = document.getElementById('claimable-rewards');
        
        if (modal && container) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            container.innerHTML = '';
            this.selectedRewards = [];
            
            claimableSchemes.forEach(scheme => {
                const rewardItem = document.createElement('label');
                rewardItem.className = 'flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-green';
                rewardItem.innerHTML = `
                    <input type="checkbox" class="mr-3 reward-checkbox" value="${scheme.id}" 
                           onchange="SchemesBeifits.toggleRewardSelection(${scheme.id})">
                    <div class="flex-1">
                        <div class="font-semibold">${scheme.title}</div>
                        <div class="text-primary-green font-bold">${scheme.reward}</div>
                    </div>
                `;
                container.appendChild(rewardItem);
            });
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`${claimableSchemes.length} rewards available for claiming`);
        }
    }

    toggleRewardSelection(schemeId) {
        const index = this.selectedRewards.indexOf(schemeId);
        if (index > -1) {
            this.selectedRewards.splice(index, 1);
        } else {
            this.selectedRewards.push(schemeId);
        }
    }

    claimSelectedRewards() {
        if (this.selectedRewards.length === 0) {
            window.nav.showNotification('Please select rewards to claim', 'warning');
            return;
        }

        let totalAmount = 0;
        let totalPoints = 0;

        this.selectedRewards.forEach(schemeId => {
            const scheme = this.schemes.find(s => s.id === schemeId);
            if (scheme) {
                scheme.claimable = false;
                scheme.status = 'claimed';
                
                const rewardAmount = parseInt(scheme.reward.match(/₹(\d+)/)?.[1] || 0);
                const points = parseInt(scheme.reward.match(/(\d+) points?/)?.[1] || 0);
                
                totalAmount += rewardAmount;
                totalPoints += points;
            }
        });

        this.userStats.totalEarnings += totalAmount;
        this.userStats.bonusEarned += totalAmount;
        this.userStats.rewardPoints += totalPoints;

        this.renderActiveSchemes();
        this.updateStats();
        this.closeClaimModal();

        window.nav.showNotification(`Claimed ₹${totalAmount} and ${totalPoints} points!`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.announceEarnings(totalAmount);
        }
    }

    closeClaimModal() {
        const modal = document.getElementById('claim-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.selectedRewards = [];
    }

    openPurchaseModal(item) {
        if (!item.inStock) {
            window.nav.showNotification('Item is out of stock', 'warning');
            return;
        }

        if (this.userStats.rewardPoints < item.price) {
            window.nav.showNotification('Insufficient reward points', 'warning');
            return;
        }

        this.selectedItem = item;
        const modal = document.getElementById('purchase-modal');
        const title = document.getElementById('purchase-title');
        const details = document.getElementById('purchase-details');
        
        if (modal && title && details) {
            title.textContent = `Purchase ${item.name}`;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            details.innerHTML = `
                <div class="text-center mb-4">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="${item.image} text-3xl text-gray-600"></i>
                    </div>
                    <h4 class="text-lg font-semibold">${item.name}</h4>
                    <p class="text-gray-600">${item.description}</p>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span>Price:</span>
                        <span class="font-bold text-primary-green">${item.price} points</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Your Points:</span>
                        <span class="font-bold">${this.userStats.rewardPoints} points</span>
                    </div>
                    <div class="flex justify-between border-t pt-2">
                        <span>After Purchase:</span>
                        <span class="font-bold">${this.userStats.rewardPoints - item.price} points</span>
                    </div>
                </div>
            `;
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Purchase ${item.name} for ${item.price} points?`);
        }
    }

    confirmPurchase() {
        if (!this.selectedItem) return;

        if (this.userStats.rewardPoints < this.selectedItem.price) {
            window.nav.showNotification('Insufficient reward points', 'error');
            return;
        }

        // Deduct points
        this.userStats.rewardPoints -= this.selectedItem.price;
        
        // Update UI
        this.updateStats();
        this.closePurchaseModal();

        window.nav.showNotification(`Successfully purchased ${this.selectedItem.name}!`, 'success');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Successfully purchased ${this.selectedItem.name}. It will be delivered soon.`);
        }

        this.selectedItem = null;
    }

    closePurchaseModal() {
        const modal = document.getElementById('purchase-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.selectedItem = null;
    }

    viewBenefitDetails(benefit) {
        const modal = document.getElementById('benefits-modal');
        const title = document.getElementById('benefits-title');
        const details = document.getElementById('benefits-details');
        const actions = document.getElementById('benefits-actions');
        
        if (modal && title && details && actions) {
            title.textContent = benefit.title;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            details.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <h5 class="font-semibold text-gray-700 mb-2">Description</h5>
                        <p class="text-gray-800">${benefit.description}</p>
                    </div>
                    
                    <div>
                        <h5 class="font-semibold text-gray-700 mb-2">Benefit</h5>
                        <p class="text-primary-green font-bold text-lg">${benefit.benefit}</p>
                    </div>
                    
                    <div>
                        <h5 class="font-semibold text-gray-700 mb-2">Eligibility Criteria</h5>
                        <p class="text-gray-800">${benefit.eligibility}</p>
                    </div>
                    
                    <div>
                        <h5 class="font-semibold text-gray-700 mb-2">Current Status</h5>
                        <p class="text-gray-800 capitalize">${benefit.status}</p>
                    </div>
                    
                    <div>
                        <h5 class="font-semibold text-gray-700 mb-2">Next Action Required</h5>
                        <p class="text-blue-600 font-medium">${benefit.nextAction}</p>
                    </div>
                </div>
            `;
            
            let actionButtons = '';
            if (benefit.status === 'eligible' || benefit.status === 'available') {
                actionButtons = `
                    <button onclick="SchemesBeifits.applyForBenefit('${benefit.id}')" 
                            class="flex-1 worker-btn bg-primary-green text-white">
                        <i class="fas fa-file-alt"></i>
                        <span>Apply Now</span>
                    </button>
                `;
            } else if (benefit.status === 'enrolled') {
                actionButtons = `
                    <button onclick="SchemesBeifits.viewBenefitStatus('${benefit.id}')" 
                            class="flex-1 worker-btn bg-secondary-blue text-white">
                        <i class="fas fa-eye"></i>
                        <span>View Status</span>
                    </button>
                `;
            }
            
            actionButtons += `
                <button onclick="SchemesBeifits.closeBenefitsModal()" 
                        class="flex-1 worker-btn bg-gray-600 text-white">
                    <i class="fas fa-times"></i>
                    <span>Close</span>
                </button>
            `;
            
            actions.innerHTML = actionButtons;
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Viewing details for ${benefit.title}`);
        }
    }

    closeBenefitsModal() {
        const modal = document.getElementById('benefits-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    viewHistory() {
        const modal = document.getElementById('history-modal');
        const content = document.getElementById('history-content');
        
        if (modal && content) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Sample history data
            const historyData = [
                { date: '2024-01-15', type: 'Bonus', description: 'Daily Collection Bonus', amount: '+₹50', points: '+10' },
                { date: '2024-01-14', type: 'Purchase', description: 'Safety Gloves Premium', amount: '', points: '-50' },
                { date: '2024-01-13', type: 'Reward', description: 'Customer Satisfaction Bonus', amount: '+₹200', points: '+50' },
                { date: '2024-01-12', type: 'Challenge', description: 'Early Bird Challenge', amount: '+₹100', points: '+25' },
                { date: '2024-01-11', type: 'Penalty', description: 'Late Route Start', amount: '-₹25', points: '-5' }
            ];
            
            content.innerHTML = historyData.map(item => `
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div class="flex-1">
                        <div class="font-semibold">${item.description}</div>
                        <div class="text-sm text-gray-500">${item.date} • ${item.type}</div>
                    </div>
                    <div class="text-right">
                        ${item.amount ? `<div class="font-bold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}">${item.amount}</div>` : ''}
                        ${item.points ? `<div class="text-sm ${item.points.startsWith('+') ? 'text-blue-600' : 'text-red-600'}">${item.points} pts</div>` : ''}
                    </div>
                </div>
            `).join('');
        }

        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Showing your earnings and rewards history');
        }
    }

    closeHistoryModal() {
        const modal = document.getElementById('history-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    // Additional methods for various actions
    viewSchemeDetails(schemeId) {
        const scheme = this.schemes.find(s => s.id === schemeId);
        if (!scheme) return;

        window.nav.showNotification(`Viewing details for ${scheme.title}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`${scheme.title}. ${scheme.description}. Progress: ${scheme.progress} out of ${scheme.target}.`);
        }
    }

    viewLeaderboard(incentiveId) {
        window.nav.showNotification('Opening leaderboard...', 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Opening performance leaderboard');
        }
    }

    joinChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        window.nav.showNotification(`Continuing ${challenge.title}`, 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak(`Continuing ${challenge.title}. Current progress: ${challenge.progress} out of ${challenge.target}.`);
        }
    }

    applyForBenefit(benefitId) {
        window.nav.showNotification('Redirecting to application portal...', 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Opening government benefit application portal');
        }
    }

    viewBenefitStatus(benefitId) {
        window.nav.showNotification('Checking benefit status...', 'info');
        
        if (window.VoiceGuide && window.VoiceGuide.isEnabled) {
            window.VoiceGuide.speak('Checking your current benefit status');
        }
    }
}

// Initialize Schemes Benefits Manager
window.SchemesBeifits = new SchemesBeifitsManager();