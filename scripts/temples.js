// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamburger.textContent = navigation.classList.contains('show') ? '✕' : '☰';
});

// Footer dynamic content
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastmodified').textContent = lastModified;