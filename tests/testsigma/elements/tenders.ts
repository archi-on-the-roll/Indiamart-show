import { element } from "@testsigma/code";

export const industryFilter = element({
  name: "Industry filter",
  locator: { csspath: "#industryFilter" },
});

export const stateFilter = element({
  name: "State filter",
  locator: { csspath: "#stateFilter" },
});

export const tenderList = element({
  name: "Tender list",
  locator: { csspath: "[data-testid='tender-list']" },
});

export const firstTenderRow = element({
  name: "First tender row",
  locator: { csspath: "[data-testid='tender-list'] [data-testid='tender-row']:first-child" },
  semantic: { role: "button" },
});

export const tenderDetailPanel = element({
  name: "Tender detail panel",
  locator: { csspath: "[data-testid='tender-detail-panel']" },
});

export const tenderDetailTitle = element({
  name: "Tender detail title",
  locator: { csspath: "[data-testid='tender-detail-panel'] h3" },
});

export const tenderDetailStatusPill = element({
  name: "Tender detail status pill",
  locator: { csspath: "[data-testid='tender-detail-panel'] .status-pill" },
});

export const closeDetailButton = element({
  name: "Close tender detail button",
  locator: { csspath: "[data-testid='close-detail-button']" },
  semantic: { role: "button" },
});

export const closedTenderRow = element({
  name: "Closed tender row (HVAC AMC)",
  locator: {
    xpath:
      "//div[@data-testid='tender-row'][.//h4[text()='Annual Maintenance Contract for HVAC Systems']]",
  },
  semantic: { role: "button" },
});

export const closedTenderMessage = element({
  name: "Closed tender message",
  locator: { csspath: "[data-testid='closed-tender-message']" },
});

export const viewNotificationButton = element({
  name: "View tender notification button",
  locator: { csspath: "[data-testid='view-notification-button']" },
  semantic: { role: "button" },
});
