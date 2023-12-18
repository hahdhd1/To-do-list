var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
var weekdays = ['일', '월', '화', '수', '목', '금', '토'];
var todayDate = new Date().getDate();

document.addEventListener('DOMContentLoaded', function() {
    createWeekdays();
    createCalendar(currentYear, currentMonth);
    setupMonthNavigation();
});

function createCalendar(year, month) {
    var calendar = document.getElementById('calendar');
    updateMonthDisplay(year, month);

    var firstDay = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 달의 일수 계산

    var paddingDays = firstDay.getDay(); // 해당 달의 첫 번째 날의 요일 인덱스

    calendar.innerHTML = ''; // 이전 캘린더 내용 초기화

    for (let i = 0; i < paddingDays + daysInMonth; i++) {
        var daySquare = document.createElement('div');
        daySquare.classList.add('day');
        if (i >= paddingDays) {
            var day = i - paddingDays + 1;
            daySquare.innerText = day;

            if (year === currentYear && month === currentMonth && day === todayDate) {
                daySquare.classList.add('today');
            }

            daySquare.addEventListener('click', () => openModal(day));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function createWeekdays() {
    var weekdaysContainer = document.getElementById('weekdays');
    weekdays.forEach(function(weekday) {
        var dayElement = document.createElement('div');
        dayElement.textContent = weekday;
        weekdaysContainer.appendChild(dayElement);
    });
}

function createCalendar(year, month) {
    var calendar = document.getElementById('calendar');
    updateMonthDisplay(year, month);

    var firstDay = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var paddingDays = firstDay.getDay();

    calendar.innerHTML = ''; // 이전 캘린더 내용을 초기화

    for (let i = 0; i < paddingDays + daysInMonth; i++) {
        var daySquare = document.createElement('div');
        if (i >= paddingDays) {
            daySquare.classList.add('day');
            daySquare.innerText = i - paddingDays + 1;
            daySquare.addEventListener('click', () => openModal(i - paddingDays + 1));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}
function updateMonthDisplay(year, month) {
    var monthDisplay = document.getElementById('month-display');
    monthDisplay.textContent = `${year}년 ${month + 1}월`;
}

function setupMonthNavigation() {
    document.getElementById('prev-month').onclick = function() {
        if (currentMonth === 0) {
            currentYear--;
            currentMonth = 11;
        } else {
            currentMonth--;
        }
        createCalendar(currentYear, currentMonth);
    };

    document.getElementById('next-month').onclick = function() {
        if (currentMonth === 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        createCalendar(currentYear, currentMonth);
    };
}


    document.getElementById('prev-month').onclick = function() {
        if (month === 0) {
            createCalendar(year - 1, 11);
        } else {
            createCalendar(year, month - 1);
        }
    };
    document.getElementById('next-month').onclick = function() {
        if (month === 11) {
            createCalendar(year + 1, 0);
        } else {
            createCalendar(year, month + 1);
        }
    };

function openModal(day) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-title').innerText = `할 일 추가 - ${day}일`;
    document.getElementById('todo-input').focus();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function addTodo() {
    var input = document.getElementById('todo-input');
    var todoText = input.value.trim();
    if (todoText) {
        var li = document.createElement('li');
        li.textContent = todoText;

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function() {
            li.remove();
        };

        li.appendChild(deleteBtn);
        document.getElementById('todo-list').appendChild(li);
        input.value = '';
    }
}