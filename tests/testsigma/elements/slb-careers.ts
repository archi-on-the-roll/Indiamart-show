/**
 * Shared elements for the SLB careers specs.
 *
 * The job listing is built with Coveo Atomic web components, so the facet,
 * breadbox and result elements live inside open shadow roots. The CSS locators
 * below target the component host first (e.g. atomic-facet[field="country"])
 * and rely on the runner's shadow-piercing CSS to reach the inner element.
 */
import { element } from "@testsigma/code";

// ── www.slb.com ────────────────────────────────────────────────────────────

export const cookieRejectButton = element({
  name: "Cookie banner reject button",
  locator: { csspath: "#onetrust-reject-all-handler" },
});

export const careersNavLink = element({
  name: "Careers top nav link",
  locator: { csspath: "a[data-dropdown-id='dropdown-list-careers']" },
});

// ── careers.slb.com ────────────────────────────────────────────────────────

export const viewAllJobsLink = element({
  name: "View all jobs link",
  locator: { xpath: "//a[contains(normalize-space(.), 'View all jobs')]" },
});

export const countryFacetSearch = element({
  name: "Country facet search input",
  locator: { csspath: "atomic-facet[field='country'] input[part='search-input']" },
});

export const indiaFacetValue = element({
  name: "Country facet value India",
  locator: { csspath: "atomic-facet[field='country'] button[aria-label^='Inclusion filter on India;']" },
});

export const indiaBreadcrumb = element({
  name: "Active filter chip Country: India",
  locator: { csspath: "atomic-breadbox button[aria-label='Remove inclusion filter on Country: India']" },
});

export const firstResultCountry = element({
  name: "Country of first job result",
  locator: { csspath: "atomic-result:first-of-type .job-location atomic-result-multi-value-text[field='country'] li[part='result-multi-value-text-value']" },
});

export const firstResultTitle = element({
  name: "Title of first job result",
  locator: { csspath: "atomic-result:first-of-type atomic-result-link.career-job-title a[href*='jobdescription']" },
});
