import React, { useState } from 'react';

const SearchHelp = () => {
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    // Lookup in help database or docs
    alert('Search for: ' + query);
  };

  return (
    <div className="search-help">
      <input
        type="text"
        placeholder="Search help..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchHelp;