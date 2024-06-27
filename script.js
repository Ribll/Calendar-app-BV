document.addEventListener('DOMContentLoaded', () => {
    let selectedPerson = 'Manuel Andreetta';
    const calendarData = {
        'Riccardo Ballan': {},
        'Mattia Gregori': {},
        'Alessandra Ambrosini': {},
        'Andrea Corradin': {},
        'Cristina Rossi': {},
        'Manuel Andreetta': {},
        'Roberta Guerra': {},
        'Industrial': {},
        'Corporate': {},
        'Mis Support': {} // Aggiunto
    };

    // Gestione espansione/contrazione del menu MIS Support e Aggregati
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const subMenu = this.nextElementSibling;
            if (subMenu.style.display === 'block') {
                subMenu.style.display = 'none';
                this.classList.remove('expanded');
            } else {
                subMenu.style.display = 'block';
                this.classList.add('expanded');
            }
        });
    });

    document.querySelectorAll('.sidebar ul .sub-menu li a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.sidebar ul .sub-menu li a').forEach(link => {
                link.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedPerson = this.getAttribute('data-name');
            console.log('Selected person:', selectedPerson); // Debug
            const month = document.getElementById('month').value;
            const year = document.getElementById('year').value;
            generateCalendar(month, year);
        });
    });

    document.getElementById('month').addEventListener('change', function() {
        const month = this.value;
        const year = document.getElementById('year').value;
        generateCalendar(month, year);
    });

    document.getElementById('year').addEventListener('change', function() {
        const year = this.value;
        const month = document.getElementById('month').value;
        generateCalendar(month, year);
    });

    function generateCalendar(month, year) {
        const calendarBody = document.querySelector('.calendar tbody');
        calendarBody.innerHTML = '';

        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();

        let date = 1;
        let started = false;
        let smartDayCounter = 0; // Contatore per i giorni SmartWorking

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j === (firstDay + 6) % 7) {
                    started = true;
                }

                if (started && date <= daysInMonth) {
                    const span = document.createElement('span');
                    span.textContent = date;
                    span.classList.add('day-number');
                    cell.appendChild(span);

                    if (selectedPerson === 'Industrial') {
                        const names = ['Riccardo Ballan', 'Mattia Gregori', 'Alessandra Ambrosini', 'Andrea Corradin'];
                        const key = `${year}-${month}-${date}`;
                        names.forEach(name => {
                            const infoDiv = document.createElement('div');
                            infoDiv.classList.add('person-info');
                            if (calendarData[name][key]) {
                                const data = calendarData[name][key];
                                infoDiv.textContent = `${name}: ${data.status}`;
                                infoDiv.classList.add(`status-${data.status.toLowerCase()}`);
                                if (data.note) {
                                    infoDiv.textContent += ` (${data.note})`;
                                }
                            } else {
                                const dayOfWeek = new Date(year, month - 1, date).getDay();
                                if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Se non è sabato o domenica
                                    infoDiv.textContent = `${name}: In sede`;
                                    infoDiv.classList.add('status-default');
                                }
                            }
                            cell.appendChild(infoDiv);
                        });
                    } else if (selectedPerson === 'Corporate') {
                        const names = ['Manuel Andreetta', 'Roberta Guerra'];
                        const key = `${year}-${month}-${date}`;
                        names.forEach(name => {
                            const infoDiv = document.createElement('div');
                            infoDiv.classList.add('person-info');
                            if (calendarData[name][key]) {
                                const data = calendarData[name][key];
                                infoDiv.textContent = `${name}: ${data.status}`;
                                infoDiv.classList.add(`status-${data.status.toLowerCase()}`);
                                if (data.note) {
                                    infoDiv.textContent += ` (${data.note})`;
                                }
                            } else {
                                const dayOfWeek = new Date(year, month - 1, date).getDay();
                                if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Se non è sabato o domenica
                                    infoDiv.textContent = `${name}: In sede`;
                                    infoDiv.classList.add('status-default');
                                }
                            }
                            cell.appendChild(infoDiv);
                        });
						
					} else if (selectedPerson === 'MisSupport') {
                        const names = ['Cristina Rossi','Riccardo Ballan', 'Mattia Gregori', 'Alessandra Ambrosini', 'Andrea Corradin','Manuel Andreetta', 'Roberta Guerra'];
                        const key = `${year}-${month}-${date}`;
                        names.forEach(name => {
                            const infoDiv = document.createElement('div');
                            infoDiv.classList.add('person-info');
                            if (calendarData[name][key]) {
                                const data = calendarData[name][key];
                                infoDiv.textContent = `${name}: ${data.status}`;
                                infoDiv.classList.add(`status-${data.status.toLowerCase()}`);
                                if (data.note) {
                                    infoDiv.textContent += ` (${data.note})`;
                                }
                            } else {
                                const dayOfWeek = new Date(year, month - 1, date).getDay();
                                if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Se non è sabato o domenica
                                    infoDiv.textContent = `${name}: In sede`;
                                    infoDiv.classList.add('status-default');
                                }
                            }
                            cell.appendChild(infoDiv);
                        });
                  
				  
				  
				  
				  
				  
				  
                    } else {
                        const textarea = document.createElement('textarea');
                        textarea.classList.add('transparent-textbox');
                        textarea.placeholder = "Note"; // Placeholder aggiunto
                        textarea.addEventListener('input', function() {
                            updateCalendarData(cell, date, month, year);
                        });
                        cell.appendChild(textarea);

                        const dropdown = createDropdown(cell, date, month, year);
                        cell.appendChild(dropdown);

                        const key = `${year}-${month}-${date}`;
                        if (calendarData[selectedPerson][key]) {
                            const data = calendarData[selectedPerson][key];
                            dropdown.value = data.status;
                            textarea.value = data.note;
                            cell.setAttribute('data-status', data.status);
                            if (data.status === 'Smart') {
                                smartDayCounter++; // Incrementa il contatore se lo stato è Smart
                            }
                        }
                    }

                    if (j === 5) {
                        cell.classList.add('saturday');
                    } else if (j === 6) {
                        cell.classList.add('sunday');
                    }
                    date++;
                } else {
                    cell.classList.add('empty');
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }

        // Aggiorna il contatore
        const smartDaysCounterElement = document.getElementById('smart-days-counter');
        smartDaysCounterElement.textContent = smartDayCounter;
    }

    function createDropdown(cell, date, month, year) {
        const select = document.createElement('select');
        const options = ["", "Assenza", "Trasferta", "Smart", "Reperibile", "Recupero"];
        
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });
        
        select.addEventListener('change', function() {
            updateCalendarData(cell, date, month, year);
            if (this.value === 'Trasferta') {
                alert("Inserire nelle note la destinazione");
            }
        });
        
        return select;
    }

    function updateCalendarData(cell, date, month, year) {
        const key = `${year}-${month}-${date}`;
        const note = cell.querySelector('.transparent-textbox').value;
        const status = cell.querySelector('select').value;
        calendarData[selectedPerson][key] = { status: status, note: note };
        cell.setAttribute('data-status', status);

        // Aggiorna il contatore se lo stato è Smart
        if (status === 'Smart') {
            const smartDaysCounterElement = document.getElementById('smart-days-counter');
            smartDaysCounterElement.textContent = parseInt(smartDaysCounterElement.textContent) + 1;
        }
    }

    // Inizializza il calendario con il mese e l'anno correnti
    const today = new Date();
    generateCalendar(today.getMonth() + 1, today.getFullYear());
});
