import React, { useEffect, useState } from "react";

import Table from "./Table";

function CameraList({
  setLocations,
  setStatus,
  selectedLocation,
  selectedStatus,
  searchText,
}) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [items_per_page, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusSaving, setIsStatusSaving] = useState(false);
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL;
    const token = process.env.REACT_APP_API_TOKEN;
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setData(data.data);
        setDisplayData(data.data);

        const getLocations = data.data.reduce((acc, curr) => {
          if (!acc.includes(curr.location)) {
            acc.push(curr.location);
          }
          return acc;
        }, []);
        setLocations(getLocations);

        const getStatus = data.data.reduce((acc, curr) => {
          if (!acc.includes(curr.status)) {
            acc.push(curr.status);
          }
          return acc;
        }, []);
        setStatus(getStatus);
        setIsLoading(false);
      })
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    const filteredData = getFilteredData(
      selectedStatus,
      selectedLocation,
      searchText
    );
    setDisplayData(filteredData);
  }, [selectedStatus, selectedLocation, searchText]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(displayData.length / items_per_page));
  }, [displayData]);

  const getFilteredData = (status, location, text) => {
    let filteredData = [...data];

    if (selectedStatus) {
      filteredData = filteredData.filter((item) => item.status === status);
    }

    if (selectedLocation) {
      filteredData = filteredData.filter((item) => item.location === location);
    }

    if (text) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(text)
      );
    }
    setPageIndex(1);
    return filteredData;
  };

  const updateData = (id, status) => {
    const url = "https://api-app-staging.wobot.ai/app/v1/update/camera/status";
    const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

    const payload = {
      id: id,
      status: status == "Active" ? "Inactive" : "Active",
    };
    setIsStatusSaving(true);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json()) // Parse the JSON data from the response
      .then((data) => {
        console.log("Data updated:", data);

        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: data.data.status } : item
          )
        );
        setDisplayData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: data.data.status } : item
          )
        );
        setIsStatusSaving(false);
      })
      .catch((err) => console.log("error", err));
  };
  const deleteData = (id) => {
    const getRemainingData = data.filter((item) => item.id !== id);
    setData(getRemainingData);
    const getRemainingDisplayData = displayData.filter(
      (item) => item.id !== id
    );
    setDisplayData(getRemainingDisplayData);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <Table
          displayData={displayData}
          items_per_page={items_per_page}
          pageIndex={pageIndex}
          updateData={updateData}
          deleteData={deleteData}
          setItemsPerPage={setItemsPerPage}
          setPageIndex={setPageIndex}
          numberOfPages={numberOfPages}
          isStatusSaving={isStatusSaving}
        />
      )}
    </>
  );
}

export default CameraList;
