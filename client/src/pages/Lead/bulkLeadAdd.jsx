import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AddBulkLead() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('http://localhost:8000/lead/upload', formData);
        console.log("res :",res);
      if(res.data.errors.length>0){
        toast.error("Please insert unique email in the file")
        return;
      }
      if (res) {
        toast.success("file uploaded Successfully");
      } else {
        toast.error("Error in file uploading");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const downloadSampleCSV = () => {
    try {
      const csvData = 'firstname,lastname,email,phone,password,job_title,company,country,region,company_size,role,Industry,Keyword';
      const blob = new Blob([csvData], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'sample.csv';
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='right-10'>
          <button onClick={downloadSampleCSV} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute top-20 mx-16 mt-5 right-9">
            Download Sample CSV
          </button>
        </div>
        <main>
          <div className="container mx-10 px-4 py-8 mt-20">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Upload Lead</h2>
                <p className="text-sm text-gray-500">Please upload the lead info file.</p>
              </div>
              <div className="form-container overflow-y-auto">
                <form className="p-4" onSubmit={handleSubmit}>
                  <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mt-4">
                    Upload
                  </button>
                  <Toaster/>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddBulkLead;
