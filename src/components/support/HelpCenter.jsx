import React from 'react';

const articles = [
  { title: 'How to use SafeBot', link: '/help/safebot' },
  { title: 'Understanding Market Modes', link: '/help/market-modes' },
  // etc
];

const HelpCenter = () => (
  <div className="help-center">
    <h2>Help Center</h2>
    <ul>
      {articles.map((a, i) => (
        <li key={i}><a href={a.link}>{a.title}</a></li>
      ))}
    </ul>
  </div>
);

export default HelpCenter;