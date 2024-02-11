import React from 'react'
import "../../css/style.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

import Card from "./Card"
import { getdriver_url } from "../../../urls";

import Chart from "./Chart"
const Dashboard = () => {
    return (
        <>
            <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3">
                        <h4>Health Care Solution</h4>
                    </div>
                    {/* 2 boxes */}


                    <Card />
               
                    <Chart />



                </div>
            </main>
        </>
    )
}

export default Dashboard
