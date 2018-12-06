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
    path: '/chat',
    component:()=>import('@/pages/Chat')
  },
]
