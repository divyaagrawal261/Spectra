export function sendEvents(apiUrl, events, sync, apiKey) {
  const payload = JSON.stringify(events);
  const endpoint = apiUrl + "/api/events/batch";
  const headers = { "Content-Type": "application/json" };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  if (navigator.sendBeacon && !apiKey) {
    const blob = new Blob([payload], {
      type: "application/json"
    });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers,
    body: payload,
    keepalive: true
  });
}
