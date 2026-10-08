import { protectPage } from "./session.js";
import { db, watchAuthState, logoutUser } from "./auth.js";
import {
  ref,
  get,
  query,
  orderByChild,
  equalTo
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

protectPage("STUDENT");

const loginPage = new URL("login.html", import.meta.url).href;

const navTargets = {
  dashboard: "Dashboard-STUDENT.html",
  tasks: "Task-STUDENT.html",
  support: "Support-STUDENT.html",
  game: "Game-STUDENT.html",
  settings: "Settings-STUDENT.html"
};

function findByText(text) {
  const target = text.trim().toLowerCase();
  return [...document.body.querySelectorAll("*")].find(
    (el) => el.children.length === 0 && el.textContent.trim().toLowerCase() === target
  );
}

function setCardValue(label, value) {
  const labelEl = findByText(label);
  if (!labelEl) return;

  let card = labelEl.parentElement;
  while (card && card !== document.body) {
    const numberEl = [...card.querySelectorAll("*")].find(
      (el) => el !== labelEl && el.children.length === 0 && /^\d+$/.test(el.textContent.trim())
    );
    if (numberEl) {
      numberEl.textContent = value;
      return;
    }
    card = card.parentElement;
  }
}

function wireNavigation() {
  document.querySelectorAll("header *, nav *").forEach((el) => {
    if (el.children.length !== 0) return;
    const key = el.textContent.trim().toLowerCase();
    if (navTargets[key]) {
      el.style.cursor = "pointer";
      el.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = navTargets[key];
      });
    }
  });
}

function wireSignOut() {
  const signOutEl = findByText("Sign Out");
  if (!signOutEl) return;
  signOutEl.style.cursor = "pointer";
  signOutEl.addEventListener("click", async (event) => {
    event.preventDefault();
    await logoutUser();
    window.location.href = loginPage;
  });
}

function setWelcomeName(firstName) {
  const heading = [...document.querySelectorAll("h1, h2, h3")].find((el) =>
    /^welcome back/i.test(el.textContent.trim())
  );
  if (heading) heading.textContent = `Welcome back, ${firstName}`;
}

wireNavigation();
wireSignOut();

watchAuthState(async (user) => {
  if (!user) return;

  try {
    const profileSnapshot = await get(ref(db, "users/" + user.uid));
    if (profileSnapshot.exists()) {
      setWelcomeName(profileSnapshot.val().firstName);
    }

    const tasksQuery = query(ref(db, "tasks"), orderByChild("userId"), equalTo(user.uid));
    const tasksSnapshot = await get(tasksQuery);

    const tasks = tasksSnapshot.exists() ? Object.values(tasksSnapshot.val()) : [];
    const today = new Date();

    const completed = tasks.filter((t) => t.completed).length;
    const outstanding = tasks.filter((t) => !t.completed);
    const overdue = outstanding.filter((t) => new Date(t.dueDate) < today).length;

    setCardValue("Total Tasks", tasks.length);
    setCardValue("Completed", completed);
    setCardValue("Outstanding", outstanding.length);
    setCardValue("Overdue", overdue);
  } catch (error) {
    console.error("Could not load dashboard data:", error);
  }
});
