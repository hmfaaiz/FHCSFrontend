

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {updatedriver_url} from "../../../urls"
import Cookies from "universal-cookie";
import axios from "axios";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min';

const UModal = (props) => {
  const [showModal, setShowModal] = useState(true);
  const cookies = new Cookies();
console.log("modal",props.data)
  const handleClose1 = () => {
    props.handleClose()
  };

  const handleSaveChanges = () => {
    console.log('Changes saved.');
    setShowModal(false);
  };

  const [firstName, setFirstName] = useState(props.data.firstName);
  const [lastName, setlastName] = useState(props.data.lastName);
  const [mobileNumber, setmobileNumber] = useState(props.data.mobileNumber);
  const [address, setaddress] = useState(props.data.address);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(props.data.password);
  const [postalCode, setpostalCode] = useState(props.data.postalCode);
  const [driverNumber, setdriverNumber] = useState("");



  const Confirm = (e) => {
    e.preventDefault();

    const obj = {
      firstName,
      email,
      password
    };

    console.log(obj);

    if (
     obj
    ) {
      axios.put(`${updatedriver_url}?driverId=${props.data._id}`, obj, {
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
        <Modal.Title>Update Driver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <section className="container">
          <form action="#" className="form">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">Name</label>
              <input value = {firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="form-control" id="firstName" placeholder="Enter first name" required />
            </div>
       

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input value={email}  onChange={(e)=>setemail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter email address" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">password</label>
              <input value={password}  onChange={(e)=>setpassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Enter password" required />
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

  export default UModal;
