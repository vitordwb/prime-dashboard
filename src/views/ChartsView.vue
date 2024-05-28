<script>
import { useFirebaseStore }       from '@/stores/firebaseStore'
import { computed, onMounted }    from 'vue'

import LayoutAuthenticated        from '@/layouts/LayoutAuthenticated.vue'
import SectionMain                from '@/components/SectionMain.vue'
import CardBox                    from '@/components/CardBox.vue'
import CardBoxWidget              from '@/components/CardBoxWidget.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton                 from '@/components/BaseButton.vue'
import TemperaturaInternaChart    from '@/components/Charts/TemperaturaInternaChart.vue'
import TemperaturaExternaChart    from '@/components/Charts/TemperaturaExternaChart.vue'
import TemperaturasChart          from '@/components/Charts/TemperaturasChart.vue'
import CiclosChart                from '@/components/Charts/CiclosChart.vue'
import CorrenteBaixoChart         from '@/components/Charts/CorrenteBaixoChart.vue'

import {
    mdiChartTimelineVariant
  , mdiReload
  , mdiChartPie
  , mdiMonitorDashboard
  , mdiGithub
  , mdiCoolantTemperature
  , mdiLightningBolt
  , mdiPowerPlug
} from '@mdi/js'

import { Chart as ChartJS
  , Title
  , Tooltip
  , Legend
  , BarElement
  , CategoryScale
  , LinearScale
  , LineElement
} from 'chart.js'

ChartJS.register(
    Title
  , Tooltip
  , Legend
  , BarElement
  , LineElement
  , CategoryScale
  , LinearScale
)

export default {
  name: 'BarChart',
  components: {
      CardBoxWidget
    , BaseButton
    , CiclosChart
    , TemperaturasChart
    , TemperaturaInternaChart
    , TemperaturaExternaChart
    , CorrenteBaixoChart
    , CardBox
    , LayoutAuthenticated
    , SectionMain
    , SectionTitleLineWithButton
  },
  setup() {
    const firebaseStore = useFirebaseStore();

    const relayData = computed(() => firebaseStore.relayData);
    const loading   = computed(() => firebaseStore.loading);
    const error     = computed(() => firebaseStore.error);

    onMounted(() => {
      firebaseStore.fetchRelayData();
    });

    return {
        relayData
      , loading
      , error
    };
  },

  data() {
    return {
        mdiChartPie
      , mdiReload
      , mdiChartTimelineVariant
      , mdiMonitorDashboard
      , mdiGithub
      , mdiCoolantTemperature
      , mdiLightningBolt
      , mdiPowerPlug
    }
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <SectionTitleLineWithButton :icon="mdiMonitorDashboard" title="Monitoramento" main>
        <BaseButton
          href="https://github.com/vitordwb/prime-dashboard"
          target="_blank"
          :icon="mdiGithub"
          label="Repositório no GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <temperaturas-chart/>

      <CardBox class="mb-6">
        <div>
          <temperatura-interna-chart/>
        </div>
      </CardBox>

      <CardBox class="mb-6">
        <div>
          <temperatura-externa-chart/>
        </div>
      </CardBox>

      <ciclos-chart/>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Sensor Baixo">
        <BaseButton :icon="mdiReload" color="whiteDark" />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiPowerPlug"
          :number="123"
          label="Consumo"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiLightningBolt"
          :number="25.8"
          suffix="ºC"
          label="Potência Ativa Média"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="W"
          label="Potência Aparente Média"
        />
      </div>

      <CardBox class="mb-6">
        <div>
          <corrente-baixo-chart/>
        </div>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
