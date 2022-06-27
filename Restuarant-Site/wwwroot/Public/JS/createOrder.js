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
function addOrderItemToDisplay(item) {

    let orderItemNode = document.createElement("tr");

    let product = document.createElement("td");
    let type = document.createElement("td");
    let calories = document.createElement("td");
    let price = document.createElement("td");
    let button = document.createElement("td");
    
    let buttonE = document.createElement("button")
    buttonE.onclick = function () {
        console.log("Check cookie " + item["item"])

        setCookie("cart", item["item"].replaceAll(" ", "-") + "_" + item["type"] + "_" + item["calories"] + "_" + item["price"], 30);
    }
    button.appendChild(buttonE).appendChild(document.createTextNode("Add to Cart"));
    //button.appendChild(document.createTextNode("Add to Cart"));
    

    //<input type="number" id="party" class="form-control" name="party" placeholder="Number in Party">
    //quantitySelect = document.createElement("input");
    //quantitySelect.className += "form - control";
    //quantitySelect.type = "number";
    //quantitySelect.placeholder = "Quantity";
    //quantitySelect.id = "party";
    //quantitySelect.min = "0";
    //quantity.appendChild(quantitySelect);

    product.appendChild(document.createTextNode(item["item"]));
    type.appendChild(document.createTextNode(item["type"]));
    calories.appendChild(document.createTextNode(item["calories"]));
    price.appendChild(document.createTextNode("£" + item["price"]));

    orderItemNode.appendChild(document.createElement("td").appendChild(product));
    orderItemNode.appendChild(document.createElement("td").appendChild(type));
    orderItemNode.appendChild(document.createElement("td").appendChild(calories));
    orderItemNode.appendChild(document.createElement("td").appendChild(price));
    orderItemNode.appendChild(document.createElement("td").appendChild(button));

    document.getElementById("orderList").appendChild(orderItemNode);

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

function setCookie(cookieName, cookieValue, expireInDays) {

    const d = new Date();
    d.setTime(d.getTime() + (expireInDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();

    let cart = getCookie("cart");
    console.log(cart);

    if (cart == "") {
        document.cookie = cookieName + "=" + cookieValue + "; " + expires;
    } else {
        document.cookie = cookieName + "=" + cart + " " + cookieValue + "; " + expires;
    }
}


/****************************************************************************
 * CRUD functions calling the REST API
 ****************************************************************************/

// Load the list - expecting an array of booking_items to be returned
function readOrderItems() {
    fetch('http://localhost:5023/Product')
        // get the JSON content from the response
        .then((response) => {
            if (!response.ok) {
                alert("An error has occurred.  Unable to read the Booking list")
                throw response.status;
            } else return response.json();
        })
        // Add the items to the UL element so that it can be seen
        // As items is an array, we will the array.map function to through the array and add item to the UL element
        // for display
        .then(items => items.map(item => addOrderItemToDisplay(item)));
}
