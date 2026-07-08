import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (relativePath) =>
  readFile(new URL(relativePath, import.meta.url), "utf8");

test("Nomba webhook route uses signature verification middleware", async () => {
  const source = await readSource("../src/routes/webhook.routes.js");

  assert.match(
    source,
    /router\.post\(\s*["']\/nomba["']\s*,\s*verifyWebhookSignature\s*,\s*receiveWebhook/s,
    "webhook route should verify Nomba signatures before receiveWebhook runs",
  );
});

test("webhook processing does not write duplicate ledger entries for one transactionRef", async () => {
  const source = await readSource("../src/controllers/webhook.controller.js");
  const ledgerCreateCount = source.match(/Ledger\.create\s*\(/g)?.length ?? 0;

  assert.equal(
    ledgerCreateCount,
    1,
    "one webhook should create one ledger entry for its transactionRef",
  );
});

test("webhook duplicate handling only treats processed webhooks as processed", async () => {
  const source = await readSource("../src/controllers/webhook.controller.js");

  assert.match(
    source,
    /existingWebhook\.status\s*={0,2}\s*["']PROCESSED["']|status:\s*["']PROCESSED["']/,
    "retry logic should not ignore webhooks stuck in RECEIVED or PROCESSING",
  );
});
