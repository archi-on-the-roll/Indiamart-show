# TenderBoard (demo app)

A small, self-contained mock of a seller "Tenders" feature (inspired by the kind
of page found at seller.indiamart.com/tenders/tender/), built to showcase an
end-to-end Arcus by Testsigma workflow (code -> test -> PR -> merge -> QI Home)
for a customer POC.

**This is an independent mock, not connected to or scraping the real Indiamart
site.** All tender data is seeded locally; there is no live login, no real
tender feed, and no interaction with Indiamart's production systems. Accounts
and alert subscriptions are stored in the browser's localStorage only.

## What it does

- **Seller login / registration** (`AuthScreen`) — duplicate-email and
  short-password validation.
- **Tender browsing** (`TenderList`, `TenderFilters`) — filter live tenders by
  industry and state; each tender shows authority, tender number, EMD value,
  tender value, and due date, modeled on the real fields Indiamart documents
  for this feature.
- **Tender detail view** — closed/expired tenders show a disabled state
  instead of an active "apply" action.
- **Alert subscriptions** — subscribe to alerts for an industry/state
  combination; subscribing to the same combination twice is rejected.

## Run locally

```bash
npm install
npm run dev
```

App runs at http://localhost:3001.

## Suggested negative test cases for the Arcus demo

- Register fails when the email is already in use
- Register fails when the password is under 4 characters
- Subscribing to the same industry/state alert twice is rejected
- Subscribing with no industry and no state selected is rejected
- A closed/expired tender shows a "closed" message instead of an active action
- Filtering to an industry/state combination with no tenders shows an empty state

All interactive elements have `data-testid` attributes for stable test selectors.
