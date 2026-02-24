// ==========================================
// DANIELA MANCOS - Courses System
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initCourseModal();
    initCourseForm();
});

// ==========================================
// Course Modal
// ==========================================
function initCourseModal() {
    const modal = document.getElementById('courseModal');
    const closeBtn = modal?.querySelector('.modal-close');
    
    if (!modal) return;

    // Close on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCourseModal);
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCourseModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCourseModal();
        }
    });
}

function openCourseModal(courseName, coursePrice) {
    const modal = document.getElementById('courseModal');
    const modalInfo = document.getElementById('modalCourseInfo');
    
    if (!modal) {
        console.error('Modal not found');
        return;
    }

    // Set course info
    if (modalInfo) {
        modalInfo.textContent = `${courseName} - ${coursePrice}`;
    }
    
    // Hide success overlay if visible
    const successOverlay = document.getElementById('courseSuccessOverlay');
    if (successOverlay) {
        successOverlay.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal opened for:', courseName);
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset iframe
        const iframe = document.getElementById('courseIframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    }
}

// Make functions globally available
window.openCourseModal = openCourseModal;
window.closeCourseModal = closeCourseModal;

// Show success overlay for course enrollment
function showCourseSuccess() {
    const overlay = document.getElementById('courseSuccessOverlay');
    const iframe = document.getElementById('courseIframe');
    
    if (overlay) {
        overlay.style.display = 'flex';
    }
    if (iframe) {
        iframe.style.opacity = '0.3';
    }
}

window.showCourseSuccess = showCourseSuccess;

// ==========================================
// Course Form (Legacy - keeping for compatibility)
// ==========================================
function initCourseForm() {
    // Google Forms now handles submission
    console.log('Course forms initialized');
}

async function handleCourseSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = {
        courseName: form.querySelector('#courseName').value,
        coursePrice: form.querySelector('#coursePrice').value,
        studentName: form.querySelector('#studentName').value,
        studentEmail: form.querySelector('#studentEmail').value,
        studentPhone: form.querySelector('#studentPhone').value,
        experience: form.querySelector('#experience').value,
        message: form.querySelector('#courseMessage').value || '',
        timestamp: new Date().toISOString()
    };

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';

    try {
        // Simulate API call
        await simulateCourseEnrollmentAPI(formData);
        
        // Show success
        form.classList.add('hidden');
        document.getElementById('courseSuccess').classList.remove('hidden');
        
        // Show notification
        showNotification('Înscrierea a fost trimisă cu succes!');
        
        // Store enrollment locally
        saveCourseEnrollmentLocally(formData);
        
        console.log('Course enrollment submitted:', formData);
        console.log('Email notification would be sent to: nicolaebordei3@gmail.com');
        
        // Close modal after 3 seconds
        setTimeout(closeCourseModal, 3000);

    } catch (error) {
        console.error('Enrollment error:', error);
        showNotification('A apărut o eroare. Vă rugăm încercați din nou.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Trimite Înscrierea';
    }
}

// Simulate API call
function simulateCourseEnrollmentAPI(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.05) {
                resolve({ success: true, enrollmentId: 'EN' + Date.now() });
            } else {
                reject(new Error('Server error'));
            }
        }, 1500);
    });
}

            // Allow native form submission for Netlify Forms
            // No preventDefault, no AJAX
            // Netlify will handle email notification
    enrollments.push({
