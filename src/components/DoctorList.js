import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 m-2 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="border-b pb-2 mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Dr. {doctor.firstName} {doctor.lastName}
        </h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Specialization:</span>{' '}
          {doctor.specialization}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Experience:</span>{' '}
          {doctor.experience} years
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">
            Fees Per Consultation:
          </span>{' '}
          ₹{doctor.feesPerConsultation}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Timings:</span>{' '}
          {doctor.timings[0]} - {doctor.timings[1]}
        </p>
      </div>
    </div>
  )
}

export default DoctorList
