import React, { useEffect, useState } from "react";
import cloud from "../assets/cloud.svg";
import device from "../assets/device.svg";
import actions from "../assets/actions.svg";

function CameraList() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
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
      })
      .catch((err) => console.log("error", err));
  }, []);
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
  const deleteData = (id, status) => {};
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
        {displayData.map((item) => {
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
                  }}
                >
                  <div>
                    <img src={cloud} />
                    {item.health.cloud}
                  </div>
                  <div>
                    <img src={device} />
                    {item.health.device}
                  </div>
                </div>
              </td>
              <td>{item.location}</td>
              <td>{item.recorder}</td>
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
                  onClick={() => deleteData(item.id, item.status)}
                >
                  <img src={actions} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CameraList;
