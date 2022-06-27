/****************************************************************************
 * This function will add the a new booking item to the UL element
 * Specifically this will add:
 *
 *   <li>the item type<span class="close">X</>li>
 *
 * 1) add to DB
 * 2) if successful then add the item to the list
 *
 ****************************************************************************/
let totalPrice = 0;
let deliveryFee = 2.99;
let validVoucherID;
let jsnData = [];

let voucherType, voucherDiscount;
let priceDescription = "";

fetch('http://localhost:5023/coupon')
    // get the JSON content from the response
    .then((response) => {
        if (!response.ok) {
            alert("An error has occurred.  Unable to read the coupon list")
            throw response.status;
        } else return response.json();
    })
    // Add the items to the UL element so that it can be seen
    // As items is an array, we will the array.map function to through the array and add item to the UL element
    // for display
    .then(items => items.map(item => jsnData.push(item)));

function addOrderItemToDisplay(key, value) {
    let orderItemNode = document.createElement("tr");

    let product = document.createElement("td");
    let type = document.createElement("td");
    let calories = document.createElement("td");
    let quantity = document.createElement("td");
    let price = document.createElement("td");
    
    let buttonE = document.createElement("button")
    buttonE.onclick = function () {
        console.log("Removing instance from cookie");

        //setCookie("cart", item["item"], 30);
    }
    //button.appendChild(buttonE).appendChild(document.createTextNode("Remove Item"));
    //button.appendChild(document.createTextNode("Add to Cart"));
    

    //<input type="number" id="party" class="form-control" name="party" placeholder="Number in Party">
    //quantitySelect = document.createElement("input");
    //quantitySelect.className += "form - control";
    //quantitySelect.type = "number";
    //quantitySelect.placeholder = "Quantity";
    //quantitySelect.id = "party";
    //quantitySelect.min = "0";
    //quantity.appendChild(quantitySelect);

    let splitKeys = key.split("_");

    product.appendChild(document.createTextNode(splitKeys[0].replaceAll("-", " ")));
    type.appendChild(document.createTextNode(splitKeys[1]));
    calories.appendChild(document.createTextNode(splitKeys[2]));
    quantity.appendChild(document.createTextNode(value));

    price.appendChild(document.createTextNode("£" + calculatePrice((splitKeys[3] * value), splitKeys[1]).toFixed(2)));

    totalPrice = totalPrice + calculatePrice(splitKeys[3] * value, splitKeys[1]);

    orderItemNode.appendChild(document.createElement("td").appendChild(product));
    orderItemNode.appendChild(document.createElement("td").appendChild(type));
    orderItemNode.appendChild(document.createElement("td").appendChild(calories));
    orderItemNode.appendChild(document.createElement("td").appendChild(quantity));
    orderItemNode.appendChild(document.createElement("td").appendChild(price));
    //orderItemNode.appendChild(document.createElement("td").appendChild(button));

    document.getElementById("checkoutList").appendChild(orderItemNode);

}

function calculatePrice(originalPrice, type) {
    if (voucherType !== undefined) {
        priceDescription = "Voucher Applied - " + voucherDiscount + "% OFF on " + voucherType;
        if (voucherType.toUpperCase() === type.toUpperCase()) {
            return originalPrice - ((originalPrice / 100) * voucherDiscount);
        }

    }
    return originalPrice;
}

// Cookies

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



// define the function for reuse later
function countProductOccurrences(input) {
    // initialize the result object
    const result = {};

    // create an array from the input
    const arr = input.split(' ');

    // loop through the array
    for (word of arr) {
        // if the word is already in the result object, increment the count
        if (result[word]) {
            result[word]++;
        } else {
            // otherwise, add the word to the result object with a count of 1
            result[word] = 1;
        }
    }

    return result;
}


function readProductCookies() {
    let cart = getCookie("cart");

    let cartObj = countProductOccurrences(cart);
    let totalProducts = 0;
    for (let k in cartObj) {
        addOrderItemToDisplay(k, cartObj[k]);
        totalProducts = totalProducts + cartObj[k];
    }

    document.getElementById("subtotalValue").innerHTML = "Subtotal: (" + totalProducts + " items): £" + totalPrice.toFixed(2);
    document.getElementById("deliveryFee").innerHTML = "Delivery Fee: £" + deliveryFee;
    document.getElementById("totalValue").innerHTML = "Total: £" + ((totalPrice + deliveryFee).toFixed(2));
}

function checkVoucher() {

    let voucherDiscount = 0;

    let inputVoucherCode = document.getElementById("voucher").value.trim().toUpperCase();
    let voucherValid = crossRefVouchers(jsnData, inputVoucherCode);

    //document.getElementById("checkoutList").removeChild("tr");
    let trs = document.getElementById("checkoutList").getElementsByTagName("tr");
    while (trs.length > 0) trs[0].parentNode.removeChild(trs[0]);
    //removeChilds(document.querySelector('checkoutList'));
    totalPrice = 0;
    deliveryFee = 2.99;
    validVoucherID;

    voucherType, voucherDiscount;
    priceDescription = "";

    // Add back table headings

    let headerRow = document.createElement("tr");

    let item = document.createElement("th");
    item.appendChild(document.createTextNode("Item"));

    let type = document.createElement("th");
    type.appendChild(document.createTextNode("Type"));

    let calories = document.createElement("th");
    calories.appendChild(document.createTextNode("Calories"));

    let quantity = document.createElement("th");
    quantity.appendChild(document.createTextNode("Quantity"));

    let price = document.createElement("th");
    price.appendChild(document.createTextNode("Price"));
    //headerRow.appendChild(document.createElement("th").appendChild(document.createTextNode("Type")));
    //headerRow.appendChild(document.createElement("th").appendChild(document.createTextNode("Calories")));
    //headerRow.appendChild(document.createElement("th").appendChild(document.createTextNode("Quantity")));
    //headerRow.appendChild(document.createElement("th").appendChild(document.createTextNode("Price")));

    headerRow.appendChild(item);
    headerRow.appendChild(type);
    headerRow.appendChild(calories);
    headerRow.appendChild(quantity);
    headerRow.appendChild(price);

    document.getElementById("checkoutList").appendChild(headerRow);

    readProductCookies();

    document.getElementById("priceDescription").innerHTML = priceDescription;
}



function crossRefVouchers(jsnVoucher, inputVoucher) {
    let match = false;
    for (let i in jsnVoucher) {
        if (jsnVoucher[i].code.toUpperCase() === inputVoucher) {
            match = true;
            validVoucherID = jsnVoucher[i].id;
            voucherType = jsnVoucher[i].type;
            voucherDiscount = jsnVoucher[i].discount;
        }
    }
    return match;
}