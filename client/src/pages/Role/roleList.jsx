import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { useMemo, Fragment, useCallback } from "react";
import {toast} from 'react-hot-toast';
import {
  FaSearch,
  FaChevronDown,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { Listbox, Transition } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';



const getAllleadData = async () => {
  let output = null; // Declare output variable outside the try block
  try {
    const res = await axios.get('http://localhost:8000/user/count');
   
    output = res.data; 
  } catch (error) {
    console.error("Error in getting lead information", error);
  }
  return output; // Return the output value
}


const output1=await getAllleadData();


const leadsvalue=output1.user;


const generateData = (numberOfRows = 25, tableNavigate) =>
  leadsvalue.map((roleuser) => ({
    id: roleuser.id,
    name: roleuser.name,
    TotalUsers: roleuser.count,
    permissionButton: (
      <button
        style={{
          backgroundColor: "#6e5cb3",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => tableNavigate(roleuser.id)} // Pass roleuser id to navigate function
      >
        Permission
      </button>
    ),
  }));
const getColumns = () => [
  {
    Header: "Role ID",
    accessor: "id"
  },
  {
    Header: "Name",
    accessor: "name"
    // Cell: ({ value }) => value,
  },
  {
    Header: "TOTAL USERS",
    accessor: "TotalUsers"
    // Cell: ({ value }) => value,
  },
  {
    Header: "Permission",
    accessor: "permissionButton",
    disableSortBy: true // This will prevent sorting on this column
}
  
];

function InputGroup7({
  label,
  name,
  value,
  onChange,
  type = "text",
  decoration,
  className = "",
  inputClassName = "",
  decorationClassName = "",
  disabled,
}) {
  return (
    <div className={`flex items-stretch ${className}`}>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={label}
        aria-label={label}
        onChange={onChange}
        className={`block w-full p-3 text-gray-600 focus:outline-none focus:ring-0 appearance-none ${
          disabled ? "bg-gray-200" : ""
        } ${inputClassName} border border-gray-300 rounded-md`} // Added border styles
        disabled={disabled}
      />
      <div
        className={`flex items-center p-3 text-gray-600 ${
          disabled ? "bg-gray-200" : ""
        } ${decorationClassName}`}
      >
        {decoration}
      </div>
    </div>
  );
}

function GlobalSearchFilter1({
  globalFilter,
  setGlobalFilter,
  className = "",
}) {
  return (
    <InputGroup7
      name="search"
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      label="Search"
      decoration={<FaSearch size="1rem" className="text-gray-400" />}
      className={className}
    />
  );
}

function SelectMenu1({ value, setValue, options, className = "", disabled }) {
  const selectedOption = useMemo(
    () => options.find((o) => o.id === value),
    [options, value]
  );
  return (
    <Listbox value={value} onChange={setValue} disabled={disabled}>
      <div className={`relative ${className}`}>
        <Listbox.Button
          className={`relative w-full rounded-xl py-3 pl-3 pr-10 text-base text-gray-700 text-left shadow-sm focus:outline-none ${
            disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
          }`}
        >
          <span className="block truncate">{selectedOption.caption}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown
              size="0.80rem"
              className="text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-sm focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-3 pl-10 pr-4 ${
                    active ? "bg-red-100" : ""
                  }`
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.caption}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-400">
                        <FaCheck size="0.5rem" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function Button2({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex items-center justify-center w-9 h-9 shadow-sm text-sm font-normal transition-colors rounded-lg ${
        active ? "bg-red-500 text-white" : "text-red-500 bg-white"
      } ${
        !disabled
          ? "hover:bg-red-500 hover:text-white"
          : "text-red-300 cursor-not-allowed bg-white"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

function PaginationNav1({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);
  return (
    <ul className="flex space-x-2">
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
}

function TableComponent({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
}) {
  return (
    <div className="w-full min-w-[30rem] bg-white rounded-xl shadow-sm">
      <table {...getTableProps()} className="w-full">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 py-2 text-xs font-light uppercase cursor-pointer text-gray-600"
                  style={{ width: column.width }}
                >
                  <div className="flex items-center">
                    <div className="mr-2">{column.render("Header")}</div>
                    <div className="flex flex-col">
                      <FaSortUp
                        className={`text-xs ${
                          column.isSorted && !column.isSortedDesc
                            ? "text-red-400"
                            : "text-gray-300"
                        }`}
                      />
                      <FaSortDown
                        className={`text-xs ${
                          column.isSortedDesc
                            ? "text-red-400"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`${i % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Table1() {
  const data = useMemo(() => generateData(100), []);
  const columns = useMemo(getColumns, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page: rows,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <GlobalSearchFilter1
          className="sm:w-64"
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <SelectMenu1
          className="sm:w-44"
          value={pageSize}
          setValue={setPageSize}
          options={[
            { id: 5, caption: "5 items per page" },
            { id: 10, caption: "10 items per page" },
            { id: 20, caption: "20 items per page" },
          ]}
        />
      </div>
      <TableComponent
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
      <div className="flex justify-center">
        <PaginationNav1
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
    </div>
  );
}

export function Table1Presentation() {
    return (
      <div className="flex flex-col overflow-auto py-4 sm:py-0 w-full">
        <div className="overflow-x-auto">
          <Table1 />
        </div>
      </div>
    );
  }
  

function AddRoleList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
            {/* <div className="flex flex-col overflow-auto py-4 sm:py-0  w-2/3 items-center justify-items-center">
            <Table1Presentation />
      </div> */}
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col overflow-auto py-4 sm:py-0  w-full mx-10 items-center justify-items-center">
          <Table1Presentation />
        </div>
      </div>
        </main>
      </div>
     
    </div>
  );
}


export default AddRoleList;
