// Blog Section Logic
window.Blog = {
    articles: [
        {
            id: 1,
            title: '5 Simple Ways to Reduce Household Waste',
            category: 'tips',
            excerpt: 'Easy steps every family can take to minimize their environmental footprint...',
            date: '5 days ago',
            type: 'article',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            title: 'Community Cleanup Drive Success',
            category: 'news',
            excerpt: 'Watch highlights from our recent community cleanup that collected 2 tons of waste...',
            date: '1 week ago',
            type: 'video',
            image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 3,
            title: 'Local School\'s Zero Waste Achievement',
            category: 'success',
            excerpt: 'How Greenfield Elementary became the first zero-waste school in our district...',
            date: '2 weeks ago',
            type: 'article',
            image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 4,
            title: 'New Recycling Plant Opens Downtown',
            category: 'news',
            excerpt: 'State-of-the-art facility will process 500 tons of recyclable materials daily...',
            date: '3 weeks ago',
            type: 'article',
            image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 5,
            title: 'DIY Composting at Home',
            category: 'tips',
            excerpt: 'Step-by-step guide to creating nutrient-rich compost from kitchen waste...',
            date: '1 month ago',
            type: 'video',
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 6,
            title: 'Impact of Plastic Waste on Local Wildlife',
            category: 'environmental',
            excerpt: 'Research findings on how proper waste management protects our ecosystem...',
            date: '1 month ago',
            type: 'article',
            image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ],

    currentPage: 1,
    articlesPerPage: 6,

    init() {
        console.log('Blog section initialized');
        this.loadArticles();
    },

    loadArticles() {
        const container = document.getElementById('blog-articles');
        if (!container) return;

        const categoryColors = {
            tips: 'bg-primary-green',
            news: 'bg-blue-500',
            success: 'bg-green-500',
            environmental: 'bg-red-500',
            video: 'bg-secondary-blue',
            tutorial: 'bg-purple-500'
        };

        container.innerHTML = this.articles.map(article => `
            <div class="trust-card rounded-lg p-4 blog-card" data-category="${article.category}">
                <div class="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img src="${article.image}" 
                         alt="${article.title}" 
                         class="w-full h-full object-cover rounded-lg"
                         onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-500 text-sm\\'>${article.type === 'video' ? 'Video' : 'Image'} placeholder</div>'">
                </div>
                <div class="flex items-center space-x-2 mb-2">
                    <span class="${categoryColors[article.category] || 'bg-gray-500'} text-white px-2 py-1 text-xs rounded">
                        ${this.formatCategory(article.category)}
                    </span>
                    <span class="text-gray-500 text-sm">${article.date}</span>
                </div>
                <h4 class="font-medium mb-2">${article.title}</h4>
                <p class="text-gray-600 text-sm mb-3">${article.excerpt}</p>
                <button onclick="Blog.readArticle(${article.id})" 
                    class="text-primary-green font-medium text-sm hover:underline">
                    ${article.type === 'video' ? 'Watch Video' : 'Read More'} →
                </button>
            </div>
        `).join('');
    },

    formatCategory(category) {
        const categories = {
            tips: 'Tips & Tricks',
            news: 'News',
            success: 'Success Story',
            environmental: 'Environmental',
            video: 'Video',
            tutorial: 'Tutorial'
        };
        return categories[category] || category;
    },

    filterByCategory() {
        const selectedCategory = document.getElementById('blog-category-filter').value;
        const articles = document.querySelectorAll('[data-category]');
        
        articles.forEach(article => {
            if (!selectedCategory || article.dataset.category === selectedCategory) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    },

    readArticle(articleId) {
        if (articleId === 'featured') {
            alert('Opening featured article: Revolutionary Waste Segregation Methods');
            return;
        }
        
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            alert(`Opening: ${article.title}`);
            this.markAsRead(articleId);
        }
    },

    markAsRead(articleId) {
        const readArticles = this.getReadArticles();
        if (!readArticles.includes(articleId)) {
            readArticles.push(articleId);
            localStorage.setItem('readArticles', JSON.stringify(readArticles));
        }
    },

    getReadArticles() {
        const stored = localStorage.getItem('readArticles');
        return stored ? JSON.parse(stored) : [];
    },

    loadMoreArticles() {
        // Simulate loading more articles
        alert('Loading more articles...');
        this.currentPage++;
    }
};
