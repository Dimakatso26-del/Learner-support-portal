import { protectPage } from "./session.js";
import { auth, watchAuthState } from "./auth.js";
import { app } from "./firebase-config.js";
import { AppError } from "./errors.js";

protectPage("STUDENT");

const DB_URL = app.options.databaseURL;

let currentUser = null;
let tasks = [];
let editingId = null;
let sortAscending = true;

const els = {
  addButton: document.getElementById("addTaskButton"),
  panel: document.getElementById("taskFormPanel"),
  heading: document.getElementById("formHeading"),
  form: document.getElementById("taskForm"),
  title: document.getElementById("taskTitle"),
  category: document.getElementById("taskCategory"),
  dueDate: document.getElementById("taskDueDate"),
  formError: document.getElementById("taskFormError"),
  cancel: document.getElementById("cancelTaskButton"),
  status: document.getElementById("taskStatus"),
  search: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  dueFilter: document.getElementById("dueFilter"),
  sortSelect: document.getElementById("sortSelect"),
  sortDirection: document.getElementById("sortDirection"),
  table: document.getElementById("taskTable")
};

async function request(method, path, body, extraQuery = "") {
  const token = await auth.currentUser.getIdToken();
  const url = `${DB_URL}/${path}.json?auth=${token}${extraQuery}`;
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body !== undefined) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new AppError(
      `Request failed (${response.status}). Please try again.`,
      `rest/${method.toLowerCase()}-failed`
    );
  }
  return response.json();
}

async function loadTasks() {
  els.status.textContent = "Loading tasks...";
  try {
    const query =
      `&orderBy=${encodeURIComponent('"userId"')}` +
      `&equalTo=${encodeURIComponent(`"${currentUser.uid}"`)}`;
    const data = await request("GET", "tasks", undefined, query);
    tasks = data ? Object.entries(data).map(([id, task]) => ({ id, ...task })) : [];
    els.status.textContent = "";
    render();
  } catch (error) {
    els.status.textContent = error.message;
  }
}

async function createTask(taskData) {
  await request("POST", "tasks", {
    userId: currentUser.uid,
    title: taskData.title,
    category: taskData.category,
    dueDate: taskData.dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  });
}

async function updateTask(id, changes) {
  await request("PATCH", `tasks/${id}`, changes);
}

async function deleteTask(id) {
  await request("DELETE", `tasks/${id}`);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function dueDateOf(task) {
  return new Date(task.dueDate + "T00:00:00");
}

function isOverdue(task) {
  return !task.completed && dueDateOf(task) < startOfToday();
}

function formatDate(task) {
  return dueDateOf(task).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function refreshCategoryOptions() {
  const selected = els.categoryFilter.value;
  const categories = [...new Set(tasks.map((t) => t.category))].sort();

  els.categoryFilter.textContent = "";
  const all = document.createElement("option");
  all.value = "";
  all.textContent = "Category";
  els.categoryFilter.appendChild(all);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.categoryFilter.appendChild(option);
  });

  els.categoryFilter.value = categories.includes(selected) ? selected : "";
}

function getVisibleTasks() {
  const keyword = els.search.value.trim().toLowerCase();
  const category = els.categoryFilter.value;
  const due = els.dueFilter.value;
  const weekAhead = startOfToday();
  weekAhead.setDate(weekAhead.getDate() + 7);

  let visible = tasks.filter((task) => {
    if (keyword && !task.title.toLowerCase().includes(keyword)) return false;
    if (category && task.category !== category) return false;
    if (due === "overdue" && !isOverdue(task)) return false;
    if (due === "completed" && !task.completed) return false;
    if (due === "week") {
      const date = dueDateOf(task);
      if (task.completed || date < startOfToday() || date > weekAhead) return false;
    }
    return true;
  });

  const sortBy = els.sortSelect.value;
  if (sortBy === "due") {
    visible = [...visible].sort((a, b) => dueDateOf(a) - dueDateOf(b));
  } else if (sortBy === "title") {
    visible = [...visible].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortBy && !sortAscending) visible.reverse();

  return visible;
}

function filtersAreActive() {
  return Boolean(
    els.search.value.trim() || els.categoryFilter.value || els.dueFilter.value
  );
}

function resetFilters() {
  els.search.value = "";
  els.categoryFilter.value = "";
  els.dueFilter.value = "";
  els.sortSelect.value = "";
  render();
}

