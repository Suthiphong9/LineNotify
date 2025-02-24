// ตรวจสอบการเข้าสู่ระบบเมื่อโหลดหน้า
window.addEventListener('load', function() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn !== 'true') {
        window.location.href = 'login.html'; // เปลี่ยนเส้นทางไปยังหน้า login.html
    } else {
        loadTableData();
    }
});

