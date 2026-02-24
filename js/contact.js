// ==========================================
// DANIELA MANCOS - Contact Form
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    monitorGoogleFormSubmission();
});

function initContactForm() {
    // Legacy function - keeping for compatibility
    // Google Forms now handles submission
}

// Monitor iframe for form submission
function monitorGoogleFormSubmission() {
    const iframe = document.getElementById('contactIframe');
    if (!iframe) return;

    // Add button to manually trigger success (for testing)
    // Note: Due to iframe security, we can't detect actual submission
    // Users can click "Send another message" button when they see Google's confirmation
    
    // Alternative: Show success after a delay when user clicks in iframe
    let clickCount = 0;
    iframe.addEventListener('load', function() {
        console.log('Contact form loaded');
    });
}

function showContactSuccess() {
    const overlay = document.getElementById('contactSuccessOverlay');
    const iframe = document.getElementById('contactIframe');
    
    if (overlay) {
        overlay.style.display = 'flex';
        if (iframe) {
            iframe.style.opacity = '0.3';
        }
    }
}

function resetContactForm() {
    const overlay = document.getElementById('contactSuccessOverlay');
    const iframe = document.getElementById('contactIframe');
    
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    if (iframe) {
        iframe.style.opacity = '1';
        // Reload the form
        iframe.src = iframe.src;
    }
}

// Make functions globally available
window.showContactSuccess = showContactSuccess;
window.resetContactForm = resetContactForm;
        form.style.display = 'block';
        successDiv.classList.add('hidden');
    }
}

// Make functions globally available
window.resetContactForm = resetContactForm;
