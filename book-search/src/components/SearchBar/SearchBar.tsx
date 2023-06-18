import React, { useDeferredValue, useState } from "react";
import { Button, Input } from "antd";

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
  const deferredSuggestions = useDeferredValue(suggestions);

  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSelectIndex(-1);
  };

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
          onMouseDown={(e) => {
            console.log("1. onMouseDown");
            // e.preventDefault();
          }}
          onFocus={() => console.log("2. onFocus")}
          onMouseUp={() => console.log("3. onMouseUp")}
          onClickCapture={() => console.log("4. onClickCapture")}
          onClick={() => console.log("5. onClick")}
        />
        <Button onClick={handleSearch}>Search</Button>
        {showSuggestions && (
          <ul style={{ width: 600 }} className="suggestion-dropdown">
            {deferredSuggestions.map((suggestion, index) => (
              <li
                className="suggestion-item"
                key={`${suggestion}-${index}`}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                style={{
                  outline:
                    selectIndex === index ? "1px solid rgba(64, 150, 255)" : "",
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
