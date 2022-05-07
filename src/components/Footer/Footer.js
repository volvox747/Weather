import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-dark p-5'>
      <div className='container'>
      <div className='row'>
        <div className='col text-center text-white'>
          <p className="lead"> Copyright &copy; {new Date().getFullYear()} Weather Report</p>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer