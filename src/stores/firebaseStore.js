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
  , onValue
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
    processData: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRelayData(limit = 25) {
      this.loading = true;
      try {
        const dbRef = ref(database, 'rele003');
        const queryRef = query(dbRef, orderByKey(), limitToLast(limit));
        onValue(queryRef, (snapshot) => {
          if (snapshot.exists()) {
            console.log('chamando firebase', snapshot.val());
            this.relayData = Object.entries(snapshot.val()).map(([, value]) => ({ ...value }));
            localStorage.setItem('relayData', JSON.stringify(this.relayData));
            this.getProcessedData();
          } else {
            console.log("Firebase: no data available");
            this.relayData = null;
          }
        });
      } catch (error) {
        console.error(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    getProcessedData() {
      if (this.relayData || JSON.parse(localStorage.getItem('relayData'))) {
        this.processData = processRelayData(this.relayData || JSON.parse(localStorage.getItem('relayData')));
        return this.processData;
      }
      return null;
    }
  },
});
