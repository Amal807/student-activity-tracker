import React, { useState, useEffect } from 'react';
import { fetchActivities, fetchSummary, addActivity, deleteActivity } from './services/api';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import SummaryCard from './components/SummaryCard';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [activitiesRes, summaryRes] = await Promise.all([
        fetchActivities(),
        fetchSummary()
      ]);
      setActivities(activitiesRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      setError("Failed to fetch data from the server. Make sure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleActivityAdded = async (activityData) => {
    await addActivity(activityData);
    // Refresh both list and summary
    loadData();
  };

  const handleActivityDeleted = async (id) => {
    try {
      await deleteActivity(id);
      loadData();
    } catch (err) {
      alert("Failed to delete activity.");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Activity Tracker</h1>
      </header>

      {error && <div className="error-message" style={{textAlign: 'center', marginBottom: '1rem'}}>{error}</div>}

      <div className="main-content">
        <div className="top-section">
          <ActivityForm onActivityAdded={handleActivityAdded} />
          <SummaryCard summary={summary} />
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading data...</div>
        ) : (
          <ActivityList activities={activities} onDelete={handleActivityDeleted} />
        )}
      </div>
    </div>
  );
}

export default App;
