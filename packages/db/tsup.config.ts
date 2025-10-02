import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client.ts", "src/schema.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  outDir: "dist",
});

