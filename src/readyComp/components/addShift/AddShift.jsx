import React from 'react'
import "../../css/style.css"
// import 'bootstrap/dist/css/bootstrap.min.css';


import Table from "./Table"

const AddShift = () => {
    console.log("addshift")
    return (
        <>
            <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3">
                        <h4>AddShift</h4>
                    </div>
                    {/* 2 boxes */}


              
                    <Table />
               



                </div>
            </main>
        </>
    )
}

export default AddShift
