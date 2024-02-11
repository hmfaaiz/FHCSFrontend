

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from "axios";
import {registerdriver_url} from "../../../urls"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min';

const CModal = (props) => {
  const [showModal, setShowModal] = useState(true);
  const cookies = new Cookies();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [driverNumber, setdriverNumber] = useState("");




console.log("modal",props.data)
  const handleClose1 = () => {
    props.handleClose()
  };

  const Confirm = (e) => {
    e.preventDefault();

    const obj = {
      firstName,
      lastName,
      mobileNumber,
      address,
      email,
      postalCode,
      driverNumber,
    };

    console.log(obj);

    if (
      obj.firstName &&
      obj.lastName &&
      obj.mobileNumber &&
      obj.address &&
      obj.email &&
      obj.postalCode &&
      obj.driverNumber
    ) {
      axios.post(registerdriver_url, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert(res.data.message);
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
    }else{
        alert("Fill all data")
    }
    props.handleClose()
  };

  return (
    <Modal show={props.openRegModal} onHide={handleClose1} id="myModal" style={{ height: '100%' }}>
      <Modal.Header closeButton>
        <Modal.Title>Registration Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <section className="container">
          <form action="#" className="form">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input value = {firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="form-control" id="firstName" placeholder="Enter first name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input value={lastName}  onChange={(e)=>setlastName(e.target.value)} type="text" className="form-control" id="lastName" placeholder="Enter last name" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input value={email}  onChange={(e)=>setemail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter email address" required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input value={address}  onChange={(e)=>setaddress(e.target.value)} type="address" className="form-control" id="address" placeholder="Enter address" required />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input value={mobileNumber}  onChange={(e)=>setmobileNumber(e.target.value)} type="tel" className="form-control" id="phoneNumber" placeholder="Enter phone number" required />
              </div>
              {/* <div className="col-md-6">
                <label htmlFor="birthDate" className="form-label">Birth Date</label>
                <input type="date" className="form-control" id="birthDate" placeholder="Enter birth date" required />
              </div> */}
            </div>

            {/* <div className="mb-3">
              <h3>Gender</h3>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="checkMale" name="gender" defaultChecked />
                <label className="form-check-label" htmlFor="checkMale">Male</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="checkFemale" name="gender" />
                <label className="form-check-label" htmlFor="checkFemale">Female</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="checkOther" name="gender" />
                <label className="form-check-label" htmlFor="checkOther">Prefer not to say</label>
              </div>
            </div> */}

        
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">City</label>
                <select className="form-select" id="country" required>
                  <option value="" hidden>Select City</option>
                  <option value="America">Karachi</option>
                  <option value="Japan">Islamabad</option>
                  <option value="India">Lahore</option>
                  <option value="Nepal">Quetta</option>
                </select>
              </div>
             
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="region" className="form-label">Region</label>
                <input type="text" className="form-control" id="region" placeholder="Enter your region" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input value={postalCode}  onChange={(e)=>setpostalCode(e.target.value)}type="number" className="form-control" id="postalCode" placeholder="Enter postal code" required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="driverNumber" className="form-label">Driver Number</label>
              <input value={driverNumber}  onChange={(e)=>setdriverNumber(e.target.value)} type="text" className="form-control" id="driverNumber" placeholder="Enter Driver Number" required />
            </div>
          
            <Button variant="primary" onClick={Confirm}>
              Submit
            </Button>
          </form>
        </section>
      </Modal.Body>
    </Modal>
    ); 
  };

  export default CModal;
