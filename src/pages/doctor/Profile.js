import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/features/alertSlice'
import moment from 'moment'

const Profile = () => {
  const { user } = useSelector((state) => state.user)
  const [doctor, setDoctor] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/doctor/updateProfile',
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format('HH:mm'),
            moment(values.timings[1]).format('HH:mm'),
          ],
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
        navigate('/')
      } else {
        message.error(res.data.message || 'Update failed')
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error(error)
      message.error('Something went wrong')
    }
  }

  // Fetch doctor details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorInfo',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.data.success) {
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDoctorInfo()
    //eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="bg-white p-6 shadow-md rounded-md"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], 'HH:mm'),
              moment(doctor.timings[1], 'HH:mm'),
            ],
          }}
        >
          <h4 className="text-lg font-semibold mb-4">Personal Details:</h4>
          <Row gutter={20}>
            {[
              {
                label: 'First Name',
                name: 'firstName',
                placeholder: 'Your first name',
              },
              {
                label: 'Last Name',
                name: 'lastName',
                placeholder: 'Your last name',
              },
              {
                label: 'Phone No',
                name: 'phone',
                placeholder: 'Your contact no',
              },
              {
                label: 'Email',
                name: 'email',
                placeholder: 'Your email address',
              },
              {
                label: 'Website',
                name: 'website',
                placeholder: 'Your website',
              },
              {
                label: 'Address',
                name: 'address',
                placeholder: 'Your clinic address',
              },
            ].map((field, idx) => (
              <Col xs={24} md={12} lg={8} key={idx}>
                <Form.Item
                  label={field.label}
                  name={field.name}
                  required
                  rules={[
                    {
                      required: true,
                      message: `Please enter ${field.label.toLowerCase()}`,
                    },
                  ]}
                >
                  <Input type="text" placeholder={field.placeholder} />
                </Form.Item>
              </Col>
            ))}
          </Row>
          <h4 className="text-lg font-semibold mb-4">Professional Details:</h4>
          <Row gutter={20}>
            {[
              {
                label: 'Specialization',
                name: 'specialization',
                placeholder: 'Your specialization',
              },
              {
                label: 'Experience',
                name: 'experience',
                placeholder: 'Your experience',
              },
              {
                label: 'Fees Per Consultation',
                name: 'feesPerConsultation',
                placeholder: 'Your fees',
              },
            ].map((field, idx) => (
              <Col xs={24} md={12} lg={8} key={idx}>
                <Form.Item
                  label={field.label}
                  name={field.name}
                  required
                  rules={[
                    {
                      required: true,
                      message: `Please enter ${field.label.toLowerCase()}`,
                    },
                  ]}
                >
                  <Input type="text" placeholder={field.placeholder} />
                </Form.Item>
              </Col>
            ))}
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true, message: 'Please select timings' }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} className="flex justify-end mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  )
}

export default Profile
