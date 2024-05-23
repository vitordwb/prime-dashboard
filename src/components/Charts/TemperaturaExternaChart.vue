<script>
import { Bar } from 'vue-chartjs'
import { computed, onMounted, ref } from 'vue'
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
      chartData: ref({
        labels: this.processedData.getDatetime(),
        datasets: [ { data: this.processedData.getTemperaturaExterna() } ]
      }),
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

<template>
  <Bar :data="chartData" class="h-96" />
</template>
