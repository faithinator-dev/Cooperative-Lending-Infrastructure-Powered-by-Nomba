import test from "node:test";
import assert from "node:assert/strict";

test("Express app imports without module wiring errors", async () => {
  await assert.doesNotReject(
    () => import("../src/app.js"),
    "src/app.js should import cleanly so the server can start",
  );
});
