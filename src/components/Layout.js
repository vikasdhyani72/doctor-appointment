import React from 'react'
import { adminMenu, userMenu } from './../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome, FaList, FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa'
import { message } from 'antd'

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()
  const navigate = useNavigate()

  // Logout function
  const handleLogout = () => {
    localStorage.clear()
    message.success('Logout Successfully')
    navigate('/login')
  }

  // Doctor menu
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: <FaHome />,
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: <FaList />,
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: <FaUser />,
    },
  ]

  // Rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white p-6">
        <div className="logo mb-6">
          <h6 className="text-xl font-bold">DOC APP</h6>
          <hr className="my-2 border-gray-400" />
        </div>
        <div>
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path
            return (
              <div
                key={menu.name}
                className={`flex items-center gap-3 p-2 mb-3 rounded-lg cursor-pointer ${
                  isActive ? 'bg-purple-600' : 'hover:bg-purple-700'
                }`}
              >
                <div className="text-xl">{menu.icon}</div>
                <Link to={menu.path} className="text-lg">
                  {menu.name}
                </Link>
              </div>
            )
          })}
          <div
            className="flex items-center gap-3 p-2 mb-3 rounded-lg cursor-pointer hover:bg-purple-700"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-xl" />
            <span className="text-lg">Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="p-4 bg-blue-100 shadow-md flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="relative cursor-pointer"
              onClick={() => {
                navigate('/notification')
              }}
            >
              <FaBell className="text-2xl text-purple-700" />
              {user?.notification?.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5">
                  {user.notification.length}
                </span>
              )}
            </div>
            <Link
              to="/profile"
              className="text-xl font-semibold text-purple-700"
            >
              {user?.name}
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default Layout
