import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function AddLead() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job_title, setJobtitle] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [company_size, setCompanysize] = useState("");
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [industry, setIndusrty] = useState("");
  const [keyword, setKeyword] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/lead/create", {
        firstname,
        lastname,
        email,
        password,
        phone,
        job_title,
        company,
        country,
        region,
        company_size,
        role,
        industry,
        keyword,
      });

      if (res) {
        toast.success("Lead Created Successfully");
        // navigate('/login');
      } else {
        toast.error("Error in lead creation");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b mx-10">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Lead Information
                </h2>
                <p className="text-sm text-gray-500">
                  Please fill out the form below with your lead information.
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
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        id="first_name"
                        autoComplete="given-name"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        autoComplete="family-name"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email_address"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        name="email_address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email_address"
                        autoComplete="email"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        autoComplete="password"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="phone"
                        autoComplete="phone"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="job_title"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="job_title"
                        value={job_title}
                        onChange={(e) => setJobtitle(e.target.value)}
                        id="job_title"
                        autoComplete="job_title"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="company"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        id="company"
                        autoComplete="company"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="companysize"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Company Size
                      </label>
                      <input
                        type="text"
                        name="companysize"
                        value={company_size}
                        onChange={(e) => setCompanysize(e.target.value)}
                        id="company"
                        autoComplete="company"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="country"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        id="country"
                        autoComplete="company"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Region"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Region
                      </label>
                      <input
                        type="text"
                        name="Region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        id="Region"
                        autoComplete="Region"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Industry"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Industry
                      </label>
                      <input
                        type="text"
                        name="Industry"
                        value={industry}
                        onChange={(e) => setIndusrty(e.target.value)}
                        id="Industry"
                        autoComplete="Industry"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Keyword"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Keyword
                      </label>
                      <input
                        type="text"
                        name="Keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        id="Keyword"
                        autoComplete="Keyword"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        name="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        id="Keyword"
                        autoComplete="Keyword"
                        className="w-3/4 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Lead
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

export default AddLead;
