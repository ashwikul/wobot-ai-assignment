import React, { useState } from "react";
import dropdown from "../assets/dropdown.svg";

function CustomDropdown({ list, setState, icon, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="dropdown-container">
      {selectedValue ? (
        <div className="dropdown">
          <p>{selectedValue}</p>
          <img
            src={dropdown}
            height={24}
            width={24}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      ) : (
        <div className="dropdown">
          <div
            style={{
              display: "flex",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <img src={icon} height={16} width={16} />
            <p style={{ color: "#7E7E7E" }}>{label}</p>
          </div>

          <img
            src={dropdown}
            height={24}
            width={24}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      )}
      {isOpen && (
        <div className="menu">
          {list.map((list, index) => (
            <div
              key={index}
              className="option"
              style={{
                backgroundColor: selectedValue === list ? "#0000ffb5" : "",
                color: selectedValue === list ? "white" : "",
              }}
              onClick={() => {
                setSelectedValue(list);
                setIsOpen(false);
                setState(list);
              }}
            >
              {list}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
