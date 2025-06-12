'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(searchQuery);
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <form onSubmit={handleSubmit} className="position-relative">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search products by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                  
                />
                <button
                  className="btn btn-light"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner" />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
