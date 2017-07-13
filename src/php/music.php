<?php
    header('Access-Control-Allow-Origin:*');
    $html = file_get_contents('http://music.163.com/api/playlist/detail?id=325515019');
    echo $html;
?>

