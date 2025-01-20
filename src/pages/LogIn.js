import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaDesktop,
} from 'react-icons/fa' // Importing icons
import backgroundImage from '../image/doc.jpg'

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false) // State for toggling password visibility
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      window.location.reload()
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        message.success('Login Successfully')
        navigate('/')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong')
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
          zIndex: -1,
        }}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
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
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Login to your Account
          </h3>

          {/* Email Input with Icon */}
          <Form.Item label="Email" name="email">
            <div className="relative">
              <Input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
          </Form.Item>

          {/* Password Input with Icon and Eye Icon for Visibility Toggle */}
          <Form.Item label="Password" name="password">
            <div className="relative">
              <Input
                type={passwordVisible ? 'text' : 'password'}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200 ease-in-out"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-purple-500" />
                ) : (
                  <FaEye className="text-purple-500" />
                )}
              </div>
            </div>
          </Form.Item>

          {/* Register Link */}
          <div className="flex justify-between items-center">
            <Link to="/register" className="text-lg text-purple-600  ">
              Not a user? Sign Up here
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-400 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Login
