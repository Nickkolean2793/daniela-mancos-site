// ==========================================
// DANIELA MANCOS - Contact Form
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Form submission - handle with inline success message
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => showContactSuccess())
        .catch((error) => {
            console.error('Error:', error);
            alert('A apărut o eroare. Te rugăm să încerci din nou.');
        });
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
