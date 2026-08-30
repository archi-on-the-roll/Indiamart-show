import { element } from "@testsigma/code";

export const sellerNameInput = element({
  name: "Seller name input",
  locator: { csspath: "#sellerName" },
});

export const emailInput = element({
  name: "Email input",
  locator: { csspath: "#email" },
});

export const passwordInput = element({
  name: "Password input",
  locator: { csspath: "#password" },
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

export const authErrorBanner = element({
  name: "Auth error banner",
  locator: { csspath: "[data-testid='auth-error-banner']" },
});

export const signOutButton = element({
  name: "Sign out button",
  locator: { csspath: "[data-testid='sign-out-button']" },
  semantic: { role: "button" },
});
