import React, { useMemo, useState } from "react";
import { Button, Input, Select } from "antd";


interface SearchBarProps {
  onSearch: () => void;
  onInputChange: (value: string) => void;
  suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onInputChange,
  suggestions,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectIndex, setSelectIndex] = useState(-1);

  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSelectIndex(-1);
  }

  const handleSearch = () => {
    onSearch();
    closeSuggestions();
  };

  const handleInputChange = (value: string) => {
    onInputChange(value);
    setSearchText(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (value: string) => {
    handleInputChange(value);
    handleSearch();
  };

  const handleBlur = () => {
    closeSuggestions();
  };

  const handleKeyDown = (key: string) => {
    if (key === "ArrowDown") {
      setSelectIndex((selectIndex + 1) % 10);
    } else if (key === "ArrowUp") {
      setSelectIndex((selectIndex - 1 + 10) % 10);
    } else if (key === "Enter") {
      if (selectIndex !== -1) {
        handleInputChange(suggestions[selectIndex]);
      }
      handleSearch();
    }
  };

  return (
    <>
      <div className="searchbar">
        <Input
          type="text"
          placeholder="Search for books"
          value={searchText}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e.key)}
          style={{ width: 600 }}
        />
        <Button onClick={handleSearch}>Search</Button>
        {showSuggestions && (
          <ul style={{ width: 600 }} className="suggestion-dropdown">
            {suggestions.map((suggestion, index) => (
              <li
                className="suggestion-item"
                key={`${suggestion}-${index}`}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                style={{
                  outline:
                    selectIndex === index
                      ? "1px solid rgba(64, 150, 255)"
                      : "",
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
