import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';

export default function Header({ onSearch, onClear, query, sortBy, onSortChange }) {
  return (
    <div className="site-header">
      <h1>Flixster</h1>
      <div className="controls">
        <SearchBar onSearch={onSearch} onClear={onClear} query={query} />
        <SortDropdown value={sortBy} onChange={onSortChange} />
      </div>
    </div>
  );
}