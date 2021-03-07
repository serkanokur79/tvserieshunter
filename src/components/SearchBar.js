import { Input } from "antd";
import React, { useContext, useState } from "react";
import SerieContext from "../context/series/SerieContext";
import { useHistory } from "react-router-dom";

const { Search } = Input;

export default function SearchBar({ size = "middle", placeholder = "Search" }) {
  const serieContext = useContext(SerieContext);
  const { searchSeries } = serieContext;
  const history = useHistory();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    query.length > 0 &&
      searchSeries(query, 1) &&
      history.push(`/searchResults?${query}`);
    setQuery("");
  };

  return (
    <Search
      allowClear
      placeholder={placeholder}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onSearch={() => handleSearch()}
      enterButton
      size={size}
    />
  );
}
