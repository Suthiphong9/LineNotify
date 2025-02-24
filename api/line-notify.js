const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'กรุณาระบุข้อความที่ต้องการส่ง' });
    }

    const LINE_NOTIFY_TOKEN = 'A6eB2v0WnCF75I0JSHl5hr6EUiCMxTAbvWim0GLVkaF'; // แทนที่ด้วย Access Token ของคุณ

    try {
      await axios.post('https://notify-api.line.me/api/notify', `message=${encodeURIComponent(message)}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
        }
      });
      return res.status(200).json({ success: 'ส่งข้อความไป LINE Notify สำเร็จ' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'ไม่สามารถส่งข้อความได้' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
