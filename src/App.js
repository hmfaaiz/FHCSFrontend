import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import AdminPanel from './readyComp/pages/AdminPanel';
import Login from './readyComp/pages/Login';
import Auth from "./Auth"
function App() {
  return (
    <>
{/*     
      <HashRouter> */}
   
        <Routes>
          <Route path="/" element={<Auth Component={Login} />} />
          <Route path="/adminpanel" element={<Auth Component={AdminPanel} />} />
           {/* <Route path="/" element={<Login/>}/>
          <Route path="/adminpanel" element={<AdminPanel/>} /> 
          <Route path="/modal" element={<CModal/>} /> */}
        </Routes>
  
      {/* </HashRouter> */}
    </>
  );
}

export default App;
