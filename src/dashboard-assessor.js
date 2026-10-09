import { protectPage } from "./session.js";
import { watchAuthState } from "./auth.js";
import { request } from "./api.js";
import {
  loadStudents,
  loadAllTasks,
  loadAllBookings,
  buildStudentStats,
  friendlyDate,
  dateOnly,
  startOfToday,
  timeAgo,
  capitalise,
  el
} from "./assessor-data.js";

protectPage("ASSESSOR");

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function cell(content) {
  const td = document.createElement("td");
  if (content instanceof Node) {
    td.appendChild(content);
  } else {
    td.textContent = content;
  }
  return td;
}

function emptyRow(body, columns, message) {
  const row = document.createElement("tr");
  const td = cell(message);
  td.colSpan = columns;
  row.appendChild(td);
  body.appendChild(row);
}

function renderStudents(stats) {
  const body = document.getElementById("studentOverviewBody");
  body.textContent = "";

  if (stats.length === 0) {
    emptyRow(body, 5, "No students registered yet.");
    return;
  }

  stats.slice(0, 5).forEach((student) => {
    const row = document.createElement("tr");
    const badgeClass = student.status === "At Risk" ? "at-risk" : "on-track";
    row.append(
      cell(el("strong", "", student.fullName)),
      cell(`${student.completed} / ${student.total}`),
      cell(student.outstanding),
      cell(`${student.percent}%`),
      cell(el("span", `badge ${badgeClass}`, student.status))
    );
    body.appendChild(row);
  });
}

function renderSessions(bookings) {
  const body = document.getElementById("sessionsBody");
  body.textContent = "";
  const today = startOfToday();

  const upcoming = bookings
    .filter(
      (booking) =>
        ["pending", "confirmed"].includes(booking.status) &&
        dateOnly(booking.preferredDate) >= today
    )
    .sort((a, b) =>
      (a.preferredDate + a.preferredTime).localeCompare(b.preferredDate + b.preferredTime)
    )
    .slice(0, 5);

  if (upcoming.length === 0) {
    emptyRow(body, 5, "No upcoming sessions.");
    return;
  }

  upcoming.forEach((booking) => {
    const row = document.createElement("tr");
    row.append(
      cell(el("strong", "", booking.userName || "Student")),
      cell(booking.topic),
      cell(friendlyDate(booking.preferredDate)),
      cell(booking.preferredTime),
      cell(el("span", `badge ${booking.status}`, capitalise(booking.status)))
    );
    body.appendChild(row);
  });
}

function renderActivity(stats, tasks, bookings) {
  const list = document.getElementById("activityList");
  list.textContent = "";
  const names = new Map(stats.map((student) => [student.uid, student.fullName]));

  const events = [
    ...bookings
      .filter((booking) => booking.createdAt)
      .map((booking) => ({
        when: booking.createdAt,
        who: booking.userName || names.get(booking.userId) || "A student",
        text: " booked a support session"
      })),
    ...tasks
      .filter((task) => task.createdAt)
      .map((task) => ({
        when: task.createdAt,
        who: names.get(task.userId) || "A student",
        text: ` added the task "${task.title}"`
      }))
  ]
    .sort((a, b) => new Date(b.when) - new Date(a.when))
    .slice(0, 5);

  if (events.length === 0) {
    list.appendChild(el("div", "activity-item", "No recent activity."));
    return;
  }

  events.forEach((event) => {
    const item = el("div", "activity-item");
    item.append(
      el("strong", "", event.who),
      document.createTextNode(event.text),
      el("span", "activity-time", timeAgo(event.when))
    );
    list.appendChild(item);
  });
}

watchAuthState(async (user) => {
  if (!user) return;

  try {
    const [students, tasks, bookings, me] = await Promise.all([
      loadStudents(),
      loadAllTasks(),
      loadAllBookings(),
      request("GET", `users/${user.uid}`)
    ]);

    if (me) setText("welcomeName", me.firstName);

    const stats = buildStudentStats(students, tasks);
    const average = stats.length
      ? Math.round(stats.reduce((sum, s) => sum + s.percent, 0) / stats.length)
      : 0;

    setText("totalStudents", stats.length);
    setText("pendingBookings", bookings.filter((b) => b.status === "pending").length);
    setText("overdueTasks", stats.reduce((sum, s) => sum + s.overdue, 0));
    setText("averageCompletion", `${average}%`);

    renderStudents(stats);
    renderSessions(bookings);
    renderActivity(stats, tasks, bookings);
  } catch (error) {
    console.error("Could not load dashboard data:", error);
    setText("pageMessage", error.message);
  }
});