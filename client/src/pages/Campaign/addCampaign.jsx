import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

function AddCampaign() {
  const [campaign_name, setCampaignName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [selected, setSelected] = useState("");
  const [selected1, setSelected1] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [keywordValue, setKeywordName] = useState([]);
  const [industryValue, setIndustryName] = useState([]);
  const [keyword_name, setKeywordValue] = useState("");
  const [industry_name, setIndustryValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/campaign/create", {
        campaign_name,
        industry_name: inputValue,
        keyword_name: inputValue1,
      });
      if (res) {
        toast.success("Campaign Created Successfully");
      } else {
        toast.error("Error in campaign creation");
      }
      setInputValue("");
      setInputValue1("");
      setCampaignName("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/industry/get");
        if (res.data && res.data.industry) {
          // console.log("res data industry :",res.data.industry)
          setIndustryName(res.data.industry);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/keyword/get");
        if (res.data && res.data.keywords) {
          setKeywordName(res.data.keywords);
        } else {
          console.error(
            "No keywords found or error occurred while fetching data."
          );
        }
      } catch (error) {
        console.error("Error in getting lead information", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="container mx-auto px-4 py-8 h-full">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b mx-10">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Campaign Information
                </h2>
                <p className="text-sm text-gray-500">
                  Please fill out the form below with your campaign information.
                </p>
              </div>
              <div className="form-container overflow-y-auto">
                <form className="p-4 mx-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-30">
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Campaign Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={campaign_name}
                        onChange={(e) => setCampaignName(e.target.value)}
                        id="first_name"
                        autoComplete="given-name"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {/* KEYWORD */}

                    <div
                      className="relative w-3/4"
                      style={{ marginRight: "12px" }}
                    >
                      <label
                        htmlFor="role"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Keyword Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={inputValue1}
                          onClick={() => setOpen(!open)}
                          placeholder="Select Keyword"
                          className={`bg-white w-full p-2 flex items-center justify-between rounded border-2 outline-none ${
                            !selected && "text-gray-700"
                          }`}
                        />
                        <BiChevronDown
                          size={20}
                          className={`${
                            open ? "rotate-180" : ""
                          } absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-700`}
                          onClick={() => setOpen(!open)}
                        />
                      </div>
                      <ul
                        className={`bg-white mt-2 overflow-y-auto ${
                          open ? "max-h-48" : "max-h-0"
                        } `}
                      >
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                          <AiOutlineSearch
                            size={18}
                            className="text-gray-700"
                          />
                          <input
                            type="text"
                            onChange={(e) => setKeywordValue(e.target.value)}
                            placeholder="Select Keyword"
                            className={`bg-white w-full p-2 flex items-center justify-between rounded border-2 outline-none ${
                              !selected && "text-gray-700"
                            }`}
                          />
                        </div>
                        {keywordValue?.map((country) => (
                          <li
                            key={country?.name}
                            className={`p-2 my-2 text-sm hover:bg-sky-600 hover:text-white
          ${
            country?.name?.toLowerCase() === selected?.toLowerCase() &&
            "bg-sky-600 text-white"
          }
          ${
            country?.name?.toLowerCase().startsWith(keyword_name)
              ? "block"
              : "hidden"
          }`}
                            onClick={() => {
                              if (
                                country?.name?.toLowerCase() !==
                                selected.toLowerCase()
                              ) {
                                setSelected(country?.name);
                                setInputValue1(country?.name); // Update input value with selected value
                                setOpen(false);
                              }
                            }}
                          >
                            {country?.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* INDUSTRY */}

                    <div
                      className="relative w-3/4"
                      style={{ marginRight: "12px" }}
                    >
                      <label
                        htmlFor="role"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Industry Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={inputValue}
                          onClick={() => setOpen1(!open1)}
                          placeholder="Select Industry"
                          className={`bg-white w-full p-2 flex items-center justify-between rounded border-2 outline-none ${
                            !selected && "text-gray-700"
                          }`}
                        />
                        <BiChevronDown
                          size={20}
                          className={`${
                            open1 ? "rotate-180" : ""
                          } absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-700`}
                          onClick={() => setOpen1(!open1)}
                        />
                      </div>
                      <ul
                        className={`bg-white mt-2 overflow-y-auto ${
                          open1 ? "max-h-48" : "max-h-0"
                        } `}
                      >
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                          <AiOutlineSearch
                            size={18}
                            className="text-gray-700"
                          />
                          <input
                            type="text"
                            value={industry_name}
                            onChange={(e) => setIndustryValue(e.target.value)}
                            placeholder="Search Industry"
                            className={`bg-white w-full p-2 flex items-center justify-between rounded border-2 outline-none ${
                              !selected1 && "text-gray-700"
                            }`}
                          />
                        </div>
                        {industryValue?.map((country) => (
                          <li
                            key={country?.name}
                            className={`p-2 my-2 text-sm hover:bg-sky-600 hover:text-white
          ${
            country?.name?.toLowerCase() === selected?.toLowerCase() &&
            "bg-sky-600 text-white"
          }
          ${
            country?.name?.toLowerCase().startsWith(industry_name)
              ? "block"
              : "hidden"
          }`}
                            onClick={() => {
                              if (
                                country?.name?.toLowerCase() !==
                                selected.toLowerCase()
                              ) {
                                setSelected1(country?.name);
                                setInputValue(country?.name); // Update input value with selected value
                                setOpen1(false);
                              }
                            }}
                          >
                            {country?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Campaign
                    </button>
                    <Toaster />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCampaign;
