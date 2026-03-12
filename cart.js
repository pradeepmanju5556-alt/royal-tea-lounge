class Cart {
    constructor() {
        this.items = this.loadFromLocalStorage() || [];
    }

    // Load cart data from localStorage
    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('cart');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    }

    // Save cart data to localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }

    /**
     * Add an item to the cart
     * @param {Object} item - The item to add
     */
    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.saveToLocalStorage();
    }

    /**
     * Remove an item from the cart
     * @param {string} id - The id of the item to remove
     */
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToLocalStorage();
    }

    /**
     * Update the quantity of an item
     * @param {string} id - The id of the item
     * @param {number} quantity - The new quantity
     */
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            this.saveToLocalStorage();
        }
    }

    /**
     * Calculate the total price of the cart
     * @returns {number} - The total price
     */
    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    /**
     * Get all items in the cart
     * @returns {Array} - The list of items
     */
    getItems() {
        return this.items;
    }
}

// Example usage of the Cart class
const cart = new Cart();
// cart.addItem({id: '1', name: 'Tea', price: 5.00, quantity: 2});
// console.log(cart.calculateTotal());