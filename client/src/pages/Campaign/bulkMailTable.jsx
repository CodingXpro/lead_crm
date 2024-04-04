import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function BulkMailTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [checked, setChecked] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [value, setValue] = useState(null);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false); 
  const [filteredDropdownOptions, setFilteredDropdownOptions] = useState([]); 
  // useEffect(() => {
  //   const savedRightData = JSON.parse(localStorage.getItem("sakshi"));
  //   if (savedRightData) {
  //     setRightData(savedRightData);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("sakshi", JSON.stringify(rightData));
  // }, [rightData]);

  useEffect(() => {
    getData();
    getDataCompany();
  }, []);

  // Rest of your code remains unchanged...


  const handleInputChange = (event) => {
    const inputSearchTerm = event.target.value;
    setSearchTerm(inputSearchTerm); // Set the search term
    filterOptions(inputSearchTerm); // Filter dropdown options
    setShowCompanyDropdown(true); // Show dropdown when typing in input
  };

  const handleSelectOption = (companyname) => {
    setSearchTerm(companyname.company); // Set the selected company name to the search term
    setShowCompanyDropdown(false); // Hide dropdown after selection
  };
  const filterOptions = (searchTerm) => {
    const filteredOptions = companyData.filter((item) =>
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDropdownOptions(filteredOptions);
  };
  console.log("filteredDropdownOptions :", filteredDropdownOptions);
  const getDataCompany = async () => {
    try {
      const res = await axios.get("http://localhost:8000/campaign/company/get");
      console.log("response :", res);
      if (res && res.data) {
        setCompanyData(res.data);
        setFilteredDropdownOptions(res.data); // Set dropdown options initially
      } else {
        toast.error("No company data found.");
      }
    } catch (error) {
      toast.error("Error in getting company data", error.message);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/campaign/data/copytable/get"
      );
      console.log("response :", res);
      if (res && res.data) {
        setData(res.data);
      } else {
        toast.error("No copy data found.");
      }
    } catch (error) {
      toast.error("Error in getting copy data", error.message);
    }
  };

  const handleToggle = (value) => {
    if (checked.some((item) => item.id === value.id)) {
      setChecked(checked.filter((item) => item.id !== value.id));
    } else {
      setChecked([...checked, value]);
    }
  };

  const handleMoveToRight = () => {
    setRightData([...rightData, ...checked]);
    setData(
      data.filter(
        (item) => !checked.some((checkedItem) => checkedItem.id === item.id)
      )
    );
    setChecked([]);
  };

  const filteredData = data.filter((item) => {
    return (
      item.id.toString().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="w-full flex" style={{ marginTop: "20px" }}>
            <div
              className="container mx-2"
              style={{ width: "45%", marginTop: "20px", marginLeft: "10px" }}
            >
              <h1 className="text-2xl font-bold mb-4">Copied Data</h1>
              <div className="w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onClick={() => setShowCompanyDropdown((prev) => !prev)} // Show dropdown on click
                  className="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  style={{ marginBottom: "10px" }}
                  placeholder="Search..."
                />
                {showCompanyDropdown && (
                  <ul
                    className="mt-1 border border-gray-300 rounded bg-white shadow-md"
                    style={{
                      overflowY: "auto",
                      maxHeight: "200px",
                      maxWidth: "200px",
                    }}
                  >
                    {filteredDropdownOptions.map((companyname) => (
                      <li
                        key={companyname.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                        onClick={() => handleSelectOption(companyname)}
                      >
                        <span>{companyname.company}</span>
                        <span style={{ marginLeft: "10px" }}>
                          {companyname.emailCount}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={checked.length === filteredData.length}
                        onChange={() =>
                          setChecked(
                            checked.length === filteredData.length
                              ? []
                              : [...filteredData]
                          )
                        }
                      />
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Lead ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                  </tr>
                </thead>
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
                            type="checkbox"
                            checked={checked.some(
                              (checkedItem) => checkedItem.id === item.id
                            )}
                            onChange={() => handleToggle(item)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.company}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              className="flex justify-center items-center"
              style={{ marginLeft: "50px" }}
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMoveToRight}
              >
                &gt;
              </button>
            </div>
            <div
              className="container my-16 mx-4"
              style={{ width: "45%", marginLeft: "20px" }}
            >
              <table
                className="table-auto min-w-full divide-y  divide-gray-200"
                style={{ marginTop: "55px" }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-5 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Lead ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rightData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.company}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BulkMailTable;
