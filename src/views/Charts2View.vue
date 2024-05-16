<template>
  <LayoutAuthenticated>
    <div>
      <h1>Dados do Firebase</h1>
      <div v-if="loading">Carregando...</div>
      <div v-if="error">{{ error.message }}</div>
      <div v-if="relayData">
        <pre>{{ relayData }}</pre>
      </div>
    </div>
  </LayoutAuthenticated>
</template>

<script>
import { useFirebaseStore } from '@/stores/firebaseStore.js';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import { onMounted, computed } from 'vue';

export default {
  components: { LayoutAuthenticated },
  setup() {
    const firebaseStore = useFirebaseStore();

    onMounted(() => {
      firebaseStore.fetchRelayData();
    });

    const relayData = computed(() => firebaseStore.relayData);
    const loading = computed(() => firebaseStore.loading);
    const error = computed(() => firebaseStore.error);

    return {
      relayData,
      loading,
      error,
    };
  },
};
</script>
