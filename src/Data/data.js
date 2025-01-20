import { FaHouseUser, FaList, FaUserMd, FaUser } from 'react-icons/fa'

export const userMenu = [
  {
    name: 'Home',
    path: '/',
    icon: FaHouseUser,
  },
  {
    name: 'Appointments',
    path: '/appointments',
    icon: FaList,
  },
  {
    name: 'Apply Doctor',
    path: '/apply-doctor',
    icon: FaUserMd,
  },
]

// admin menu
export const adminMenu = [
  {
    name: 'Home',
    path: '/',
    icon: FaHouseUser,
  },

  {
    name: 'Doctors',
    path: '/admin/doctors',
    icon: FaUserMd,
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: FaUser,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: FaUser,
  },
]
