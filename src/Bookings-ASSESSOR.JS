import { protectPage } from "./session.js";
import { watchAuthState } from "./auth.js";
import { request } from "./api.js";
import { AppError } from "./errors.js";
import {
  loadAllBookings,
  friendlyDate,
  dateOnly,
  startOfToday,
  capitalise,
  el
} from "./assessor-data.js";

protectPage("ASSESSOR");

const els = {
  body: document.getElementById("bookingsBody"),
  message: document.getElementById("pageMessage"),
  statusFilter: document.getElementById("statusFilter"),
  rangeFilter: document.getElementById("rangeFilter"),
  pending: document.getElementById("pendingCount"),
  confirmed: document.getElementById("confirmedCount"),
  completed: document.getElementById("completedCount")
};

let bookings = [];

function showMessage(text) {
  els.message.textContent = text;
}

function inRange(booking, range) {
  const date = dateOnly(booking.preferredDate);
  const today = startOfToday();

  if (range === "past") return date < today;

  if (range === "next5" || range === "next30") {
    const limit = new Date(today);
    limit.setDate(today.getDate() + (range === "next5" ? 5 : 30));
    return date >= today && date <= limit;
  }

  return true;
}

function getVisibleBookings() {
  const status = els.statusFilter.value;
  const range = els.rangeFilter.value;

  return bookings
    .filter((booking) => (!status || booking.status === status) && inRange(booking, range))
    .sort((a, b) =>
      (a.preferredDate + a.preferredTime).localeCompare(b.preferredDate + b.preferredTime)
    );
}

function makeButton(label, className, handler) {
  const button = el("button", className, label);
  button.type = "button";
  button.addEventListener("click", handler);
  return button;
}

function buttonsFor(booking) {
  const cell = el("td", "actions-cell");

  if (booking.status === "pending") {
    cell.append(
      makeButton("Confirm", "btn btn-solid", () => changeStatus(booking, "confirmed")),
      makeButton("Decline", "btn btn-border", () =>
        changeStatus(booking, "declined", `Decline this booking from ${booking.userName}?`)
      )
    );
  } else if (booking.status === "confirmed") {
    cell.append(
      makeButton("Complete", "btn btn-solid", () => changeStatus(booking, "completed")),
      makeButton("Reschedule", "btn btn-border", () => reschedule(booking)),
      makeButton("Cancel", "btn btn-danger", () =>
        changeStatus(booking, "cancelled", `Cancel this booking for ${booking.userName}?`)
      )
    );
  }

  return cell;
}

function render() {
  els.pending.textContent = bookings.filter((b) => b.status === "pending").length;
  els.confirmed.textContent = bookings.filter((b) => b.status === "confirmed").length;
  els.completed.textContent = bookings.filter((b) => b.status === "completed").length;

  els.body.textContent = "";
  const visible = getVisibleBookings();

  if (visible.length === 0) {
    const row = document.createElement("tr");
    const cell = el("td", "", "No bookings found.");
    cell.colSpan = 6;
    row.appendChild(cell);
    els.body.appendChild(row);
    return;
  }

  visible.forEach((booking) => {
    const row = document.createElement("tr");

    const name = el("td");
    name.appendChild(el("strong", "", booking.userName || "Student"));

    const status = el("td");
    status.appendChild(
      el("span", `badge status-${booking.status}`, capitalise(booking.status))
    );

    row.append(
      name,
      el("td", "", booking.topic),
      el("td", "", friendlyDate(booking.preferredDate)),
      el("td", "", booking.preferredTime),
      status,
      buttonsFor(booking)
    );
    els.body.appendChild(row);
  });
}

async function loadBookings() {
  try {
    bookings = await loadAllBookings();
    showMessage("");
    render();
  } catch (error) {
    showMessage(error.message);
  }
}

async function changeStatus(booking, status, confirmText) {
  if (confirmText && !confirm(confirmText)) return;

  try {
    await request("PATCH", `bookings/${booking.id}`, { status });
    await loadBookings();
  } catch (error) {
    showMessage(error.message);
  }
}

async function reschedule(booking) {
  try {
    const newDate = prompt("New date (YYYY-MM-DD):", booking.preferredDate);
    if (newDate === null) return;

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(newDate) ||
      isNaN(dateOnly(newDate).getTime()) ||
      dateOnly(newDate) < startOfToday()
    ) {
      throw new AppError("Please enter a valid date from today onwards.", "validation/invalid-date");
    }

    const newTime = prompt("New time (HH:MM):", booking.preferredTime);
    if (newTime === null) return;

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(newTime)) {
      throw new AppError("Please enter a valid time such as 14:00.", "validation/invalid-time");
    }

    await request("PATCH", `bookings/${booking.id}`, {
      preferredDate: newDate,
      preferredTime: newTime
    });
    await loadBookings();
  } catch (error) {
    showMessage(error.message);
  }
}

els.statusFilter.addEventListener("change", render);
els.rangeFilter.addEventListener("change", render);

watchAuthState((user) => {
  if (user) loadBookings();
});