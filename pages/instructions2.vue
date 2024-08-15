<template>
  <div class="container">
    <nuxt-head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </nuxt-head>

    <main id="main1" :class="styles.main">
      <h2 :class="styles.h1">Experiment on Physiological Activity</h2>

      <p class="mt-5">You will first undergo a rest period during which you will watch a documentary film. After this, you will perform a cognitive task, followed by a second rest period and another cognitive task. The experiment will end with a few questions.</p>

      <p>Your blood pressure and phsysiological activity will be measured by a cuff fixed on your arm and by four electrodes fixed on your body. The cuff and electrodes will not bother you much and after a short time you will no longer feel them. </p>

      <p>To not compromise the validity of the cardiovascular measurements, we ask you to remain as calm as possible during the Experiment and to avoid moving your left arm or torso. </p>

      <h3 :class="styles.bottom"> Press Enter to continue </h3>

     </main>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNuxtApp } from '#app'
  
  const nuxtApp = useNuxtApp()
  const router = useRouter()

  const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
  blackbg: 'blackbg'
}
  
  onMounted(() => {
    nuxtApp.$cookies.set('screenWidth', window.innerWidth)
    nuxtApp.$cookies.set('screenHeight', window.innerHeight)
    console.log(window.innerHeight)
  
    const keyDownHandler = (e) => {
      if (e.key === 'Enter') {
        document.getElementById('main1').style.backgroundColor = "black"
        document.getElementById('main1').style.color = "black"
        setTimeout(() => {
          router.push('/baseline')
        }, 100)
      }
    }
  
    document.addEventListener('keydown', keyDownHandler)
  
    onUnmounted(() => {
      document.removeEventListener('keydown', keyDownHandler)
    })
  })
  </script>