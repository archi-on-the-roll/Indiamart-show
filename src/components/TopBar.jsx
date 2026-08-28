export default function TopBar({ email, onSignOut }) {
  return (
    <div className="topbar">
      <div className="topbar__brand">
        Tender<span>Board</span>
      </div>
      <div className="topbar__meta">
        <span>{email}</span>
        <button className="btn-ghost" data-testid="sign-out-button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
