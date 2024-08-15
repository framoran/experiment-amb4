<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">
        Instruction
      </h1>

      <p>
        <br />
        Thanks for your responses ! 
        <br /> <br />You will receive feedback whether you succeeded or not on the task at the end of the experiment.
        <br /> <br />
        You have completed the first task. You will now start the second rest phase.
      </p>

      <h3 :class="styles.bottom"> Press Enter to start the second rest phase</h3>
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
      router.push('baseline2')
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

<style scoped>
body {
  background: #000;
}

.blackbg {
  background: black;
  color: black;
}

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.box1 {
  padding: 25px;
  background-color: grey;
  margin: 15px;
}

.box2 {
  padding: 25px;
  background-color: grey;
  margin: 15px;
  border: 2px solid green;
}

.box3 {
  padding: 25px;
  background-color: grey;
  margin: 15px;
  border: 2px solid red;
}
</style>
