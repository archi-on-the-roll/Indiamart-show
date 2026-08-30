import { expect, step, test } from "@testsigma/code";
import {
  authSubmitButton,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterLink,
} from "./elements/auth.js";

test("Seller can register and log back in", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Register a new seller account", () => {
    switchToRegisterLink.click();
    sellerNameInput.fill("Acme Traders");
    emailInput.fill("acme.seller@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
    expect(page).toContainText("Latest Tenders");
  });

  step("Sign out", () => {
    signOutButton.click();
    expect(emailInput).toBeVisible();
  });

  step("Log back in with the same credentials", () => {
    emailInput.fill("acme.seller@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
    expect(page).toContainText("Latest Tenders");
  });
});
