<template>
  <div :class="styles.container">
    <!-- Use lowercase 'head' -->
    <head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">Instruction</h1>

      <div class="container">
        <p style="margin-top: 100px">{{ getMessage }}</p>
        <p style="margin-top: 100px">The experiment is over. Thank you for your participation!</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// Define styles
const styles = ref({
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom'
})

const isSubmitting = ref(false)
const sum1 = ref('')
const sum2 = ref('')
const getMessage = ref('')

// Function to get cookies
const getCookies = (cname) => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const router = useRouter()

const keyDownHandler = (e) => {
  if (e.key === 'A') {
    setTimeout(() => router.push('instructions20'), 50)
  }
}

onMounted(() => {
  // Convert cookie values to numbers for addition
  const sum1Value = parseInt(getCookies('money_earned1')) || 0;
  const sum2Value = parseInt(getCookies('earned_money2')) || 0;

  // Set the sums
  sum1.value = sum1Value
  sum2.value = sum2Value

  // Create the message with the sum displayed as a string
  getMessage.value = `You earned USD ${sum1Value + sum2Value}`

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