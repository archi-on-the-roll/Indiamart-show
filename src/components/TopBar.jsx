export default function TopBar({ email, view, onNavigate, onSignOut }) {
  return (
    <div className="topbar">
      <div className="topbar__brand">
        Tender<span>Board</span>
      </div>
      <nav className="topbar__nav">
        <button
          type="button"
          className={`tab-button${view === 'tenders' ? ' tab-button--active' : ''}`}
          data-testid="nav-tenders"
          onClick={() => onNavigate('tenders')}
        >
          Tenders
        </button>
        <button
          type="button"
          className={`tab-button${view === 'approvals' ? ' tab-button--active' : ''}`}
          data-testid="nav-approvals"
          onClick={() => onNavigate('approvals')}
        >
          Pending Approvals
        </button>
      </nav>
      <div className="topbar__meta">
        <span>{email}</span>
        <button className="btn-ghost" data-testid="sign-out-button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
