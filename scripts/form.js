// Product data array
const products = [
    { id: 'prod001', name: 'Ultra HD Smart TV' },
    { id: 'prod002', name: 'Wireless Noise-Canceling Headphones' },
    { id: 'prod003', name: 'Smartphone Pro Max' },
    { id: 'prod004', name: 'Electric Toothbrush' },
    { id: 'prod005', name: 'Air Fryer Oven' },
    { id: 'prod006', name: 'Fitness Smartwatch' },
    { id: 'prod007', name: 'Robot Vacuum Cleaner' },
    { id: 'prod008', name: 'Bluetooth Speaker' },
    { id: 'prod009', name: 'Gaming Laptop' },
    { id: 'prod010', name: 'E-Reader' }
];

// Function to populate product dropdown
function populateProductDropdown() {
    const productSelect = document.getElementById('productName');
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }
}

// Function to update review counter
function updateReviewCounter() {
    const reviewCountElement = document.getElementById('reviewCount');
    if (reviewCountElement) {
        let reviewCount = localStorage.getItem('reviewCount');
        
        if (reviewCount === null) {
            reviewCount = 1;
            reviewCountElement.textContent = "This is your first review submission.";
        } else {
            reviewCount = parseInt(reviewCount) + 1;
        }
        
        localStorage.setItem('reviewCount', reviewCount);
    }
}

// Function to set current year in footer
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    document.getElementById('last-modified').textContent = document.lastModified;
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    populateProductDropdown();
    updateReviewCounter();
    setCurrentYear();
    
    // Set min date to today for date picker
    const dateInput = document.getElementById('installDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('max', today);
    }
});