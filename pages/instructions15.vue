<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">
        Concentration Task
      </h1>

      <p>
        <br />
        In the following part, you will perform the second concentration task. <br/><br/>
        During this task, you will see series of several letters appear on the screen. <br/><br/>
        Your task will be to count the exact number of target letters J, K, L, M that appear throughout the task. <br/><br/>
        At the end of the task, you will need to indicate how many times each of the letters J, K, L, M was presented. <br/><br/>
        An example will be given on the next page.
      </p>

      <h3 :class="styles.bottom"> Press Enter to continue </h3>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const nuxtApp = useNuxtApp()

const router = useRouter()
const message = ref('')

const getCookies = (cname) => {
  const name = cname + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
}

const keyDownHandler = (e) => {
  if (e.key === 'Enter') {
    document.getElementById('main1').classList.add('blackbg')
    setTimeout(() => {
      router.push('instructions16')
    }, 50)
  }
}

onMounted(() => {
  message.value = getCookies('sum1')
  document.addEventListener('keydown', keyDownHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler)
})

const sum1 = nuxtApp.$cookies.get('sum1')
const feedback1 = nuxtApp.$cookies.get('feedback1')

</script>
