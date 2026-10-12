document.getElementById("submitBooking").addEventListener("click", function (e) {
    e.preventDefault();

    const topic = document.getElementById("topic").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const notes = document.getElementById("notes").value;

    if (topic === "" || date === "" || time === "") {
        alert("Please complete all required fields.");
        return;
    }

    const bookingsTable =
        document.getElementById("bookingsTable").getElementsByTagName("tbody")[0];

    const newRow = bookingsTable.insertRow();

    const topicCell = newRow.insertCell(0);
    const datetimeCell = newRow.insertCell(1);
    const statusCell = newRow.insertCell(2);

    topicCell.textContent = topic;
    datetimeCell.textContent = `${date} ${time}`;
    statusCell.textContent = "PENDING";

    document.getElementById("bookingForm").reset();

    alert("Booking submitted successfully!");
});