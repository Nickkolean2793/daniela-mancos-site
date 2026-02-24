// ==========================================
// DANIELA MANCOS - Courses System
// ==========================================

// Global functions for modal control
function openCourseModal(courseName, coursePrice) {
    console.log('openCourseModal called with:', courseName, coursePrice);
    
    const modal = document.getElementById('courseModal');
    const modalInfo = document.getElementById('modalCourseInfo');
    
    if (!modal) {
        console.error('Modal element not found!');
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
    
    console.log('Modal should be visible now');
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

// Make functions globally available
window.openCourseModal = openCourseModal;
window.closeCourseModal = closeCourseModal;
window.showCourseSuccess = showCourseSuccess;

// Initialize modal event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing course modal...');
    initCourseModal();
});

// Initialize modal functionality
function initCourseModal() {
    const modal = document.getElementById('courseModal');
    const closeBtn = modal?.querySelector('.modal-close');
    
    if (!modal) {
        console.error('Course modal not found in DOM');
        return;
    }

    console.log('Course modal found, setting up event listeners');

    // Close on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeCourseModal();
        });
    }

    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCourseModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCourseModal();
        }
    });
    
    console.log('Modal event listeners set up successfully');
}
