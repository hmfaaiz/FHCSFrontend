

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {updateambulance_url} from "../../../urls"
import Cookies from "universal-cookie";
import axios from "axios";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

const UModal = (props) => {
  const [showModal, setShowModal] = useState(true);
  const cookies = new Cookies();

  const handleClose1 = () => {
    props.handleClose()
  };

  const handleSaveChanges = () => {
    console.log('Changes saved.');
    setShowModal(false);
  };
  
  const [registrationNumber, setregistrationNumber] = useState("");
  const [brand, setbrand] = useState(props.data.brand);
  const [model, setmodel] = useState(props.data.model);
  const [color, setcolor] = useState(props.data.color);
  const [numberPlate, setnumberPlate] = useState("");

  console.log("modal",registrationNumber,brand,model,color,numberPlate)

  const Confirm = (e) => {
    e.preventDefault();

    const obj = {
      registrationNumber,
      brand,
      model,
      color,
      numberPlate,
    };
    console.log(obj);

    if (
     obj
    ) {
      axios.put(`${updateambulance_url}?ambulanceId=${props.data._id}`, obj, {
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
        <Modal.Title>Update Ambulance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="container">
          <form action="#" className="form">
            <div className="mb-3">
              <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
              <input value={registrationNumber} onChange={(e) => setregistrationNumber(e.target.value)} type="text" className="form-control" id="registrationNumber" placeholder="Enter Registration Number" required />
            </div>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Brand</label>
              <input value={brand} onChange={(e) => setbrand(e.target.value)} type="text" className="form-control" id="brand" placeholder="Enter brand" required />
            </div>


            <div className="mb-3">
              <label htmlFor="color" className="form-label">Color</label>
              <input value={color} onChange={(e) => setcolor(e.target.value)} type="color" className="form-control" id="color" placeholder="Enter color" required />
            </div>


            <div className="mb-3">
              <label htmlFor="model" className="form-label">Name</label>
              <input value={model} onChange={(e) => setmodel(e.target.value)} type="text" className="form-control" id="mpdel" placeholder="Enter model" required />


            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">Number Plate</label>
              <input value={numberPlate} onChange={(e) => setnumberPlate(e.target.value)} type="text" className="form-control" id="numberPlate" placeholder="Enter number plate" required />


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
