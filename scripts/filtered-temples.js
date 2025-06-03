document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last updated: " + document.lastModified;

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('is-active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('is-active');
                nav.classList.remove('active');
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('is-active');
            nav.classList.remove('active');
        }
    });
});

const temples = [
  {
    name: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    name: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    name: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    name: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    name: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    name: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    name: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    name: "Salt Lake City",
    location: "Salt Lake City, Utah",
    dedicated: "1893, April, 6",  
    area: 253000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    name: "St. George Utah Temple",
    location: "St. George, Utah, USA",
    dedicated: "1877, April, 6",
    area: 110000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"
  },
  {
    name: "Logan Utah Temple",
    location: "Logan, Utah, USA",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/logan-utah-temple/logan-utah-temple-40550-main.jpg"
    },
  // Add more temple objects here...
];

// Function to create temple cards
function createTempleCard(temple) {
    const card = document.createElement('div');
    card.className = 'temple-card';
    
    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.name;
    img.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'temple-info';
    
    const name = document.createElement('h2');
    name.textContent = temple.name;
    
    const location = document.createElement('p');
    location.textContent = `Location: ${temple.location}`;
    
    const dedicated = document.createElement('p');
    dedicated.textContent = `Dedicated: ${new Date(temple.dedicated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    
    const area = document.createElement('p');
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;
    
    info.appendChild(name);
    info.appendChild(location);
    info.appendChild(dedicated);
    info.appendChild(area);
    
    card.appendChild(img);
    card.appendChild(info);
    
    return card;
}

// Function to display temples
function displayTemples(filteredTemples = temples) {
    const container = document.getElementById('temple-cards');
    container.innerHTML = '';
    
    filteredTemples.forEach(temple => {
        const card = createTempleCard(temple);
        container.appendChild(card);
    });
}

// Filter functions
function filterOldTemples() {
    return temples.filter(temple => {
        const dedicatedYear = new Date(temple.dedicated).getFullYear();
        return dedicatedYear < 1900;
    });
}

function filterNewTemples() {
    return temples.filter(temple => {
        const dedicatedYear = new Date(temple.dedicated).getFullYear();
        return dedicatedYear > 2000;
    });
}

function filterLargeTemples() {
    return temples.filter(temple => temple.area > 90000);
}

function filterSmallTemples() {
    return temples.filter(temple => temple.area < 10000);
}

// Event listeners for navigation
document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(e.target);
    displayTemples();
});

document.getElementById('old').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(e.target);
    displayTemples(filterOldTemples());
});

document.getElementById('new').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(e.target);
    displayTemples(filterNewTemples());
});

document.getElementById('large').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(e.target);
    displayTemples(filterLargeTemples());
});

document.getElementById('small').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(e.target);
    displayTemples(filterSmallTemples());
});

// Helper function to set active link
function setActiveLink(clickedLink) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Footer date functions
function updateFooterDates() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateFooterDates();
    displayTemples();
});