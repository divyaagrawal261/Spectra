export class EventQueue {
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
