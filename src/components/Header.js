import React from "react";
import search from "../assets/search.svg";
function Header({ searchText, setSearchText }) {
  console.log("searchText", searchText);

  return (
    <div className="headers">
      <div className="title">
        <h4>Cameras</h4>
        <p>Manage your cameras here.</p>
      </div>
      <div
        className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <input
          className="search"
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <img src={search} alt="Search Icon" />
      </div>
    </div>
  );
}

export default Header;
