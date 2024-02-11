// import React, { useState, useEffect } from 'react'
// import { getdriver_url } from "../../../urls";
// import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";
// import "../../css/style.css"
// import CModal from '../registrationForm/Modal';
// import Dropdown from '../registrationForm/Dropdown';
// import Search from '../registrationForm/Search';
// import axios from "axios";
// const Table = () => {
//     const [openRegModal, setOpenRegModal] = useState(false);

//     const handleOpen = () => {
//         setOpenRegModal(true);
//     };
//     const handleClose = () => {
//         setOpenRegModal(false);
//     };

//     const [driverData, setDriverData] = useState([])

//     const cookies = new Cookies();
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get(getdriver_url, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${cookies.get("token")}`,
//             },
//         })
//             .then((res) => {
//                 console.log(res);
//                 if (res.status === 200) {
//                     setDriverData(res.data.data)
//                     console.log("Driver data", driverData)
//                 }
//             })
//             .catch((err) => {
//                 console.log(err.response.data.status);
//                 if (err.response.status === 409) {
//                     alert(err.response.data.message);
//                 } else if (err.response.status === 500) {
//                     alert(err.response.data.message);
//                 } else if (err.response.status === 400) {
//                     alert(err.response.data.message);
//                 } else if (err.response.status === 404) {
//                     alert(err.response.data.message);
//                 } else {
//                     console.log(err);
//                     alert("Something is wrong");
//                 }
//             });

//     }, []);

//     return (
//         <div className="card border-0">
//             <div className="card-header">
//                 <h5 className="card-title">
//                     Driver Table
//                 </h5>
//                 <div className="d-flex align-items-center">
//                     {/* <Search/> */}
//                     <div className="container-fluid-left">
//                         <form className="d-flex" role="search">
//                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button className="btn btn-outline-dark" type="submit">Search</button>
//                         </form>
//                     </div>
//                     <button type="button" class="btn btn-dark reg_btn ms-auto" onClick={handleOpen}>Register Driver</button>
//                 </div>


//             </div>
//             <div className="card-body">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">First Name</th>
//                             <th scope="col">Email</th>
//                             <th scope="col">Driver Number</th>
//                             <th scope="col">Mobile Number</th>
//                             <th scope="col">Shift</th>
//                             <th scope="col">Closing Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             Array.isArray(driverData) ? (
//                                 driverData.map((driver, index) => (
//                                     <tr key={index}>

//                                         <td>{driver.firstName}</td>
//                                         <td>{driver.email}</td>
//                                         <td>{driver.driverNumber}</td>
//                                         <td>{driver.mobileNumber}</td>
//                                         <td>{driver.shiftId.shiftName}</td>
//                                         <td>{driver.updatedAt}</td>
//                                         <span>
//                                             <Dropdown data={driver} />
//                                         </span>
//                                     </tr>
//                                 ))

//                             ) : (
//                                 <p>Wait</p>
//                             )
//                         }


//                     </tbody>
//                 </table>
//             </div>
//             {openRegModal && <CModal handleClose={handleClose} openRegModal={openRegModal} />}

//         </div>
//     )
// }

// export default Table




import React, { useState, useEffect } from 'react';
import { getdriver_url } from '../../../urls';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CModal from '../driverRegistrationForm/Modal';
import Dropdown from '../driverRegistrationForm/Dropdown';

const Table = () => {
  const [openRegModal, setOpenRegModal] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
            axios.get(getdriver_url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setDriverData(res.data.data)
                        console.log("Driver data", driverData)
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

   
  const filteredDriverData = driverData.filter((driver) => {
    const searchableFields = [
      driver.firstName,
      driver.email,
      driver.driverNumber,
      driver.mobileNumber,
    //   driver.shiftId.shiftName,
      driver.updatedAt,
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
       <span> <h5 className="card-title">Driver Table</h5>
        <p className="card-title ">Current Record : {filteredDriverData.length}</p></span>
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
            Register Driver
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Email</th>
              <th scope="col">Driver Number</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Allocated Ambulance</th>
              <th scope="col">Shift</th>
              <th scope="col">Closing Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredDriverData) ? (
              filteredDriverData.map((driver, index) => (
                <tr key={index}>
                  <td>{driver.firstName? driver.firstName:"N/A"}</td>
                  <td>{driver.email?driver.email:"N/A"}</td>
                  <td>{driver.driverNumber?driver.driverNumber:"N/A"}</td>
                  <td>{driver.mobileNumber?driver.mobileNumber:"N/A"}</td>
                  <td>{driver.ambulanceId?driver.ambulanceId:"N/A"}</td>
                  <td>{driver.shiftId ? driver.shiftId.shiftName : "N/A"}</td>
                  <td>{driver.updatedAt? new Date(driver.updatedAt).toLocaleString():"N/A"}</td>
                  <span>
                    <Dropdown data={driver} />
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
