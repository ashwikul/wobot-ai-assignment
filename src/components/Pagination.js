import React from "react";
import leftArrow2 from "../assets/leftArrow2.svg";
import rightArrow2 from "../assets/rightArrow2.svg";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

function Pagination({
  setItemsPerPage,
  items_per_page,
  pageIndex,
  displayData,
  setPageIndex,
  numberOfPages,
}) {
  const no_of_records_per_page = [5, 10, 15];
  return (
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
              {items_per_page * (pageIndex - 1) + 1}-
              {Math.min(items_per_page * pageIndex, displayData.length)} of{" "}
              {displayData.length}
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                disabled={pageIndex === 1}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: pageIndex === 1 ? "not-allowed" : "pointer",
                }}
              >
                <img
                  src={leftArrow2}
                  onClick={() => setPageIndex(1)}
                  width={11}
                  height={12}
                />
              </button>

              <button
                disabled={pageIndex === 1}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: pageIndex === 1 ? "not-allowed" : "pointer",
                }}
              >
                <img
                  src={leftArrow}
                  width={7}
                  height={12}
                  onClick={() => setPageIndex((prev) => prev - 1)}
                />
              </button>
              <button
                disabled={pageIndex === numberOfPages}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor:
                    pageIndex === numberOfPages ? "not-allowed" : "pointer",
                }}
              >
                <img
                  src={rightArrow}
                  onClick={() => setPageIndex((prev) => prev + 1)}
                  width={7}
                  height={12}
                />
              </button>
              <button
                disabled={pageIndex === numberOfPages}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor:
                    pageIndex === numberOfPages ? "not-allowed" : "pointer",
                }}
              >
                <img
                  src={rightArrow2}
                  onClick={() => setPageIndex(numberOfPages)}
                  width={11}
                  height={12}
                />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export default Pagination;
