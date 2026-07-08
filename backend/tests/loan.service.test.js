import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  calculateInterest,
  calculatePenalty,
  updateLoanStatus,
} from "../src/services/loan.service.js";

test("calculateInterest returns flat interest", () => {
  assert.equal(calculateInterest(200_000, 10), 20_000);
});

test("calculatePenalty returns 5 percent of the missed monthly amount", () => {
  assert.equal(calculatePenalty(55_000, 30_000), 1_250);
  assert.equal(calculatePenalty(55_000, 55_000), 0);
  assert.equal(calculatePenalty(55_000, 70_000), 0);
});

test("updateLoanStatus marks paid, arrears, and active loans correctly", () => {
  const paidLoan = { balance: 0, penalty: 0, status: "ACTIVE" };
  assert.equal(updateLoanStatus(paidLoan), "PAID");

  const arrearsLoan = { balance: 25_000, penalty: 1_250, status: "ACTIVE" };
  assert.equal(updateLoanStatus(arrearsLoan), "ARREARS");

  const activeLoan = { balance: 100_000, penalty: 0, status: "PENDING" };
  assert.equal(updateLoanStatus(activeLoan), "ACTIVE");
});

test("createLoan stores total repayment balance, not principal only", async () => {
  const source = await readFile(new URL("../src/services/loan.service.js", import.meta.url), "utf8");

  assert.match(
    source,
    /balance:\s*(totalRepayment|loanData\.principal\s*\+\s*interest)/,
    "loan balance should include principal plus interest so repayment does not finish early",
  );
});
