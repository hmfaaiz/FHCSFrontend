import React from 'react'

const Search = () => {
  return (
   
    <div className="container-fluid-left">
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-dark" type="submit">Search</button>
      </form>
    </div>
  
  )
}

export default Search
