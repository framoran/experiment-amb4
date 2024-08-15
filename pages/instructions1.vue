<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h2 :class="styles.h1">Experiment on Physiological Activity</h2>

      <p class="mt-5">First of all, thank you for participating in this Experiment.</p>
      <p>The purpose of this Experiment is to study your physiological activity during a concentration task.</p>
      <p>It is understood that your participation in this study is voluntary and that you can stop the Experiment at any time.</p>
      <p>All your data and indications will remain anonymous and will only be used for this study.</p>
      <p>Thank you for reading the instructions carefully.</p>

      <h3 :class="styles.bottom">Press Enter to continue</h3>
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
      document.getElementById('main1').style.backgroundColor = 'black'
      document.getElementById('main1').style.color = 'black'
      setTimeout(() => {
        router.push('/instructions2')
      }, 100)
    }
  }

  document.addEventListener('keydown', keyDownHandler)

  onUnmounted(() => {
    document.removeEventListener('keydown', keyDownHandler)
  })
})
</script>

<script>
export default {
  layout: 'experiment'
}
</script>

<style global>
/* Add your styles here */
body {
  background: black !important;
}
</style>
