import React from 'react'

const ErrorToast = ({errorMsg,onCloseHandler}) => {
    setTimeout(() => {
        onCloseHandler();
    }, 5000);
  return (
<div className=" position-fixed bottom-0 end-0 p-3" style={{zIndex:1140}}>
   <div className="bg-danger toast d-block align-items-center" role="alert">
        <div className="d-flex text-white">
                <div className="toast-body">
                    <span className='lead text-capitalize'>
                        Error {errorMsg.cod}! {errorMsg.message}.
                    </span>
                </div>
                <button type="button" className="btn-close me-2 m-auto" onClick={onCloseHandler}></button>
        </div>
    </div>  
</div>
  )
}

export default ErrorToast