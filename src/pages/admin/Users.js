import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import { Table, Button } from 'antd'

const Users = () => {
  const [users, setUsers] = useState([])

  // Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (res.data.success) {
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => (
        <span className="text-gray-800 font-medium">{text}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (
        <span
          className={`${
            record.isDoctor ? 'text-green-600' : 'text-red-600'
          } font-medium`}
        >
          {record.isDoctor ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            danger
            className="bg-red-600 text-white border-none hover:bg-red-500"
          >
            Block
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-center mb-4">Users List</h1>
      <div className="px-4">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          className="shadow-md rounded-lg"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Layout>
  )
}

export default Users
