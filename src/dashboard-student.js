import { protectPage } from "./session.js";
import { db, watchAuthState } from "./auth.js";
import {
  ref,
  get,
  query,
  orderByChild,
  equalTo
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

protectPage("STUDENT");

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function dueLabel(dateString) {
  const days = Math.ceil((new Date(dateString) - new Date()) / 86400000);
  if (days < 0) return `Overdue by ${Math.abs(days)} day(s)`;
  if (days === 0) return "Due today";
  return `Due in ${days} day(s)`;
}

function renderRecentTasks(outstanding) {
  const list = document.getElementById("recentTasks");
  list.textContent = "";

  if (outstanding.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No outstanding tasks. Nice work!";
    list.appendChild(empty);
    return;
  }

  const recent = [...outstanding]
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  recent.forEach((task) => {
    const row = document.createElement("div");
    row.className = "task";

    const check = document.createElement("span");
    check.className = "check";

    const info = document.createElement("div");
    const title = document.createElement("b");
    title.textContent = task.title;
    const details = document.createElement("small");
    details.textContent = `${task.category || "General"} · ${dueLabel(task.dueDate)}`;
    info.append(title, details);

    const resume = document.createElement("button");
    resume.textContent = "RESUME";
    resume.addEventListener("click", () => {
      window.location.href = "Task-STUDENT.html";
    });

    row.append(check, info, resume);
    list.appendChild(row);
  });
}

watchAuthState(async (user) => {
  if (!user) return;

  try {
    const profileSnapshot = await get(ref(db, "users/" + user.uid));
    if (profileSnapshot.exists()) {
      setText("welcomeName", profileSnapshot.val().firstName);
    }

    const tasksQuery = query(ref(db, "tasks"), orderByChild("userId"), equalTo(user.uid));
    const tasksSnapshot = await get(tasksQuery);
    const tasks = tasksSnapshot.exists() ? Object.values(tasksSnapshot.val()) : [];

    const today = new Date();
    const completed = tasks.filter((t) => t.completed);
    const outstanding = tasks.filter((t) => !t.completed);
    const overdue = outstanding.filter((t) => new Date(t.dueDate) < today);

    setText("totalTasks", tasks.length);
    setText("completedTasks", completed.length);
    setText("outstandingTasks", outstanding.length);
    setText("overdueTasks", overdue.length);

    renderRecentTasks(outstanding);
  } catch (error) {
    console.error("Could not load dashboard data:", error);
  }
});