import React from 'react';

const SummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="card">
      <h2>Summary Dashboard</h2>
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Total Entries</span>
          <span className="stat-value">{summary.total_entries || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Hours</span>
          <span className="stat-value">{summary.total_hours || 0} hrs</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Most Active User</span>
          <span className="stat-value highlight">{summary.most_active_user || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
