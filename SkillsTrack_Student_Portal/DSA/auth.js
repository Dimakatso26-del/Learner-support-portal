import { app } from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { AppError } from "./errors.js";

const auth = getAuth(app);
const db = getDatabase(app);

export async function registerUser(profileData, password, confirmPassword) {
  if (!profileData.email || !profileData.firstName || !profileData.lastName) {
    throw new AppError("First name, last name, and email are required.", "validation/missing-fields");
  }

  if (password !== confirmPassword) {
    throw new AppError("Passwords do not match.", "validation/password-mismatch");
  }

  let uid;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      profileData.email,
      password
    );
    uid = userCredential.user.uid;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new AppError("An account with this email already exists.", error.code);
    }
    if (error.code === "auth/weak-password") {
      throw new AppError("Password should be at least 6 characters.", error.code);
    }
    throw new AppError("Registration failed. Please try again.", error.code || "auth/unknown");
  }

  try {
    await set(ref(db, "users/" + uid), {
      ...profileData,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    throw new AppError("Account created, but saving your profile failed. Please contact support.", "database/write-failed");
  } finally {
    console.log("Registration request completed for uid:", uid);
  }

  return { uid, role: profileData.role };
}

export async function loginUser(email, password, expectedRole) {
  if (!email || !password) {
    throw new AppError("Please enter both email and password.", "validation/missing-fields");
  }

  let uid;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    uid = userCredential.user.uid;
  } catch (error) {
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      throw new AppError("Incorrect email or password.", error.code);
    }
    throw new AppError("Sign in failed. Please try again.", error.code || "auth/unknown");
  }

  try {
    const snapshot = await get(ref(db, "users/" + uid));
    if (!snapshot.exists()) {
      throw new AppError("No profile found for this account.", "database/no-profile");
    }

    const profile = snapshot.val();
    if (profile.role !== expectedRole) {
      await signOut(auth);
      throw new AppError(
        `This account is registered as ${profile.role}, not ${expectedRole}.`,
        "validation/wrong-role"
      );
    }

    return { uid, ...profile };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Something went wrong while loading your profile.", "database/read-failed");
  } finally {
    console.log("Login request completed for uid:", uid);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new AppError("Sign out failed. Please try again.", error.code || "auth/unknown");
  }
}

export function watchAuthState(callback) {
  onAuthStateChanged(auth, callback);
}

export { auth, db };
