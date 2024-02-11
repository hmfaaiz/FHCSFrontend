

import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, M } from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from "axios";
import { getambulance_url } from "../../../urls"
import { assigntodriver_url } from "../../../urls"
import { unassigntodriver_url } from "../../../urls"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min';


const AmbulanceModal = (props) => {
    const [showModal, setShowModal] = useState(true);
    const cookies = new Cookies();
    const [ambulanceId, setambulanceId] = useState("");
    const [driverId, setdriverId] = useState(props.data._id);
    const [ambulanceData, setambulanceData] = useState([]);

    useEffect(() => {
        axios.post(getambulance_url, {}, {
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

    }, [driverId]);



    console.log("modal ambulance")
    const handleClose = () => {
        props.handleCloseAmbulance()
    };

    const Confirm = (e, id) => {
        e.preventDefault();

        const obj = {
            ambulanceId: id,
            driverId,

        };

        console.log(obj);

        if (
            obj.ambulanceId &&
            obj.driverId

        ) {
            axios.post(assigntodriver_url, obj, {
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
        props.handleCloseAmbulance()
    };


    const Unassign = (e, id) => {
        e.preventDefault();

        const obj = {
            ambulanceId: id,
            driverId,

        };

        console.log(obj);

        if (
            obj.ambulanceId &&
            obj.driverId

        ) {
            axios.put(unassigntodriver_url, obj, {
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
        props.handleCloseAmbulance()
    };

    return (


        <Modal size="xl" aria-labelledby="example-modal-sizes-title-lg" show={props.handleOpenAmbulance} onHide={handleClose} id="myModal" style={{ height: '100%', width: "100%" }}>
            <Modal.Header closeButton>
                <Modal.Title>Allocate Ambulance to Driver</Modal.Title>
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
                                        <th>Registration Number</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Number Plate</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Driver Id</th>
                                        <th scope="col">Closing Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(ambulanceData) ? (
                                        ambulanceData.map((ambulance, index) => (
                                            ambulance._id == props.data.ambulanceId ? (
                                                <tr key={index}>
                                                    <td>{ambulance.registrationNumber ? ambulance.registrationNumber : "N/A"}</td>
                                                    <td>{ambulance.brand ? ambulance.brand : "N/A"}</td>
                                                    <td>{ambulance.model ? ambulance.model : "N/A"}</td>
                                                    <td>{ambulance.numberPlate ? ambulance.numberPlate : "N/A"}</td>
                                                    <td>{ambulance.status ? ambulance.status : "N/A"}</td>
                                                    <td>{ambulance.driverId ? ambulance.driverId : "N/A"}</td>
                                                    <td>{ambulance.updatedAt ? new Date(ambulance.updatedAt).toLocaleString() : "N/A"}</td>
                                                    <td> <Button variant="primary" onClick={(e) => Unassign(e, ambulance._id)}>
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
                            <Modal.Title>Free</Modal.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Registration Number</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Number Plate</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Driver Id</th>
                                        <th scope="col">Closing Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(ambulanceData) ? (
                                        ambulanceData.map((ambulance, index) => (
                                            ambulance.status == "Free" ? (
                                                <tr key={index}>
                                                    <td>{ambulance.registrationNumber ? ambulance.registrationNumber : "N/A"}</td>
                                                    <td>{ambulance.brand ? ambulance.brand : "N/A"}</td>
                                                    <td>{ambulance.model ? ambulance.model : "N/A"}</td>
                                                    <td>{ambulance.numberPlate ? ambulance.numberPlate : "N/A"}</td>
                                                    <td>{ambulance.status ? ambulance.status : "N/A"}</td>
                                                    <td>{ambulance.driverId ? ambulance.driverId : "N/A"}</td>
                                                    <td>{ambulance.updatedAt ?  new Date(ambulance.updatedAt).toLocaleString() : "N/A"}</td>
                                                    <td> <Button variant="primary" onClick={(e) => Confirm(e, ambulance._id)}>
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

export default AmbulanceModal;
