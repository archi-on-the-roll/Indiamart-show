import { element } from "@testsigma/code";

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
