document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Map modal
    const mapButton = document.getElementById('open-map');
    const mapModal = document.getElementById('map-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (mapButton && mapModal) {
        mapButton.addEventListener('click', function() {
            mapModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', function() {
            mapModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === mapModal) {
                mapModal.style.display = 'none';
            }
        });
    }
    
    // Load saved form data if available
    loadSavedFormData();
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // In a real app, you would send this to a server
    console.log('Form submitted:', formObject);
    
    // Save form data in case of error
    localStorage.setItem('contactFormData', JSON.stringify(formObject));
    
    // Show success message
    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    
    // Clear form after delay
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        document.getElementById('form-success').style.display = 'none';
        localStorage.removeItem('contactFormData');
    }, 5000);
}

// Load saved form data
function loadSavedFormData() {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        const form = document.getElementById('contact-form');
        
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = formData[key] === 'on';
                    } else {
                        input.value = formData[key];
                    }
                }
            }
        }
        
        // Show message that draft was restored
        showNotification('We restored your draft message. You can continue where you left off.');
    }
}