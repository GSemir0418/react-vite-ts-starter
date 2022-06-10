import { lazy } from 'react'

const routes = [
  {
    path: '/home',
    exact: true,
    component: lazy(() => import('../views/Home')),
    name: 'Home',
  },
  {
    path: '/about',
    exact: true,
    component: lazy(() => import('../views/About')),
    name: 'About',
  },
]
export default routes
