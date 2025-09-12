// Marketplace Section Logic
window.Marketplace = {
    products: [
        {
            id: 1,
            name: 'Dustbin (50L)',
            price: 299,
            image: 'dustbin.jpg'
        },
        {
            id: 2,
            name: 'Garbage Bags (50pc)',
            price: 149,
            image: 'bags.jpg'
        },
        {
            id: 3,
            name: 'Cleaning Broom',
            price: 199,
            image: 'broom.jpg'
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
            <div class="border rounded-lg p-4 text-center">
                <div class="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-3"></div>
                <h4 class="font-medium">${product.name}</h4>
                <p class="text-primary-green font-semibold">₹${product.price}</p>
                <button onclick="Marketplace.buyProduct(${product.id})" 
                    class="mt-2 bg-primary-green text-white px-4 py-1 rounded text-sm">Buy Now</button>
            </div>
        `).join('');
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
