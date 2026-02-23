// ==========================================
// DANIELA MANCOS - Contact Form
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Form submission - works with Netlify when deployed, shows success locally
    form.addEventListener('submit', function(event) {
        // Only prevent default on localhost for testing
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            showContactSuccess();
            return false;
        }
        // On Netlify, form will submit normally
    }, true);
}

function showContactSuccess() {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('contactSuccess');
    
    if (form && successDiv) {
        form.style.display = 'none';
        successDiv.classList.remove('hidden');
    }
}

function resetContactForm() {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('contactSuccess');
    
    if (form && successDiv) {
        form.reset();
        form.style.display = 'block';
        successDiv.classList.add('hidden');
    }
}

// Make functions globally available
window.resetContactForm = resetContactForm;
