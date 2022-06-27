/****************************************************************************
     * Add a new TodoItem.
     *
     * 1) send an update to the DB
     * 2) if successful then add the item to the list
     ****************************************************************************/
function addNewTodoItem(newItemValue) {

    // Get the value from the Input field in the FORM
    let bookingValue = document.getElementById("newTodofirstName").value.trim();

    // Check that a value have added
    if (bookingValue === "") {
        alert("Please enter a value for your item");
    }
    createTodoItem(bookingValue);
    document.getElementById("newTodofirstName").value = "";
}

/****************************************************************************
 * This function will add the a new booking item to the UL element
 * Specifically this will add:
 *
 *   <li>the item firstName<span class="close">X</>li>
 *
 * 1) add to DB
 * 2) if successful then add the item to the list
 *
 ****************************************************************************/
function addTodoItemToDisplay(item) {

    let bookingItemNode = document.createElement("tr");

    let bookingDateTime = document.createElement("td");

    let firstName = document.createElement("td");
    let lastName = document.createElement("td");
    let location = document.createElement("td");
    let partySize = document.createElement("td");
    let phoneNumber = document.createElement("td");
    let notes = document.createElement("td");
    let info = document.createElement("td");
    let status = document.createElement("td");

    bookingDateTime.appendChild(document.createTextNode(item["bookingDateTime"]));
    firstName.appendChild(document.createTextNode(item["firstName"]));
    lastName.appendChild(document.createTextNode(item["lastName"]));
    location.appendChild(document.createTextNode(item["location"]));
    partySize.appendChild(document.createTextNode(item["partySize"]));
    phoneNumber.appendChild(document.createTextNode(item["phoneNumber"]));
    notes.appendChild(document.createTextNode(item["notes"]));
    info.appendChild(document.createTextNode(item["info"]));
    status.appendChild(document.createTextNode(item["status"]));


    bookingItemNode.appendChild(bookingDateTime);
    bookingItemNode.appendChild(document.createElement("td").appendChild(firstName));
    bookingItemNode.appendChild(document.createElement("td").appendChild(lastName));
    bookingItemNode.appendChild(document.createElement("td").appendChild(location));
    bookingItemNode.appendChild(document.createElement("td").appendChild(partySize));
    bookingItemNode.appendChild(document.createElement("td").appendChild(phoneNumber));
    bookingItemNode.appendChild(document.createElement("td").appendChild(notes));
    bookingItemNode.appendChild(document.createElement("td").appendChild(info));
    bookingItemNode.appendChild(document.createElement("td").appendChild(status));
    document.getElementById("bookingList").appendChild(bookingItemNode);

    let tickSpanNode = document.createElement("SPAN");
    let tickText = document.createTextNode("\u2713");  // \u2713 is unicode for the tick symbol
    tickSpanNode.appendChild(tickText);
    bookingItemNode.appendChild(tickSpanNode);
    tickSpanNode.className = "tickHidden";

    let closeSpanNode = document.createElement("SPAN");
    let closeText = document.createTextNode("X");
    closeSpanNode.className = "close";
    closeSpanNode.appendChild(closeText);
    bookingItemNode.appendChild(closeSpanNode);

    closeSpanNode.onclick = function (event) {
        // When the use press the "X" button, the click event is normally also passed to its parent element.
        // (i.e. the element containing the <SPAN>). In the case the LI element that is holding the TodoItem
        // which would have resulted in a toggle of item between "DONE" and "NEW"
        //
        // stopPropagation() tells the event not to propagate
        event.stopPropagation();

        if (confirm("Are you sure that you want to delete " + item.firstName + "?")) {
            deleteTodoItem(item["id"]);

            // Remove the HTML list element that is holding this booking item
            bookingItemNode.remove();
        }
    }

    bookingItemNode.onclick = function () {
        if (item["status"] === "NEW") {
            item["status"] = "DONE"
        } else {
            item["status"] = "NEW"
        }

        updateTodoItem(item);

        bookingItemNode.classList.toggle("checked");
        tickSpanNode.classList.toggle("tickVisible");
    }

    if (item["status"] !== "NEW") {
        bookingItemNode.classList.toggle("checked");
        tickSpanNode.classList.toggle("tickVisible");
    }
}

/****************************************************************************
 * CRUD functions calling the REST API
 ****************************************************************************/

function createTodoItem(bookingItemfirstName) {

    // Create a new JSON object for the new item with the status of NEW
    // Since the id is generated by the microservice, we will use -1 as a dummy
    // If the POST is successful the microservice will store the new item in the database
    // and returns a JSON via the response with the generated id for the new item
    const newItem = { "firstName": bookingItemfirstName, "status": "NEW" };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    };
    fetch('http://localhost:5023/booking', requestOptions)
        // get the JSON content from the response
        .then((response) => {
            if (!response.ok) {
                alert("An error has occurred.  Unable to create the Booking item")
                throw response.status;
            } else return response.json();
        })

        // add the item to the UL element so that it will appear in the browser
        .then(item => addTodoItemToDisplay(item));
}

// Load the list - expecting an array of booking_items to be returned
function readTodoItems() {
    fetch('http://localhost:5023/booking')
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
        .then(items => items.map(item => addTodoItemToDisplay(item)));
}

function updateTodoItem(item) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    fetch('http://localhost:5023/booking/' + item.id, requestOptions)
        .then((response) => {
            if (!response.ok) {
                alert("An error has occurred.  Unable to UPDATE the Booking item")
                throw response.status;
            } else return response.json();
        })
}

function deleteTodoItem(bookingItemId) {
    fetch("http://localhost:5023/booking/" + bookingItemId, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                alert("An error has occurred.  Unable to DELETE the Booking item")
                throw response.status;
            } else return response.json();
        })
}

function addNewVoucher() {

    // Get the value from the Input field in the FORM
    let values = [];
    
    values.push(document.getElementById("voucher").value.trim());
    values.push(document.getElementById("voucherType").value.trim());
    values.push(document.getElementById("discount").value.trim());

    createVoucher(values);

}

/****************************************************************************
 * CRUD functions calling the REST API
 ****************************************************************************/

function createVoucher(values) {

    // Create a new JSON object for the new item with the status of NEW
    // Since the id is generated by the microservice, we will use -1 as a dummy
    // If the POST is successful the microservice will store the new item in the database
    // and returns a JSON via the response with the generated id for the new item
    const newVoucher =
    {
        "code": values[0].toUpperCase(),
        "type": values[1],
        "discount": values[2],
        "status": "APPROVED"
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVoucher)
    };
    fetch('http://localhost:5023/coupon', requestOptions)
        // get the JSON content from the response
        .then((response) => {
            if (!response.ok) {
                alert("An error has occurred.\nUnable to create the voucher.")
                throw response.status;
            } else {
                alert("Success! Your voucher has been created.");
                return response.json();
            }
        })
}