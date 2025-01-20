import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'

const HomePage = () => {
  const [doctors, setDoctors] = useState([])
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        '/api/v1/user/getAllDoctors',

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

  useEffect(() => {
    getUserData()
  }, [])
  return (
    <Layout>
      <div className="relative z-10 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Doctor Directory
        </h1>
        <Row gutter={[16, 16]}>
          {doctors &&
            doctors.map((doctor) => (
              <DoctorList key={doctor._id} doctor={doctor} />
            ))}
        </Row>
      </div>
    </Layout>
  )
}

export default HomePage
