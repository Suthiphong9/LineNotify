function addRow() {
    const day = document.getElementById('day').value;
    const subject = document.getElementById('subject').value;
    const activity = document.getElementById('activity').value;

    if (day && subject && activity) {
        let savedData = JSON.parse(localStorage.getItem('scheduleData')) || [];

        // ลบข้อมูลที่มีวันเดียวกันก่อน
        savedData = savedData.filter(item => item.day !== day);

        // เพิ่มข้อมูลใหม่
        savedData.push({ day, subject, activity });
        localStorage.setItem('scheduleData', JSON.stringify(savedData));

        // โหลดข้อมูลใหม่ในตาราง
        loadTableData();

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
    // หาแถวที่ผู้ใช้คลิก
    const row = button.closest('tr');
    const day = row.cells[0].textContent;
    const subject = row.cells[1].textContent;
    const activity = row.cells[2].textContent;
  
    // สร้างข้อความ
    const message = `วัน: ${day}\nวิชา: ${subject}\nกิจกรรม: ${activity}\n`;
  
    fetch('/api/line-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })  // ส่ง message เป็นข้อความ
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('ส่งข้อมูลไปยัง LINE สำเร็จ');
      } else {
        alert('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง LINE');
      }
    })
    .catch(error => {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง LINE');
    });
  }
  

// ฟังก์ชันที่ใช้ส่งข้อความทั้งหมดไปยัง LINE
function sendAllToLine() {
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const data = [];

    // ดึงข้อมูลจากตาราง
    for (const row of rows) {
        const day = row.cells[0].textContent;
        const subject = row.cells[1].textContent;
        const activity = row.cells[2].textContent;

        // เพิ่มข้อมูลลงในอาเรย์
        data.push({ day, subject, activity });
    }

    // สร้างข้อความที่จะส่งไปยัง LINE
    let message = '';
    data.forEach(item => {
        message += `วัน: ${item.day}\nวิชา: ${item.subject}\nกิจกรรม: ${item.activity}\n\n`;
    });

    // ส่งข้อมูลทั้งหมดไปยัง LINE
    sendToLineMessage(message);
}

// ฟังก์ชันสำหรับการส่งข้อความไปยัง LINE
function sendToLineMessage(message) {
    fetch('/api/line-notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })  // ส่ง message ทั้งชุด
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('ส่งข้อมูลไปยัง LINE สำเร็จ');
        } else {
            alert('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง LINE');
        }
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง LINE');
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

window.onload = function() {
    loadTableData();
};

function loadTableData() {
    const savedData = JSON.parse(localStorage.getItem('scheduleData')) || [];
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // ล้างตารางก่อนโหลดใหม่
  
    savedData.forEach(item => {
      const newRow = table.insertRow();
      newRow.insertCell(0).textContent = item.day;
      newRow.insertCell(1).textContent = item.subject;
      newRow.insertCell(2).textContent = item.activity;
      newRow.insertCell(3).innerHTML = '<button onclick="sendToLine(this)" class="btn">ส่งข้อมูล</button>';
      newRow.insertCell(4).innerHTML = '<button onclick="deleteRow(this)" class="button:hover">ลบ</button>';
    });
  }
