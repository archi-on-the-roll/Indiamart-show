import { expect, step, test } from "@testsigma/code";
import {
  authSubmitButton,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterLink,
} from "./elements/auth.js";

test("Login matches the registered email regardless of case", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Register a new seller account with a lowercase email", () => {
    switchToRegisterLink.click();
    sellerNameInput.fill("Acme Traders");
    emailInput.fill("acme.seller@example.com");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
  });

  step("Sign out", () => {
    signOutButton.click();
    expect(emailInput).toBeVisible();
  });

  step("Log back in using an uppercased email", () => {
    emailInput.fill("ACME.SELLER@EXAMPLE.COM");
    passwordInput.fill("Secr3tPass!");
    authSubmitButton.click();
    expect(signOutButton).toBeVisible();
    expect(page).toContainText("Latest Tenders");
  });
});
