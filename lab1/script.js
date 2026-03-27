// Simple Calendar Generator
function generateCalendar(year, month) {
    const calendarContainer = document.getElementById("calendar-container");
    calendarContainer.innerHTML = "";

    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    // Header row with weekdays
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const headerRow = document.createElement("tr");
    weekdays.forEach(day => {
        const th = document.createElement("th");
        th.innerText = day;
        th.style.padding = "5px";
        th.style.border = "1px solid #333";
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Dates
    let row = document.createElement("tr");
    for (let i = 0; i < date.getDay(); i++) {
        const emptyCell = document.createElement("td");
        emptyCell.style.border = "1px solid #ccc";
        row.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        cell.innerText = day;
        cell.style.padding = "10px";
        cell.style.border = "1px solid #333";
        cell.style.textAlign = "center";

        // Highlight today's date
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            cell.style.background = "#ff9800";
            cell.style.color = "#fff";
            cell.style.fontWeight = "bold";
        }

        row.appendChild(cell);

        if ((day + date.getDay()) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }
    table.appendChild(row);
    calendarContainer.appendChild(table);
}

let events = {};

function generateCalendar(year, month) {
    const calendarContainer = document.getElementById("calendar-container");
    calendarContainer.innerHTML = "";

    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    // Header row
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const headerRow = document.createElement("tr");
    weekdays.forEach(day => {
        const th = document.createElement("th");
        th.innerText = day;
        th.style.border = "1px solid #333";
        th.style.padding = "5px";
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Dates
    let row = document.createElement("tr");
    for (let i = 0; i < date.getDay(); i++) {
        const emptyCell = document.createElement("td");
        emptyCell.style.border = "1px solid #ccc";
        row.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        cell.innerText = day;
        cell.style.padding = "10px";
        cell.style.border = "1px solid #333";
        cell.style.textAlign = "center";
        cell.style.cursor = "pointer";

        // Highlight today
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            cell.style.background = "#ff9800";
            cell.style.color = "#fff";
            cell.style.fontWeight = "bold";
        }

        // Add event on click
        cell.addEventListener("click", () => {
            const eventText = prompt(`Add event for ${day}/${month+1}/${year}:`);
            if (eventText) {
                const key = `${year}-${month+1}-${day}`;
                if (!events[key]) events[key] = [];
                events[key].push(eventText);
                displayEvents();
            }
        });

        row.appendChild(cell);

        if ((day + date.getDay()) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }
    table.appendChild(row);
    calendarContainer.appendChild(table);
}

function displayEvents() {
    const eventList = document.getElementById("events");
    eventList.innerHTML = "";
    for (const date in events) {
        events[date].forEach(event => {
            const li = document.createElement("li");
            li.innerText = `${date}: ${event}`;
            eventList.appendChild(li);
        });
    }
}

// Initialize
const today = new Date();
generateCalendar(today.getFullYear(), today.getMonth());