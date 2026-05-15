import React, { useState } from 'react';

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    activity: '',
    hours: ''
  });
  
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user edits
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Client-side validation
    if (!formData.name.trim() || !formData.activity.trim()) {
      setError("Name and Activity cannot be empty.");
      return;
    }
    
    const hoursNum = parseFloat(formData.hours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      setError("Hours must be a positive number.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      await onActivityAdded({
        name: formData.name.trim(),
        activity: formData.activity.trim(),
        hours: hoursNum
      });
      // Clear form on success
      setFormData({ name: '', activity: '', hours: '' });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add activity. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Add New Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Amal"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="activity">Activity Description</label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="e.g. Coding Practice"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="hours">Hours Spent</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            placeholder="e.g. 3"
            step="0.1"
            min="0.1"
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Activity'}
        </button>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default ActivityForm;
