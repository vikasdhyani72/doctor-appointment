import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaDesktop,
} from 'react-icons/fa'
import backgroundImage from '../image/doc.jpg'

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false) // state for toggling password visibility
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/register', values)
      dispatch(hideLoading())
      if (res.data.success) {
        message.success('Register Successfully!')
        navigate('/login')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something Went Wrong')
    }
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)', // Blur the background
          zIndex: -1, // Place it behind the form
        }}
      ></div>
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-purple-700 text-white flex items-center justify-center space-x-3 p-8 rounded-lg shadow-xl w-full max-w-md">
          {/* Header Section */}

          <FaDesktop className="text-3xl" />
          <h2 className="text-xl font-bold">Patient System</h2>
        </div>
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="space-y-6"
        >
          <h3 className="text-center text-2xl font-bold mb-6 text-gray-800">
            Sign Up to your Account
          </h3>

          {/* Name Field */}
          <Form.Item label="Name" name="name">
            <div className="flex items-center bg-gray-50 p-2 rounded-md shadow-sm">
              <FaUser className="mr-2 text-purple-600" /> {/* User Icon */}
              <Input
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </Form.Item>

          {/* Email Field */}
          <Form.Item label="Email" name="email">
            <div className="flex items-center bg-gray-50 p-2 rounded-md shadow-sm">
              <FaEnvelope className="mr-2 text-purple-600" />{' '}
              {/* Envelope Icon */}
              <Input
                type="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </Form.Item>

          {/* Password Field */}
          <Form.Item label="Password" name="password">
            <div className="flex items-center bg-gray-50 p-2 rounded-md shadow-sm">
              <FaLock className="mr-2 text-purple-600" /> {/* Lock Icon */}
              <Input
                type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {/* Eye Icon for Password visibility */}
              <div
                className="ml-2 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-purple-600" />
                ) : (
                  <FaEye className="text-purple-600" />
                )}
              </div>
            </div>
          </Form.Item>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <Link to="/login" className="text-blue-600 hover:underline text-sm">
              Already a user? Login here
            </Link>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register
