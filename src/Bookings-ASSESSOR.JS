// Booking statistics
let pendingBookings = 6;
let confirmedBookings = 12;
let completedBookings = 34;

// Update dashboard numbers
function updateStats() {
    document.getElementById("pendingCount").textContent = pendingBookings;
    document.getElementById("confirmedCount").textContent = confirmedBookings;
    document.getElementById("completedCount").textContent = completedBookings;
}

// Confirm Booking
function confirmBooking(rowId) {
    const status = document.querySelector(`#${rowId} .status`);

    if (status.textContent === "PENDING") {
        status.textContent = "CONFIRMED";
        pendingBookings--;
        confirmedBookings++;
        updateStats();
        alert("Booking Confirmed");
    }
}

// Decline Booking
function declineBooking(rowId) {
    const row = document.getElementById(rowId);

    if (confirm("Decline this booking?")) {
        row.remove();
        pendingBookings--;
        updateStats();
    }
}

// Cancel Booking
function cancelBooking(rowId) {
    const row = document.getElementById(rowId);

    if (confirm("Cancel this booking?")) {
        row.remove();
        confirmedBookings--;
        updateStats();
    }
}

// Reschedule Booking
function rescheduleBooking(rowId) {
    const newDate = prompt("Enter new date:");

    if (newDate) {
        document.querySelector(`#${rowId} .date`).textContent = newDate;
        alert("Booking Rescheduled");
    }
}

// Load counts
updateStats();
``