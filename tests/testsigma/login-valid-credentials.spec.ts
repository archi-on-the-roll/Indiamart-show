import { expect, step, test } from "@testsigma/code";
import {
  authSubmitButton,
  dashboardHeading,
  emailInput,
  passwordInput,
  sellerNameInput,
  signOutButton,
  switchToRegisterButton,
  topBarEmail,
} from "./elements/auth.js";

test("Seller can sign in with valid credentials and see the tender dashboard", ({ page }) => {
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

  step("Sign in", () => {
    emailInput.fill("seller@acmetraders.test");
    passwordInput.fill("Sup3rSecret!");
    authSubmitButton.click();
  });

  expect(dashboardHeading).toBeVisible();
  expect(dashboardHeading).toHaveText("Latest Tenders");
  expect(topBarEmail).toHaveText("seller@acmetraders.test");
});
