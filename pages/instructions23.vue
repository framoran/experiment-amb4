<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">Results</h1>

      <div class="container">
        <!-- Dynamically display feedback for tasks -->
        <p>{{ text1 }}</p>
        <p>{{ text2 }}</p>
        <p>{{ text3 }}</p>

        <p style="margin-top: 100px">We will ask you a few more questions before concluding the Experiment.</p>
        <h3 :class="styles.bottom">Press Enter to continue the Experiment</h3>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

// Initialize reactive variables
const reward = ref()
const nuxtApp = useNuxtApp()
const router = useRouter()
const text1 = ref('')
const text2 = ref('')
const text3 = ref('')

// Style classes
const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
}

// Check the 'subject_condition' cookie value and set rewards accordingly
const subjectCondition = nuxtApp.$cookies.get('subject_condition')
const feedback1 = nuxtApp.$cookies.get('feedback1') || 'No feedback for task 1'
const feedback2 = nuxtApp.$cookies.get('feedback2') || 'No feedback for task 2'
// Retrieve earned money from cookies, defaulting to 0 if not found
const earned_money1 = parseInt(nuxtApp.$cookies.get('earned_money1')) || 0;
const earned_money2 = parseInt(nuxtApp.$cookies.get('earned_money2')) || 0;

// Calculate the total earned money
const all_money = earned_money1 + earned_money2;

// Set the text values using template literals for consistency and readability
text1.value = `Results for task 1: ${feedback1} You earned $${earned_money1}.`;
text2.value = `Results for task 2: ${feedback2} You earned $${earned_money2}.`;
text3.value = `Total amount of money earned: $${all_money}.`;

// Computed property to display the reward text dynamically
const displayText = computed(() => {
  const rewardAmount = reward.value || 0; // Fallback to 0 if reward.value is undefined
  return rewardAmount.toFixed(2) === '0.10' ? `${rewardAmount.toFixed(2)} dollar` : `${rewardAmount.toFixed(2)} dollars`;
});

onMounted(() => {
  // Set screen width and height in cookies
  nuxtApp.$cookies.set('screenWidth', window.innerWidth)
  nuxtApp.$cookies.set('screenHeight', window.innerHeight)

  // Check the 'subject_condition' cookie value and set rewards accordingly
  const subjectCondition = nuxtApp.$cookies.get('subject_condition')
  if (subjectCondition == 1) {
    reward.value = 10
  } else {
    reward.value = 0.10
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
        router.push('/instructions24')
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
