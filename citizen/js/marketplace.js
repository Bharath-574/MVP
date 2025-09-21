// Marketplace Section Logic
window.Marketplace = {
    products: [
        {
            id: 1,
            name: 'Dustbin (50L)',
            price: 299,
            image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            category: 'Waste Management'
        },
        {
            id: 2,
            name: 'Garbage Bags (50pc)',
            price: 149,
            image: 'https://m.media-amazon.com/images/I/71+lN88GinL.jpg',
            category: 'Waste Management'
        },
        {
            id: 3,
            name: 'Cleaning Broom',
            price: 199,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbCiXwHFEvY0US5A1JBhO2vQ1HcOWwwZRPQ&s',
            category: 'Cleaning Supplies'
        },
        {
            id: 4,
            name: 'Organic Manure (10kg)',
            price: 450,
            image: 'https://utkarshagro.com/cdn/shop/files/Organic_Manure-Info_2.png?v=1748686513&width=1946',
            category: 'Fertilizers'
        },
        {
            id: 5,
            name: 'Vermicompost (5kg)',
            price: 250,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-LRmcmyJRyoKgU_fGX9Yw-0n2Z3h04g2G2A&s',
            category: 'Fertilizers'
        },
        {
            id: 6,
            name: 'Bio-Fertilizer (2kg)',
            price: 180,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxI6aBy6lMpGaGMcLHPRGtUpii6Ay-W51TVg&s',
            category: 'Fertilizers'
        },
        {
            id: 7,
            name: 'Composting Kit',
            price: 899,
            image: 'https://nurserylive.com/cdn/shop/products/nurserylive-home-compost-kit-for-family-of-2_600x600.jpg?v=1742455916',
            category: 'DIY Kits'
        },
        {
            id: 8,
            name: 'Recycled Paper (A4)',
            price: 320,
            image: 'https://m.media-amazon.com/images/I/61YNumtA4tL.jpg',
            category: 'Recycled Products'
        },
        {
            id: 9,
            name: 'Eco-friendly Detergent',
            price: 125,
            image: 'https://m.media-amazon.com/images/I/61OYwd1RouL.jpg',
            category: 'Cleaning Supplies'
        }
    ],

    init() {
        console.log('Marketplace section initialized');
        this.loadProducts();
    },

    loadProducts() {
        const container = document.getElementById('marketplace-products');
        if (!container) return;

        container.innerHTML = this.products.map(product => `
            <div class="border rounded-lg p-4 text-center hover:shadow-lg transition-shadow bg-white">
                <div class="w-full h-40 bg-gray-200 rounded-lg mx-auto mb-3 overflow-hidden flex items-center justify-center">
                    <img src="${product.image}" alt="${product.name}" 
                         class="w-full h-full object-cover" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-6xl" style="display: none;">
                        ${this.getProductIcon(product.id)}
                    </div>
                </div>
                <h4 class="font-medium text-gray-800 mb-1">${product.name}</h4>
                <p class="text-xs text-gray-500 mb-2">${product.category}</p>
                <p class="text-primary-green font-semibold text-lg mb-3">₹${product.price}</p>
                <button onclick="Marketplace.buyProduct(${product.id})" 
                    class="w-full bg-primary-green hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
                    Add to Cart
                </button>
            </div>
        `).join('');
    },

    getProductIcon(productId) {
        const icons = {
            1: '🗑️', // Dustbin
            2: '🛍️', // Garbage Bags
            3: '🧹', // Cleaning Broom
            4: '🌱', // Organic Manure
            5: '🪱', // Vermicompost
            6: '🧪', // Bio-Fertilizer
            7: '📦', // Composting Kit
            8: '📄', // Recycled Paper
            9: '🧴'  // Eco-friendly Detergent
        };
        return icons[productId] || '📦';
    },

    buyProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            // Simulate purchase
            alert(`Added ${product.name} to cart for ₹${product.price}`);
            this.addToCart(product);
        }
    },

    addToCart(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('marketplace_cart', JSON.stringify(cart));
    },

    getCart() {
        const stored = localStorage.getItem('marketplace_cart');
        return stored ? JSON.parse(stored) : [];
    },

    clearCart() {
        localStorage.removeItem('marketplace_cart');
    }
};
