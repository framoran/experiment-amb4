<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">Instruction</h1>

      <p>
        <br />
        You have completed the training phase. You will now begin the concentration task. <br/><br/>

        Reminder: <br/><br/>

        Your task will be to count the exact number of letters D, E, F, G that appear throughout the task. <br/><br/>

        At the end of the task, you will need to indicate how many times each of the letters D, E, F, G appeared. <br /><br/>

        <b>If you perform well enough on the task, you will win ${{ text }}</b><br/><br/>

        <br/><br/>
      </p>

      <h3 :class="styles.bottom">Press Enter to continue</h3>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

// Initialize rewards as reactive variables
const rewardAmount = ref(0.01)
const reward = ref(0.40)
const text = ref('0.10 dollar')

const router = useRouter()
const nuxtApp = useNuxtApp()

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
      router.push('task')
    }, 50)
  }
}

// Check the 'subject_condition' cookie value and set rewards accordingly
const subjectCondition = nuxtApp.$cookies.get('subject_condition')
  if (subjectCondition == 1) {
    reward.value = 0.10
    text.value = reward.value.toFixed(2) + ' dollar'
  } else {
    reward.value = 10
    text.value = reward.value.toFixed(2) + ' dollars'
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
