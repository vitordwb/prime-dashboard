<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
import { useFirebaseStore } from '@/stores/firebaseStore'
import { computed, onMounted, ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { LayoutAuthenticated, SectionMain, SectionTitle, Bar, Line },
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

    const updateChartData = () => {
      if (relayData.value.length > 0) {
        const data = getChartData(relayData.value, 'temperatura_interna');
        this.chartData.value.labels = data.map(x => x[0]);
        this.chartData.value.datasets[0].data = data.map(x => x[1]);
      }
    };

    onMounted(() => {
      firebaseStore.fetchRelayData();
      updateChartData();

      // Atualizar os dados do gráfico a cada 60 segundos
      setInterval(() => {
        firebaseStore.fetchRelayData();
        updateChartData();
      }, 10000);
    });

    return {
      relayData,
      loading,
      error,
      getChartData
    };
  },

  data() {
    return {
      chartData: ref({
        labels: this.getChartData(this.relayData, 'temperatura_interna').map(x => x[0]),
        datasets: [ { data: this.getChartData(this.relayData, 'temperatura_interna').map(x => x[1])}]
      }),
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionTitle first>Gráficos | Temperatura Interna </SectionTitle>

    <!--    Bar       -->
    <!--    Doughnut  -->
    <!--    Line      -->
    <!--    Pie       -->
    <!--    PolarArea -->
    <!--    Radar     -->
    <!--    Bubble    -->
    <!--    Scatter   -->

    <SectionMain>
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </SectionMain>

    <SectionMain>
      <Line
        id="my-chart-id-1"
        :options="chartOptions"
        :data="chartData"
      />
    </SectionMain>

<!--    <SectionTitle>Small laptop 1024px</SectionTitle>-->

<!--    <SectionMain>-->
<!--      <div-->
<!--        class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden"-->
<!--      >-->
<!--        <img-->
<!--          src="https://static.justboil.me/templates/one/one-tailwind-vue-1024.png"-->
<!--          class="block"-->
<!--        />-->
<!--      </div>-->
<!--    </SectionMain>-->
  </LayoutAuthenticated>
</template>
