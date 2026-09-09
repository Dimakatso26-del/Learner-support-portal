import { logoutUser, watchAuthState, db } from "./auth.js";
import { ref, get } from "firebase/database";

const signOutButton = document.getElementById("signOutButton");
if (signOutButton) {
  signOutButton.addEventListener("click", async () => {
    await logoutUser();
    window.location.href = "login.html";
  });
}

export function protectPage(requiredRole) {
  watchAuthState(async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const snapshot = await get(ref(db, "users/" + user.uid));
    if (!snapshot.exists()) {
      window.location.href = "login.html";
      return;
    }

    const profile = snapshot.val();

    if (requiredRole && profile.role !== requiredRole) {
      window.location.href = "login.html";
      return;
    }

    const nameDisplay = document.getElementById("userNameDisplay");
    if (nameDisplay) {
      nameDisplay.textContent = `${profile.firstName} ${profile.role === "ASSESSOR" ? "" : profile.lastName}`.trim();
    }
  });
}