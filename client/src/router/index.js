import App from '../App'

export default [
  {
    path: '/',
    component: App,
    redirect: '/hello'
  },
  {
    path: '',
    redirect: '/hello'
  },
  {
    path: '/hello',
    component: () => import('@/pages/Hello')
  },
  {
    path: '/test',
    component: () => import('@/pages/test')
  },
  {
    path: '/showtable',
    component:()=>import('@/pages/ShowTable')
  },
  {
    path: '/showeletable',
    component:()=>import('@/pages/ShowELETable')
  },
]
