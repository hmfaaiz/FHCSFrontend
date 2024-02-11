import React, { useState } from 'react'
import UModal from './UpdateModal';
import Cookies from "universal-cookie";
import axios from "axios";


const Dropdown = (props) => {
  const [openRegModal, setOpenRegModal] = useState(false);
  const cookies = new Cookies();
  const handleOpen = () => {
    setOpenRegModal(true);
  };
  const handleClose = () => {
    setOpenRegModal(false);
  };



  return (
    <>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">

        </button>
        <ul className="dropdown-menu dropdown-menu-dark">

          <li><a onClick={handleOpen} className="dropdown-item" href="#">Update</a></li>
        
        </ul>
        {openRegModal && <UModal handleClose={handleClose} openRegModal={openRegModal} data={props.data} />}
      </div>
    </>
  )
}

export default Dropdown
