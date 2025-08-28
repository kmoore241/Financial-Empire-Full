import React, { useState } from 'react';

const FeedbackForm = () => {
  const [message, setMessage] = useState('');

  const submitFeedback = () => {
    // Send to Firestore or admin
    alert('Feedback submitted: ' + message);
    setMessage('');
  };

  return (
    <div className="feedback-form">
      <textarea
        placeholder="Report a bug or share feedback"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={submitFeedback}>Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;