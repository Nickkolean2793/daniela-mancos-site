// ==========================================
// DANIELA MANCOS - Booking System
// ==========================================

// Service options by category
const serviceOptions = {
    tratamente: [
        { value: 'indreptare-keratina', label: 'Îndreptare cu Keratină' },
        { value: 'keratina', label: 'Keratină' },
        { value: 'nanoplastie', label: 'Nanoplastie' },
        { value: 'botox', label: 'Botox Cald/Rece' },
        { value: 'reconstructie', label: 'Reconstrucție' }
    ],
    colorare: [
        { value: 'balayage', label: 'Balayage' },
        { value: 'airtouch', label: 'Airtouch' },
        { value: 'blond-total', label: 'Blond Total' },
        { value: 'vopsit', label: 'Vopsit' }
    ],
    tunsori: [
        { value: 'bob-lung', label: 'Bob Lung' },
        { value: 'bob-scurt', label: 'Bob Scurt' },
        { value: 'bob-drept', label: 'Bob Drept' },
        { value: 'tuns-scari', label: 'Tuns în Scări' },
        { value: 'butterfly', label: 'Butterfly' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
});

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const dateInput = document.getElementById('date');
    
    if (!form || !dateInput) return;

    // Set minimum date to next working day
    setMinimumDate(dateInput);

    // Validate date on change (no weekends)
    dateInput.addEventListener('change', function() {
        validateDate(this);
    });

    // Form submission handled by Netlify Forms
    // form.addEventListener('submit', handleBookingSubmit);
}

// Update service options based on category selection
function updateServiceOptions() {
    const categorySelect = document.getElementById('serviceCategory');
    const serviceSelect = document.getElementById('service');
    
    if (!categorySelect || !serviceSelect) return;
    
    const category = categorySelect.value;
    
    // Clear current options
    serviceSelect.innerHTML = '';
    
    if (!category) {
        serviceSelect.innerHTML = '<option value="">Selectează mai întâi categoria</option>';
        serviceSelect.disabled = true;
        return;
    }
    
    // Add default option
    serviceSelect.innerHTML = '<option value="">Selectează serviciul</option>';
    
    // Add options for selected category
    const options = serviceOptions[category] || [];
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        serviceSelect.appendChild(option);
    });
    
    serviceSelect.disabled = false;
}

// Make function globally available
window.updateServiceOptions = updateServiceOptions;

function setMinimumDate(dateInput) {
    const today = new Date();
    let minDate = new Date(today);
    
    // Start from tomorrow
    minDate.setDate(minDate.getDate() + 1);
    
    // Skip weekends
    while (isWeekend(minDate)) {
        minDate.setDate(minDate.getDate() + 1);
    }
    
    // Format as YYYY-MM-DD
    const formattedDate = formatDateForInput(minDate);
    dateInput.min = formattedDate;
    dateInput.value = formattedDate;
}

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function validateDate(input) {
    const selectedDate = new Date(input.value);
    
    if (isWeekend(selectedDate)) {
        alert('Programările sunt disponibile doar în zilele lucrătoare (Luni - Vineri).');
        
        // Find next working day
        let nextWorkingDay = new Date(selectedDate);
        while (isWeekend(nextWorkingDay)) {
            nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
        }
        
        input.value = formatDateForInput(nextWorkingDay);
    }
}

// Form submission is now handled by Netlify Forms
// The handleBookingSubmit function has been removed
