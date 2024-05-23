<script>
import BarChart from '@/components/Charts/BarChart.vue'
import { Chart as ChartJS
  , Title
  , Tooltip
  , Legend
  , BarElement
  , CategoryScale
  , LinearScale
  , LineElement
} from 'chart.js'
import { useFirebaseStore } from '@/stores/firebaseStore'
import { computed, onMounted } from 'vue'

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
  name: 'CiclosChart',
  components: { BarChart },
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
        "labels": this.processedData.getDatetime(),
        "datasets": [
          {
            "fill": true,
            "borderColor": "#00D1B2",
            "borderWidth": 2,
            "borderDash": [],
            "borderDashOffset": 0,
            "data": this.processedData.getCycle(),
          }
        ]
      }
    }
  }
}
</script>

<template>
  <bar-chart :data="chartData" class="h-96" />
</template>
