import { defineStore }      from 'pinia';
import { initializeApp }    from 'firebase/app';
import { processRelayData } from './dataProcessor';
import {
    getDatabase
  , ref
  , query
  , orderByKey
  , limitToLast
  , get
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYbtDoGXb8l9f7dKxerUXqG-ceHP8XK20",
  authDomain: "smart-relay-a053d.firebaseapp.com",
  databaseURL: "https://smart-relay-a053d-default-rtdb.firebaseio.com",
  projectId: "smart-relay-a053d",
  storageBucket: "smart-relay-a053d.appspot.com",
  messagingSenderId: "113487106802",
  appId: "1:113487106802:web:56536bd445e92a61e6766b",
  measurementId: "G-E590QVSD00"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    relayData: JSON.parse(localStorage.getItem('relayData')) || null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRelayData(limit = 25) {
      this.loading = true;
      try {
        const dbRef = ref(database, 'rele004');
        const queryRef = query(dbRef, orderByKey(), limitToLast(limit));
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          this.relayData = Object.entries(snapshot.val()).map(([, value]) => ({ ...value }));
          localStorage.setItem('relayData', JSON.stringify(this.relayData));
        } else {
          console.log("Firebase: no data available");
          this.relayData = null;
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    getProcessedData() {
      if (this.relayData || JSON.parse(localStorage.getItem('relayData'))) {
        return processRelayData(this.relayData || JSON.parse(localStorage.getItem('relayData')));
      }
      return null;
    }
  },
});
