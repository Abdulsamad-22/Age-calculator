const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();


const yearInput = document.querySelector('.year-input-field');
const monthInput = document.querySelector('.month-input-field');
const dayInput = document.querySelector('.day-input-field');

const dayContainer = document.querySelector('.day');
const monthContainer = document.querySelector('.month');
const yearContainer = document.querySelector('.year');

let resultYear = document.querySelector('.years');
let resultMonth = document.querySelector('.months');
let resultDay = document.querySelector('.days');

const printAge = document.querySelector('.calculate-age');

printAge.addEventListener('click', ()=> {
    const isValid = validateBirthDate(
        yearInput.value,
        monthInput.value,
        dayInput.value
    );

    if (isValid) {
        calculateDays(yearInput.value,
            monthInput.value,
            dayInput.value);
        calculateAge(today, dayInput.value);
    }

});

function validateBirthDate(year, month, day) {
    // Create validation elements
    let invalidYear = document.createElement('p');
    let invalidMonth = document.createElement('p');
    let invalidDay = document.createElement('p');
    let isValid = true;

    // Parse inputs to integers
    const yearInt = parseInt(year);
    const monthInt = parseInt(month);
    const dayInt = parseInt(day);

    // Clear previous error states
    clearErrors();

    // Displays error message if input year is not valid or empty
    if (!year || isNaN(yearInt)) {
        displayError(yearContainer, invalidYear, 'This field is required');
        isValid = false;
    } else if (!isValidYear(yearInt)) {
        displayError(yearContainer, invalidYear, 'Must be a valid year');
        isValid = false;
    }

    // Displays error message if input month is not valid or empty
    if (!month || isNaN(monthInt)) {
        displayError(monthContainer, invalidMonth, 'This field is required');
        isValid = false;
    } else if (!isValidMonth(monthInt)) {
        displayError(monthContainer, invalidMonth, 'Must be a valid month');
        isValid = false;
    }

    // Displays error message if input day is not valid or empty
    if (!day || isNaN(dayInt)) {
        displayError(dayContainer, invalidDay, 'This field is required');
        isValid = false;
    } else if (!isValidDate(yearInt, monthInt, dayInt)) {
        displayError(dayContainer, invalidDay, 'Must be a valid day');
        isValid = false;
    }

    return isValid;
}

// Validate year
function isValidYear(year) {
    const currentYear = new Date().getFullYear();
    return year <= currentYear && year >= 1800;
}

// Validate month
function isValidMonth(month) {
    return month >= 1 && month <= 12;  
}

// Validate date
function isValidDate(year, month, day) {
    const daysInMonth = new Date(year, month, 0).getDate();
    return day > 0 && day <= daysInMonth;
}

function displayError(container, element, message) {
    element.textContent = message;
    container.classList.add('error-indicators');
    container.appendChild(element);
}

function clearErrors() {
    const containers = [yearContainer, monthContainer, dayContainer];
    containers.forEach(container => {
        container.classList.remove('error-indicators');
        // Remove any existing error messages
        const existingError = container.querySelector('p');
        if (existingError) {
            container.removeChild(existingError);
        }
    });
}

function calculateAge (today, birthDay) {
    let dayDifference = currentDay - birthDay;

    if (dayDifference < 0) {
        const previousMonth = (today.getMonth() === 0) ? 11 : today.getMonth() -1;
        const previousMonthYear = (today.getMonth() === 0) ? today.getFullYear() - 1 : today.getFullYear();
        const daysInPreviousMonth = new Date(previousMonthYear, previousMonth + 1, 0).getDate();

        dayDifference += daysInPreviousMonth;
    }

    return dayDifference;
}

function calculateDays (birthYear,birthMonth, birthDay) {
    if (birthMonth > currentMonth) {
        const calculateYear =  (currentYear - 1) - birthYear;

        const calculateMonth = currentMonth + 12 - birthMonth;

        const calculateDay = calculateAge(today, birthDay);

        resultYear.innerHTML = `<span class="display-age">${calculateYear} </span>years`;
        resultMonth.innerHTML = `<span class="display-age">${calculateMonth}</span> months`;
        resultDay.innerHTML = `<span class="display-age">${calculateDay}</span> days`;

    }  else {
        const calculateYear = currentYear - birthYear;

        const calculateMonth = currentMonth - birthMonth;

        const calculateDay = calculateAge(today, birthDay);

        resultYear.innerHTML = `<span class="display-age">${calculateYear} </span>years`;
        resultMonth.innerHTML = `<span class="display-age">${calculateMonth}</span> months`;
        resultDay.innerHTML = `<span class="display-age">${calculateDay}</span> days`;
      
    }
}