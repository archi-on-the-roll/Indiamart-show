import { useState } from 'react';
import { approveTender, getPendingApprovalTenders, rejectTender } from '../lib/store';

function formatINR(n) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function ApprovalsView() {
  const [selectedId, setSelectedId] = useState(null);
  const [decisionMessage, setDecisionMessage] = useState(null);
  const [, setVersion] = useState(0);

  const pending = getPendingApprovalTenders();
  const selected = pending.find((t) => t.id === selectedId);

  function handleDecision(tenderId, tenderTitle, decision) {
    if (decision === 'approved') {
      approveTender(tenderId);
      setDecisionMessage({ type: 'success', text: `"${tenderTitle}" was approved.` });
    } else {
      rejectTender(tenderId);
      setDecisionMessage({ type: 'error', text: `"${tenderTitle}" was rejected.` });
    }
    setSelectedId(null);
    setVersion((v) => v + 1);
  }

  return (
    <div>
      <div className="section-heading">
        <h2>Pending Approvals</h2>
      </div>
      <p className="section-sub">
        Review each tender and approve or reject it before it goes further.
      </p>

      {decisionMessage && (
        <div
          className={`banner banner--${decisionMessage.type}`}
          data-testid="approval-decision-banner"
        >
          {decisionMessage.text}
        </div>
      )}

      {selected && (
        <div className="tender-detail" data-testid="approval-detail-panel">
          <div className="tender-detail__top">
            <div>
              <span className="status-pill status-pill--closing">Pending</span>
              <h3>{selected.title}</h3>
            </div>
            <button
              className="btn-link"
              data-testid="close-approval-detail-button"
              onClick={() => setSelectedId(null)}
            >
              Close
            </button>
          </div>

          <dl className="detail-grid">
            <div>
              <dt>Tender authority</dt>
              <dd>{selected.authority}</dd>
            </div>
            <div>
              <dt>Tender number</dt>
              <dd>{selected.tenderNumber}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{selected.industry}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>
                {selected.city}, {selected.state}
              </dd>
            </div>
            <div>
              <dt>Due date</dt>
              <dd>{selected.dueDate}</dd>
            </div>
            <div>
              <dt>EMD value</dt>
              <dd>{formatINR(selected.emdValue)}</dd>
            </div>
            <div>
              <dt>Tender value</dt>
              <dd>{formatINR(selected.tenderValue)}</dd>
            </div>
          </dl>

          <div className="detail-actions">
            <button
              className="btn-primary"
              style={{ width: 'auto', padding: '10px 22px' }}
              data-testid="approve-button"
              onClick={() => handleDecision(selected.id, selected.title, 'approved')}
            >
              Approve
            </button>
            <button
              className="btn-secondary"
              data-testid="reject-button"
              onClick={() => handleDecision(selected.id, selected.title, 'rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {pending.length === 0 ? (
        <div className="empty-state" data-testid="no-pending-approvals">
          No tenders are awaiting approval.
        </div>
      ) : (
        <div className="tender-list" data-testid="approval-list">
          {pending.map((t) => (
            <div
              className="tender-row"
              key={t.id}
              data-testid="approval-row"
              onClick={() => setSelectedId(t.id)}
            >
              <div className="tender-row__main">
                <span className="status-pill status-pill--closing">Pending</span>
                <h4>{t.title}</h4>
                <div className="tender-row__meta">
                  <span>{t.industry}</span>
                  <span>
                    {t.city}, {t.state}
                  </span>
                  <span>Due {t.dueDate}</span>
                </div>
              </div>
              <div className="tender-row__value">
                <div className="label">Tender value</div>
                <div className="amount">{formatINR(t.tenderValue)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
