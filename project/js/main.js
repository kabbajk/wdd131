// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.glass-nav');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Initialize blend cards interaction on homepage
    if (document.querySelector('.blend-cards')) {
        initBlendCards();
    }

    // Initialize theme color picker if exists
    if (document.getElementById('theme-color')) {
        initThemeColorPicker();
    }

    // Set current year in footer
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});

// Blend Cards Interaction (Homepage)
function initBlendCards() {
    const blendCards = document.querySelectorAll('.blend-card');
    
    blendCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const blend = this.getAttribute('data-blend');
            const mapPoints = document.querySelectorAll('.map-point');
            
            mapPoints.forEach(point => {
                if (point.getAttribute('data-blend') === blend) {
                    point.classList.add('highlight');
                    point.style.transform = 'translate(-50%, -50%) scale(1.3)';
                } else {
                    point.classList.remove('highlight');
                    point.style.opacity = '0.5';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const mapPoints = document.querySelectorAll('.map-point');
            
            mapPoints.forEach(point => {
                point.classList.remove('highlight');
                point.style.opacity = '1';
                point.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    });
}

// Theme Color Picker (Optional Feature)
function initThemeColorPicker() {
    const colorPicker = document.getElementById('theme-color');
    const root = document.documentElement;
    
    colorPicker.addEventListener('input', function() {
        root.style.setProperty('--primary-color', this.value);
        
        // Calculate a slightly darker version for accent
        const hex = this.value.substring(1);
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const darker = `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
        root.style.setProperty('--accent-color', darker);
        
        // Save to localStorage
        localStorage.setItem('themeColor', this.value);
    });
    
    // Load saved theme
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        colorPicker.value = savedColor;
        colorPicker.dispatchEvent(new Event('input'));
    }
}