document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    if (document.getElementById('calendar')) {
        initCalendar();
    }
    
    // Event RSVP buttons
    const rsvpButtons = document.querySelectorAll('.rsvp-button');
    rsvpButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.event-card');
            const eventName = eventCard.querySelector('h4').textContent;
            const eventDate = eventCard.querySelector('.date-day').textContent + 
                              ' ' + eventCard.querySelector('.date-month').textContent;
            
            // Store event in localStorage
            const rsvpEvents = JSON.parse(localStorage.getItem('rsvpEvents')) || [];
            if (!rsvpEvents.some(ev => ev.name === eventName && ev.date === eventDate)) {
                rsvpEvents.push({ name: eventName, date: eventDate });
                localStorage.setItem('rsvpEvents', JSON.stringify(rsvpEvents));
                
                // Update button
                this.textContent = 'RSVP Confirmed!';
                this.classList.add('confirmed');
                this.disabled = true;
                
                // Show notification
                showNotification(`You've RSVP'd to ${eventName} on ${eventDate}`);
            }
        });
        
        // Check if already RSVP'd
        checkRSVPStatus(button);
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
            
            // Toggle icon
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
});

// Initialize Calendar
function initCalendar() {
    const monthDisplay = document.getElementById('current-month');
    const calendarGrid = document.getElementById('calendar');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    
    // Render calendar
    function renderCalendar() {
        // Set month display
        monthDisplay.textContent = currentDate.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Clear previous cells
        calendarGrid.innerHTML = '';
        
        // Get first day of month and total days
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        // Create day headers
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('calendar-day-header');
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before the first day
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;
            
            // Check if day has events (in a real app, this would come from a database)
            if ((day === 15 && currentDate.getMonth() === 10) || 
                (day === 22 && currentDate.getMonth() === 10) || 
                (day === 5 && currentDate.getMonth() === 11)) {
                dayCell.classList.add('has-event');
                
                const eventDot = document.createElement('div');
                eventDot.classList.add('event-dot');
                dayCell.appendChild(eventDot);
                
                dayCell.addEventListener('click', function() {
                    showDayEvents(day, currentDate.getMonth() + 1);
                });
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Navigation
    prevBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
}

// Show events for a specific day
function showDayEvents(day, month) {
    let eventText = '';
    
    if (day === 15 && month === 11) {
        eventText = 'Latte Art Workshop at 4:00 PM';
    } else if (day === 22 && month === 11) {
        eventText = 'Coffee Cupping Experience at 6:00 PM';
    } else if (day === 5 && month === 12) {
        eventText = 'Holiday Blend Release - All Day';
    }
    
    if (eventText) {
        showNotification(eventText);
    }
}

// Check if user has already RSVP'd to an event
function checkRSVPStatus(button) {
    const eventCard = button.closest('.event-card');
    const eventName = eventCard.querySelector('h4').textContent;
    const eventDate = eventCard.querySelector('.date-day').textContent + 
                     ' ' + eventCard.querySelector('.date-month').textContent;
    
    const rsvpEvents = JSON.parse(localStorage.getItem('rsvpEvents')) || [];
    if (rsvpEvents.some(ev => ev.name === eventName && ev.date === eventDate)) {
        button.textContent = 'RSVP Confirmed!';
        button.classList.add('confirmed');
        button.disabled = true;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}