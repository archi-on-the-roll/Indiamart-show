import { element } from "@testsigma/code";

export const approvalsNavButton = element({
  name: "Pending approvals nav button",
  locator: { csspath: "[data-testid='nav-approvals']" },
  semantic: { role: "button" },
});

export const tendersNavButton = element({
  name: "Tenders nav button",
  locator: { csspath: "[data-testid='nav-tenders']" },
  semantic: { role: "button" },
});

export const approvalRows = element({
  name: "Pending approval rows",
  locator: { csspath: "[data-testid='approval-row']" },
});

export const noPendingApprovalsState = element({
  name: "No pending approvals empty state",
  locator: { csspath: "[data-testid='no-pending-approvals']" },
});

export const approvalDecisionBanner = element({
  name: "Approval decision banner",
  locator: { csspath: "[data-testid='approval-decision-banner']" },
});

export const approvalDetailPanel = element({
  name: "Approval detail panel",
  locator: { csspath: "[data-testid='approval-detail-panel']" },
});

export const approvalDetailTitle = element({
  name: "Approval detail title",
  locator: { csspath: "[data-testid='approval-detail-panel'] h3" },
});

export const approvalDetailAuthority = element({
  name: "Approval detail authority value",
  locator: { xpath: "//div[@data-testid='approval-detail-panel']//dt[text()='Tender authority']/following-sibling::dd[1]" },
});

export const approvalDetailTenderNumber = element({
  name: "Approval detail tender number value",
  locator: { xpath: "//div[@data-testid='approval-detail-panel']//dt[text()='Tender number']/following-sibling::dd[1]" },
});

export const approvalDetailEmdValue = element({
  name: "Approval detail EMD value",
  locator: { xpath: "//div[@data-testid='approval-detail-panel']//dt[text()='EMD value']/following-sibling::dd[1]" },
});

export const approvalDetailTenderValue = element({
  name: "Approval detail tender value",
  locator: { xpath: "//div[@data-testid='approval-detail-panel']//dt[text()='Tender value']/following-sibling::dd[1]" },
});

export const approveButton = element({
  name: "Approve button",
  locator: { csspath: "[data-testid='approve-button']" },
  semantic: { role: "button" },
});

export const rejectButton = element({
  name: "Reject button",
  locator: { csspath: "[data-testid='reject-button']" },
  semantic: { role: "button" },
});

export const furnitureApprovalRow = element({
  name: "Office Furniture approval row",
  locator: {
    xpath:
      "//div[@data-testid='approval-row'][.//h4[text()='Procurement of Office Furniture for District Office']]",
  },
});

export const labGlasswareApprovalRow = element({
  name: "Laboratory Glassware approval row",
  locator: {
    xpath: "//div[@data-testid='approval-row'][.//h4[text()='Supply of Laboratory Glassware']]",
  },
});

export const roadCulvertsApprovalRow = element({
  name: "Rural Road Culverts approval row",
  locator: {
    xpath:
      "//div[@data-testid='approval-row'][.//h4[text()='Construction of Rural Road Culverts']]",
  },
});
