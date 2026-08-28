import { getTenderStatus } from '../lib/store';

const STATUS_LABEL = {
  open: 'Open',
  closing: 'Closing soon',
  closed: 'Closed',
};

function formatINR(n) {
  return `\u20b9${n.toLocaleString('en-IN')}`;
}

export function TenderList({ tenders, onSelect }) {
  if (tenders.length === 0) {
    return (
      <div className="empty-state" data-testid="empty-tenders-state">
        No tenders match your current filters. Try a different industry or state.
      </div>
    );
  }

  return (
    <div className="tender-list" data-testid="tender-list">
      {tenders.map((t) => {
        const status = getTenderStatus(t);
        return (
          <div
            className="tender-row"
            key={t.id}
            data-testid="tender-row"
            onClick={() => onSelect(t.id)}
          >
            <div className="tender-row__main">
              <span className={`status-pill status-pill--${status}`}>
                {STATUS_LABEL[status]}
              </span>
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
        );
      })}
    </div>
  );
}

export function TenderDetail({ tender, onClose }) {
  const status = getTenderStatus(tender);

  return (
    <div className="tender-detail" data-testid="tender-detail-panel">
      <div className="tender-detail__top">
        <div>
          <span className={`status-pill status-pill--${status}`}>{STATUS_LABEL[status]}</span>
          <h3>{tender.title}</h3>
        </div>
        <button className="btn-link" data-testid="close-detail-button" onClick={onClose}>
          Close
        </button>
      </div>

      <dl className="detail-grid">
        <div>
          <dt>Tender authority</dt>
          <dd>{tender.authority}</dd>
        </div>
        <div>
          <dt>Tender number</dt>
          <dd>{tender.tenderNumber}</dd>
        </div>
        <div>
          <dt>Industry</dt>
          <dd>{tender.industry}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>
            {tender.city}, {tender.state}
          </dd>
        </div>
        <div>
          <dt>Due date</dt>
          <dd>{tender.dueDate}</dd>
        </div>
        <div>
          <dt>EMD value</dt>
          <dd>{formatINR(tender.emdValue)}</dd>
        </div>
        <div>
          <dt>Tender value</dt>
          <dd>{formatINR(tender.tenderValue)}</dd>
        </div>
      </dl>

      <div className="detail-actions">
        {status === 'closed' ? (
          <span className="banner banner--error" data-testid="closed-tender-message">
            This tender has closed and is no longer accepting applications.
          </span>
        ) : (
          <button className="btn-primary" style={{ width: 'auto', padding: '10px 22px' }} data-testid="view-notification-button">
            View tender notification
          </button>
        )}
      </div>
    </div>
  );
}
