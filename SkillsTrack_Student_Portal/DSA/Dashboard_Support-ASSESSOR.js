import { protectPage } from "./.vscode/session.js";
import { db } from "./auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

protectPage("ASSESSOR");

async function loadDashboardData() {
  const usersSnapshot = await get(ref(db, "users"));
  const bookingsSnapshot = await get(ref(db, "bookings"));

  let totalStudents = 0;
  if (usersSnapshot.exists()) {
    const allUsers = usersSnapshot.val();
    totalStudents = Object.values(allUsers).filter(
      (u) => u.role === "STUDENT"
    ).length;
  }

  let pendingBookings = 0;
  let confirmedBookings = 0;
  if (bookingsSnapshot.exists()) {
    const allBookings = Object.values(bookingsSnapshot.val());
    pendingBookings = allBookings.filter((b) => b.status === "pending").length;
    confirmedBookings = allBookings.filter((b) => b.status === "confirmed").length;
  }

const totalStudentsEl = document.getElementById("totalStudents");
const pendingBookingsEl = document.getElementById("pendingBookings");
const confirmedBookingsEl = document.getElementById("confirmedBookings");

if (totalStudentsEl) totalStudentsEl.textContent = totalStudents;
if (pendingBookingsEl) pendingBookingsEl.textContent = pendingBookings;
if (confirmedBookingsEl) confirmedBookingsEl.textContent = confirmedBookings;

}

loadDashboardData();
