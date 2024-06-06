import {
  mdiAccountCircle,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiPalette,
  mdiMonitor,
  mdiGithub,
  mdiChartBar,
  mdiQrcode
} from '@mdi/js'

export default [
  {
    to: '/',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/charts',
    label: 'Charts',
    icon: mdiChartBar
  },
  {
    to:'/qrcode',
    label: 'QR Code',
    icon: mdiQrcode,
  },
  {
    href: 'https://github.com/vitordwb/prime-dashboard',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank'
  },
  {
    to: '/perfil',
    label: 'Perfil',
    icon: mdiAccountCircle
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock
  },
  {
    to: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide
  },
  {
    to: '/error',
    label: 'Error',
    icon: mdiAlertCircle
  },
]
