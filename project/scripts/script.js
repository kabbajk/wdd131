// DOM Elements
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const ctaButton = document.getElementById('cta-button');
const teamMembers = document.getElementById('team-members');

// Team data
const teamData = [
    {
        name: "Eliza & Agatha",
        role: "Founder",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        img: "images/lizagath.png"
    },
    {
        name: "James",
        role: "Manager",
        bio: "James has been working in the coffee industry over 3 years.",
        img: "images/james.png"
    },
    {
        name: "Mike Johnson",
        role: "Designer",
        bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        img: "images/team3.jpg"
    }
];

// Functions
function toggleNav() {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveFormData(formData);
    
    // Display success message
    formMessage.innerHTML = `
        <div class="success-message">
            <p>Thank you, ${formData.name}! Your message has been sent.</p>
            <p>We'll get back to you soon.</p>
        </div>
    `;
    
    // Reset form
    form.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 5000);
}

function saveFormData(data) {
    let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    submissions.push(data);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
}

function displayTeamMembers() {
    if (teamMembers) {
        const membersHTML = teamData.map(member => `
            <div class="team-member">
                <img src="${member.img}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p>${member.bio}</p>
            </div>
        `).join('');
        
        teamMembers.innerHTML = membersHTML;
    }
}

function handleCtaClick() {
    // Example of using localStorage to track clicks
    let clicks = localStorage.getItem('ctaClicks') || 0;
    clicks++;
    localStorage.setItem('ctaClicks', clicks);
    
    alert(`Thank you for your interest! You've clicked this button ${clicks} time(s).`);
}

// Event Listeners
if (burger) {
    burger.addEventListener('click', toggleNav);
}

if (form) {
    form.addEventListener('submit', handleFormSubmit);
}

if (ctaButton) {
    ctaButton.addEventListener('click', handleCtaClick);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayTeamMembers();
    
    // Set active nav link based on current page
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});