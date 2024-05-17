<template>
  <LayoutAuthenticated>
    <SectionMain>

      <SectionTitleLineWithButton :icon="mdiChartPie()" title="Gráfico 2" main>
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div>
          <h1>Dados do Firebase (rele003)</h1>
          <div v-if="loading">Carregando...</div>
          <div v-if="error">{{ error.message }}</div>
          <div v-if="relayData">
            <pre>{{ relayData }}</pre>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import {
  // mdiAccountMultiple,
  // mdiCartOutline,
  // mdiChartTimelineVariant,
  // mdiMonitorCellphone,
  mdiChartPie
} from '@mdi/js'

import { useFirebaseStore } from '@/stores/firebaseStore.js';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import { onMounted, computed } from 'vue';
import SectionMain from '@/components/SectionMain.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {

  // eslint-disable-next-line vue/no-unused-components
  components: { BaseButton, SectionTitleLineWithButton, CardBox, LineChart, SectionMain, LayoutAuthenticated },
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
  methods: {
    mdiChartPie() {
      return mdiChartPie
    }
  },
};
</script>
