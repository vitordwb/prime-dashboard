import {
    mdiAccount
  , mdiCogOutline
  , mdiEmail
  , mdiLogout
  , mdiThemeLightDark
  , mdiGithub
} from '@mdi/js'

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'Meu Perfil',
        to: '/profile'
      },
      {
        icon: mdiCogOutline,
        label: 'Configuração'
      },
      {
        icon: mdiEmail,
        label: 'Mensagens'
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Sair',
        isLogout: true
      }
    ]
  },
  {
    icon: mdiThemeLightDark,
    label: 'Claro/Escuro',
    isDesktopNoLabel: true,
    isToggleLightDark: true
  },
  {
    icon: mdiGithub,
    label: 'GitHub',
    isDesktopNoLabel: true,
    href: 'https://github.com/vitordwb/prime-dashboard',
    target: '_blank'
  },
  {
    icon: mdiLogout,
    label: 'Sair',
    isDesktopNoLabel: true,
    isLogout: true
  }
]
