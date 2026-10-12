import { protectPage } from "./session.js";
import { watchAuthState, logoutUser } from "./auth.js";
import { request } from "./api.js";
import { AppError } from "./errors.js";
import { validateName } from "./validation.js";
import { setCookie, getCookie, applyPreferences } from "./preferences.js";

protectPage("ASSESSOR");

const loginPage = new URL("login.html", import.meta.url).href;

const els = {
  lightButton: document.getElementById("lightButton"),
  darkButton: document.getElementById("darkButton"),
  notifyBookings: document.getElementById("notify-bookings"),
  notifyLate: document.getElementById("notify-late"),
  weeklyDigest: document.getElementById("weekly-digest"),
  landingView: document.getElementById("landing-view"),
  form: document.getElementById("profileForm"),
  name: document.getElementById("profile-name"),
  email: document.getElementById("email-address"),
  message: document.getElementById("settingsMessage"),
  signOutAccount: document.getElementById("signOutAccountButton"),
  nameDisplay: document.getElementById("userNameDisplay")
};

let currentUser = null;

function showMessage(text, type) {
  els.message.textContent = text;
  els.message.className = `form-message ${type || ""}`;
}

function cookieFlag(name, fallback) {
  const value = getCookie(name);
  return value === null ? fallback : value === "1";
}

function syncThemeButtons() {
  const dark = getCookie("theme") === "dark";
  els.lightButton.classList.toggle("active", !dark);
  els.lightButton.classList.toggle("text-muted", dark);
  els.darkButton.classList.toggle("active", dark);
  els.darkButton.classList.toggle("text-muted", !dark);
}

function chooseTheme(theme) {
  setCookie("theme", theme);
  applyPreferences();
  syncThemeButtons();
  showMessage(`Theme saved: ${theme} mode.`, "ok");
}

function loadSavedPreferences() {
  els.notifyBookings.checked = cookieFlag("notifyBookings", true);
  els.notifyLate.checked = cookieFlag("notifyLate", true);
  els.weeklyDigest.checked = cookieFlag("weeklyDigest", false);
  els.landingView.value = getCookie("landingView") || "dashboard";
  syncThemeButtons();
}

function savePreferences() {
  setCookie("notifyBookings", els.notifyBookings.checked ? "1" : "0");
  setCookie("notifyLate", els.notifyLate.checked ? "1" : "0");
  setCookie("weeklyDigest", els.weeklyDigest.checked ? "1" : "0");
  setCookie("landingView", els.landingView.value);
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
      (lastName ? validateName(lastName, "Last name") : null);
    if (problem) {
      throw new AppError(problem, "validation/invalid-name");
    }

    savePreferences();
    showMessage("Saving...", "");
    await request("PATCH", `users/${currentUser.uid}`, { firstName, lastName });
    if (els.nameDisplay) els.nameDisplay.textContent = firstName;
    showMessage("Changes saved.", "ok");
  } catch (error) {
    showMessage(error.message, "error");
  }
}

async function handleSignOut() {
  if (!confirm("Sign out of the portal?")) return;
  await logoutUser();
  window.location.href = loginPage;
}

els.lightButton.addEventListener("click", () => chooseTheme("light"));
els.darkButton.addEventListener("click", () => chooseTheme("dark"));
els.form.addEventListener("submit", handleSave);
els.signOutAccount.addEventListener("click", handleSignOut);

loadSavedPreferences();

watchAuthState(async (user) => {
  if (!user) return;
  currentUser = user;
  els.email.value = user.email;

  try {
    const profile = await request("GET", `users/${user.uid}`);
    if (profile) {
      els.name.value = `${profile.firstName} ${profile.lastName || ""}`.trim();
    }
  } catch (error) {
    showMessage(error.message, "error");
  }
});