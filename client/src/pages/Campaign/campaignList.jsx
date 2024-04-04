import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function AddCampaignList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/campaign/get");
        if (res) {
          setData(res.data.campaigns);
        } else {
          console.error(
            "No Campaign found or error occurred while fetching data."
          );
        }
      } catch (error) {
        console.error("Error in getting lead information", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  const handleUpdate = async (id, field, value) => {
    try {
      let updateValue = value; // Set the update value to the provided value by default

      // Check if the field is a follow-up field and the value is boolean
      if (field.startsWith("followup") && typeof value === "boolean") {
        // If the field is a follow-up and the value is boolean, update the follow-up field
        updateValue = value; // Update the update value to the provided value for follow-up fields
      }

      // Send the update request with the updated value
      await axios.put(`http://localhost:8000/campaign/update/${id}`, {
        [field]: updateValue,
      });

      // Update the local state with the updated data
      setData(
        data.map((item) =>
          item.id === id ? { ...item, [field]: updateValue } : item
        )
      );
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleDoneEditing = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setDeleteConfirmation(id); // Set the ID of the campaign to delete
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/campaign/delete/${deleteConfirmation}`
      );
      setData(data.filter((item) => item.id !== deleteConfirmation));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="container mx-auto py-8" style={{ width: "90%" }}>
            <h1 className="text-2xl font-bold mb-4">Campaign Data</h1>
            <div
              className="flex mb-4"
              style={{ justifyContent: "space-between", position: "relative" }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-md py-2 px-10"
                style={{ width: "20%" }}
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <AiOutlineSearch className="text-gray-500" />
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1); // Reset pagination when changing items per page
                }}
                className="ml-4 border border-gray-300 rounded-md py-2 px-4"
                style={{ width: "15%" }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                {/* Table headers */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Campaign ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Campaign Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Follow-Ups
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {data
                    .filter((item) =>
                      Object.values(item).some((value) =>
                        value
                          .toString()
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                    )
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={item.campaign_name}
                              onChange={(e) =>
                                handleUpdate(
                                  item.id,
                                  "campaign_name",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.campaign_name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={item.industry_name}
                              onChange={(e) =>
                                handleUpdate(
                                  item.id,
                                  "industry_name",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.industry_name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={item.keyword_name}
                              onChange={(e) =>
                                handleUpdate(
                                  item.id,
                                  "keyword_name",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.keyword_name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div style={{ marginLeft: "10px" }}>
                            <ul className="flex flex-col sm:flex-row">
                              {[1, 2, 3, 4].map((followup) => (
                                <li
                                  key={followup}
                                  className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800"
                                >
                                  <div className="relative flex items-start w-full">
                                    <div className="flex items-center h-5">
                                      <input
                                        id={`followup-checkbox-${index}-${followup}`}
                                        name={`followup-checkbox-${index}-${followup}`}
                                        type="checkbox"
                                        className="border-gray-200 rounded disabled:opacity-50"
                                        checked={item[`followup${followup}`]}
                                        onChange={() =>
                                          handleUpdate(
                                            item.id,
                                            `followup${followup}`,
                                            !item[`followup${followup}`]
                                          )
                                        }
                                      />
                                    </div>
                                    <label className="ms-3.5 block w-full text-sm text-gray-600">
                                      Followup{followup}
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center">
                          {editingId === item.id ? (
                            <button
                              onClick={handleDoneEditing}
                              className="bg-blue-500 text-white text-center px-4 py-2 rounded-md mr-2"
                            >
                              Done
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                              >
                                <AiOutlineEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                              >
                                <AiOutlineDelete className="mr-1" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Delete confirmation modal */}
            {deleteConfirmation !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <p>Are you sure you want to delete this campaign?</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={confirmDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Pagination */}
            <div className="mt-4">
              <nav className="flex justify-end">
                <ul className="flex space-x-2">
                  {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
                    (pageNumber) => (
                      <li key={pageNumber}>
                        <button
                          onClick={() => setCurrentPage(pageNumber + 1)}
                          className={`${
                            currentPage === pageNumber + 1
                              ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                              : "text-blue-500 hover:text-blue-700 px-4 py-2"
                          }`}
                        >
                          {pageNumber + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCampaignList;
