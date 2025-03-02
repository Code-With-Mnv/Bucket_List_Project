const monthYear = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const addEventButton = document.getElementById('addEventButton');
const eventModal = document.getElementById('eventModal');
const closeModal = document.querySelector('.close');
const saveEventButton = document.getElementById('saveEvent');
const eventDateInput = document.getElementById('eventDate');
const eventTitleInput = document.getElementById('eventTitle');

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('events')) || {};

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate)} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    datesElement.innerHTML = '';

    // Add days from the previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = prevMonthLastDay - i;
        dateDiv.classList.add('other-month');
        datesElement.appendChild(dateDiv);
    }

    // Add days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = i;
        const dateKey = `${year}-${month + 1}-${i}`;
        if (events[dateKey]) {
            dateDiv.classList.add('has-event');
        }
        datesElement.appendChild(dateDiv);
    }

    // Add days from the next month
    const totalCells = 42; // 6 rows x 7 days
    const remainingCells = totalCells - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = i;
        dateDiv.classList.add('other-month');
        datesElement.appendChild(dateDiv);
    }
}

function openModal() {
    eventModal.style.display = 'flex';
}

function closeModalHandler() {
    eventModal.style.display = 'none';
}

function saveEvent() {
    const date = eventDateInput.value;
    const title = eventTitleInput.value;
    if (date && title) {
        events[date] = title;
        localStorage.setItem('events', JSON.stringify(events));
        closeModalHandler();
        renderCalendar();
    }
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

addEventButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
saveEventButton.addEventListener('click', saveEvent);

// Initialize calendar
renderCalendar();

function insert() {
    // Get the input elements
    const dateInput = document.getElementsByClassName("date")[0];
    const placeInput = document.getElementsByClassName("places")[0];

    // Get the display elements
    const displayDate = document.getElementById("displayDate");
    const displayPlace = document.getElementById("displayPlace");

    // Update the display elements with the input values
    displayDate.innerHTML = dateInput.value;
    displayPlace.innerHTML = placeInput.value;
}