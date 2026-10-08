import { element } from "@testsigma/code";

export const stateFilter = element({
  name: "State filter",
  locator: { csspath: "[data-testid='state-filter']" },
});

export const tenderRows = element({
  name: "Tender rows",
  locator: { csspath: "[data-testid='tender-row']" },
});

export const firstTenderRow = element({
  name: "First tender row",
  locator: { xpath: "(//div[@data-testid='tender-row'])[1]" },
});

export const tenderDetailPanel = element({
  name: "Tender detail panel",
  locator: { csspath: "[data-testid='tender-detail-panel']" },
});

export const tenderDetailTitle = element({
  name: "Tender detail title",
  locator: { csspath: "[data-testid='tender-detail-panel'] h3" },
});

export const viewNotificationButton = element({
  name: "View tender notification button",
  locator: { csspath: "[data-testid='view-notification-button']" },
  semantic: { role: "button" },
});

export const closeDetailButton = element({
  name: "Close tender detail button",
  locator: { csspath: "[data-testid='close-detail-button']" },
  semantic: { role: "button" },
});
