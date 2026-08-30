import { useEffect, useMemo, useState } from 'react';
import AuthScreen from './components/AuthScreen';
import TopBar from './components/TopBar';
import TenderFilters from './components/TenderFilters';
import { TenderList, TenderDetail } from './components/TenderList';
import ApprovalsView from './components/ApprovalsView';
import {
  getSession,
  logout,
  getTenders,
  getIndustries,
  getStates,
  subscribeToAlert,
} from './lib/store';

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('tenders');
  const [industry, setIndustry] = useState('');
  const [state, setState] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // { type, text }

  useEffect(() => {
    setSession(getSession());
  }, []);

  const tenders = getTenders();

  const filtered = useMemo(() => {
    return tenders.filter((t) => {
      if (industry && t.industry !== industry) return false;
      if (state && t.state !== state) return false;
      return true;
    });
  }, [tenders, industry, state]);

  const selectedTender = tenders.find((t) => t.id === selectedId);

  function handleSubscribe() {
    setAlertMessage(null);
    try {
      subscribeToAlert({ industry, state });
      setAlertMessage({ type: 'success', text: 'Subscribed to alerts for this filter.' });
    } catch (err) {
      setAlertMessage({ type: 'error', text: err.message });
    }
  }

  function handleSignOut() {
    logout();
    setSession(null);
  }

  if (!session) {
    return (
      <div className="app-shell">
        <AuthScreen onAuthed={(email) => setSession({ email })} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <TopBar email={session.email} view={view} onNavigate={setView} onSignOut={handleSignOut} />
      <div className="content">
        {view === 'approvals' ? (
          <ApprovalsView />
        ) : (
          <>
            <div className="section-heading">
              <h2>Latest Tenders</h2>
            </div>
            <p className="section-sub">
              Browse tenders relevant to your product categories and subscribe to alerts.
            </p>

            {alertMessage && (
              <div
                className={`banner banner--${alertMessage.type}`}
                data-testid="subscribe-alert-banner"
              >
                {alertMessage.text}
              </div>
            )}

            <TenderFilters
              industries={getIndustries()}
              states={getStates()}
              industry={industry}
              state={state}
              onIndustryChange={(v) => {
                setIndustry(v);
                setAlertMessage(null);
              }}
              onStateChange={(v) => {
                setState(v);
                setAlertMessage(null);
              }}
              onSubscribe={handleSubscribe}
            />

            {selectedTender && (
              <TenderDetail tender={selectedTender} onClose={() => setSelectedId(null)} />
            )}

            <TenderList tenders={filtered} onSelect={setSelectedId} />
          </>
        )}
      </div>
    </div>
  );
}
