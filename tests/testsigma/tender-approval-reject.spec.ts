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
  approvalDecisionBanner,
  approvalDetailPanel,
  approvalRows,
  approvalsNavButton,
  labGlasswareApprovalRow,
  rejectButton,
} from "./elements/approvals.js";

test("Rejecting a pending tender confirms the decision and removes it from the pending list", ({ page }) => {
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
    expect(approvalRows).toHaveCount(6);
    labGlasswareApprovalRow.click();
    expect(approvalDetailPanel).toBeVisible();
  });

  step("Reject the tender", () => {
    rejectButton.click();
  });

  expect(approvalDecisionBanner).toBeVisible();
  expect(approvalDecisionBanner).toHaveText('"Supply of Laboratory Glassware" was rejected.');
  expect(approvalRows).toHaveCount(5);
});
