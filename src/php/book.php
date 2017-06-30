<?php
    header('Access-Control-Allow-Origin:*');
    $html = file_get_contents('https://api.douban.com/v2/book/user/162858873/collections');
    echo $html;
?>