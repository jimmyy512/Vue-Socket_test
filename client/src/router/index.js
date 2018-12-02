import App from '../App'

export default [
  {
    path: '/',
    component: App,
    redirect: '/chat'
  },
  {
    path: '',
    redirect: '/chat'
  },
  {
    path: '/hello',
    component: () => import('@/pages/Hello')
  },
  {
    path: '/chat',
    component:()=>import('@/pages/Chat')
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
