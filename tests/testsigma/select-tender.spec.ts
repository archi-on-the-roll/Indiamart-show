import { expect, step, test } from "@testsigma/code";
import {
  authSubmitButton,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterLink,
} from "./elements/auth.js";
import {
  closeDetailButton,
  firstTenderRow,
  stateFilter,
  tenderDetailPanel,
  tenderDetailTitle,
  tenderRows,
  viewNotificationButton,
} from "./elements/tenders.js";

test("Seller can select a tender to view its details", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  // Accounts live in localStorage, so start clean and register a fresh seller.
  step("Register and sign in as a seller", () => {
    switchToRegisterLink.click();
    sellerNameInput.fill("Acme Traders");
    emailInput.fill("acme.seller@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
  });

  step("Narrow the list to Maharashtra tenders", () => {
    stateFilter.selectOption({ label: "Maharashtra" });
    expect(tenderRows).toHaveCount(1);
  });

  step("Select the tender", () => {
    firstTenderRow.click();
    expect(tenderDetailPanel).toBeVisible();
    expect(tenderDetailTitle).toHaveText("Supply of Industrial Water Pumps");
    expect(tenderDetailPanel).toContainText("Maharashtra Industrial Development Corporation");
    expect(tenderDetailPanel).toContainText("MIDC/2026/WP/1187");
    expect(viewNotificationButton).toBeVisible();
  });

  step("Close the tender detail", () => {
    closeDetailButton.click();
    expect(firstTenderRow).toBeVisible();
  });
});
