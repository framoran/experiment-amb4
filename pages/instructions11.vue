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
        You will now be able to write the number of letters D, E, F, G that you have counted.
      </p>

      <h3 :class="styles.bottom"> Press Enter to continue the task </h3>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const keyDownHandler = (e) => {
  if (e.key === 'Enter') {
    document.getElementById('main1').classList.add('blackbg')
    setTimeout(() => {
      router.push('instructions12')
    }, 50)
  }
}

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler)
})

const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
  blackbg: 'blackbg'
}

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
