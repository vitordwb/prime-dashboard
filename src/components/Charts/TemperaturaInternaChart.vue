<script>
import { Bar } from 'vue-chartjs'
import { computed, onMounted } from 'vue'
import { useFirebaseStore } from '@/stores/firebaseStore'

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

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TemperaturaInternaChart',
  components: { Bar },
  setup() {
    const firebaseStore = useFirebaseStore();

    const processedData = computed(() => firebaseStore.getProcessedData());

    onMounted(() => {
      firebaseStore.getProcessedData();
    });

    return {
      processedData
    };
  },

  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Temperatura Interna',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },

  watch: {
    processedData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.chartData.labels = newData.getDatetime();
          this.chartData.datasets[0].data = newData.getTemperaturaInterna();
          this.chartData.datasets[0].backgroundColor = newData.getTemperaturaInterna().map(() => 'rgba(75, 192, 192, 0.2)');
          this.chartData.datasets[0].borderColor = newData.getTemperaturaInterna().map(() => 'rgba(75, 192, 192, 1)');
        }
      }
    }
  }
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" class="h-96" />
</template>
