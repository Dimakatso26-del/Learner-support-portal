import { protectPage } from "./session.js";
import { watchAuthState } from "./auth.js";
import { request, quoted } from "./api.js";
import { AppError } from "./errors.js";

protectPage("STUDENT");

const els = {
  form: document.getElementById("bookingForm"),
  topic: document.getElementById("module"),
  date: document.getElementById("date"),
  time: document.getElementById("time"),
  notes: document.getElementById("notes"),
  message: document.getElementById("bookingMessage"),
  list: document.getElementById("myBookings")
};

let currentUser = null;
let userName = "";

function todayString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function showMessage(text, type) {
  els.message.textContent = text;
  els.message.className = `form-message ${type || ""}`;
}

function formatDate(dateString) {
  return new Date(dateString + "T00:00:00")
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })
    .toUpperCase();
}

function validateBooking() {
  const topic = els.topic.value;
  const preferredDate = els.date.value;
  const preferredTime = els.time.value;
  const notes = els.notes.value.trim();

  if (!topic) {
    throw new AppError("Please select a topic.", "validation/missing-topic");
  }
  if (!preferredDate || preferredDate < todayString()) {
    throw new AppError("Please choose a date from today onwards.", "validation/invalid-date");
  }
  if (!preferredTime) {
    throw new AppError("Please select a preferred time.", "validation/missing-time");
  }
  if (notes.length > 300) {
    throw new AppError("Notes must be 300 characters or fewer.", "validation/notes-too-long");
  }

  return { topic, preferredDate, preferredTime, notes };
}

function renderBookings(bookings) {
  els.list
    .querySelectorAll(".booking:not(.head), .empty-msg")
    .forEach((el) => el.remove());

  if (bookings.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-msg";
    empty.textContent = "No previous bookings found.";
    els.list.appendChild(empty);
    return;
  }

  bookings
    .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate))
    .forEach((booking) => {
      const row = document.createElement("div");
      row.className = "booking";

      const topic = document.createElement("span");
      topic.textContent = booking.topic;

      const when = document.createElement("span");
      when.textContent = `${formatDate(booking.preferredDate)} · ${booking.preferredTime}`;

      const status = document.createElement("em");
      status.textContent = booking.status.toUpperCase();

      row.append(topic, when, status);
      els.list.appendChild(row);
    });
}

async function loadBookings() {
  try {
    const query = `&orderBy=${encodeURIComponent('"userId"')}&equalTo=${quoted(currentUser.uid)}`;
    const data = await request("GET", "bookings", undefined, query);
    renderBookings(data ? Object.values(data) : []);
  } catch (error) {
    showMessage(error.message, "error");
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  showMessage("", "");

  try {
    const details = validateBooking();
    showMessage("Submitting your booking...", "");

    await request("POST", "bookings", {
      userId: currentUser.uid,
      userName,
      ...details,
      status: "pending",
      createdAt: new Date().toISOString()
    });

    els.form.reset();
    showMessage("Booking submitted. Your assessor will confirm it soon.", "ok");
    await loadBookings();
  } catch (error) {
    showMessage(error.message, "error");
  }
}

els.date.min = todayString();
els.form.addEventListener("submit", handleSubmit);

watchAuthState(async (user) => {
  if (!user) return;
  currentUser = user;

  try {
    const profile = await request("GET", `users/${user.uid}`);
    if (profile) userName = `${profile.firstName} ${profile.lastName || ""}`.trim();
  } catch (error) {
    console.error("Could not load profile:", error);
  }

  loadBookings();
});