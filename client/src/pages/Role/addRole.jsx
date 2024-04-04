import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AddRole() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name,setName]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:8000/role/create',{name});
        if (res ) {
          
            toast.success("Role Created Successfully");
            // navigate('/login');
            setName("");
        } else {
            toast.error("Error in role creation");
        }
    } catch (error) {
       
        toast.error("Something Went Wrong");
    }
  }

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
          <h2 className="text-2xl font-semibold text-gray-800">Add Role</h2>
          
        </div>
        <div className="form-container overflow-y-auto" >

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          
         
            <div className="mb-4">
              <label htmlFor="email_address" className="block text-gray-700 text-sm font-bold mb-2">Role Name</label>
              <input type="text" name="keyword" value={name} onChange={(e) => setName(e.target.value)}  id="keyword" autoComplete="email" className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"/>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Role</button>
            <Toaster/>
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

export default AddRole;