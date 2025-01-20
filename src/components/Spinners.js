import React from 'react'
import { ClipLoader } from 'react-spinners'

const Spinners = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader loading={true} size={50} color="#3498db" />
    </div>
  )
}

export default Spinners
