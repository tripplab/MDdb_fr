import Users from '@/components/users/Users'
import UserDetail from '@/components/users/UserDetail'
import UserCreate from '@/components/users/UserCreate'
import UserUpdate from '@/components/users/UserUpdate'

const usersRoutes = [
  { path: '/users', name: 'users', component: Users },
  { path: '/user/create', name: 'user_create', component: UserCreate },
  { path: '/user/update/:id', name: 'user_update', component: UserUpdate },
  { path: '/user/:id', name: 'user', component: UserDetail }
]

export default usersRoutes
