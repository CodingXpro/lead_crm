import React, { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AddUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyID, setCompanyID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/register", {
        companyID,
        name,
        email,
        password,
        phone,
        designation,
        role,
      });
      console.log("response", res);
      if (res) {
        toast.success("User Created Successfully");

        setCompanyID("");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setDesignation("");
        setRole("");

        // navigate('/login');
      } else {
        toast.error("Error in user creation");
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
              <div className="p-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">
                  User Information
                </h2>
                <p className="text-sm text-gray-500">
                  Please fill out the form below with your user information.
                </p>
              </div>
              <div className="form-container overflow-y-auto">
                <form className="p-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Company ID
                      </label>
                      <input
                        type="number"
                        name="companyID"
                        onChange={(e) => {
                          setCompanyID(e.target.value);
                        }}
                        value={companyID}
                        id="companyID"
                        autoComplete="given-id"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        id="name"
                        value={name}
                        autoComplete="given-name"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
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
                        name="email"
                        id="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        autoComplete="email"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email_address"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        id="password"
                        autoComplete="password"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        autoComplete="phone"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        value={role}
                        autoComplete="role"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Select a role...</option>
                        <option value="digital marketer">
                          digital marketer
                        </option>
                        <option value="sales">sales</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add User
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

export default AddUser;
