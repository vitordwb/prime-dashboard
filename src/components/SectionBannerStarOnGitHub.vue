<script setup>
import { mdiGithub } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import SectionBanner from '@/components/SectionBanner.vue'
import { gradientBgDark } from '@/colors'
</script>

<template>
  <SectionBanner :class="gradientBgDark">
    <h1 class="text-3xl text-white mb-6">Código disponível no <b>GitHub</b> :)</h1>
    <div>
      <BaseButton
        href="https://github.com/vitordwb/prime-dashboard"
        :icon="mdiGithub"
        label="GitHub"
        target="_blank"
        rounded-full
      />
    </div>
  </SectionBanner>
</template>
