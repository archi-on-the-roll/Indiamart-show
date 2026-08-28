export default function TenderFilters({
  industries,
  states,
  industry,
  state,
  onIndustryChange,
  onStateChange,
  onSubscribe,
}) {
  return (
    <div className="filter-bar">
      <div className="field">
        <label htmlFor="industryFilter">Industry</label>
        <select
          id="industryFilter"
          data-testid="industry-filter"
          value={industry}
          onChange={(e) => onIndustryChange(e.target.value)}
        >
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="stateFilter">State</label>
        <select
          id="stateFilter"
          data-testid="state-filter"
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
        >
          <option value="">All states</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="field" />

      <button
        type="button"
        className="btn-secondary"
        data-testid="subscribe-alert-button"
        onClick={onSubscribe}
      >
        Subscribe to alerts
      </button>
    </div>
  );
}
