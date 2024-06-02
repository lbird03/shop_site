<head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="productPage.css" />
    <script defer src="cart.js"></script>
</head>
<body>
<?php 
use Swoole\Redis\Server;
use function CommonMark\Parse;

$database = mysqli_connect("localhost:3306", "student", "hello", "student_space");
if (mysqli_connect_errno()) {
    print( "Failed to connect to  MySQL");
    exit("<h1>Failure");
}



$query = "select * from product where item_no = " . $_GET['id_no'];

$res = mysqli_query($database, $query);
if (!$res) {
    print("Error executing SQL Query");
    exit;
}

$row = mysqli_fetch_array($res);


echo ("<form action=\"https://localhost:8090/\" method=\"post\" name=\"productForm\" >");
echo ("<div class=\"submitForm\">");
//title
echo ("<h1>" . $row[1] . "</h1>");
//image
echo ("<img src=\"imgs/e-books/pages/" . $row[3] . "\" />");
//desc
echo ("<h3>" . $row[2] . "</h3>");
//price
echo ("<p>Price:   $" . $row[4] . "</p>");
echo ("<div class=\"submitForm\" style=\"display: flex\">");
echo ("<p>Quantity:</p>");
//quantity
if ($row[5] > 0) {
  echo ("<input title=\"\" name=\"quantity\" value=\"0\" pattern=\"[0-" . $row[5] . "]\" required=\"required\"/>");
  echo ("</div>");
  echo ("<br />");
  echo ("<input type=\"button\" value=\"\" onclick=\"submitProduct()\"/>");
} else {
  echo ("<h2>SOLD OUT</h2>");
  echo ("</div>");
  echo ("<br />");
}

echo ("<input type=\"hidden\" name=\"price\" value=\"" . $row[4] . "\" />");
echo ("<input type=\"hidden\" name=\"name\" value=\"" . $row[1] . "\" />");
echo ("<input type=\"hidden\" name=\"id\" value=\"" . $row[0] . "\" />");
echo ("<input type=\"hidden\" name=\"available\" value=" . $row[5] . " />");
echo ("</div>");
echo ("</form>");

?>
</body>           
            
            
            
            
                
                
            
            
            

            
            
            
        
    