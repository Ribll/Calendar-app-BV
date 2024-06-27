document.addEventListener('DOMContentLoaded', () => {
    let selectedPerson = 'Manuel Andreetta';
    const calendarData = {
        'Riccardo Ballan': {},
        'Mattia Gregori': {},
        'Alessandra Ambrosini': {},
        'Andrea Corradin': {},
        'Manuel Andreetta': {},
        'Roberta Guerra': {},
        'Cristina Rossi': {},
        'MisSupport': {},
        'Industrial': {},
        'Corporate': {},
    };

    const calendarBody = document.querySelector('.calendar tbody');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const smartDaysCounter = document.getElementById('smart-days-counter');
    const sideBarLinks = document.querySelectorAll('.sidebar ul li a');
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    let currentMonth = parseInt(monthSelect.value);
    let currentYear = parseInt(yearInput.value);

    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        const daysInMonth = lastDay.getDate();
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                cell.classList.add(j === 5 ? 'saturday' : j === 6 ? 'sunday' : '');

                if (i === 0 && j < firstDayIndex) {
                    cell.classList.add('empty');
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    cell.classList.add('empty');
                    row.appendChild(cell);
                } else {
                    const dayNumber = document.createElement('div');
                    dayNumber.classList.add('day-number');
                    dayNumber.innerText = date;
                    cell.appendChild(dayNumber);

                    const statusSelect = document.createElement('select');
                    statusSelect.innerHTML = `
                        <option value="default">--Status--</option>
                        <option value="Assenza">Assenza</option>
                        <option value="Trasferta">Trasferta</option>
                        <option value="Smart">Smart Working</option>
                        <option value="Reperibile">Reperibile</option>
                        <option value="Recupero">Recupero</option>
                    `;

                    const textBox = document.createElement('textarea');
                    textBox.classList.add('transparent-textbox');
                    textBox.placeholder = 'Descrizione';

                    cell.appendChild(statusSelect);
                    cell.appendChild(textBox);
                    row.appendChild(cell);

                    const currentPersonData = calendarData[selectedPerson];
                    const currentDateKey = `${year}-${month}-${date}`;
                    const currentData = currentPersonData[currentDateKey] || { status: 'default', description: '' };

                    statusSelect.value = currentData.status;
                    textBox.value = currentData.description;

                    statusSelect.addEventListener('change', (e) => {
                        const selectedStatus = e.target.value;
                        currentPersonData[currentDateKey] = { ...currentPersonData[currentDateKey], status: selectedStatus };
                        updateCellStatus(cell, selectedStatus);
                        updateSmartDaysCounter();
                    });

                    textBox.addEventListener('input', (e) => {
                        const description = e.target.value;
                        currentPersonData[currentDateKey] = { ...currentPersonData[currentDateKey], description: description };
                    });

                    updateCellStatus(cell, currentData.status);
                    date++;
                }
            }
            calendarBody.appendChild(row);
        }
    }

    function updateCellStatus(cell, status) {
        cell.setAttribute('data-status', status);
    }

    function updateSmartDaysCounter() {
        const currentPersonData = calendarData[selectedPerson];
        let smartDays = 0;
        Object.keys(currentPersonData).forEach(dateKey => {
            if (currentPersonData[dateKey].status === 'Smart') {
                const date = new Date(dateKey);
                if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
                    smartDays++;
                }
            }
        });
        smartDaysCounter.innerText = smartDays;
    }

    monthSelect.addEventListener('change', (e) => {
        currentMonth = parseInt(e.target.value);
        generateCalendar(currentMonth, currentYear);
        updateSmartDaysCounter();
    });

    yearInput.addEventListener('input', (e) => {
        currentYear = parseInt(e.target.value);
        generateCalendar(currentMonth, currentYear);
        updateSmartDaysCounter();
    });

    sideBarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            selectedPerson = e.target.getAttribute('data-name');
            sideBarLinks.forEach(link => link.classList.remove('selected'));
            e.target.classList.add('selected');
            generateCalendar(currentMonth, currentYear);
            updateSmartDaysCounter();
        });
    });

    expandableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const subMenu = header.nextElementSibling;
            const isExpanded = header.classList.toggle('expanded');
            subMenu.style.display = isExpanded ? 'block' : 'none';
        });
    });

    generateCalendar(currentMonth, currentYear);
    updateSmartDaysCounter();
});
