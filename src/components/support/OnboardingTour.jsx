import React, { useEffect } from 'react';

const steps = [
  { selector: '#dashboard', content: 'This is your Dashboard' },
  { selector: '#safe-bot', content: 'Here you can test SafeBot' },
  // Add more steps as needed
];

const OnboardingTour = () => {
  useEffect(() => {
    // Initialize your tour library here (e.g. react-joyride) with `steps`
  }, []);

  return null; // Tour runs in background
};

export default OnboardingTour;