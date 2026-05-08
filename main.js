// Main JavaScript file for Currency Exchange App
// Simple and easy to understand for L3 students

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('App is ready!');
    
    // Initialize the app
    initApp();
});

// Main app initialization
function initApp() {
    // Set up any global settings
    setupApp();
    
    // Load user preferences
    loadSettings();
    
    // Start the app
    startApp();
}

// Setup basic app settings
function setupApp() {
    // Add any global setup here
    console.log('Setting up app...');
}

// Load user settings from storage
function loadSettings() {
    // Get theme preference
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
    
    console.log('Settings loaded');
}

// Start the main application
function startApp() {
    console.log('App started successfully!');
    
    // Add any startup code here
}

// Utility function to show messages
function showMessage(text, type = 'info') {
    alert(text); // Simple alert for L3 students
}

// Export functions if needed
window.showMessage = showMessage;
