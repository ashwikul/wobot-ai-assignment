import React from "react";
import cloud from "../assets/cloud.svg";
import device from "../assets/device.svg";
import actions from "../assets/actions.svg";

function TableContent({
  displayData,
  items_per_page,
  pageIndex,
  updateData,
  deleteData,
}) {
  return (
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
  );
}

export default TableContent;
