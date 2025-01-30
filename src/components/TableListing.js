import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { FaCheck, FaEye } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Skeleton from "react-loading-skeleton";

const TableListing = ({
  data,
  columns,
  searchTerm,
  pageOffset,
  pageLimit,
  userPermissions,
  handleDeleteItem,
  handleEditItem,
  handleShowItem,
  editLink,
  showLink,
  idKey,
  editPermissionKey,
  stateKey,
  startSerialNumber,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // Simulate loading for 2 seconds (You can replace this with actual loading logic)
  const getData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad day and month with leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  // Call getData when the component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ overflowX: "auto" }}>
      {isLoading ? (
        // Render skeletons for entire row if loading

        <div>
          <Skeleton className="w-full p-4 mb-2" />
          <Skeleton className="w-full p-2 mb-2" />
          <Skeleton className="w-full p-2 mb-2" />
          <Skeleton className="w-full p-2 mb-2" />
          <Skeleton className="w-full p-2 mb-2" />
        </div>
      ) : (
        // Render
        <table className="table-auto w-full text-center text-[#959492] text-md">
          <thead>
            <tr>
              <th>SN</th>
              {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          {/* Your table structure */}
          <tbody className="bg-white rounded-xl">
            {data
              .filter((item) =>
                columns.some((column) => {
                  const accessor = column.accessor;
                  if (!item.hasOwnProperty(accessor)) {
                    console.error(
                      `Property ${accessor} does not exist in item.`
                    );
                    return false; // Skip this column
                  }

                  let columnValue;
                  if (accessor === "job_positions") {
                    // For job positions, join all position names into a single string
                    columnValue = item[accessor]
                      .map((position) => position.name)
                      .join(",")
                      .toLowerCase();
                  } else {
                    columnValue = item[accessor].toString().toLowerCase();
                  }

                  const searchTermLower = searchTerm.toLowerCase();
                  return columnValue.includes(searchTermLower);
                })
              )
              .slice(pageOffset, pageLimit)
              .map((item, index) => (
                <tr key={index} className="h-[50px] text-center">
                  <td>{startSerialNumber + index}</td>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {column.accessor === "status" ? (
                        item[column.accessor] === 1 ? (
                          <FaCheck
                            style={{ color: "green" }}
                            className="w-full"
                          />
                        ) : (
                          <FcCancel className="w-full " />
                        )
                      ) : column.accessor === "created_at" ||
                        column.accessor === "updated_at" ||
                        column.accessor === "expiry_date" ? (
                        <div className="truncate w-[250px] m-auto text-center">
                          {formattedDate(item[column.accessor])}
                        </div>
                      ) : column.accessor === "job_positions" ? (
                        <div className="truncate w-[250px] m-auto text-center">
                          {item[column.accessor]
                            .map((position) => position.name)
                            .join(",")}
                        </div>
                      ) : (
                        <div className="truncate w-[250px] m-auto text-center">
                          {item[column.accessor]}
                        </div>
                      )}
                    </td>
                  ))}

                  {(handleDeleteItem || handleEditItem || handleShowItem) && (
                    <td>
                      <div className="w-full flex justify-center items-center gap-4">
                        {handleShowItem && (
                          <Link
                            to={showLink}
                            state={{ [stateKey]: item[idKey] }} // Use stateKey for the state
                            title="Show"
                          >
                            <FaEye className="text-primary text-2xl" />
                          </Link>
                        )}
                        {handleEditItem && (
                          <Link
                            to={editLink}
                            title="Edit"
                            state={{ [stateKey]: item[idKey] }} // Use stateKey for the state
                            className={`${
                              userPermissions.includes(editPermissionKey)
                                ? "flex"
                                : "hidden"
                            }`}
                          >
                            <MdOutlineModeEdit className="text-primary text-2xl" />
                          </Link>
                        )}
                        {handleDeleteItem && (
                          <MdDelete
                            className="text-primary text-2xl"
                            onClick={() => handleDeleteItem(item[idKey])}
                          />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableListing;
