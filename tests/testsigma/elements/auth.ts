import { element } from "@testsigma/code";

export const sellerNameInput = element({
  name: "Seller name input",
  locator: { csspath: "[data-testid='seller-name-input']" },
});

export const emailInput = element({
  name: "Email input",
  locator: { csspath: "[data-testid='email-input']" },
});

export const passwordInput = element({
  name: "Password input",
  locator: { csspath: "[data-testid='password-input']" },
});

export const authSubmitButton = element({
  name: "Auth submit button",
  locator: { csspath: "[data-testid='auth-submit-button']" },
  semantic: { role: "button" },
});

export const switchToRegisterLink = element({
  name: "Switch to register",
  locator: { csspath: "[data-testid='switch-to-register']" },
  semantic: { role: "button" },
});

export const signOutButton = element({
  name: "Sign out button",
  locator: { csspath: "[data-testid='sign-out-button']" },
  semantic: { role: "button" },
});
