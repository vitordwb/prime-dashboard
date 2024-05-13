<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  name: 'BarChart',
  components: { LayoutAuthenticated, SectionMain, SectionTitle, Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}


</script>

<template>
  <LayoutAuthenticated>
    <SectionTitle first>Gráficos | Monitoramento</SectionTitle>

    <SectionMain>
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </SectionMain>

    <SectionTitle>Small laptop 1024px</SectionTitle>

    <SectionMain>
      <div
        class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden"
      >
        <img
          src="https://static.justboil.me/templates/one/one-tailwind-vue-1024.png"
          class="block"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
