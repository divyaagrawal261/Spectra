import { EngageSDK } from "./core/SDK";

const sdk = new EngageSDK();

export default sdk;

// For script-tag users
if (typeof window !== "undefined") {
  window.EngageTrack = sdk;
}
