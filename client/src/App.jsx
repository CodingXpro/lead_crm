import React, { useEffect } from "react";
import AddLead from "./pages/Lead/addLead";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/signup";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/signin";
import AddLeadList from "./pages/Lead/addLeadList";
import AddUser from "./pages/User/addUser";
import AddUserList from "./pages/User/userList";
import AddBulkLead from "./pages/Lead/bulkLeadAdd";
import AddKeyword from "./pages/Keyword/addKeyword";
import AddIndustry from "./pages/Industry/addIndustry";
import AddKeywordList from "./pages/Keyword/keywordList";
import AddIndustryList from "./pages/Industry/industryList";
import AddCampaign from "./pages/Campaign/addCampaign";
import AddCampaignList from "./pages/Campaign/campaignList";
import AddRole from "./pages/Role/addRole";
import AddRoleList from "./pages/Role/roleList";

import TableExample1 from "./pages/Role/table";
import BulkMailTable from "./pages/Campaign/bulkMailTable";
import BulkMailTable1 from "./pages/Campaign/example";

// import Master from './partials/Master';
function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/addlead" element={<AddLead />} />
        <Route exact path="/addleadlist" element={<AddLeadList />} />
        <Route exact path="/adduser" element={<AddUser />} />
        <Route exact path="/adduserlist" element={<AddUserList />} />
        <Route exact path="/addbulklead" element={<AddBulkLead />} />
        <Route exact path="/addkeyword" element={<AddKeyword />} />
        <Route exact path="/addindustry" element={<AddIndustry />} />
        <Route exact path="/addkeywordlist" element={<AddKeywordList />} />
        <Route exact path="/addindustrylist" element={<AddIndustryList />} />
        <Route exact path="/addcampaign" element={<AddCampaign />} />
        <Route exact path="/addcampaignlist" element={<AddCampaignList />} />
        <Route exact path="/addrole" element={<AddRole />} />
        <Route exact path="/addrolelist" element={<AddRoleList />} />
        <Route exact path="/table" element={<TableExample1 />} />
        <Route exact path="/bulkmail/data" element={<BulkMailTable/>} />
        <Route exact path="/bulkmail/data1" element={<BulkMailTable1/>} />
      </Routes>
    </>
  );
}

export default App;
