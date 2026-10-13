import { protectPage } from "./session.js";
import { watchAuthState } from "./auth.js";
import {
  loadStudents,
  loadAllTasks,
  buildStudentStats,
  friendlyDate,
  el
} from "./assessor-data.js";

protectPage("ASSESSOR");

const PAGE_SIZE = 5;

const els = {
  body: document.getElementById("studentsBody"),
  search: document.getElementById("searchInput"),
  statusFilter: document.getElementById("statusFilter"),
  showing: document.getElementById("showingText"),
  pageLinks: document.getElementById("pageLinks"),
  message: document.getElementById("pageMessage"),
  dialog: document.getElementById("profileDialog")
};

let stats = [];
let allTasks = [];
let page = 1;

function getFiltered() {
  const keyword = els.search.value.trim().toLowerCase();
  const status = els.statusFilter.value;

  return stats.filter((student) => {
    const matchesText =
      !keyword ||
      student.fullName.toLowerCase().includes(keyword) ||
      (student.email || "").toLowerCase().includes(keyword);
    const matchesStatus = !status || student.status === status;
    return matchesText && matchesStatus;
  });
}

function openProfile(student) {
  const tasks = allTasks.filter((task) => task.userId === student.uid);
  els.dialog.textContent = "";

  els.dialog.append(
    el("h2", "", student.fullName),
    el("p", "", `Email: ${student.email}`),
    el("p", "", `Contact: ${student.contactNumber || "Not provided"}`),
    el("p", "", `Tasks completed: ${student.completed} of ${student.total} (${student.percent}%)`),
    el("p", "", `Overdue tasks: ${student.overdue}`)
  );

  const list = document.createElement("ul");
  if (tasks.length === 0) {
    list.appendChild(el("li", "", "No tasks yet."));
  } else {
    tasks.forEach((task) => {
      const state = task.completed ? "Done" : `Due ${friendlyDate(task.dueDate)}`;
      list.appendChild(el("li", "", `${task.title} (${state})`));
    });
  }
  els.dialog.appendChild(list);

  const close = el("button", "btn btn-border", "Close");
  close.type = "button";
  close.addEventListener("click", () => els.dialog.close());
  els.dialog.appendChild(close);

  els.dialog.showModal();
}

function renderPagination(total, totalPages, start, end) {
  els.showing.textContent =
    total === 0 ? "Showing 0 of 0 learners" : `Showing ${start}-${end} of ${total} learners`;

  els.pageLinks.textContent = "";

  const addLink = (label, targetPage, active) => {
    const link = el("a", `page-link${active ? " active" : ""}`, label);
    link.href = "#";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      page = Math.min(Math.max(targetPage, 1), totalPages);
      render();
    });
    els.pageLinks.appendChild(link);
  };

  addLink("Previous", page - 1, false);
  for (let number = 1; number <= totalPages; number++) {
    addLink(String(number), number, number === page);
  }
  addLink("Next", page + 1, false);
}

function render() {
  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  page = Math.min(page, totalPages);

  const startIndex = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  els.body.textContent = "";

  if (visible.length === 0) {
    const row = document.createElement("tr");
    const cell = el("td", "", "No students found.");
    cell.colSpan = 6;
    row.appendChild(cell);
    els.body.appendChild(row);
  }

  visible.forEach((student) => {
    const row = document.createElement("tr");

    const name = el("td");
    name.appendChild(el("strong", "", student.fullName));

    const status = el("td");
    const badgeClass = student.status === "At Risk" ? "status-risk" : "status-track";
    status.appendChild(el("span", `badge ${badgeClass}`, student.status));

    const action = el("td");
    const view = el("button", "btn-profile", "View Profile");
    view.type = "button";
    view.addEventListener("click", () => openProfile(student));
    action.appendChild(view);

    row.append(
      name,
      el("td", "text-email", student.email),
      el("td", "", `${student.completed} / ${student.total}`),
      el("td", "", `${student.percent}%`),
      status,
      action
    );
    els.body.appendChild(row);
  });

  renderPagination(
    filtered.length,
    totalPages,
    startIndex + 1,
    startIndex + visible.length
  );
}

els.search.addEventListener("input", () => {
  page = 1;
  render();
});
els.statusFilter.addEventListener("change", () => {
  page = 1;
  render();
});

watchAuthState(async (user) => {
  if (!user) return;

  try {
    const [students, tasks] = await Promise.all([loadStudents(), loadAllTasks()]);
    allTasks = tasks;
    stats = buildStudentStats(students, tasks);
    render();
  } catch (error) {
    els.message.textContent = error.message;
  }
});