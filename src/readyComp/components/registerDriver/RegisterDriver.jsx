import React from 'react'
import "../../css/style.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

import Card from "./Card"
import Table from "./Table"
import Chart from "./Chart"
const RegisterDriver = () => {
    return (
        <>
            <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3">
                        <h4>Admin Register Driver</h4>
                    </div>
                    {/* 2 boxes */}


                    <Card />
                    <Table />
                    {/* <Chart /> */}



                </div>
            </main>
        </>
    )
}

export default RegisterDriver
