import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import toast, { Toaster } from "react-hot-toast";

function AddLeadList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [copyStatus, setCopyStatus] = useState(false);


    const copySelectedData = async () => {
      try {
        const res = await axios.post("http://localhost:8000/lead/selected-data");
        console.log("response :", res);
        if (res) {
         toast.success(res.data.message)
         window.location.reload();
        } else {
          toast.error(
            res.data.message
          );
        }
      } catch (error) {
        toast.error("Error in getting copy data", error);
      }
    };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/lead/get");
        if (res) {
          setData(res.data.leads);
          setFilteredData(res.data.leads); // Initialize filteredData with all data
        } else {
          toast.error(
            "No Campaign found or error occurred while fetching data."
          );
        }
      } catch (error) {
        console.error("Error in getting lead information", error);
      }
    };

    fetchData();
  }, []);

 
  useEffect(() => {
    const filtered = data.filter((item) => {
      const searchTermMatch = Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const keywordMatch =
        searchKeyword === "" ||
        item.KeywordName.toLowerCase().includes(searchKeyword.toLowerCase());
      const industryMatch =
        searchIndustry === "" ||
        item.IndustryName.toLowerCase().includes(searchIndustry.toLowerCase());
      return searchTermMatch && keywordMatch && industryMatch;
    });
    setFilteredData(filtered);
  }, [data, searchTerm, searchKeyword, searchIndustry]);
 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
 
  const handleSearchKeyword = (e) => {
    const value = e.target.value.toLowerCase().slice(0, 12);
    setSearchKeyword(value);
    setCurrentPage(1);
  };
 
  const handleSearchIndustry = (e) => {
    const value = e.target.value.toLowerCase().slice(0, 12);
    setSearchIndustry(value);
    setCurrentPage(1);
  };
 
 

  const handleUpdate = async (id, field, value) => {
    try {
      await axios.put(`http://localhost:8000/lead/update/${id}`, {
        [field]: value,
      });

      setData(
        data.map((item) =>
          item.lead_id === id ? { ...item, [field]: value } : item
        )
      );
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  //krishna
  const handleCheckboxChange = async (index) => {
    try {
      const updatedData = [...filteredData];
      const leadIdToUpdate = updatedData[index].lead_id;
      updatedData[index].copyStatus = !updatedData[index].copyStatus;
 
      await axios.put(`http://localhost:8000/lead/copy-data/${leadIdToUpdate}`, {
        copyStatus: updatedData[index].copyStatus,
      });
 
      setFilteredData(updatedData);
      window.location.reload();
    } catch (error) {
      console.error("Error updating copy status:", error);
    }
  };
 

  const handleMasterCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyStatus(isChecked);

    const updatedData = filteredData.map((item) => ({
      ...item,
      copyStatus: isChecked,
    }));

    setFilteredData(updatedData);
    // window.location.reload();

    // Update copy status for all leads in the backend
    updateCopyStatusForAllLeads(isChecked);
  };

 

 
  //krishna

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
        `http://localhost:8000/lead/delete/${deleteConfirmation}`
      );
      setData(data.filter((item) => item.lead_id !== deleteConfirmation));
      setFilteredData(
        filteredData.filter((item) => item.lead_id !== deleteConfirmation)
      );
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const updateCopyStatusForAllLeads = async (isChecked) => {
    try {
      await Promise.all(
        filteredData.map(async (lead) => {
          await axios.put(`http://localhost:8000/lead/copy-data/${lead.lead_id}`, {
            copyStatus: isChecked,
          });
        })
      );
    } catch (error) {
      console.error("Error updating copy status for all leads:", error);
    }
  };

  // const handleMasterCheckboxChange = (e) => {
  //   setCopyStatus(e.target.checked);
  //   setFilteredData(
  //     filteredData.map((item) => ({
  //       ...item,
  //       copyStatus: e.target.checked,
  //     }))
  //   );
  // };



  const copyLeadData = () => {
    // Implement copying lead data functionality here
    console.log("Copying lead data...");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="container mx-auto py-8" style={{ width: "90%" }}>
            {/* "Copy Lead Data" button */}

            <button
              onClick={copySelectedData}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{marginLeft:"875px"}}
            >
              Copy Lead Data
            </button>
           
         
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
              <input
                type="text"
                placeholder="Search Industry..."
                value={searchIndustry}
                onChange={handleSearchIndustry}
                className="w-full border border-gray-300 rounded-md"
                style={{ width: "20%" }}
              />
              <input
                type="text"
                placeholder="Search Keyword..."
                value={searchKeyword}
                onChange={handleSearchKeyword}
                className="w-full border border-gray-300 rounded-md"
                style={{ width: "20%" }}
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <AiOutlineSearch className="text" />
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
                      <input
                        type="checkbox"
                        onChange={handleMasterCheckboxChange}
                        checked={copyStatus}
                      />
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Lead ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Lead Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Company Size
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Phone No
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <input
                            className="border-gray-200 rounded disabled:opacity-50"
                            type="checkbox"
                            onChange={() => handleCheckboxChange(index)}
                            checked={item.copyStatus}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.lead_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.firstname + " " + item.lastname}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "lead_id",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.firstname + " " + item.lastname
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.IndustryName}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "industry",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.IndustryName
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.KeywordName}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "keyword",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.KeywordName
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.company}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "company",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.company
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.company_size}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "company_size",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.company_size
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.email}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "email",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.email
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.phone}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "phone",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.phone
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.job_title}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "job_title",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.job_title
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === item.lead_id ? (
                            <input
                              type="text"
                              value={item.role}
                              onChange={(e) =>
                                handleUpdate(
                                  item.lead_id,
                                  "role",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md py-1 px-2 w-full"
                            />
                          ) : (
                            item.role
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center">
                          {editingId === item.lead_id ? (
                            <button
                              onClick={handleDoneEditing}
                              className="bg-blue-500 text-white text-center px-4 py-2 rounded-md mr-2"
                            >
                              Done
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(item.lead_id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                              >
                                <AiOutlineEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.lead_id)}
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
                  {[
                    ...Array(
                      Math.ceil(filteredData.length / itemsPerPage)
                    ).keys(),
                  ].map((pageNumber) => (
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
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <Toaster/>
        </main>
      </div>
    </div>
  );
}

export default AddLeadList;
