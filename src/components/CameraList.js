import React, { useEffect, useState } from "react";
import cloud from "../assets/cloud.svg";
import device from "../assets/device.svg";
import actions from "../assets/actions.svg";
import leftArrow2 from "../assets/leftArrow2.svg";
import rightArrow2 from "../assets/rightArrow2.svg";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

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
  // console.log("searchText", searchText);

  const no_of_records_per_page = [5, 10, 15];

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL;
    const token = process.env.REACT_APP_API_TOKEN;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json()) // Parse the JSON data from the response
      .then((data) => {
        console.log("Data received:", data);
        setData(data.data);
        setDisplayData(data.data);

        const getLocations = data.data.reduce((acc, curr) => {
          if (!acc.includes(curr.location)) {
            acc.push(curr.location);
          }
          return acc; // Return the accumulator
        }, []);

        // console.log("locations", getLocations);
        setLocations(getLocations);

        const getStatus = data.data.reduce((acc, curr) => {
          if (!acc.includes(curr.status)) {
            acc.push(curr.status);
          }
          return acc; // Return the accumulator
        }, []);
        // console.log("status", getStatus);
        setStatus(getStatus);
      })
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    const filteredData = getFilteredData(selectedStatus, selectedLocation);
    console.log("1", displayData);
    setDisplayData(filteredData);
  }, [selectedStatus, selectedLocation]);

  useEffect(() => {
    const filteredData = searchData(searchText);
    console.log("2", displayData);
    setDisplayData(filteredData);
  }, [searchText]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(displayData.length / items_per_page));
  }, [displayData]);

  const getFilteredData = (status, location) => {
    let filteredData = [...data];

    if (selectedStatus) {
      filteredData = filteredData.filter((item) => item.status === status);
    }

    if (selectedLocation) {
      filteredData = filteredData.filter((item) => item.location === location);
    }

    return filteredData;
  };

  const updateData = (id, status) => {
    const url = "https://api-app-staging.wobot.ai/app/v1/update/camera/status";
    const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

    const payload = {
      id: id,
      status: status == "Active" ? "Inactive" : "Active",
    };

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

  const searchData = (text) => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(text)
    );

    return result;
  };
  console.log("displayData", displayData);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>NAME</th>
          <th>HEALTH</th>
          <th>LOCATION</th>
          <th>RECORDER</th>
          <th>TASKS</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {displayData
          .slice(items_per_page * (pageIndex - 1), items_per_page * pageIndex)
          .map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" />
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "baseline",
                    }}
                  >
                    <div
                      className={item.current_status.toLowerCase()}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Inter",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: " 16.94px",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter",
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "14.52px",
                        }}
                      >
                        {item.location}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={cloud} />
                      <p>{item.health.cloud}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={device} />
                      <p>{item.health.device}</p>
                    </div>
                  </div>
                </td>
                <td>{item.location}</td>
                <td>{item.recorder || "N/A"}</td>
                <td>{item.tasks} Tasks</td>
                <td>
                  <button
                    className={item.status.toLowerCase()}
                    onClick={() => updateData(item.id, item.status)}
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteData(item.id)}
                  >
                    <img src={actions} />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="8">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "flex-end",
              }}
            >
              <select
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                value={items_per_page}
                style={{
                  border: "none",
                  color: "#545454",
                }}
              >
                {no_of_records_per_page.map((n, index) => (
                  <option value={n} key={index}>
                    {n}
                  </option>
                ))}
              </select>
              <div
                style={{
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "14.52px",
                  textAlign: "left",
                  color: "#545454",
                }}
              >
                {items_per_page * (pageIndex - 1) + 1}-{" "}
                {items_per_page * (pageIndex - 1) + 1 + (items_per_page - 1)} of{" "}
                {displayData.length}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <img
                  src={leftArrow2}
                  onClick={() => setPageIndex(1)}
                  width={11}
                  height={12}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <img
                  src={leftArrow}
                  width={7}
                  height={12}
                  onClick={() => setPageIndex((prev) => prev - 1)}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <img
                  src={rightArrow}
                  onClick={() => setPageIndex((prev) => prev + 1)}
                  width={7}
                  height={12}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <img
                  src={rightArrow2}
                  onClick={() => setPageIndex(numberOfPages)}
                  width={11}
                  height={12}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default CameraList;