function makeRow(task) {
  const row = document.createElement("div");
  row.className = "tr";

  const check = document.createElement("span");
  check.className = "check-box";
  check.textContent = task.completed ? "▣" : "□";
  check.title = task.completed ? "Mark as not done" : "Mark as done";
  check.addEventListener("click", () => handleToggle(task));

  const title = document.createElement("span");
  title.textContent = task.title;
  if (task.completed) title.style.textDecoration = "line-through";

  const category = document.createElement("span");
  category.textContent = task.category;

  const due = document.createElement("span");
  due.textContent = formatDate(task);
  if (isOverdue(task)) due.style.color = "#dc2626";

  const actions = document.createElement("span");
  const edit = document.createElement("span");
  edit.className = "action-btn";
  edit.textContent = "✎";
  edit.title = "Edit task";
  edit.addEventListener("click", () => startEdit(task));

  const remove = document.createElement("span");
  remove.className = "action-btn";
  remove.textContent = "🗑";
  remove.title = "Delete task";
  remove.addEventListener("click", () => handleDelete(task));
  actions.append(edit, remove);

  row.append(check, title, category, due, actions);
  return row;
}

function render() {
  refreshCategoryOptions();

  els.table
    .querySelectorAll(".tr:not(.head), .empty-msg")
    .forEach((el) => el.remove());

  const visible = getVisibleTasks();

  if (visible.length === 0) {
    const message = document.createElement("div");
    message.className = "empty-msg";

    if (filtersAreActive()) {
      message.textContent = "No tasks found. ";
      const reset = document.createElement("a");
      reset.textContent = "Reset filters";
      reset.addEventListener("click", resetFilters);
      message.appendChild(reset);
    } else {
      message.textContent = "You have no tasks yet. Click + ADD TASK to create one.";
    }
    els.table.appendChild(message);
    return;
  }

  visible.forEach((task) => els.table.appendChild(makeRow(task)));
}

function openForm(heading) {
  els.heading.textContent = heading;
  els.formError.textContent = "";
  els.panel.hidden = false;
  els.title.focus();
}

function closeForm() {
  els.panel.hidden = true;
  els.form.reset();
  els.formError.textContent = "";
  editingId = null;
}

function startEdit(task) {
  editingId = task.id;
  els.title.value = task.title;
  els.category.value = task.category;
  els.dueDate.value = task.dueDate;
  openForm("Edit task");
}

function validateTaskForm() {
  const title = els.title.value.trim();
  const dueDate = els.dueDate.value;

  if (!title) {
    throw new AppError("A task title is required.", "validation/missing-title");
  }
  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    throw new AppError("A valid due date is required.", "validation/invalid-due-date");
  }

  return { title, category: els.category.value, dueDate };
}

async function handleSave(event) {
  event.preventDefault();
  els.formError.textContent = "";

  try {
    const taskData = validateTaskForm();
    els.status.textContent = "Saving...";

    if (editingId) {
      await updateTask(editingId, taskData);
    } else {
      await createTask(taskData);
    }

    closeForm();
    await loadTasks();
  } catch (error) {
    els.formError.textContent = error.message;
    els.status.textContent = "";
  }
}

async function handleToggle(task) {
  try {
    await updateTask(task.id, { completed: !task.completed });
    await loadTasks();
  } catch (error) {
    els.status.textContent = error.message;
  }
}

async function handleDelete(task) {
  const confirmed = confirm(`Delete "${task.title}"? This cannot be undone.`);
  if (!confirmed) return;

  try {
    await deleteTask(task.id);
    await loadTasks();
  } catch (error) {
    els.status.textContent = error.message;
  }
}

els.addButton.addEventListener("click", () => {
  editingId = null;
  els.form.reset();
  openForm("Add task");
});
els.cancel.addEventListener("click", closeForm);
els.form.addEventListener("submit", handleSave);
els.search.addEventListener("input", render);
els.categoryFilter.addEventListener("change", render);
els.dueFilter.addEventListener("change", render);
els.sortSelect.addEventListener("change", render);
els.sortDirection.addEventListener("click", () => {
  sortAscending = !sortAscending;
  render();
});

watchAuthState((user) => {
  if (!user) return;
  currentUser = user;
  loadTasks();
});