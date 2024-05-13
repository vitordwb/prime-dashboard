<template>
  <LayoutAuthenticated>
    <section>
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
    </section>
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
  display: flex;           /* Flexbox to center content */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center;     /* Centraliza verticalmente */
  width: 80vw;             /* Ocupa 80% da largura da viewport */
  max-width: 600px;        /* Limita a largura máxima para grandes dispositivos */
  aspect-ratio: 1;         /* Garante que o container seja quadrado */
  overflow: hidden;        /* Evita que o vídeo ultrapasse os limites do container */
  margin: 0 auto;          /* Center the container itself */
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* Garante que o vídeo preencha o espaço sem distorção */
}
</style>

<script setup lang="ts">
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
</script>
