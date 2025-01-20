import React, { useState, useEffect } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { message, Table, Button } from 'antd'

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/doctor/doctor-appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (res.data.success) {
        setAppointments(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/update-status',
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.data.success) {
        message.success(res.data.message)
        getAppointments()
      }
    } catch (error) {
      console.log(error)
      message.error('Something Went Wrong')
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      render: (text) => (
        <span className="text-gray-800 font-medium">{text}</span>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span className="text-gray-600">
          {moment(record.date).format('DD-MM-YYYY')} &nbsp;
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <span
          className={`${
            text === 'pending'
              ? 'text-yellow-600'
              : text === 'approved'
              ? 'text-green-600'
              : 'text-red-600'
          } font-medium`}
        >
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="flex gap-2">
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                className="bg-green-500 hover:bg-green-600 border-none"
                onClick={() => handleStatus(record, 'approved')}
              >
                Approve
              </Button>
              <Button
                danger
                className="bg-red-500 hover:bg-red-600 border-none"
                onClick={() => handleStatus(record, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-center mb-4">
        Appointments List
      </h1>
      <div className="px-4">
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="_id"
          className="shadow-md rounded-lg"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Layout>
  )
}

export default DoctorAppointments
