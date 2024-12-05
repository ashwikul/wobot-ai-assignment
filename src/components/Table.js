import React from "react";

import Pagination from "./Pagination";
import TableContent from "./TableContent";

function Table({
  displayData,
  items_per_page,
  pageIndex,
  updateData,
  deleteData,
  setItemsPerPage,
  setPageIndex,
  numberOfPages,
  isStatusSaving,
}) {
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
      {displayData.length > 0 ? (
        <>
          <TableContent
            displayData={displayData}
            items_per_page={items_per_page}
            pageIndex={pageIndex}
            updateData={updateData}
            deleteData={deleteData}
          />
          {isStatusSaving && (
            <div
              style={{
                backgroundColor: "#9a9a9ebd",
                width: "100%",
                height: "100vh",
                position: "fixed",
                top: "0px",
                left: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          )}
        </>
      ) : (
        <tbody>
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No matching records found
            </td>
          </tr>
        </tbody>
      )}

      <Pagination
        setItemsPerPage={setItemsPerPage}
        items_per_page={items_per_page}
        pageIndex={pageIndex}
        displayData={displayData}
        setPageIndex={setPageIndex}
        numberOfPages={numberOfPages}
      />
    </table>
  );
}

export default Table;
