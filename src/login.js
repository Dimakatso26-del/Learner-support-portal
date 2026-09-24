import { loginUser } from "./auth.js";

const studentLoginForm = document.getElementById("studentLoginForm");
if (studentLoginForm) {
  studentLoginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("studentEmail").value.trim();
    const password = document.getElementById("studentPassword").value;
    const errorBox = document.getElementById("studentLoginError");
    errorBox.textContent = "";

    if (!email || !password) {
      errorBox.textContent = "Please enter both email and password.";
      return;
    }

    try {
      await loginUser(email, password, "STUDENT");
      window.location.href = "student-dashboard.html";
    } catch (error) {
      errorBox.textContent = error.message;
    }
  });
}

const assessorLoginForm = document.getElementById("assessorLoginForm");
if (assessorLoginForm) {
  assessorLoginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("assessorEmail").value.trim();
    const password = document.getElementById("assessorPassword").value;
    const errorBox = document.getElementById("assessorLoginError");
    errorBox.textContent = "";

    if (!email || !password) {
      errorBox.textContent = "Please enter both email and password.";
      return;
    }

    try {
      await loginUser(email, password, "ASSESSOR");
      window.location.href = "assessor-dashboard.html";
    } catch (error) {
      errorBox.textContent = error.message;
    }
  });
}