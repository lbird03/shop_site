<head></head>
<body>

<?php

$file = fopen("blog.txt", "r");

if (!$file) {
    exit('<h1>Problem opening file</h1>');
}
$no_of_lines = 0;
while (true) {
    $line = fgets($file);

    

    if (!$line)
        break;

    $info[$no_of_lines++] = trim($line, "\r\n");

    
}
    fclose($file);
$counter = sizeof($info);
while ($counter > 0) {
    $x = $counter - 1;
    $array = explode(",", $info[$x]);
    echo ("<div style='text-align: center'>");
    echo ("<h2>" . $array[1] . "</h2>");
    echo ("<h4>by " . $array[0] . " on " . $array[4] . "</h4>");
    echo ("<img src='imgs/blog/" . $array[2] . "' style='150px' />");
    echo ("<div style='border: 1px solid black;'>" . $array[3] . "</div>");
    echo ("</div>");

    $counter--;
}
?>

</body>