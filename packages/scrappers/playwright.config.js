import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60 * 1000, // 60 seconds
  maxFailures: 1000,
  workers: 8,
});
