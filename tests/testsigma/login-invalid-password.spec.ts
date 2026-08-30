import { expect, step, test } from "@testsigma/code";
import {
  authErrorBanner,
  authSubmitButton,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterLink,
} from "./elements/auth.js";

test("Login with wrong password shows an error", ({ page }) => {
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
  });

  step("Sign out", () => {
    signOutButton.click();
    expect(emailInput).toBeVisible();
  });

  step("Attempt login with the wrong password", () => {
    emailInput.fill("acme.seller@example.com");
    passwordInput.fill("WrongPassword1");
    authSubmitButton.click();
    expect(authErrorBanner).toBeVisible();
    expect(authErrorBanner).toHaveText("Incorrect email or password.");
  });
});
