<head>
    <title>Process</title>
</head>
<body>

<?php

extract($_POST);

if (count($_FILES)) {
    //setting intended path
    $target_dir = "imgs/blog/";
    
    $target_file = $target_dir . $_FILES["image"]["name"];
    $res = move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

    if (!$res) {
        print("<h1>Problem uploading " . $target_file . "</h1>");
    }

    $input_data = array($author, $title, $_FILES["image"]["name"], $text, date("d-m-Y"));
}



$append_string = implode(',', $input_data);

$file = fopen("blog.txt", 'a');

if (!$file) {
    exit('<h1>Problem opening file for appending</h1>');
}

fwrite($file, $append_string . "\r\n");

fclose($file);

?>

    <script>
        window.location.assign("blog.php");
    </script>
</body>