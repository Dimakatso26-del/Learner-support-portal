document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn");

    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const idNumber = document.getElementById("idNumber").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check if all fields are filled
        if (
            !firstName ||
            !lastName ||
            !idNumber ||
            !contact ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate password
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Registration successful
        alert("Registration Successful!");

        const student = {
            firstName,
            lastName,
            idNumber,
            contact,
            email
        };

        console.log(student);

        // Save to local storage
        localStorage.setItem("student", JSON.stringify(student));

        // Redirect to login page
        // window.location.href = "login.html";
    });
});
