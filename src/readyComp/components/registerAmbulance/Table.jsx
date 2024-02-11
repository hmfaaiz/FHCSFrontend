

import React, { useState, useEffect } from 'react';
import { getambulance_url } from '../../../urls';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CModal from '../ambulanceRegistrationForm/Modal';
import Dropdown from '../ambulanceRegistrationForm/Dropdown';

const Table = () => {
  const [openRegModal, setOpenRegModal] = useState(false);
  const [ambulanceData, setambulanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
            axios.post(getambulance_url,{}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setambulanceData(res.data.data)
                        console.log("Ambulance data", ambulanceData)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data.status);
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

   
  const filteredambulanceData = ambulanceData.filter((ambulance) => {
    const searchableFields = [
      ambulance.registrationNumber,
      ambulance.brand,
      ambulance.model,
      ambulance.numberPlate,
      ambulance.status,
      ambulance.updatedAt,
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
       <span> <h5 className="card-title">Ambulance Table</h5>
        <p className="card-title ">Current Record : {filteredambulanceData.length}</p></span>
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
            Register ambulance
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Registration Number</th>
              <th scope="col">Brand</th>
              <th scope="col">Name</th>
              <th scope="col">Number Plate</th>
              <th scope="col">Status</th>
              <th scope="col">Driver Id</th>
              <th scope="col">Closing Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredambulanceData) ? (
              filteredambulanceData.map((ambulance, index) => (
                <tr key={index}>
                  <td>{ambulance.registrationNumber? ambulance.registrationNumber:"N/A"}</td>
                  <td>{ambulance.brand?ambulance.brand:"N/A"}</td>
                  <td>{ambulance.model?ambulance.model:"N/A"}</td>
                  <td>{ambulance.numberPlate?ambulance.numberPlate:"N/A"}</td>
                  <td>{ambulance.status ? ambulance.status : "N/A"}</td>
                  <td>{ambulance.driverId ? ambulance.driverId : "N/A"}</td>
                  <td>{ambulance.updatedAt? new Date(ambulance.updatedAt).toLocaleString():"N/A"}</td>
                  <span>
                    <Dropdown data={ambulance} />
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
