export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/engage.min.js",
      format: "umd",
      name: "EngageTrack"
    },
    {
      file: "dist/engage.esm.js",
      format: "es"
    }
  ]
};
