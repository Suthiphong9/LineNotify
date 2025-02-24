document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งแบบฟอร์มโดยตรง

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // ตรวจสอบชื่อผู้ใช้และรหัสผ่าน (ตัวอย่างนี้ใช้ค่าตัวอย่าง)
    if (username === 'admin' && password === '1234') {
        // หากข้อมูลถูกต้อง
        
        localStorage.setItem('loggedIn', 'true'); // ตั้งค่า loggedIn เป็น true
        window.location.href = 'index.html'; // เปลี่ยนเส้นทางไปยังหน้า index.html
    } else {
        // หากข้อมูลไม่ถูกต้อง
        errorMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' ;
    }
});