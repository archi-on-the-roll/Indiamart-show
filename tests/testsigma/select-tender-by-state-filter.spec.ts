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
  tenderList,
} from "./elements/tenders.js";

test("Seller can filter tenders by state, select one, and return to the list", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Register and sign in as a seller", () => {
    switchToRegisterLink.click();
    sellerNameInput.fill("Anna Scientific Supplies");
    emailInput.fill("anna.scientific@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
  });

  step("Filter tenders down to Tamil Nadu", () => {
    stateFilter.selectOption({ label: "Tamil Nadu" });
    expect(stateFilter).toHaveValue("Tamil Nadu");
    expect(firstTenderRow).toContainText("Supply of Laboratory Glassware");
  });

  step("Select the filtered tender to view its details", () => {
    firstTenderRow.click();
    expect(tenderDetailPanel).toBeVisible();
    expect(tenderDetailTitle).toHaveText("Supply of Laboratory Glassware");
    expect(tenderDetailPanel).toContainText("Anna University");
  });

  step("Close the detail panel and return to the tender list", () => {
    closeDetailButton.click();
    expect(tenderList).toBeVisible();
    expect(firstTenderRow).toContainText("Supply of Laboratory Glassware");
  });
});
