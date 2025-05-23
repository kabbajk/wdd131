// Function to calculate wind chill
function calculateWindChill(temp, windSpeed) {
    // Using the formula for metric units (°C and km/h)
    return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
}

// Function to display wind chill
function displayWindChill() {
    const tempElement = document.getElementById('temp');
    const windSpeedElement = document.getElementById('wind-speed');
    const windChillElement = document.getElementById('wind-chill');
    
    const temp = parseFloat(tempElement.textContent);
    const windSpeed = parseFloat(windSpeedElement.textContent);
    
    // Check if wind chill calculation is applicable (for Sierra Leone's tropical climate, it will almost always be N/A)
    if (temp <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temp, windSpeed);
        windChillElement.textContent = `${windChill}°C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
}

// Function to update footer with current year and last modified date
function updateFooter() {
    const currentYearElement = document.getElementById('current-year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    // Set current year
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedElement.textContent = document.lastModified;
}

// Initialize the page
function init() {
    updateFooter();
    displayWindChill();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);