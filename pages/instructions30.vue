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
        <p style="margin-top: 50px">Subject Number: {{ subjectNumber }}</p>
        <p>Subject Condition: {{ subjectCondition }}</p>
        <p>Accuracy Task1: {{ task1Accuracy }}</p>
        <p>Accuracy Task2: {{ task2Accuracy }}</p>
        <p>FR Speaker: {{ frSpeaker }}</p>
        <p>FR Difficulty: {{ frDifficulty }}</p>
        <p>Language: {{ language }}</p>
        <p>Med Dep: {{ medDep }}</p>
        <p>Med Car: {{ medCar }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx'

// Styling classes for the component
const styles = ref({
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom'
})

// Reactive state variables
const subjectNumber = ref('')
const subjectCondition = ref('')
const frSpeaker = ref('')
const frDifficulty = ref('')
const language = ref('')
const medDep = ref('')
const medCar = ref('')
const sum1 = ref(0)
const sum2 = ref(0)

// Computed properties for derived data
const task1Accuracy = computed(() => (sum1.value / 19) * 100)
const task2Accuracy = computed(() => (sum2.value / 19) * 100)

// Utility function to get cookies
const getCookies = (name) => {
  const cookieArr = document.cookie.split(';').map(cookie => cookie.trim())
  const cookie = cookieArr.find(cookie => cookie.startsWith(`${name}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : ''
}

// Keydown event handler
const keyDownHandler = (e) => {
  if (e.key === 'Enter') {
    document.getElementById('main1').classList.add('blackbg')
    setTimeout(() => router.push('instructions14'), 50)
  }
}

// Function to generate and download the Excel file
const downloadExcel = () => {
  const data = [
    ['Subject Number', subjectNumber.value],
    ['Subject Condition', subjectCondition.value],
    ['Accuracy Task1', task1Accuracy.value],
    ['Accuracy Task2', task2Accuracy.value],
    ['FR Speaker', frSpeaker.value],
    ['FR Difficulty', frDifficulty.value],
    ['Language', language.value],
    ['Med Dep', medDep.value],
    ['Med Car', medCar.value]
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
  const fileName = `data_D_${subjectNumber.value}.xlsx`

  XLSX.writeFile(workbook, fileName)
}

// Vue Router instance
const router = useRouter()

// Lifecycle hooks
onMounted(() => {
  // Initialize state from cookies
  subjectNumber.value = getCookies('subject_nb')
  subjectCondition.value = getCookies('subject_condition')
  frSpeaker.value = getCookies('FR_speaker')
  frDifficulty.value = getCookies('FR_difficulty')
  language.value = getCookies('language')
  medDep.value = getCookies('Med_Dep')
  medCar.value = getCookies('Med_Car')
  sum1.value = parseFloat(getCookies('sum1')) || 0
  sum2.value = parseFloat(getCookies('sum2')) || 0

  // Automatically download the Excel file
  downloadExcel()

  // Add event listener for keydown
  document.addEventListener('keydown', keyDownHandler)
})

onUnmounted(() => {
  // Remove event listener for keydown
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
  background-color: #fff;
  margin: 10vh 5vh;
  padding: 5vh;
  height: 80vh;
  text-align: center;
  position: relative;
}

.h1 {
  font-size: 2rem;
  font-weight: bold;
}

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
