import React from "react";

function SearchBar({ searchTerm, handleSearchChange, handleSearchSubmit }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Busca tu look"
      />
      <button onClick={handleSearchSubmit}>Buscar</button>
    </div>
  );
}

export default SearchBar;

