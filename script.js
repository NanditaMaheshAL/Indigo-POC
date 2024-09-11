document.addEventListener('DOMContentLoaded', () => {
    const errorDiv = document.querySelector('.display-errors');
    const modal = document.getElementById('confirmation-modal');
    const confirmSubmit = document.getElementById('confirm-submit');
    const cancelSubmit = document.getElementById('cancel-submit');
    const searchButton = document.getElementById('search-button');
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        const errors = [];
        
        const from = document.getElementById('from-input').value.trim();
        const to = document.getElementById('to-input').value.trim();
        const specialFares = document.getElementById('special-fares-input').value.trim();
        const travellingFor = document.getElementById('travelling-for').value.trim();

        const departureDateValue = document.getElementById('departure-input').value;
        const returnDateValue = document.getElementById('return-input').value;
        const departureDate = departureDateValue ? new Date(departureDateValue) : null;
        const returnDate = returnDateValue ? new Date(returnDateValue) : null;

        // clear previous errors
        errorDiv.innerHTML = '';

        // check for empty inputs
        if (!from) errors.push('From input needs to be filled.');
        if (!to) errors.push('To input needs to be filled.');
        if (!departureDate) errors.push('Departure date input needs to be filled.');
        if (!returnDate) errors.push('Return date input needs to be filled.');
        if (!specialFares) errors.push('Special Fares input needs to be filled.');
        if (!travellingFor) errors.push('Travelling For input needs to be filled.');

        // check date logic
        if (departureDate && returnDate && departureDate >= returnDate) {
            errors.push('Departure date should always be less than return date.');
        }

        // display errors
        if (errors.length > 0) {
            const ul = document.createElement('ul');
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                ul.appendChild(li);
            });
            errorDiv.appendChild(ul);
        } else {
            // Track focusable elements
            focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
            const focusableContent = modal.querySelectorAll(focusableElements);
            lastFocusableElement = focusableContent[focusableContent.length - 1];

            // Open the modal
            modal.style.display = 'block';
            
            // Focus the first focusable element in the modal
            firstFocusableElement.focus();

            // Handle focus trapping in the modal
            document.addEventListener('keydown', function(e) {
                let isEscapePressed = e.key === 'Escape'
                let isTabPressed = e.key === 'Tab';
                if(isEscapePressed) {
                    modal.style.display = 'none'
                }
                if (!isTabPressed) return;
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            });
        }
        window.addEventListener('keydown', handleKeydown);
        cancelSubmit.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        confirmSubmit.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
    searchButton.focus()
    // Handle accordion menu functionality
    const accordionButtons = document.querySelectorAll('.accordion-menu button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);
            const menuId = button.getAttribute('aria-controls');
            const menu = document.getElementById(menuId);
            menu.style.display = expanded ? 'none' : 'block';
        });
    });
});
