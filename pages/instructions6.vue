<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <div id="example">
        <h1 :class="styles.h1">Task Instruction</h1>
        <p class="mt-5">
          <b>Important! If you perform well enough on the task, you will earn ${{ displayText }}</b><br/><br/>
        </p>
        <h3 :class="styles.bottom">Press Enter to continue</h3>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

// Initialize rewards as reactive variables
const reward = ref()
const nuxtApp = useNuxtApp()
const router = useRouter()

// Style classes
const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
}

// Computed property to display the reward text dynamically
const displayText = computed(() => {
  const rewardAmount = reward.value || 0; // Fallback to 0 if reward.value is undefined
  return rewardAmount.toFixed(2) === '0.10' ? `${rewardAmount.toFixed(2)} dollar` : `${rewardAmount.toFixed(2)} dollars`;
});

onMounted(() => {
  // Set screen width and height in cookies
  nuxtApp.$cookies.set('screenWidth', window.innerWidth)
  nuxtApp.$cookies.set('screenHeight', window.innerHeight)
  console.log(window.innerHeight)

  // Check the 'subject_condition' cookie value and set rewards accordingly
  const subjectCondition = nuxtApp.$cookies.get('subject_condition')
  if (subjectCondition == 1) {
    reward.value = 0.10
  } else {
    reward.value = 10
  }

  // Event listener for keydown event
  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      // Change background and text color on Enter key press
      const mainElement = document.getElementById('main1')
      mainElement.style.backgroundColor = 'black'
      mainElement.style.color = 'black'
      
      // Navigate to the next route after a short delay
      setTimeout(() => {
        router.push('/instructions7')
      }, 100)
    }
  }

  // Attach keydown event listener
  document.addEventListener('keydown', keyDownHandler)

  // Cleanup event listener on component unmount
  onUnmounted(() => {
    document.removeEventListener('keydown', keyDownHandler)
  })
})
</script>