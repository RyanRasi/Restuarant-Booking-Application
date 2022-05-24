﻿/****************************************************************************
     * Add a new TodoItem.
     *
     * 1) send an update to the DB
     * 2) if successful then add the item to the list
     ****************************************************************************/

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("submitButton").disabled = true;
});

function validateInputs() {
    let values = [];

    let locations = document.getElementById("locations");
    let dateTime = document.getElementById("booking-time")
    let firstName = document.getElementById("fname");
    let lastName = document.getElementById("lname");
    let phoneNumber = document.getElementById("phonen");
    let partySize = document.getElementById("party");
    let notes = document.getElementById("notes");
    let info = document.getElementById("info");


    values.push(locations == null ? "" : locations.value.trim());
    values.push(dateTime == null ? "" : dateTime.value.trim());
    values.push(firstName == null ? "" : firstName.value.trim());
    values.push(lastName == null ? "" : lastName.value.trim());
    values.push(phoneNumber == null ? "" : phoneNumber.value.trim());
    values.push(partySize == null ? "" : partySize.value.trim());
    values.push(notes == null ? "" : notes.value.trim());
    values.push(info == null ? "" : info.value.trim());

    let count = 0;

    for (let i = 0; i < values.length; i++) {
        if (values[i] !== "") {
            count++;
        }
    }

    if (count === values.length) {
        document.getElementById("submitButton").disabled = false;
    } else {
       document.getElementById("submitButton").disabled = true;
    }
}

function addNewBooking() {

    // Get the value from the Input field in the FORM
    let values = [];

    values.push(document.getElementById("locations").value.trim());
    values.push(document.getElementById("booking-time").value.trim());
    values.push(document.getElementById("fname").value.trim());
    values.push(document.getElementById("lname").value.trim());
    values.push(document.getElementById("phonen").value.trim());
    values.push(document.getElementById("party").value.trim());
    values.push(document.getElementById("notes").value.trim());
    values.push(document.getElementById("info").value.trim());

    createBooking(values);

}

/****************************************************************************
 * CRUD functions calling the REST API
 ****************************************************************************/

function createBooking(values) {

    // Create a new JSON object for the new item with the status of NEW
    // Since the id is generated by the microservice, we will use -1 as a dummy
    // If the POST is successful the microservice will store the new item in the database
    // and returns a JSON via the response with the generated id for the new item
    const newBooking =
        {
            "location": values[0],
            "BookingDateTime": values[1],
            "firstName": values[2],
            "lastName": values[3],
            "phoneNumber": values[4],
            "partySize": values[5],
            "notes": values[6],
            "info": values[7],
            "status": "REQUESTED"
        };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
    };
    fetch('http://localhost:5023/booking', requestOptions)
        // get the JSON content from the response
        .then((response) => {
            if (!response.ok) {
                alert("An error has occurred.\nUnable to create the Booking.")
                throw response.status;
            } else {
                alert("Success! Your booking has been created.");
                document.getElementById("submitButton").disabled = true;
                return response.json();
            }
        })
}
