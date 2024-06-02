

<?php

$database = mysqli_connect("localhost:3306", "student", "hello", "student_space");
if (mysqli_connect_errno()) {
    exit("<h1>Failure");
}

//Extract the username as entered in the form
$jsonCookies = file_get_contents('php://input');

$cookies = json_decode($jsonCookies, true);

if ($cookies == null) {
    http_response_code(400);
    echo "Invalid JSON data";
} else {
    $qry = "INSERT INTO customer VALUES(" . $cookies[0]['cc_no'] . ", " . $cookies[0]['exp_mo'] . ", " . $cookies[0]['exp_yr'] . ", '" . $cookies[0]['fname'] . "', '" . $cookies[0]['lname'] . "', '" . $cookies[0]['email'] . "', '" . $cookies[0]['address1'] . "', '" . $cookies[0]['address2'] . "', '" . $cookies[0]['city'] . "', '" . $cookies[0]['state'] . "', " . $cookies[0]['zip'] . ", '" . $cookies[0]['country'] . "', '" . $cookies[0]['phone'] . "', '" . $cookies[0]['fax'] . "', " . $cookies[0]['mail'] . ")";
    if (mysqli_query($database, $qry)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . msqli_error($database);
    }
    for ($x = 1; $x < count($cookies); $x++) {
        $id = $cookies[$x]['id'];
        $quantityLeft = $cookies[$x]['available'] - $cookies[$x]['quantity'];
        $qry = "INSERT INTO orders1 VALUES(" . $cookies[0]['cc_no'] . ", " . $id . ", " . $cookies[$x]['quantity'] . ", now())";
        if (mysqli_query($database, $qry)) {
           $qry = "UPDATE product SET inventory = " . $quantityLeft . " WHERE item_no = " . $id;
           if (mysqli_query($database, $qry)) {
                echo "Records Successfully Created";
           }
        }
    }
}



?>