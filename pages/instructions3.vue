<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">The rest phase is over</h1>
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
        document.getElementById('main1').style.backgroundColor = "black"
        document.getElementById('main1').style.color = "black"
        setTimeout(() => {
          router.push('/instructions4')
        }, 100)
      }
    }
  
    document.addEventListener('keydown', keyDownHandler)
  
    onUnmounted(() => {
      document.removeEventListener('keydown', keyDownHandler)
    })
  })
  </script>