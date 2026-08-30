import { expect, step, test } from "@testsigma/code";
import {
  authErrorBanner,
  authSubmitButton,
  emailInput,
  passwordInput,
} from "./elements/auth.js";

test("Login with an unregistered email shows an error", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Attempt login with an email that was never registered", () => {
    emailInput.fill("nobody@example.com");
    passwordInput.fill("WhateverPass1");
    authSubmitButton.click();
    expect(authErrorBanner).toBeVisible();
    expect(authErrorBanner).toHaveText("Incorrect email or password.");
  });
});
