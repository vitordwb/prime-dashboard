<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCamera" title="QR Code" main>
      </SectionTitleLineWithButton>
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Webcam</h4> -->
            <div class="video-container">
              <video ref="videoElement" autoplay></video>
            </div>
          </div>
        </div>
      </div>
      <BaseDivider />
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script lang="ts">
export default {
  mounted() {
    this.startWebcam();
  },
  beforeUnmount() {
    this.stopWebcam();
  },
  methods: {
    startWebcam() {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            this.$refs.videoElement.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing the webcam', error);
          });
      }
    },
    stopWebcam() {
      const stream = this.$refs.videoElement.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
      });

      this.$refs.videoElement.srcObject = null;
    }
  }
};
</script>

<style scoped lang="scss">
.chartjs {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center;     /* Centraliza verticalmente */
  height: 100vh;           /* Faz o container ter a altura total da viewport */
}

.video-container {
  display: flex;           /* flexbox to center content */
  justify-content: center; /* centraliza horizontalmente */
  align-items: center;     /* centraliza verticalmente */
  width: 80vw;             /* ocupa 80% da largura da viewport */
  max-width: 600px;        /* limita a largura máxima para grandes dispositivos */
  aspect-ratio: 1;         /* garante que o container seja quadrado */
  overflow: hidden;        /* evita que o vídeo ultrapasse os limites do container */
  margin: 0 auto;          /* center the container itself */
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* garante que o vídeo preencha o espaço sem distorção */
}

/* Media queries para dispositivos móveis */
@media (max-width: 768px) {
  .video-container {
    width: 90vw;           /* Ocupa 90% da largura da viewport em dispositivos móveis */
    max-width: none;       /* Remove a limitação de largura máxima */
  }
}

@media (max-width: 480px) {
  .video-container {
    width: 100vw;          /* Ocupa 100% da largura da viewport em dispositivos muito pequenos */
    aspect-ratio: auto;    /* Ajusta a proporção para evitar distorções */
  }
}
</style>

<script setup lang="ts">
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue'
// import SectionTitle from '@/components/SectionTitle.vue'
// import { mdiChartTimelineVariant, mdiGithub, mdiQrcode } from '@mdi/js'
// import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
// import BaseButton from '@/components/BaseButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import { mdiCamera, mdiChartTimelineVariant, mdiGithub } from '@mdi/js'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>
