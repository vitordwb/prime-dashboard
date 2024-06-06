<script setup>
import { computed, ref, onMounted } from 'vue'
import { useFirebaseStore }         from '@/stores/firebaseStore'
import LayoutAuthenticated          from '@/layouts/LayoutAuthenticated.vue'

import * as chartConfig             from '@/components/Charts/chart.config.js'
import LineChart                    from '@/components/Charts/LineChart.vue'
import BarChart                     from '@/components/Charts/BarChart.vue'
import SectionTitleLineWithButton   from '@/components/SectionTitleLineWithButton.vue'
import SectionMain                  from '@/components/SectionMain.vue'
import CardBoxWidget                from '@/components/CardBoxWidget.vue'
import CardBox                      from '@/components/CardBox.vue'
import NotificationBar              from '@/components/NotificationBar.vue'
import BaseButton                   from '@/components/BaseButton.vue'

import {
    mdiChartTimelineVariant
  , mdiReload
  , mdiGithub
  , mdiChartPie
  , mdiCoolantTemperature
  , mdiInformation
  , mdiCheckCircle
  , mdiAlert
  , mdiAlertCircle
} from '@mdi/js'

const chartData = ref(null)
const firebaseStore = useFirebaseStore();
const relayData = computed(() => firebaseStore.relayData);
// const loading = computed(() => firebaseStore.loading);
// const error = computed(() => firebaseStore.error);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  if (!relayData.value) {
    firebaseStore.fetchRelayData();
  }
  fillChartData();
})

const getLastCycle = () => relayData.value[relayData.value.length - 1].cycle

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <NotificationBar color="info" :icon="mdiInformation" :outline="notificationsOutline">
        <b>Info state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'info' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="success" :icon="mdiCheckCircle" :outline="notificationsOutline">
        <b>Success state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'success' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="warning" :icon="mdiAlert" :outline="notificationsOutline">
        <b>Warning state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'warning' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="danger" :icon="mdiAlertCircle" :outline="notificationsOutline">
        <b>Danger state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'danger' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Visão Geral" main>
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

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiReload"
          :number="getLastCycle()"
          label="Ciclos"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiCoolantTemperature"
          :number="25.8"
          suffix="ºC"
          label="Temperatura Média"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="W"
          label="Potência Média"
        />
      </div>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Equipamentos">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Equipamentos 2">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <bar-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
