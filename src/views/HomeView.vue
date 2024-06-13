<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useFirebaseStore }         from '@/stores/firebaseStore'
import LayoutAuthenticated          from '@/layouts/LayoutAuthenticated.vue'
import * as chartConfig             from '@/components/Charts/chart.config.js'
import SectionTitleLineWithButton   from '@/components/SectionTitleLineWithButton.vue'
import SectionMain                  from '@/components/SectionMain.vue'
import CardBoxWidget                from '@/components/CardBoxWidget.vue'
import TemperaturasChart            from '@/components/Charts/TemperaturasChart.vue'
import CorrentesRmsChart            from '@/components/Charts/CorrentesRmsChart.vue'
import VentiladoresChart            from '@/components/Charts/VentiladoresChart.vue'
import RpmChart                     from '@/components/Charts/RpmChart.vue'
import NotificationBar              from '@/components/NotificationBar.vue'
import {
    mdiChartTimelineVariant
  , mdiCoolantTemperature
  , mdiReload
  , mdiAlertCircle
} from '@mdi/js'


const chartData = ref(null)
const firebaseStore = useFirebaseStore();
const relayData = computed(() => firebaseStore.relayData);

const showAlerta = ref(false);
const messageAlert = ref('');
const colorAlert = ref('info');

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  if (!relayData.value) {
    firebaseStore.fetchRelayData();
  }
  fillChartData();
})

const getLastCycle = () => relayData.value[relayData.value.length - 1].counter

// damper
// temperatura_cobre
// temperatura_interna
// temperatura_externa
// ventilador_cima_status
// ventilador_baixo_status

const getAvg = (property) => {

  const relayDataArray = relayData.value;
  let totalElements = 0;
  let count = 0;

  relayDataArray.forEach(item => {
    if (item[property]) {
      const value = item[property][1];
      totalElements += value;
      count++;
    }
  });

  return parseFloat((count > 0 ? totalElements / count : 0).toFixed(1));
};

const changeColor = (state) => {
  if (
       state === 'TEMPERATURA MUITO ALTA'
    || state === 'TEMPERATURA INTERNA E EXTERNA MUITO ALTA'
  ) {
    return 'danger'
  }

  if (state === 'TEMPERATURA MUITO BAIXA') return 'info'

  return 'warning';
}

const updateAlertState = () => {
  const lastItem = relayData.value[relayData.value.length - 1];
  if (lastItem && lastItem.state) {
    const state = lastItem.state;

    if (
         state === 'TEMPERATURA MUITO BAIXA'
      || state === 'TEMPERATURA MUITO ALTA'
      || state === 'TENTATIVA DE REFRIGERACAO FREE COOLING'
      || state === 'TEMPERATURA INTERNA E EXTERNA MUITO ALTA'
      || state === 'TEMPERATURA ABAIXANDO'
      || state === 'PORTA ABERTA'
    ) {
      colorAlert.value = changeColor(state);
      showAlerta.value = true;
      messageAlert.value = state;
    }

    else {
      showAlerta.value = false;
      messageAlert.value = '';
    }
  }
};

watch(() => relayData.value, updateAlertState,  { immediate: true });

// const getAvgInternalTemperature   = () => getAverage('temperatura_interna');
// const getAvgCopperTemperature     = () => getAverage('temperatura_cobre');
// const getAvgDamper                = () => getAverage('damper');
// const getAvgExternalTemperature   = () => getAverage('temperatura_externa');
// const getAvgVentiladorCimaStatus  = () => getAverage('ventilador_cima_status');
// const getAvgVentiladorBaixoStatus = () => getAverage('ventilador_baixo_status');

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <NotificationBar v-if="showAlerta" :color="colorAlert" :icon="mdiAlertCircle" >
        <b>ALERTA</b>. {{ messageAlert }}
      </NotificationBar>

      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Visão Geral" main>
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          :trend="getLastCycle() > 800000 ? 'overflow' : 'normal'"
          :trend-type="getLastCycle() > 800000 ? 'alert' : 'normal'"
          color="text-emerald-500"
          :icon="mdiReload"
          :number="getLastCycle()"
          label="Ciclos"
        />
        <CardBoxWidget
          :trend="getAvg('temperatura_interna') > 40 ? 'overflow' : 'normal'"
          :trend-type="getAvg('temperatura_interna') > 40 ? 'alert' : 'normal'"
          color="text-blue-500"
          :icon="mdiCoolantTemperature"
          :number="getAvg('temperatura_interna')"
          suffix="ºC"
          label="Temperatura Interna Média"
        />
        <CardBoxWidget
          :trend="getAvg('temperatura_cobre') > 40 ? 'overflow' : 'normal'"
          :trend-type="getAvg('temperatura_cobre') > 40 ? 'alert' : 'normal'"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="getAvg('temperatura_cobre')"
          suffix="ºC"
          label="Temperatura Cobre Média"
        />
      </div>

      <temperaturas-chart/>

      <rpm-chart/>

      <ventiladores-chart/>

      <correntes-rms-chart/>

    </SectionMain>
  </LayoutAuthenticated>
</template>
