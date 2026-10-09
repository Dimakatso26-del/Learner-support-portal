import { auth } from "./auth.js";
import { app } from "./firebase-config.js";
import { AppError } from "./errors.js";

const DB_URL = app.options.databaseURL;

export function quoted(value) {
  return encodeURIComponent(`"${value}"`);
}

export async function request(method, path, body, extraQuery = "") {
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