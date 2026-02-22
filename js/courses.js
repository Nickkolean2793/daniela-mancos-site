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
    const courseNameInput = document.getElementById('courseName');
    const coursePriceInput = document.getElementById('coursePrice');
    const form = document.getElementById('courseForm');
    const success = document.getElementById('courseSuccess');
    
    if (!modal) return;

    // Set course info
    modalInfo.textContent = `${courseName} - ${coursePrice}`;
    courseNameInput.value = courseName;
    coursePriceInput.value = coursePrice;
    
    // Reset form state
    form.reset();
    courseNameInput.value = courseName;
    coursePriceInput.value = coursePrice;
    form.classList.remove('hidden');
    success.classList.add('hidden');
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        document.getElementById('studentName').focus();
    }, 300);
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================
// Course Form
// ==========================================
function initCourseForm() {
    const form = document.getElementById('courseForm');
    
    if (!form) return;
    
    form.addEventListener('submit', handleCourseSubmit);
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

// Save enrollment locally
function saveCourseEnrollmentLocally(enrollment) {
    const enrollments = JSON.parse(localStorage.getItem('dm_enrollments') || '[]');
    enrollments.push({
        ...enrollment,
        id: 'EN' + Date.now(),
        status: 'pending'
    });
    localStorage.setItem('dm_enrollments', JSON.stringify(enrollments));
}

// Make functions globally available
window.openCourseModal = openCourseModal;
window.closeCourseModal = closeCourseModal;
