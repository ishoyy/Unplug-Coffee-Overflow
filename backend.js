let checkInCounter = 0; // Streak counter
let lastCheckedInDay = null; // Last day the user checked in
let currentDay = new Date().getDate(); // Simulated calendar day

// Generate the calendar
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();

    // Display current month
    const monthDisplay = document.getElementById("monthDisplay");
    monthDisplay.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    // Create the days in the calendar
    for (let i = 1; i <= totalDays; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = i;
        dayDiv.setAttribute("data-day", i);
        calendar.appendChild(dayDiv);
    }
}

// Check-in function (marks the current day green)
function checkIn() {
    const today = new Date();
    const realCurrentDay = today.getDate();
    
    // Mark today as checked in
    markDayCheckedIn(realCurrentDay);
    
    lastCheckedInDay = realCurrentDay; // Store last check-in day
    document.getElementById("checkInButton").disabled = true;
    const healthBar = document.querySelector(".hb_max"); // Select health bar
        healthBar.src = "images/healthbar/hb_max.png"; // Update image
    setTimeout(() => {
        document.getElementById("checkInButton").disabled = false;
    }, 86400000); // 24 hours
}

// Skip to the next day (demo button)
function skipDay() {
    let previousDay = currentDay; // Store the current simulated day
    currentDay++; // Move forward by one day

    // If the previous day was **not checked in**, mark it as skipped
    if (previousDay !== lastCheckedInDay) {
        markSkippedDay(previousDay);
        checkInCounter = 0; // Reset streak
        document.getElementById("checkInCount").textContent = checkInCounter;
    }

    lastCheckedInDay = null; // Prevent duplicate skipping issues
}

// Mark a specific day as checked in (green)
function markDayCheckedIn(day) {
    const dayToCheckIn = document.querySelector(`.day[data-day="${day}"]`);
    if (dayToCheckIn && !dayToCheckIn.classList.contains("checked-in")) {
        dayToCheckIn.classList.add("checked-in");
        checkInCounter++;
        document.getElementById("checkInCount").textContent = checkInCounter;
    }
}

// Mark a specific day as skipped (orange)
function markSkippedDay(day) {
    const skippedDay = document.querySelector(`.day[data-day="${day}"]`);
    if (skippedDay && !skippedDay.classList.contains("checked-in")) {
        skippedDay.classList.add("skipped");
        showSkipMessage(day);
    }
}

// Show a message when a day is skipped
function showSkipMessage(day) {
    const messageBox = document.getElementById("skipMessage");
    messageBox.textContent = `Day ${day} was skipped! Streak reset.`;
    
    // Reveal the message smoothly
    messageBox.style.visibility = "visible"; 
    messageBox.style.opacity = "1";

    setTimeout(() => {
        messageBox.style.opacity = "0"; // Fade out
        setTimeout(() => {
            messageBox.style.visibility = "hidden"; // Hide after fade
        }, 500); // Matches transition time
    }, 2000);
}

// Flip animation for the dog
let flipped = false;
function flipDog() {
    flipped = !flipped;
    document.getElementById("dog").style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
}
setInterval(flipDog, 1000);

// Update health bar when skipping a day
function updateHealthBarOnSkip() {
    const healthBar = document.querySelector(".hb_max"); // Select health bar
    if (healthBar) {
        healthBar.src = "images/healthbar/hb_1.png"; // Update image
    } else {
        console.error("Health bar element not found!"); // Debugging message
    }
}

// Ensure everything runs after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    generateCalendar();
    document.getElementById("dog").style.transform = "rotateY(180deg)";

    // Fix button ID to match HTML
    const demoButton = document.getElementById("DemoButton");
    if (demoButton) {
        demoButton.addEventListener("click", function () {
            skipDay();  
            updateHealthBarOnSkip(); 
            demoButton.disabled = true; // Disable button after one click
        });
    } else {
        console.error("Demo button not found!"); // Debugging message
    }
});

//banner animation
// Array of messages to show on the banner
const messages = [
    "You are stronger than your cravings.",
    "Take it one day at a time. You’re doing amazing!",
    "Your health is worth every ounce of effort.",
    "Your future self will thank you for today’s choice.",
    "Believe in your strength to break free.",
    "Today is a new chapter. Keep writing your story.",
    "You are not alone. Every step counts"


];

let currentMessageIndex = 0;

// Function to change the banner message every 2 minutes
function changeBannerMessage() {
    const banner = document.getElementById('floatingBanner');
    currentMessageIndex = (currentMessageIndex + 1) % messages.length; // Cycle through the messages
    banner.textContent = messages[currentMessageIndex];
}

// Change the message every 2 minutes (120000 milliseconds)
setInterval(changeBannerMessage, 30000 ); // 30 seconds 


//INTRO SCREEN DISAPPEAR
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Add class to show the main content and hide the intro screen
        document.querySelector('.phone-screen').classList.add('loaded');
    }, 3000);  // Set the time when you want the transition to occur (when fade-out is complete)
});
