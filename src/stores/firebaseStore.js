import { defineStore } from 'pinia';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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

// initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Object.entries(snapshot.val()).map(([key, value]) => ({...value}));

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    relayData: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRelayData() {
      this.loading = true;
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'rele001'));
        if (snapshot.exists()) {
          // eslint-disable-next-line no-unused-vars
          this.relayData = Object.entries(snapshot.val()).map(([key, value]) => ({...value}));
        } else {
          alert('Nenhum dado disponível')
          console.log("No data available");
          this.relayData = null;
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
