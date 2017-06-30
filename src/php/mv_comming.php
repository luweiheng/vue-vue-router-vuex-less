<?php
    header('Access-Control-Allow-Origin:*');
    $count=$_REQUEST['count'];
    $start=$_REQUEST['start'];
    $html = file_get_contents('https://api.douban.com/v2/movie/coming_soon?count='.$count.'&start='.$start);
    echo $html;
?>

