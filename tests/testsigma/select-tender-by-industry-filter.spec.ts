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
  firstTenderRow,
  industryFilter,
  tenderDetailPanel,
  tenderDetailStatusPill,
  tenderDetailTitle,
} from "./elements/tenders.js";

test("Seller can filter tenders by industry and select one to view its details", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Register and sign in as a seller", () => {
    switchToRegisterLink.click();
    sellerNameInput.fill("Karnataka Office Interiors");
    emailInput.fill("karnataka.interiors@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
  });

  step("Filter tenders down to the Furniture industry", () => {
    industryFilter.selectOption({ label: "Furniture" });
    expect(industryFilter).toHaveValue("Furniture");
    expect(firstTenderRow).toContainText("Procurement of Office Furniture for District Office");
  });

  step("Select the filtered tender to view its details", () => {
    firstTenderRow.click();
    expect(tenderDetailPanel).toBeVisible();
    expect(tenderDetailTitle).toHaveText("Procurement of Office Furniture for District Office");
    expect(tenderDetailPanel).toContainText("Bruhat Bengaluru Mahanagara Palike");
    expect(tenderDetailStatusPill).toHaveText("CLOSING SOON");
  });
});
