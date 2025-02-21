<?php
// Access Token ของ LINE Notify ที่ได้รับมา (กรุณาใส่ Access Token ของคุณที่นี่)
$accessToken = 'A6eB2v0WnCF75I0JSHl5hr6EUiCMxTAbvWim0GLVkaF';

// รับข้อมูลที่ส่งมาจาก JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode($_POST['data'], true);
    $message = '';

    foreach ($data as $item) {
        $message .= "วัน: " . $item['day'] . "\n";
        $message .= "วิชา: " . $item['subject'] . "\n";
        $message .= "กิจกรรม: " . $item['activity'] . "\n\n";
    }

    // ส่งข้อมูลไปยัง LINE Notify
    $url = 'https://notify-api.line.me/api/notify';
    $data = http_build_query(['message' => $message]);
    $options = [
        'http' => [
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
                        "Authorization: Bearer $accessToken\r\n",
            'method' => 'POST',
            'content' => $data,
        ],
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // ตรวจสอบการส่งข้อมูล
    if ($result) {
        echo 'ส่งข้อมูลทั้งหมดไปยัง LINE สำเร็จ';
    } else {
        echo 'ไม่สามารถส่งข้อมูลทั้งหมดไปยัง LINE ได้';
    }
} else {
    echo 'การร้องขอไม่ถูกต้อง';
}
?>
