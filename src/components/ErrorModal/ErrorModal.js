import React from 'react'

const ErrorModal = ({errorMsg}) => {
  return (
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <h2>Error {errorMsg.cod}</h2> 
        <p>{errorMsg.message}.Please enter correct postal code or country name</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>window.location.reload()}></button>
    </div>
  )
}

export default ErrorModal