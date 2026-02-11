const defaultConfig = {
  apiUrl: "http://localhost:5000",
  apiKey: null,
  autoTrack: {
    click: false,
    hover: false,
    scroll: false
  },
  batchSize: 10,
  flushInterval: 5000
};

class EventQueue {
  constructor({ batchSize, flushInterval, send }) {
    this.queue = [];
    this.batchSize = batchSize;
    this.send = send;

    setInterval(() => this.flush(), flushInterval);
    window.addEventListener("beforeunload", () => this.flush(true));
  }

  push(event) {
    this.queue.push(event);
    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  flush(sync = false) {
    if (!this.queue.length) return;

    const payload = this.queue.splice(0, this.batchSize);
    this.send(payload, sync);
  }
}

function sendEvents(apiUrl, events, sync, apiKey) {
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

function trackClicks(sdk) {
  document.addEventListener("click", (e) => {
    const el = e.target;
    sdk.track("click", {
      tag: el.tagName,
      id: el.id || null,
      class: el.className || null,
      text: el.innerText?.slice(0, 50)
    });
  });
}

let lastTarget = null;

function trackHover(sdk) {
  document.addEventListener("mouseover", (e) => {
    if (e.target === lastTarget) return;
    lastTarget = e.target;

    sdk.track("hover", {
      tag: e.target.tagName,
      id: e.target.id || null,
      class: e.target.className || null
    });
  });
}

let lastSent = 0;

function trackScroll(sdk) {
  window.addEventListener("scroll", () => {
    const now = Date.now();
    if (now - lastSent < 2000) return;
    lastSent = now;

    const scrollDepth =
      Math.round(
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) * 100
      );

    sdk.track("scroll", {
      scrollDepth
    });
  });
}

class EngageSDK {
  constructor() {
    this.config = null;
    this.queue = null;
  }

  init(userConfig) {
    this.config = { ...defaultConfig, ...userConfig };
    if (!this.config.apiKey || !this.config.apiUrl) {
      console.warn("EngageSDK: missing apiKey or apiUrl");
      return;
    }


    this.queue = new EventQueue({
      batchSize: this.config.batchSize,
      flushInterval: this.config.flushInterval,
      send: (events, sync) =>
        sendEvents(this.config.apiUrl, events, sync, this.config.apiKey)
    });

    this._initAutoTrackers();
  }

  track(eventName, metadata = {}) {
    if (!this.queue) return;

    this.queue.push({
      eventName,
      page: location.href,
      metadata,
      timestamp: Date.now()
    });
  }

  _initAutoTrackers() {
    const { autoTrack } = this.config;
    if (autoTrack.click) trackClicks(this);
    if (autoTrack.hover) trackHover(this);
    if (autoTrack.scroll) trackScroll(this);
  }
}

const sdk = new EngageSDK();

// For script-tag users
if (typeof window !== "undefined") {
  window.EngageTrack = sdk;
}

export { sdk as default };
