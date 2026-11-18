/**
 * slb-careers-india.spec.ts
 *
 * From the SLB home page, open Careers, go to the job listing and filter the
 * results down to jobs located in India.
 */
import {
  careersNavLink,
  cookieRejectButton,
  countryFacetSearch,
  firstResultCountry,
  firstResultTitle,
  indiaBreadcrumb,
  indiaFacetValue,
  viewAllJobsLink,
} from "./elements/slb-careers.js";
import { expect, step, test } from "@testsigma/code";

test("Navigate from SLB home to Careers and view jobs in India", ({ page }) => {
  step("Open SLB home page", () => {
    page.goto("https://www.slb.com/");
    cookieRejectButton.clickIfPresent();
  });

  step("Go to the Careers site", () => {
    careersNavLink.click();
    expect(page).toContainURL("careers.slb.com");
    cookieRejectButton.clickIfPresent();
  });

  step("Open the full job listing", () => {
    viewAllJobsLink.click();
    expect(page).toContainURL("/job-listing");
    expect(page).toContainTitle("Jobs");
    expect(countryFacetSearch).toBeVisible();
  });

  step("Filter jobs by country India", () => {
    countryFacetSearch.fill("India");
    indiaFacetValue.click();
    expect(page).toContainURL("f-country-job=India");
  });

  step("Verify India jobs are listed", () => {
    expect(indiaBreadcrumb).toBeVisible();
    expect(firstResultCountry).toContainText("India");
    expect(firstResultTitle).toBeVisible();
  });
});
