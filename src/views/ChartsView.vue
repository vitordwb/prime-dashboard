<script>
import { useFirebaseStore } from '@/stores/firebaseStore'
import { computed, onMounted } from 'vue'

import LayoutAuthenticated        from '@/layouts/LayoutAuthenticated.vue'
import SectionMain                from '@/components/SectionMain.vue'
import CardBox                    from '@/components/CardBox.vue'
import TemperaturaInternaChart    from '@/components/Charts/TemperaturaInternaChart.vue'
import TemperaturaExternaChart    from '@/components/Charts/TemperaturaExternaChart.vue'
import TemperaturasChart          from '@/components/Charts/TemperaturasChart.vue'
import CiclosChart                from '@/components/Charts/CiclosChart.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton                 from '@/components/BaseButton.vue'

import {
  mdiChartTimelineVariant,
  mdiReload,
  mdiChartPie,
  mdiMonitorDashboard
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
  // eslint-disable-next-line vue/no-reserved-component-names, vue/no-unused-components
  components: {
    BaseButton,
      CiclosChart
    , TemperaturasChart
    , TemperaturaInternaChart
    , TemperaturaExternaChart
    , CardBox
    , LayoutAuthenticated
    , SectionMain
    , SectionTitleLineWithButton
  },
  setup() {
    const firebaseStore = useFirebaseStore();

    const relayData = computed(() => firebaseStore.relayData);
    const loading = computed(() => firebaseStore.loading);
    const error = computed(() => firebaseStore.error);



    const getChartData = (data, info) => {
      return data.map((value) => {
        const chartData = value[info];
        if (!(chartData[0])) {
          return [value['datetime'], 0];
        } else {
          return [value['datetime'], chartData[1]];
        }
      });
    };


    onMounted(() => {
      firebaseStore.fetchRelayData();
    });

    return {
      relayData,
      loading,
      error,
      getChartData,
    };
  },

  data() {
    return {
      mdiChartPie,
      mdiReload,
      mdiChartTimelineVariant,
      mdiMonitorDashboard

    }
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <SectionTitleLineWithButton :icon="mdiMonitorDashboard" title="Monitoramento" main>
<!--        <BaseButton-->
<!--          href="https://github.com/vitordwb/prime-dashboard"-->
<!--          target="_blank"-->
<!--          :icon="mdiGithub"-->
<!--          label="Repositório no GitHub"-->
<!--          color="contrast"-->
<!--          rounded-full-->
<!--          small-->
<!--        />-->
      </SectionTitleLineWithButton>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Temperaturas">
        <BaseButton :icon="mdiReload" color="whiteDark" />
      </SectionTitleLineWithButton>

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

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Ciclos">
        <BaseButton :icon="mdiReload" color="whiteDark" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div>
          <ciclos-chart/>
        </div>
      </CardBox>

      <!--      <CardBox class="mb-6">-->
      <!--        <div v-if="datadata">-->
      <!--          <line-chart :data="datadata" class="h-96" />-->
      <!--        </div>-->
      <!--      </CardBox>-->

      <!--      <CardBox class="mb-6">-->
      <!--      <div>-->
      <!--        <temperaturas-chart/>-->
      <!--      </div>-->
      <!--      </CardBox>-->


<!--      <CardBox class="mb-6">-->
<!--        <bar-chart-->
<!--          :data="chartData"-->
<!--          class="h-96"-->
<!--        />-->
<!--      </CardBox>-->

    </SectionMain>
  </LayoutAuthenticated>
</template>
