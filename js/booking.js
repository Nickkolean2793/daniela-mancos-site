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

    // Form submission
    form.addEventListener('submit', handleBookingSubmit);
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

async function handleBookingSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get category label
    const categorySelect = form.querySelector('#serviceCategory');
    const categoryLabel = categorySelect ? categorySelect.options[categorySelect.selectedIndex].text : '';
    
    // Get service label
    const serviceSelect = form.querySelector('#service');
    const serviceLabel = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        category: categorySelect ? categorySelect.value : '',
        categoryLabel: categoryLabel,
        service: serviceSelect ? serviceSelect.value : '',
        serviceLabel: serviceLabel,
        date: form.querySelector('#date').value,
        time: form.querySelector('#time').value,
        notes: form.querySelector('#notes').value || '',
        timestamp: new Date().toISOString()
    };

    // Validate weekend (extra check)
    const selectedDate = new Date(formData.date);
    if (isWeekend(selectedDate)) {
        showNotification('Programările sunt disponibile doar în zilele lucrătoare.', 'error');
        // Only validate weekend, let Netlify handle submission
        const form = event.target;
        const dateInput = form.querySelector('#date');
        if (dateInput && isWeekend(new Date(dateInput.value))) {
            showNotification('Programările sunt disponibile doar în zilele lucrătoare.', 'error');
            dateInput.value = formatDateForInput(getNextWorkingDay(new Date(dateInput.value)));
            return;
        }
        // Allow native form submission
        // No preventDefault, no AJAX
        // Netlify will handle email notification
        // Optionally, show loading state
        // (remove if not needed)
        // form.querySelector('button[type="submit"]').disabled = true;
        // form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';
        if (response.ok && result.success) {
