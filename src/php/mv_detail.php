<?php
    header('Access-Control-Allow-Origin:*');
    $id=$_REQUEST['id'];
    $html = file_get_contents('https://api.douban.com/v2/movie/subject/'.$id);
    echo $html;
?>