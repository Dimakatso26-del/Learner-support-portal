import "./preferences.js";
import { logoutUser, watchAuthState, db } from "./auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const loginPage = new URL("login.html", import.meta.url).href;

const signOutButton = document.getElementById("signOutButton");
if (signOutButton) {
  signOutButton.addEventListener("click", async () => {
    await logoutUser();
    window.location.href = loginPage;
  });
}

export function protectPage(requiredRole) {
  watchAuthState(async (user) => {
    if (!user) {
      window.location.href = loginPage;
      return;
    }

    const snapshot = await get(ref(db, "users/" + user.uid));
    if (!snapshot.exists()) {
      window.location.href = loginPage;
      return;
    }

    const profile = snapshot.val();

    if (requiredRole && profile.role !== requiredRole) {
      window.location.href = loginPage;
      return;
    }

    const nameDisplay = document.getElementById("userNameDisplay");
    if (nameDisplay) {
      nameDisplay.textContent = profile.firstName;
    }
  });
}