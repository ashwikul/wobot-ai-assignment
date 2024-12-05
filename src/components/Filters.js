import React from "react";
import CustomDropdown from "./CustomDropdown";
import location from "../assets/location.svg";
import statusIcon from "../assets/statusIcon.svg";

function Filters({
  locations,
  status,
  selectedLocation,
  selectedStatus,
  setSelectedLocation,
  setSelectedStatus,
}) {
  return (
    <div className="filters">
      <CustomDropdown
        list={locations}
        state={selectedLocation}
        setState={setSelectedLocation}
        icon={location}
        label="Location"
      />
      <CustomDropdown
        list={status}
        state={selectedStatus}
        setState={setSelectedStatus}
        icon={statusIcon}
        label="Status"
      />
    </div>
  );
}

export default Filters;
