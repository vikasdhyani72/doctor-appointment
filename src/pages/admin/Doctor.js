import React, { useState, useEffect } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import { message, Table } from 'antd'
import { FaCheck, FaTimes } from 'react-icons/fa'

const Doctor = () => {
  const [doctors, setDoctors] = useState([])

  // Get all doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Handle account status change
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/changeAccountStatus',
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.data.success) {
        message.success(res.data.message)
        window.location.reload()
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span className="text-gray-800 font-medium">
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === 'approved'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (phone) => <span className="text-gray-600">{phone}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="flex space-x-4">
          {record.status === 'pending' ? (
            <button
              className="flex items-center space-x-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
              onClick={() => handleAccountStatus(record, 'approved')}
            >
              <FaCheck />
              <span>Approve</span>
            </button>
          ) : (
            <button
              className="flex items-center space-x-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
              onClick={() => handleAccountStatus(record, 'rejected')}
            >
              <FaTimes />
              <span>Reject</span>
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <Layout>
      <h1 className="text-center text-2xl font-bold my-4 text-gray-800">
        All Doctors
      </h1>
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey={(record) => record._id}
        className="shadow-md bg-white rounded-lg"
      />
    </Layout>
  )
}

export default Doctor
