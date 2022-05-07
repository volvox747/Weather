import React from 'react'

const ErrorModal = ({errorMsg}) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show p-5 my-3 w-75 text-center" role="alert">
        <h2 className='display-3'>Error {errorMsg.cod}</h2> 
        <p className='lead fs-3'>{errorMsg.message}</p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>window.location.reload()}></button>
    </div>

  )
}

export default ErrorModal