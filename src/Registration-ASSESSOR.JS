document.getElementById("registerForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const idNumber = document.getElementById("idNumber").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check empty fields
    if (
        firstName === "" ||
        lastName === "" ||
        idNumber === "" ||
        contact === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate ID Number
    if (idNumber.length !== 13 || isNaN(idNumber)) {
        alert("ID Number must be 13 digits.");
        return;
    }

    // Validate Contact Number
    if (contact.length < 10 || isNaN(contact)) {
        alert("Enter a valid phone number.");
        return;
    }

    // Validate Email
    if (!email.includes("@")) {
        alert("Enter a valid email address.");
        return;
    }

    // Validate Password Match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Success
    alert("Registration Successful!");

    // Redirect to login page
    window.location.href = "login.html";
});