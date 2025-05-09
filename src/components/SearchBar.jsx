import { useState } from 'react';

export default function SearchBar({ onSearch, onClear, query }) {
  const [text, setText] = useState(query || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.search.value.trim();
    if (input) {
      setText(input);    // update state for display
      onSearch(input);   // use latest value immediately
    }
  };

  const handleClear = () => {
    setText('');
    onClear();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        name="search"
        type="text"
        placeholder="Search movies..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Movie title search"
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}