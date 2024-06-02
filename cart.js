//
function submitProduct() {
    var quantity = document.productForm.quantity.value;
    var price = document.productForm.price.value;
    var productNum = document.productForm.id.value;
    var productName = document.productForm.name.value;
    var available_quant = document.productForm.available.value;




    if (quantity == 0) {
        window.alert("No Product Selected");
    } else if (quantity > available_quant) {
        window.alert("Only " + available_quant + " " + productName + " left in stock");
    } else {
        //let confirmation = window.confirm(`Add ${productName} to cart?`);
        if (window.confirm("Add " + productName + " to cart?")) {
            document.cookie = productNum + "=" + productName + "," + price + "," + quantity + "," + available_quant + "; path=/";
            window.location.assign("../store_index.html");
        }

    }
}

function callback() {
    if (req.readyState === 4) {
        if (req.status === 200) {
            document.getElementById('label1').innerHTML = req.responseText;
        }
    } else {
        console.log("error in callback");
    }
}

//routes page to shopping cart review if cart is not empty
function reviewCart() {
    if (document.cookie.length != 0) {
        window.location.assign("cart.html");

    } else (
        window.alert("Empty Cart - Please Buy Something First")
    )
}

//for debugging purposes
function test() {
    try {
        
        window.alert(document.location.toString());
    } catch (error) {
        console.log(error.stack);
        console.log(error.name);
        console.log(error.message);
        window.alert("pause");
    }
}

//splits apart cookies and turns them into an object
//also assigns img urls to each one using a switch statement
function processCookies() {
    if (document.cookie.length == 0) {
        return false;
    } else {
        var my_cookies = unescape(document.cookie);

        var cookie_array = my_cookies.split(";");

        var length = cookie_array.length;

        var i = 0;
        const cookie_val = [];
        let cookies_array = [];
        for (i = 0; i < length; i++) {
            cookie_val[i] = cookie_array[i].split("=");

            var keys = cookie_val[i][1].split(",");

            let url = "";
            switch (cookie_val[i][0].trim()) {
                case "1":
                    url = "imgs/e-books/health/NoExercise.jpg";
                    break;
                case "2":
                    url = "imgs/e-books/health/healthPlan.jpg";
                    break;
                case "3":
                    url = "imgs/e-books/health/soul.jpg";
                    break;
                case "4":
                    url = "imgs/e-books/health/WheatBelly.jpg";
                    break;
                case "5":
                    url = "imgs/e-books/parenting/expect.jpg";
                    break;
                case "6":
                    url = "imgs/e-books/parenting/expect1.jpg";
                    break;
                case "7":
                    url = "imgs/e-books/parenting/Mama.jpg";
                    break;
                case "8":
                    url = "imgs/e-books/parenting/talk.jpg";
                    break;
                default:
                    url = "imgs/e-books/health/healthPlan.jpg";
            }

            cookies_array.push({ id: cookie_val[i][0], name: keys[0], price: keys[1], quantity: keys[2], image: url , available: keys[3]})

            //document.cookie = cookie_val[0] + "'" + cookie_val[1] + ";" + "expires=Thu, 01-Jan-95 00:00:01 GMT";
        }

        return cookies_array;
    }
}

//takes the index within document.cookie for a cookie and expires it
function deleteCookie(index) {
    var cookie_array = document.cookie.split(";");
    cookie_values = cookie_array[index].split("=");
    console.log("Cookie deleted: " + cookie_values);
    document.cookie = cookie_values[0] + "=" + cookie_values[1] + ";" + "expires=Thu, 01-Jan-95 00:00:01 GMT";
}

//removes the cookie/row of the button that this function was called
function removeRow(element) {
    if (window.confirm("Remove from Cart?")) {
        var row = element.parentNode.parentNode.rowIndex;
        deleteCookie(row - 1);
        if (document.cookie.length == 0) {
            window.alert("Cart is empty - Redirecting to store page");
            document.location.assign("store_index.html");
        } else {
            document.location.reload();
        }
    }
}

//builds shopping cart into table WITH remove buttons
function processPage() {
    var pname = document.getElementById("title").innerHTML;

    
    
    //Build table dynamically using cookies
    
    var row1 = document.getElementById("table").insertRow(0); //the 0 inserts row at end
    var row1d0 = row1.insertCell(-1);
    row1d0.align = "center";
    row1d0.width = 100;
    var row1d1 = row1.insertCell(-1);
    row1d1.align = "center";
    var row1d2 = row1.insertCell(-1);
    row1d2.align = "center";
    var row1d3 = row1.insertCell(-1);
    row1d3.align = "center";
    var row1d4 = row1.insertCell(-1);
    row1d4.align = "center";

    row1d0.innerHTML = "<b>Catalogue#</b>";
    row1d1.innerHTML = "<b>Item</b>";
    row1d2.innerHTML = "<b>Price</b>";
    row1d3.innerHTML = "<b>Quantity</b>";
    row1d4.innerHTML = "<b>Total</b>";


   
    const cookies = processCookies();
    var i = 0;
    const row = [];
    var total = 0;
    for (i = 0; i < cookies.length; i++) {
        row[i] = document.getElementById("table").insertRow(-1);
        let rowcell1 = row[i].insertCell(-1);
        rowcell1.align = "center";
        rowcell1.innerHTML = cookies[i].id;
        let rowcell2 = row[i].insertCell(-1);
        rowcell2.align = "center";
        rowcell2.innerHTML =
            `<h3>${cookies[i].name}</h3> <img src="${cookies[i].image}"></img> <button type="button" onclick="removeRow(this)">Remove</button>`;
        //add remove button
        let rowcell3 = row[i].insertCell(-1);
        rowcell3.align = "center";
        rowcell3.innerHTML = Number(cookies[i].price).toFixed(2);
        let rowcell4 = row[i].insertCell(-1);
        rowcell4.align = "center";
        rowcell4.innerHTML = cookies[i].quantity;
        let rowcell5 = row[i].insertCell(-1);
        rowcell5.align = "center";
        rowcell5.innerHTML = (cookies[i].quantity * cookies[i].price).toFixed(2);

        total += (cookies[i].quantity * cookies[i].price);
    } 

    var lastRow = document.getElementById("table").insertRow(-1);
    var rowlastd0 = lastRow.insertCell(-1);
    rowlastd0.align = "center";
    rowlastd0.width = 100;
    var rowlasttotal = lastRow.insertCell(-1);
    rowlasttotal.align = "center";

    rowlastd0.innerHTML = "TOTAL";
    rowlasttotal.innerHTML = "$" + Number(total).toFixed(2);
}

//builds shopping cart within table WITHOUT remove buttons
function showCart() {
    var row1 = document.getElementById("table").insertRow(0); //the 0 inserts row at end
    var row1d0 = row1.insertCell(-1);
    row1d0.align = "center";
    row1d0.width = 100;
    var row1d1 = row1.insertCell(-1);
    row1d1.align = "center";
    var row1d2 = row1.insertCell(-1);
    row1d2.align = "center";
    var row1d3 = row1.insertCell(-1);
    row1d3.align = "center";
    var row1d4 = row1.insertCell(-1);
    row1d4.align = "center";

    row1d0.innerHTML = "<b>Catalogue#</b>";
    row1d1.innerHTML = "<b>Item</b>";
    row1d2.innerHTML = "<b>Price</b>";
    row1d3.innerHTML = "<b>Quantity</b>";
    row1d4.innerHTML = "<b>Total</b>";

    const cookies = processCookies();
    var i = 0;
    const row = [];
    var total = 0;
    for (i = 0; i < cookies.length; i++) {
        row[i] = document.getElementById("table").insertRow(-1);
        let rowcell1 = row[i].insertCell(-1);
        rowcell1.align = "center";
        rowcell1.innerHTML = cookies[i].id;
        let rowcell2 = row[i].insertCell(-1);
        rowcell2.align = "center";
        rowcell2.innerHTML = `<h3>${cookies[i].name}</h3> <img src="${cookies[i].image}"></img> <button type="button"`;
        let rowcell3 = row[i].insertCell(-1);
        rowcell3.align = "center";
        rowcell3.innerHTML = Number(cookies[i].price).toFixed(2);
        let rowcell4 = row[i].insertCell(-1);
        rowcell4.align = "center";
        rowcell4.innerHTML = cookies[i].quantity;
        let rowcell5 = row[i].insertCell(-1);
        rowcell5.align = "center";
        rowcell5.innerHTML = (cookies[i].quantity * cookies[i].price).toFixed(2);

        total += (cookies[i].quantity * cookies[i].price);
    }

    var lastRow = document.getElementById("table").insertRow(-1);
    var rowlastd0 = lastRow.insertCell(-1);
    rowlastd0.align = "center";
    rowlastd0.width = 100;
    var rowlasttotal = lastRow.insertCell(-1);
    rowlasttotal.align = "center";

    rowlastd0.innerHTML = "TOTAL";
    rowlasttotal.innerHTML = "$" + Number(total).toFixed(2);
}

//simply routes page to the checkout page
function finalizePurchase() {
    window.location.assign("checkout.html");
}
function finishedPurchase() {
    window.alert("Purchase Successful!");
    window.location.assign("store_index.html");
}
function makePurchase() {
    //make an object of the customer data
    let customer_data = {
        cc_no: document.checkoutForm.cc_no.value,
        exp_mo: document.checkoutForm.exp_mo.value,
        exp_yr: document.checkoutForm.exp_yr.value,
        fname: document.checkoutForm.fname.value,
        lname : document.checkoutForm.lname.value,
        email : document.checkoutForm.email.value,
        address1 : document.checkoutForm.address1.value,
        address2 : document.checkoutForm.address2.value,
        city : document.checkoutForm.city.value,
        state : document.checkoutForm.state.value,
        zip : document.checkoutForm.zip.value,
        country : document.checkoutForm.country.value,
        phone : document.checkoutForm.phone.value,
        fax : document.checkoutForm.fax.value,
        mail : document.checkoutForm.mail_button.value
    };
    if (document.checkoutForm.mail_button.checked == false) {
        customer_data['mail'] = 0;
    } else {
        customer_data['mail'] = 1;
    }






    var cookies = processCookies();
    cookies.unshift(customer_data);

    var data = JSON.stringify(cookies);


    
    var url = "http://localhost:26018/query.php?XDEBUG_SESSION_START=test";
    var req = new XMLHttpRequest();

  

    req.open("POST", url, true); 
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-length", data.length);

    
    req.onreadystatechange = callback;
 
    req.send(data);

    finishedPurchase();
    
    
}