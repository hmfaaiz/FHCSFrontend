import React,{useState,useEffect } from 'react'
import "../../css/style.css"
import customersupport from "../../image/customersupport.PNG"
import { getdriver_url } from "../../../urls";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Card = () => {
    const [driverData, setDriverData] = useState([])

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
        console.log("reg dri res");
        if (res.status === 200) {
            setDriverData(res.data)
            console.log("Driver data",driverData)
        }
      })
      .catch((err) => {
        console.log("err",err)
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

  return (

  <div className="row">
  <div className="col-12 col-md-6 d-flex">
                            <div className="card flex-fill border-0 illustration">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="p-3 m-1">
                                                <h4>Welcome Back, Admin</h4>
                                                <p className="mb-0">Admin Dashboard, FHCS</p>
                                            </div>
                                        </div>
                                        <div className="col-6 align-self-end text-end">
                                            <img src={customersupport} className="img-fluid illustration-img"
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex">
                            <div className="card flex-fill border-0">
                                <div className="card-body py-4">
                                    <div className="d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2">
                                                {driverData.totalDriver}
                                            </h4>
                                            <p className="mb-2">
                                                Total Driver
                                            </p>
                                            <div className="mb-0">
                                                {/* <span className="badge text-success me-2">
                                                    +9.0%
                                                </span> */}
                                                <span className="text-muted">
                                                    Since Last Month
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
  )
}

export default Card
