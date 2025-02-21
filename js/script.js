function addRow() {
    const day = document.getElementById('day').value;
    const subject = document.getElementById('subject').value;
    const activity = document.getElementById('activity').value;

    if (day && subject && activity) {
        const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
        const rows = table.getElementsByTagName('tr');

        // ลบแถวที่มีวันเดียวกัน
        for (let i = rows.length - 1; i >= 0; i--) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells[0].textContent === day) {
                table.deleteRow(i);
            }
        }

        // สร้างแถวใหม่
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = day;
        newRow.insertCell(1).textContent = subject;
        newRow.insertCell(2).textContent = activity;
        newRow.insertCell(3).innerHTML = '<button onclick="deleteRow(this)" class="button:hover">ลบ</button>';
        newRow.insertCell(4).innerHTML = '<button onclick="sendToLine(this)" class="btn">ส่งข้อมูล</button>';

        saveTableData();

        // ล้างข้อมูลในฟอร์ม
        document.getElementById('day').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('activity').value = '';
    } else {
        alert('กรุณากรอกข้อมูลให้ครบ');
    }
}

function saveTableData() {
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        const rowData = {
            day: cells[0].textContent,
            subject: cells[1].textContent,
            activity: cells[2].textContent
        };
        data.push(rowData);
    }

    localStorage.setItem('scheduleData', JSON.stringify(data));
}

function sendToLine(button) {
    const row = button.closest('tr');
    const day = row.cells[0].textContent;
    const subject = row.cells[1].textContent;
    const activity = row.cells[2].textContent;

    // สร้างข้อความที่ต้องการส่งไปยัง LINE
    const message = `วัน: ${day}\nวิชา: ${subject}\nกิจกรรม: ${activity}`;

    // ส่งข้อมูลไปยัง PHP Proxy Server
    fetch('line-notify.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ message })
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง LINE');
    });
}

function sendAllToLine() {
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (const row of rows) {
        const day = row.cells[0].textContent;
        const subject = row.cells[1].textContent;
        const activity = row.cells[2].textContent;

        data.push({ day, subject, activity });
    }

    fetch('line-notifyall.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ data: JSON.stringify(data) })
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อมูลทั้งหมดไปยัง LINE');
    });
}


function deleteRow(button) {
    // ลบแถวที่คลิก
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    saveTableData();
}


function logout() {
    localStorage.removeItem('loggedIn'); // ลบข้อมูลการล็อกอินจาก localStorage
    window.location.href = 'login.html'; // เปลี่ยนเส้นทางไปยังหน้า login.html
}
