// ==========================================
// DANIELA MANCOS - Contact Form
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', handleContactSubmit);
}

async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = {
        name: form.querySelector('#contactName').value,
        email: form.querySelector('#contactEmail').value,
        subject: form.querySelector('#contactSubject').value || 'Fără subiect',
        message: form.querySelector('#contactMessage').value,
        timestamp: new Date().toISOString()
    };

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';

    try {
        // Simulate API call
        await simulateContactAPI(formData);
        
        // Show success
        form.classList.add('hidden');
        document.getElementById('contactSuccess').classList.remove('hidden');
        
        // Show notification
        showNotification('Mesajul a fost trimis cu succes!');
        
        // Store message locally
        saveContactLocally(formData);
        
        console.log('Contact form submitted:', formData);
        console.log('Email notification would be sent to: nicolaebordei3@gmail.com');

    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('A apărut o eroare. Vă rugăm încercați din nou.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Trimite Mesajul';
    }
}

// Simulate API call
function simulateContactAPI(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.05) {
                resolve({ success: true, messageId: 'MSG' + Date.now() });
            } else {
                reject(new Error('Server error'));
            }
        }, 1500);
    });
}

// Save contact locally
function saveContactLocally(contact) {
    const contacts = JSON.parse(localStorage.getItem('dm_contacts') || '[]');
    contacts.push({
        ...contact,
        id: 'MSG' + Date.now(),
        status: 'unread'
    });
    localStorage.setItem('dm_contacts', JSON.stringify(contacts));
}

// Reset contact form
function resetContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('contactSuccess');
    
    if (form && success) {
        form.reset();
        success.classList.add('hidden');
        form.classList.remove('hidden');
    }
}

// Make functions globally available
window.resetContactForm = resetContactForm;
