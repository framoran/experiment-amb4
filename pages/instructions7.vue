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
        Before working on the task, you have the opportunity to practice. <br /><br />
        Your task is to count the exact number of different target letters D, E, F, G that are present throughout the task. <br /><br />
        The letter series will scroll automatically. Therefore, it is not necessary to press any keys while the letter series are displayed. <br /><br />
      </p>

      <h3 :class="styles.bottom">Press Enter to continue</h3>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
  blackbg: 'blackbg'
}

const keyDownHandler = (e) => {
  if (e.key === 'Enter') {
    document.getElementById('main1').classList.add(styles.blackbg)
    setTimeout(() => {
      router.push('practice')
    }, 50)
  }
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
