<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">Instruction</h1>

      <div class="container">
        <p style="margin-top: 100px">Are you taking medications that can influence your cardiovascular system?</p>

        <p style="margin-top: 100px">
          1 = Yes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 = No
        </p>
        <p :class="styles.bottom"> Please respond using the numeric keypad</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const router = useRouter()

const keyDownHandler = (e) => {
  if (e.key === '1' || e.key === '2') {
    cookies.set('Med_Car', e.key, { maxAge: 60 * 6 * 24 })
    document.getElementById('main1').classList.add('blackbg')
    setTimeout(() => {
      router.push('instructions29')
    }, 50)
  }
}

// Style classes
const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
}

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler)
})
</script>

<style scoped>
body {
  background: #000;
}

.blackbg {
  background: black;
  color: black;
}

.container {
  padding: 0 2rem;
}

.main {
  align-items: center;
  background-color: #fff; /* Ensure this is white to see the text */
  margin-left: 5vh;
  margin-right: 5vh;
  margin-top: 10vh;
  padding: 5vh;
  height: 80vh;
  text-align: center;
  position: relative;
}

.h1 {
  /* Your existing CSS styles */
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
