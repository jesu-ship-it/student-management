import React from 'react';
import  { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search students by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

export {SearchBar};
