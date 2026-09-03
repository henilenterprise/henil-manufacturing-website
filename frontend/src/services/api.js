// Central place for backend calls. In dev, Vite proxies /api/* to the
// Express server (see vite.config.js), so no absolute URL or CORS
// handling is needed here.

const BASE_URL = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }

  return res.json();
}

export function getHealth() {
  return request("/health");
}
