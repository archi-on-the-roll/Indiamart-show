import { expect, step, test } from "@testsigma/code";
import { authSubmitButton, emailInput, passwordInput } from "./elements/auth.js";

test("Login blocks submission when email and password are empty", ({ page }) => {
  page.goto("http://localhost:3001");
  page.deleteLocalStorage();
  page.reload();

  step("Submit the sign-in form with both fields empty", () => {
    authSubmitButton.click();
    expect(emailInput).toHaveAttribute("required", "");
    expect(passwordInput).toHaveAttribute("required", "");
    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
  });
});
