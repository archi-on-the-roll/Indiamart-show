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

export const switchToRegisterButton = element({
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

export const dashboardHeading = element({
  name: "Latest Tenders heading",
  locator: { csspath: ".section-heading h2" },
});

export const topBarEmail = element({
  name: "Top bar signed-in email",
  locator: { csspath: ".topbar__meta span" },
});
