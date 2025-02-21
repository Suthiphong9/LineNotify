// ตรวจสอบการเข้าสู่ระบบเมื่อโหลดหน้า
window.addEventListener('load', function() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn !== 'true') {
        window.location.href = 'login.html'; // เปลี่ยนเส้นทางไปยังหน้า login.html
    } else {
        loadTableData();
    }
});

function loadTableData() {
    const data = JSON.parse(localStorage.getItem('scheduleData')) || [];
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];

    data.forEach(item => {
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = item.day;
        newRow.insertCell(1).textContent = item.subject;
        newRow.insertCell(2).textContent = item.activity;
        newRow.insertCell(3).innerHTML = '<button onclick="deleteRow(this)" class="button:hover">ลบ</button>';
        newRow.insertCell(4).innerHTML = '<button onclick="sendToLine(this)" class="button:hover">ส่งข้อมูล</button>';
    });
}
