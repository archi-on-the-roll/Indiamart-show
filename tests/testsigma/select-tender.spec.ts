import { expect, step, test } from "@testsigma/code";
import {
  authSubmitButton,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterLink,
} from "./elements/auth.js";
import { firstTenderRow, tenderDetailPanel, tenderDetailTitle } from "./elements/tenders.js";

test("Seller can select a tender to view its details", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Register and sign in as a seller", () => {
    switchToRegisterLink.click();
    sellerNameInput.fill("Acme Traders");
    emailInput.fill("acme.seller@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
  });

  step("Select the first tender from the list", () => {
    firstTenderRow.click();
    expect(tenderDetailPanel).toBeVisible();
    expect(tenderDetailTitle).toHaveText("Supply of Industrial Water Pumps");
    expect(tenderDetailPanel).toContainText("Maharashtra Industrial Development Corporation");
  });
});
