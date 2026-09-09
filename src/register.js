import { registerUser } from "./auth.js";

const studentForm = document.getElementById("studentRegisterForm");
if (studentForm) {
  studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const idNumber = document.getElementById("idNumber").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const errorBox = document.getElementById("registerError");
    errorBox.textContent = "";

    try {
      await registerUser(
        {
          role: "STUDENT",
          firstName,
          lastName,
          idNumber,
          contactNumber,
          email
        },
        password,
        confirmPassword
      );

      window.location.href = "login.html?registered=true";
    } catch (error) {
      errorBox.textContent = error.message;
    }
  });
}

const assessorForm = document.getElementById("assessorRegisterForm");
if (assessorForm) {
  assessorForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("assessorFirstName").value.trim();
    const lastName = document.getElementById("assessorLastName").value.trim();
    const contactNumber = document.getElementById("assessorContactNumber").value.trim();
    const email = document.getElementById("assessorRegEmail").value.trim();
    const password = document.getElementById("assessorRegPassword").value;
    const confirmPassword = document.getElementById("assessorRegConfirmPassword").value;

    const errorBox = document.getElementById("assessorRegisterError");
    errorBox.textContent = "";

    if (!firstName || !lastName || !email) {
      errorBox.textContent = "First name, last name, and email are required.";
      return;
    }

    try {
      await registerUser(
        {
          role: "ASSESSOR",
          firstName,
          lastName,
          contactNumber,
          email
        },
        password,
        confirmPassword
      );

      window.location.href = "login.html?registered=true";
    } catch (error) {
      errorBox.textContent = error.message;
    }
  });
}