export function setCookie(name, value, days = 365) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${days * 86400}; path=/; SameSite=Lax`;
}

export function getCookie(name) {
  const match = document.cookie.split("; ").find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; max-age=0; path=/`;
}

export function applyPreferences() {
  document.documentElement.classList.toggle("dark-theme", getCookie("theme") === "dark");
  document.documentElement.classList.toggle("bold-text", getCookie("fontWeight") === "bold");
}

const style = document.createElement("style");
style.textContent =
  "html.dark-theme { filter: invert(1) hue-rotate(180deg); background: #ffffff; }" +
  "html.bold-text body { font-weight: 600; }";
document.head.appendChild(style);

applyPreferences();