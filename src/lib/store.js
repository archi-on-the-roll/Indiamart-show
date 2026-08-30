// Tiny localStorage-backed "backend" for the TenderBoard demo.
// No real server, no connection to real Indiamart systems -- seeded mock
// tender data only, modeled on the real fields Indiamart's Tenders feature
// documents (tender authority, EMD, due date, industry, location, etc).

const USERS_KEY = 'tenderboard_users';
const SESSION_KEY = 'tenderboard_session';
const ALERTS_KEY = 'tenderboard_alerts';
const APPROVALS_KEY = 'tenderboard_approvals';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Auth ---

export function getUsers() {
  return readJSON(USERS_KEY, []);
}

export function registerSeller({ sellerName, email, password }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error('An account with that email already exists.');
  }
  if (password.length < 4) {
    throw new Error('Password must be at least 4 characters.');
  }
  const user = { sellerName, email, password };
  users.push(user);
  writeJSON(USERS_KEY, users);
  writeJSON(SESSION_KEY, { email });
  return user;
}

export function login({ email, password }) {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    throw new Error('Incorrect email or password.');
  }
  writeJSON(SESSION_KEY, { email });
  return user;
}

export function getSession() {
  return readJSON(SESSION_KEY, null);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// --- Tenders (seeded, read-only mock data) ---

const today = new Date();
function daysFromNow(n) {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

const SEED_TENDERS = [
  {
    id: 't-1001',
    title: 'Supply of Industrial Water Pumps',
    industry: 'Industrial Machinery',
    state: 'Maharashtra',
    city: 'Pune',
    authority: 'Maharashtra Industrial Development Corporation',
    tenderNumber: 'MIDC/2026/WP/1187',
    dueDate: daysFromNow(9),
    tenderValue: 4200000,
    emdValue: 84000,
  },
  {
    id: 't-1002',
    title: 'Procurement of Office Furniture for District Office',
    industry: 'Furniture',
    state: 'Karnataka',
    city: 'Bengaluru',
    authority: 'Bruhat Bengaluru Mahanagara Palike',
    tenderNumber: 'BBMP/FUR/2026/0452',
    dueDate: daysFromNow(3),
    tenderValue: 950000,
    emdValue: 19000,
  },
  {
    id: 't-1003',
    title: 'Annual Maintenance Contract for HVAC Systems',
    industry: 'Electrical & Electronics',
    state: 'Delhi',
    city: 'New Delhi',
    authority: 'Central Public Works Department',
    tenderNumber: 'CPWD/AMC/2026/0091',
    dueDate: daysFromNow(-4),
    tenderValue: 2750000,
    emdValue: 55000,
  },
  {
    id: 't-1004',
    title: 'Supply of Laboratory Glassware',
    industry: 'Scientific Instruments',
    state: 'Tamil Nadu',
    city: 'Chennai',
    authority: 'Anna University',
    tenderNumber: 'AU/LAB/2026/0763',
    dueDate: daysFromNow(15),
    tenderValue: 610000,
    emdValue: 12000,
  },
  {
    id: 't-1005',
    title: 'Construction of Rural Road Culverts',
    industry: 'Construction Materials',
    state: 'Rajasthan',
    city: 'Jaipur',
    authority: 'Rajasthan PWD',
    tenderNumber: 'RPWD/ROAD/2026/2210',
    dueDate: daysFromNow(21),
    tenderValue: 8900000,
    emdValue: 178000,
  },
  {
    id: 't-1006',
    title: 'Supply of Safety Helmets and PPE Kits',
    industry: 'Industrial Machinery',
    state: 'Gujarat',
    city: 'Ahmedabad',
    authority: 'Gujarat Industrial Development Board',
    tenderNumber: 'GIDB/PPE/2026/0334',
    dueDate: daysFromNow(1),
    tenderValue: 380000,
    emdValue: 7600,
  },
];

export function getTenders() {
  return SEED_TENDERS;
}

export function getTenderStatus(tender) {
  const due = new Date(tender.dueDate);
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'closed';
  if (diffDays <= 3) return 'closing';
  return 'open';
}

export function getIndustries() {
  return [...new Set(SEED_TENDERS.map((t) => t.industry))].sort();
}

export function getStates() {
  return [...new Set(SEED_TENDERS.map((t) => t.state))].sort();
}

// --- Alert subscriptions ---

export function getAlerts() {
  return readJSON(ALERTS_KEY, []);
}

export function subscribeToAlert({ industry, state }) {
  if (!industry && !state) {
    throw new Error('Select at least an industry or a state to subscribe to alerts.');
  }
  const alerts = getAlerts();
  const dup = alerts.some((a) => a.industry === industry && a.state === state);
  if (dup) {
    throw new Error("You're already subscribed to alerts for this industry/location.");
  }
  const alert = { id: crypto.randomUUID(), industry: industry || 'Any', state: state || 'Any' };
  alerts.push(alert);
  writeJSON(ALERTS_KEY, alerts);
  return alert;
}

// --- Tender approvals ---

export function getApprovals() {
  return readJSON(APPROVALS_KEY, {});
}

export function getApprovalStatus(tenderId) {
  return getApprovals()[tenderId] || 'pending';
}

export function getPendingApprovalTenders() {
  return getTenders().filter((t) => getApprovalStatus(t.id) === 'pending');
}

export function approveTender(tenderId) {
  const approvals = getApprovals();
  approvals[tenderId] = 'approved';
  writeJSON(APPROVALS_KEY, approvals);
}

export function rejectTender(tenderId) {
  const approvals = getApprovals();
  approvals[tenderId] = 'rejected';
  writeJSON(APPROVALS_KEY, approvals);
}
