import { expect, step, test } from "@testsigma/code";
import {
  authErrorBanner,
  authSubmitButton,
  dashboardHeading,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterButton,
} from "./elements/auth.js";

test("Sign-in with an incorrect password shows an error and stays on the sign-in screen", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Seed a seller account and sign out", () => {
    switchToRegisterButton.click();
    sellerNameInput.fill("Acme Traders");
    emailInput.fill("seller@acmetraders.test");
    passwordInput.fill("Sup3rSecret!");
    authSubmitButton.click();
    expect(dashboardHeading).toBeVisible();
    signOutButton.click();
  });

  step("Attempt sign in with wrong password", () => {
    emailInput.fill("seller@acmetraders.test");
    passwordInput.fill("WrongPassword1");
    authSubmitButton.click();
  });

  expect(authErrorBanner).toBeVisible();
  expect(authErrorBanner).toHaveText("Incorrect email or password.");
  expect(authSubmitButton).toBeVisible();
});
