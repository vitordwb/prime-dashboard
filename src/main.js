import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useFirebaseStore } from '@/stores/firebaseStore'

import './css/main.css'

// init pinia
const pinia = createPinia()

// create vue app
createApp(App).use(router).use(pinia).mount('#app')

// init main store
const mainStore = useMainStore(pinia)
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// init firebase store
const firebaseStore = useFirebaseStore(pinia)
firebaseStore.fetchRelayData()

const defaultDocumentTitle = 'prime'

router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${ to.meta.title } — ${ defaultDocumentTitle }`
    : defaultDocumentTitle
})
