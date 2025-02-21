<?php
// Access Token ของ LINE Notify ที่ได้รับมา (กรุณาใส่ Access Token ของคุณที่นี่)
$accessToken = 'A6eB2v0WnCF75I0JSHl5hr6EUiCMxTAbvWim0GLVkaF';

// รับข้อมูลที่ส่งมาจาก JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'];

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
        echo 'ส่งข้อมูลไปยัง LINE สำเร็จ';
    } else {
        echo 'ไม่สามารถส่งข้อมูลไปยัง LINE ได้';
    }
} else {
    echo 'การร้องขอไม่ถูกต้อง';
}
// if (isset($_POST['submit'])) {
//     $header = "Testing Line Notify";
//     $username = $_POST['username'];
//     $pass = $_POST['pass'];

//     $message = $header .
//         "\n" . "ชื่อ: " . $username .
//         "\n" . "รหัส : " . $pass;

//     if (!empty($username) && !empty($pass)) {
//         sendLineMessage($message);
//         echo "<script>alert('ส่งข้อมูลสำเร็จ');</script>";
//         header("Location: index.php");
//         exit();
//     } else {
//         echo "<script>alert('กรุณากรอกให้ครบ');</script>";
//         header("Location: index.php");
//         exit();
//     }
// }

// function sendLineMessage($message) {
//     define('LINE_API', "https://notify-api.line.me/api/notify");
//     define('LINE_TOKEN', "A6eB2v0WnCF75I0JSHl5hr6EUiCMxTAbvWim0GLVkaF");

//     $queryData = array('message' => $message);
//     $queryData = http_build_query($queryData, '', '&');
//     $headerOptions = array(
//         'http' => array(
//             'method' => 'POST',
//             'header' => "Content-Type: application/x-www-form-urlencoded\r\n"
//                         . "Authorization: Bearer " . LINE_TOKEN . "\r\n"
//                         . "Content-Length: " . strlen($queryData) . "\r\n",
//             'content' => $queryData
//         )
//     );

//     $context = stream_context_create($headerOptions);
//     $result = file_get_contents(LINE_API, false, $context);
//     $res = json_decode($result);
//     return $res;
// }
?>
