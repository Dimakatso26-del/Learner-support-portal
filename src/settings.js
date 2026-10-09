import { protectPage } from "./session.js";
import { auth, watchAuthState } from "./auth.js";
import { request } from "./api.js";
import { AppError } from "./errors.js";
import { validateName } from "./validation.js";
import {
  setCookie,
  getCookie,
  deleteCookie,
  applyPreferences
} from "./preferences.js";
import { deleteUser } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

protectPage("STUDENT");

const loginPage = new URL("login.html", import.meta.url).href;

const els = {
  lightButton: document.getElementById("lightButton"),
  darkButton: document.getElementById("darkButton"),
  weightRegular: document.getElementById("weightRegular"),
  weightBold: document.getElementById("weightBold"),
  clearButton: document.getElementById("clearPreferencesButton"),
  form: document.getElementById("profileForm"),
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("settingsMessage"),
  deleteButton: document.getElementById("deleteAccountButton"),
  nameDisplay: document.getElementById("userNameDisplay")
};

let currentUser = null;
let profile = null;

function showMessage(text, type) {
  els.message.textContent = text;
  els.message.className = `form-message ${type || ""}`;
}

function syncPreferenceControls() {
  const dark = getCookie("theme") === "dark";
  els.lightButton.classList.toggle("selected", !dark);
  els.darkButton.classList.toggle("selected", dark);

  if (getCookie("fontWeight") === "bold") {
    els.weightBold.checked = true;
  } else {
    els.weightRegular.checked = true;
  }
}

function chooseTheme(theme) {
  setCookie("theme", theme);
  applyPreferences();
  syncPreferenceControls();
  showMessage(`Theme saved: ${theme} mode.`, "ok");
}

function chooseFontWeight(weight) {
  setCookie("fontWeight", weight);
  applyPreferences();
  syncPreferenceControls();
  showMessage("Display preference saved.", "ok");
}

function clearPreferences() {
  deleteCookie("theme");
  deleteCookie("fontWeight");
  applyPreferences();
  syncPreferenceControls();
  showMessage("Preferences cleared.", "ok");
}

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

async function handleSave(event) {
  event.preventDefault();
  showMessage("", "");

  try {
    const { firstName, lastName } = splitName(els.name.value);
    const problem =
      validateName(firstName, "First name") ||
      validateName(lastName, "Last name");
    if (problem) {
      throw new AppError(problem, "validation/invalid-name");
    }

    showMessage("Saving...", "");
    await request("PATCH", `users/${currentUser.uid}`, { firstName, lastName });
    profile = { ...profile, firstName, lastName };
    if (els.nameDisplay) els.nameDisplay.textContent = firstName;
    showMessage("Changes saved.", "ok");
  } catch (error) {
    showMessage(error.message, "error");
  }
}

async function handleDelete() {
  const confirmed = confirm(
    "Delete your account? This permanently removes your profile and cannot be undone."
  );
  if (!confirmed) return;

  const backup = { ...profile };

  try {
    await request("DELETE", `users/${currentUser.uid}`);

    try {
      await deleteUser(auth.currentUser);
    } catch (authError) {
      await request("PUT", `users/${currentUser.uid}`, backup);
      throw new AppError(
        "For security, please sign out, sign in again, then retry.",
        authError.code || "auth/requires-recent-login"
      );
    }

    window.location.href = loginPage;
  } catch (error) {
    showMessage(error.message, "error");
  }
}

els.lightButton.addEventListener("click", () => chooseTheme("light"));
els.darkButton.addEventListener("click", () => chooseTheme("dark"));
els.weightRegular.addEventListener("change", () => chooseFontWeight("regular"));
els.weightBold.addEventListener("change", () => chooseFontWeight("bold"));
els.clearButton.addEventListener("click", clearPreferences);
els.form.addEventListener("submit", handleSave);
els.deleteButton.addEventListener("click", handleDelete);

syncPreferenceControls();

watchAuthState(async (user) => {
  if (!user) return;
  currentUser = user;
  els.email.value = user.email;

  try {
    profile = await request("GET", `users/${user.uid}`);
    if (profile) {
      els.name.value = `${profile.firstName} ${profile.lastName || ""}`.trim();
    }
  } catch (error) {
    showMessage(error.message, "error");
  }
});