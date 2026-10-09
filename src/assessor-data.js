import { request } from "./api.js";

export function el(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function capitalise(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function dateOnly(dateString) {
  return new Date(dateString + "T00:00:00");
}

export function friendlyDate(dateString) {
  const diff = Math.round((dateOnly(dateString) - startOfToday()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  return dateOnly(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function timeAgo(isoString) {
  const minutes = Math.floor((Date.now() - new Date(isoString)) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

function toList(data) {
  return data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
}

export async function loadStudents() {
  const data = await request("GET", "users");
  return toList(data)
    .filter((user) => user.role === "STUDENT")
    .map((user) => ({ ...user, uid: user.id }));
}

export async function loadAllTasks() {
  return toList(await request("GET", "tasks"));
}

export async function loadAllBookings() {
  return toList(await request("GET", "bookings"));
}

export function buildStudentStats(students, tasks) {
  const today = startOfToday();

  return students.map((student) => {
    const mine = tasks.filter((task) => task.userId === student.uid);
    const completed = mine.filter((task) => task.completed).length;
    const overdue = mine.filter(
      (task) => !task.completed && dateOnly(task.dueDate) < today
    ).length;
    const total = mine.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      ...student,
      fullName: `${student.firstName} ${student.lastName || ""}`.trim(),
      total,
      completed,
      outstanding: total - completed,
      overdue,
      percent,
      status: total > 0 && percent < 50 ? "At Risk" : "On Track"
    };
  });
}