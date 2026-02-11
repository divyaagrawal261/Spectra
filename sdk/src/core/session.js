const KEY = "__engage_session__";
const TTL = 30 * 60 * 1000;

export function getSession() {
  try {
    const now = Date.now();
    let s = JSON.parse(localStorage.getItem(KEY));

    if (!s || now - s.lastActive > TTL) {
      s = {
        id: crypto.randomUUID(),
        createdAt: now,
        lastActive: now
      };
    }

    s.lastActive = now;
    localStorage.setItem(KEY, JSON.stringify(s));
    return s.id;
  } catch {
    return "fallback_" + Math.random().toString(36).slice(2);
  }
}
