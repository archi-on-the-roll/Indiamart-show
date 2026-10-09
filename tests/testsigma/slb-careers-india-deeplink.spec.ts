/**
 * slb-careers-india-deeplink.spec.ts
 *
 * Open the SLB job listing with the Country = India filter already applied in
 * the URL and confirm that India jobs are listed.
 */
import {
  cookieRejectButton,
  firstResultCountry,
  firstResultTitle,
  indiaBreadcrumb,
} from "./elements/slb-careers.js";
import { expect, step, test } from "@testsigma/code";

test("Job listing deep link filtered to India shows India jobs", ({ page }) => {
  page.goto("https://careers.slb.com/job-listing#f-country-job=India");
  cookieRejectButton.clickIfPresent();
  step("Verify India jobs are listed", () => {
    expect(indiaBreadcrumb).toBeVisible();
    expect(firstResultCountry).toContainText("India");
    expect(firstResultTitle).toBeVisible();
  });
});
