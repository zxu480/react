import { Button, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useMemo, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((text) =>
      text.includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleSearch = () => {
    onSearch(searchText);
    setShowSuggestions(false);
  };

  const handleInputChange = (value: string) => {
    setSearchText(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchText(value);
    onSearch(value);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    // setShowSuggestions(false);
  };

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="Search for books"
          value={searchText}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          style={{ width: 600 }}
        />
        <Button onClick={handleSearch}>Search</Button>
        {showSuggestions && (
          <ul style={{ width: 600 }}>
            {filteredSuggestions.map((suggestion, index) => (
              <option
                key={suggestion + index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </option>
            ))}
          </ul>
        )}
      </div>
      {/* <div>
        <Select
          placeholder="Search for books"
          showSearch
          // value={searchText}
          onSearch={handleSearch}
          onChange={handleInputChange}
          style={{ width: 360 }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <Option
              key={suggestion + index}
              // onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Option>
          ))}
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </div> */}
    </>
  );
};

export default SearchBar;
