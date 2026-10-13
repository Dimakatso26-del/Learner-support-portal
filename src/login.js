import { loginUser } from "./auth.js";
import { getCookie } from "./preferences.js";

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
      window.location.href = "../SkillsTrack_Student_Portal/Dashboard-STUDENT.html";
    } catch (error) {
      errorBox.textContent = error.message;
    }
  });
}

const assessorPages = {
  dashboard: "Dashboard_Support-ASSESSOR.html",
  students: "Progress_Tracker-ASSESSOR.html",
  bookings: "Bookings-ASSESSOR.html"
};

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
      const landing = assessorPages[getCookie("landingView")] || assessorPages.dashboard;
      window.location.href = "../SkillsTrack_Student_Portal/" + landing;
    } catch (error) {
      errorBox.textContent = error.message;
    }
  });
}