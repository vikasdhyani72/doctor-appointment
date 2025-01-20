import React from 'react'
import Layout from './../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa'

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())

      const res = await axios.post(
        '/api/v1/user/apply-doctor',
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.success)
        navigate('/')
      } else {
        message.error(res.data.success)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something Went Wrong')
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center my-6">Apply Doctor</h1>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="mx-6 flex flex-col justify-between min-h-screen"
      >
        <div className="flex-grow">
          <h4 className="text-lg font-medium">Personal Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Your first name"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Your last name"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<FaPhoneAlt className="text-xl text-gray-500" />}
                  placeholder="Your contact no"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<FaEnvelope className="text-xl text-gray-500" />}
                  placeholder="Your email address"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Website" name="website">
                <Input
                  prefix={<FaGlobe className="text-xl text-gray-500" />}
                  placeholder="Your website"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Your clinic address"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <h4 className="text-lg font-medium mt-6">Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Your specialization"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Your experience (years)"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Your consultation fee"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker
                  format="HH:mm"
                  className="p-3 border rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
