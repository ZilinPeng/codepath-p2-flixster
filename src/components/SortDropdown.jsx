export default function SortDropdown({ value, onChange }) {
    return (
      <div className="sort-dropdown">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">None</option>
          <option value="title">Title (A–Z)</option>
          <option value="date">Release Date (Newest)</option>
          <option value="rating">Rating (High–Low)</option>
        </select>
      </div>
    );
  }