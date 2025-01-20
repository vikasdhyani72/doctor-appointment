import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DatePicker, message, TimePicker } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const BookingPage = () => {
  const { user } = useSelector((state) => state.user)
  const params = useParams()
  const [doctors, setDoctors] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState()
  const [isAvailable, setIsAvailable] = useState(false)
  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      if (res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAvailability = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/booking-availbility',
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      dispatch(hideLoading())
      if (res.data.success) {
        setIsAvailable(true)
        console.log(isAvailable)
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  const handleBooking = async () => {
    try {
      setIsAvailable(true)
      if (!date && !time) {
        return alert('Date & Time Required')
      }
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
    //eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <h3 className="text-center text-2xl font-bold mb-6">Book Now</h3>
      <div className="container mx-auto px-4">
        {doctors && (
          <div className="bg-gray-100 p-6 rounded-md shadow-md">
            <h4 className="text-lg font-semibold mb-2">
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4 className="text-md mb-2">
              Fees: ₹{doctors.feesPerConsultation}
            </h4>
            <h4 className="text-md mb-4">
              Timings:{' '}
              {doctors.timings &&
                `${doctors.timings[0]} - ${doctors.timings[1]}`}
            </h4>
            <div className="flex flex-col gap-4">
              <DatePicker
                className="w-full p-2 border rounded-md"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format('DD-MM-YYYY'))
                }}
              />
              <TimePicker
                className="w-full p-2 border rounded-md"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value).format('HH:mm'))
                }}
              />
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              <button
                className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default BookingPage
