import React, { useState } from 'react'
import UModal from './UpdateModal';
import Cookies from "universal-cookie";
import axios from "axios";
import { delambulance_url } from "../../../urls"

const Dropdown = (props) => {
  const [openRegModal, setOpenRegModal] = useState(false);
  const cookies = new Cookies();
  const handleOpen = () => {
    setOpenRegModal(true);
  };
  const handleClose = () => {
    setOpenRegModal(false);
  };


  const Confirm = (e) => {
    e.preventDefault();
    console.log("props.data._id", props.data._id)
    if (
      props.data._id
    ) {
      axios.delete(`${delambulance_url}?ambulanceId=${props.data._id}`, {
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

  };

  return (
    <>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">

        </button>
        <ul className="dropdown-menu dropdown-menu-dark">

          <li><a onClick={handleOpen} className="dropdown-item" href="#">Update</a></li>
          <li><a className="dropdown-item" onClick={Confirm} href="#">Delete</a></li>
        </ul>
        {openRegModal && <UModal handleClose={handleClose} openRegModal={openRegModal} data={props.data} />}
      </div>
    </>
  )
}

export default Dropdown
