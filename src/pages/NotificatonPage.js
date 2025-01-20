import React from 'react'
import Layout from './../components/Layout'
import { message, Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NotificationPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  // Handle mark all read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong')
    }
  }

  // Handle delete all read
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong with notifications')
    }
  }

  return (
    <Layout>
      <h4 className="text-center text-xl font-semibold p-3">Notifications</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="flex justify-end mb-4">
            <h4
              className="cursor-pointer text-blue-600 p-2"
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              key={notificationMsg._id}
              className="bg-white p-4 rounded-md shadow-md mb-4 cursor-pointer"
              onClick={() => navigate(notificationMsg.onClickPath)}
            >
              <p>{notificationMsg.message}</p>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end mb-4">
            <h4
              className="cursor-pointer text-red-600 p-2"
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seenNotification.map((notificationMsg) => (
            <div
              key={notificationMsg._id}
              className="bg-gray-100 p-4 rounded-md shadow-md mb-4 cursor-pointer"
              onClick={() => navigate(notificationMsg.onClickPath)}
            >
              <p>{notificationMsg.message}</p>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
