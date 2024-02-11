

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from "axios";
import { addshift_url } from "../../../urls"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min';

const CModal = (props) => {
  const [showModal, setShowModal] = useState(true);
  const cookies = new Cookies();
  const [shiftName, setshiftName] = useState("");
  const [shiftStartTime, setshiftStartTime] = useState("");
  const [shiftEndTime, setshiftEndTime] = useState("");


  console.log("modal", props.data)
  const handleClose1 = () => {
    props.handleClose()
  };

  const Confirm = (e) => {
    e.preventDefault();

    const obj = {
      shiftName,
      shiftStartTime,
      shiftEndTime,
 
    };

    console.log(obj);

    if (
      obj.shiftName &&
      obj.shiftStartTime &&
      obj.shiftEndTime
   
    ) {
      axios.post(addshift_url, obj, {
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
    } else {
      alert("Fill all data")
    }
    props.handleClose()
  };

  return (
    <Modal show={props.openRegModal} onHide={handleClose1} id="myModal" style={{ height: '100%' }}>
      <Modal.Header closeButton>
        <Modal.Title>Add Shift</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="container">
          <form action="#" className="form">
            <div className="mb-3">
              <label htmlFor="shiftName" className="form-label">Shift Name</label>
              <input value={shiftName} onChange={(e) => setshiftName(e.target.value)} type="text" className="form-control" id="shiftName" placeholder="Enter Registration Number" required />
            </div>
            <div className="mb-3">
              <label htmlFor="shiftStartTime" className="form-label">Shift Start Time</label>
              <input value={shiftStartTime} onChange={(e) => setshiftStartTime(e.target.value)} type="text" className="form-control" id="shiftStartTime" placeholder="Enter shiftStartTime" required />
            </div>


           

            <div className="mb-3">
              <label htmlFor="shiftEndTime" className="form-label">Shift End Time</label>
              <input value={shiftEndTime} onChange={(e) => setshiftEndTime(e.target.value)} type="text" className="form-control" id="mpdel" placeholder="Enter shiftEndTime" required />


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
