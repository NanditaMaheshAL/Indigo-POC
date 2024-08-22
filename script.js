document.addEventListener('DOMContentLoaded', () => { //function performed when dom is loaded
    const form = document.getElementById('booking-form');
    const errorDiv = document.querySelector('.display-errors');
    
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
        // if no errors (error arr is empty), alert box 
        alert("NO ERRORS!")
      }
    });
  });
  