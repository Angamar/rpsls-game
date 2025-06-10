import { defineConfig } from "vitest/config";
import base from "../../vitest.config.base";

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    environment: "node",
    setupFiles: ["./src/vitest.setup.ts"],
  },
});
