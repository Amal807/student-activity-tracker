import React from 'react';

const ActivityList = ({ activities, onDelete }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="card">
        <h2>Activity Log</h2>
        <div className="empty-state">No activities added yet. Be the first!</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Activity Log</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Activity</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr key={act.id}>
                <td>{act.id}</td>
                <td>{act.name}</td>
                <td>{act.activity}</td>
                <td>{act.hours}</td>
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={() => onDelete(act.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityList;
