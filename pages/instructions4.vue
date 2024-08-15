<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h2 :class="styles.h1">Mental Concentration Task</h2>
        <br />
        In the following part, you will perform the first concentration task. <br/><br/>
        During this task, you will see series of several letters appear on the screen. <br/><br/>
        Your task will be to count the exact number of target letters D, E, F, G that appear throughout the task. <br/><br/>
        At the end of the task, you will need to indicate how many times each of the letters D, E, F, G was presented. <br/><br/>
        An example will be given on the next page.

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
          router.push('/instructions5')
        }, 100)
      }
    }
  
    document.addEventListener('keydown', keyDownHandler)
  
    onUnmounted(() => {
      document.removeEventListener('keydown', keyDownHandler)
    })
  })
  </script>