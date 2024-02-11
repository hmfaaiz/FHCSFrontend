

import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, M } from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from "axios";
import { getshift_url } from "../../../urls"
import { assignshift_url } from "../../../urls"
import { unassignshift_url } from "../../../urls"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min';


const ShiftModal = (props) => {
   
    const [showModal, setShowModal] = useState(true);
    const cookies = new Cookies();
    const [shiftId, setshiftId] = useState("");
    const [driverId, setdriverId] = useState(props.data._id);
    const [shiftData, setshiftData] = useState([]);

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

    }, [driverId]);



    console.log("modal shift")
    const handleClose = () => {
        props.handleCloseShift()
    };

    const Confirm = (e, id) => {
        e.preventDefault();

        const obj = {
            shiftId: id,
            driverId,

        };

        console.log(obj);

        if (
            obj.shiftId &&
            obj.driverId

        ) {
            axios.put(assignshift_url, obj, {
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
                    console.log("err", err);
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
        props.handleCloseShift()
    };


    const Unassign = (e, id) => {
        e.preventDefault();

        const obj = {
            shiftId: id,
            driverId,

        };

        console.log("un assign obj",obj);

        if (
            obj.shiftId &&
            obj.driverId

        ) {
            axios.put(unassignshift_url, obj, {
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
                    console.log("err", err);
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
        props.handleCloseShift()
    };

    return (


        <Modal size="xl" aria-labelledby="example-modal-sizes-title-lg" show={showModal} onHide={props.handleCloseShift} id="myModal" style={{ height: '100%', width: "100%" }}>
            <Modal.Header closeButton>
                <Modal.Title>Allocate Shift to Driver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className="container ">
                    <form action="#" className="form">


                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="driver" className="form-label">Driver</label>
                                <input value={driverId} onChange={(e) => setdriverId(e.target.value)} data={props.data._id} type="text" className="form-control" id="driverId" disabled />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Modal.Title>Allocated</Modal.Title>
                            <Table striped bordered hover>
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
                                    {Array.isArray(shiftData) ? (
                                        shiftData.map((shift, index) => (
                                            props.data.shiftId && props.data.shiftId._id && (shift._id == props.data.shiftId._id) ? (
                                                <tr key={index}>
                                                    <td>{shift.shiftName ? shift.shiftName : "N/A"}</td>
                                                    <td>{shift.shiftStartTime ? shift.shiftStartTime : "N/A"}</td>
                                                    <td>{shift.shiftEndTime ? shift.shiftEndTime : "N/A"}</td>
                                                    <td>{shift.driverId.length ? shift.driverId.length : "N/A"}</td>
                                                
                                                    <td>{shift.updatedAt ? new Date(shift.updatedAt).toLocaleString() : "N/A"}</td>
                                                    <td> <Button variant="primary" onClick={(e) => Unassign(e, shift._id)}>
                                                        Unassign
                                                    </Button></td>

                                                </tr>

                                            ) : null

                                        ))
                                    ) : (
                                        <p>Wait</p>
                                    )}
                                </tbody>
                            </Table>
                            <Modal.Title>Available Shifts</Modal.Title>
                            <Table striped bordered hover>
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
                                    {Array.isArray(shiftData) ? (
                                        shiftData.map((shift, index) => (
                                            !props.data.shiftId ||  props.data.shiftId && props.data.shiftId._id && (shift._id ==! props.data.shiftId._id) ? (
                                                <tr key={index}>
                                                    <td>{shift.shiftName ? shift.shiftName : "N/A"}</td>
                                                    <td>{shift.shiftStartTime ? shift.shiftStartTime : "N/A"}</td>
                                                    <td>{shift.shiftEndTime ? shift.shiftEndTime : "N/A"}</td>
                                                    <td>{shift.driverId.length ? shift.driverId.length : "N/A"}</td>
                                                
                                                    <td>{shift.updatedAt ? new Date(shift.updatedAt).toLocaleString() : "N/A"}</td>
                                                    <td> <Button variant="primary" onClick={(e) => Confirm(e, shift._id)}>
                                                        Assign
                                                    </Button></td>

                                                </tr>

) : null

                                        ))
                                    ) : (
                                        <p>Wait</p>
                                    )}
                                </tbody>
                            </Table>
                        </div>


                    </form>
                </section>

            </Modal.Body>
        </Modal>
    );
};

export default ShiftModal;
