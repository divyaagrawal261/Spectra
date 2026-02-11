import { defaultConfig } from "./config";
import { EventQueue } from "./queue";
import { sendEvents } from "./transport";

import { trackClicks } from "../trackers/click";
import { trackHover } from "../trackers/hover";
import { trackScroll } from "../trackers/scroll";

export class EngageSDK {
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
