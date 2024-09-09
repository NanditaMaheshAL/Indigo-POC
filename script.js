document.addEventListener('DOMContentLoaded', () => { //function performed when dom is loaded
    const form = document.getElementById('booking-form');
    const errorDiv = document.querySelector('.display-errors');
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.modal .close');
    const confirmSubmit = document.getElementById('confirm-submit');
    const cancelSubmit = document.getElementById('cancel-submit');
    
    form.addEventListener('submit', (event) => { //function performed when form is submitted
      event.preventDefault(); //prevents default form behaviour(page reload)
      const errors = []; //array to store error messages

      const from = document.getElementById('from').value.trim();
      const to = document.getElementById('to').value.trim();
      const specialFares = document.getElementById('special-fares').value.trim();
      const travellingFor = document.getElementById('travelling-for').value.trim();

      const departureDateValue = document.getElementById('departure').value;
      const returnDateValue = document.getElementById('return').value;
      const departureDate = departureDateValue ? new Date(departureDateValue) : null; //if no date selected (no value), then null value assigned
      const returnDate = returnDateValue ? new Date(returnDateValue) : null; //if no date selected (no value), then null value assigned
  
      // clear previous errors
      errorDiv.innerHTML = '';
  
      // check for empty inputs
      //pushes error string into error arr
      if (!from) {
        errors.push('From input needs to be filled.');
      }
      if (!to) {
        errors.push('To input needs to be filled.');
      }
      if (!departureDate) {
        errors.push('Departure date input needs to be filled.');
      }
      if (!returnDate) {
        errors.push('Return date input needs to be filled.');
      }
      if (!specialFares) {
        errors.push('Special Fares input needs to be filled.');
      }
      if (!travellingFor) {
        errors.push('Travelling For input needs to be filled.');
      }
  
      // check if departure date & return date is filled & departure date is less than return date
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
        modal.style.display = 'block';
      }

      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        alert("Closed Modal.")
      });
    
      cancelSubmit.addEventListener('click', () => {
        modal.style.display = 'none';
        alert("Cancelled submission.")
      });
    
      confirmSubmit.addEventListener('click', () => {
        form.submit(); // Submit the form
        alert("Form submitted.")
      });
    
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });  
      // add all the elements inside modal which you want to make focusable
      const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
      const focusableContent = modal.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
      document.addEventListener('keydown', function(e) {
      let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (!isTabPressed) {
      return;
      }
      if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else { // if tab key is pressed
      if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
      }
      });
      firstFocusableElement.focus();   
    });
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
