import { expect, step, test } from "@testsigma/code";
import {
  authSubmitButton,
  dashboardHeading,
  emailInput,
  passwordInput,
  sellerNameInput,
  switchToRegisterButton,
} from "./elements/auth.js";
import {
  approvalDetailAuthority,
  approvalDetailEmdValue,
  approvalDetailPanel,
  approvalDetailTenderNumber,
  approvalDetailTenderValue,
  approvalDetailTitle,
  approvalsNavButton,
  roadCulvertsApprovalRow,
} from "./elements/approvals.js";

test("Selecting a pending tender shows its full details before any decision is made", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Seed a seller account and sign in", () => {
    switchToRegisterButton.click();
    sellerNameInput.fill("Acme Traders");
    emailInput.fill("seller@acmetraders.test");
    passwordInput.fill("Sup3rSecret!");
    authSubmitButton.click();
    expect(dashboardHeading).toBeVisible();
  });

  step("Open Pending Approvals and select a tender", () => {
    approvalsNavButton.click();
    roadCulvertsApprovalRow.click();
  });

  expect(approvalDetailPanel).toBeVisible();
  expect(approvalDetailTitle).toHaveText("Construction of Rural Road Culverts");
  expect(approvalDetailAuthority).toHaveText("Rajasthan PWD");
  expect(approvalDetailTenderNumber).toHaveText("RPWD/ROAD/2026/2210");
  expect(approvalDetailEmdValue).toHaveText("₹1,78,000");
  expect(approvalDetailTenderValue).toHaveText("₹89,00,000");
});
