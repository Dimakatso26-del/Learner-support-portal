import { app } from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const auth = getAuth(app);
const db = getDatabase(app);

export async function registerUser(profileData, password, confirmPassword) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      profileData.email,
      password
    );
    const uid = userCredential.user.uid;

    await set(ref(db, "users/" + uid), {
      ...profileData,
      createdAt: new Date().toISOString()
    });

    return { uid, role: profileData.role };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("An account with this email already exists.");
    }
    if (error.code === "auth/weak-password") {
      throw new Error("Password should be at least 6 characters.");
    }
    throw error;
  }
}

export async function loginUser(email, password, expectedRole) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const snapshot = await get(ref(db, "users/" + uid));
    if (!snapshot.exists()) {
      throw new Error("No profile found for this account.");
    }

    const profile = snapshot.val();
    if (profile.role !== expectedRole) {
      await signOut(auth);
      throw new Error(`This account is registered as ${profile.role}, not ${expectedRole}.`);
    }

    return { uid, ...profile };
  } catch (error) {
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      throw new Error("Incorrect email or password.");
    }
    throw error;
  }
}

export async function logoutUser() {
  await signOut(auth);
}

export function watchAuthState(callback) {
  onAuthStateChanged(auth, callback);
}

export { auth, db };