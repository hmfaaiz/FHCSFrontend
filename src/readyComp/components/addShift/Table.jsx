

import React, { useState, useEffect } from 'react';
import { getshift_url } from '../../../urls';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CModal from '../shiftRegistrationForm/Modal';
import Dropdown from '../shiftRegistrationForm/Dropdown';

const Table = () => {
  const [openRegModal, setOpenRegModal] = useState(false);
  const [shiftData, setshiftData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(getshift_url,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("token")}`,
        },
    })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                setshiftData(res.data.data)
                console.log("Shift data",res)
            }
        })
        .catch((err) => {
            console.log("err",err);
            if (err.response.status === 409) {
                alert(err.response.data.message);
            } else if (err.response.status === 500) {
                alert(err.response.data.message);
            } else if (err.response.status === 400) {
                alert(err.response.data.message);
            } else if (err.response.status === 404) {
                alert(err.response.data.message);
            } else {
                console.log(err);
                alert("Something is wrong");
            }
        });

}, []);



  const filteredshiftData = shiftData.filter((shift) => {
    const searchableFields = [
      shift.shiftName,
      shift.shiftStartTime,
      shift.shiftEndTime,
      shift._id,
      shift.updatedAt,
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpen = () => {
    setOpenRegModal(true);
  };

  const handleClose = () => {
    setOpenRegModal(false);
  };

  return (
    <div className="card border-0">
      <div className="card-header">
        <span> <h5 className="card-title">shift Table</h5>
          <p className="card-title ">Current Record : {filteredshiftData.length}</p></span>
        <div className="d-flex align-items-center">
          <div className="container-fluid-left">
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </form>
          </div>
          <button
            type="button"
            className="btn btn-dark reg_btn ms-auto"
            onClick={handleOpen}
          >
            Add shift
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Shift Name</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Drivers</th>

              <th scope="col">Closing Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredshiftData) ? (
              filteredshiftData.map((shift, index) => (

                  <tr key={index}>
                    <td>{shift.shiftName ? shift.shiftName : "N/A"}</td>
                    <td>{shift.shiftStartTime ? shift.shiftStartTime : "N/A"}</td>
                    <td>{shift.shiftEndTime ? shift.shiftEndTime : "N/A"}</td>
                    <td>{shift.driverId.length ? shift.driverId.length : "N/A"}</td>

                    <td>{shift.updatedAt ? new Date(shift.updatedAt).toLocaleString() : "N/A"}</td>
                   

       

              
                  <span>
                    <Dropdown data={shift} />
                  </span>
                </tr>
              ))
            ) : (
              <p>Wait</p>
            )}
          </tbody>
        </table>
      </div>
      {openRegModal && <CModal handleClose={handleClose} openRegModal={openRegModal} />}
    </div>
  );
};

export default Table;
