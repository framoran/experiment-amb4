<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const canvasRef = ref(null)

// Set the title of the page
useHead({
  title: 'Experiment'
})

const itiTime = [3000, 5000, 5000, 2000, 5000, 5000, 4000, 2000, 4000, 5000, 5000]
const displayTime = [4000, 2000, 5000, 2000, 4000, 5000, 3000, 5000, 5000, 3000, 5000]
const fixationCrossTime = 1000

const list = [
  'XYLMB', 'TRZOPQK', 'UYTRD', 'AB', 'ZQRW', 'CDEH', 'UWPLGF', 'RQYWUXZT',
  'VBCDEF', 'QWETYG', 'XEVBNLMK', 'HJ', 'NMF', 'GHTRWS', 'MPO', 'UIP',
  'ZX', 'TRWQZXCV', 'QAZWSXED', 'VFGAYUIOP', 'IO', 'OPRX', 'ZW', 'MNBVCXZA',
  'AQWSEDRF', 'ZUX', 'QHMW', 'LKHGTRB', 'UIOQP', 'CV', 'QPH', 'RWGSXAN', 'BNMX'
]

/*const list = [
  'ZX', 'TRZOPQK', 'QHMW', 'RQYWUXZT', 'QWVBXZ', 'NMF', 'XYLMB', 'LKHTRBF',
  'RMKZQ', 'QAZWSXD', 'OPRX', 'ZQRW', 'ZUX', 'UIP', 'VFGAYUIOP', 'VBCDEF',
  'TRWQZXCV', 'YTRKJ', 'CDEH', 'XVBNLMK', 'ZW', 'MPO', 'HJ', 'UYTRD',
  'MNBVCXZAF', 'XYLMB', 'UWPLGF', 'UOIPX', 'VQPMT', 'ABMQ', 'CV', 'LRZPQX',
  'ZRWX', 'AQWSEDRF', 'AB', 'GHTRWS', 'IO', 'QWTYG', 'UIOQP'
];*/

let i = 0
let q = 0
let responseAllowed = 0
let timeStart = 0
let nextTrial = false

// Resize and set up the canvas
const resizeCanvas = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context.fillStyle = '#000000'
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  context.fillStyle = '#f6f8fb'
  context.fillRect(
    canvas.width / 12.5,
    canvas.height / 10,
    canvas.width - canvas.width / 6.25,
    canvas.height - canvas.height / 5
  )
  context.font = `${50 * (canvas.width / 1910)}px serif`
  context.fillStyle = '#000000'
}

// Play the sound fully without cutting it off
const playSound = () => {
  const audio = new Audio('/chimes.wav')
  audio.play().catch(error => {
    console.error('Error playing sound:', error)
  })

  // Automatically reset when the audio ends
  audio.addEventListener('ended', () => {
    audio.currentTime = 0
  })
}

// Show the fixation cross on the screen
const showFixationCross = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.fillStyle = '#000000'
  context.font = `${50 * (canvas.width / 1910)}px serif`
  context.fillText('+', canvas.width / 2 - 17.5, canvas.height / 2 - 17.5)
}

// Display the letters from the list
const showLetters = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  responseAllowed = true
  timeStart = new Date()
  context.fillStyle = '#f6f8fb'
  context.fillRect(
    canvas.width / 12.5,
    canvas.height / 10,
    canvas.width - canvas.width / 6.25,
    canvas.height - canvas.height / 5
  )

  context.font = `${50 * (canvas.width / 1910)}px serif`
  context.fillStyle = '#000000'

  // Center the list element
  const textWidth = context.measureText(list[i]).width
  context.fillText(list[i], canvas.width / 2 - textWidth / 2, canvas.height / 2 - 17.5)

  nextTrial = true
}

// Clear the canvas for the next trial
const clear = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.fillStyle = '#f6f8fb'
  context.fillRect(
    canvas.width / 12.5,
    canvas.height / 10,
    canvas.width - canvas.width / 6.25,
    canvas.height - canvas.height / 5
  )

  if (nextTrial) {
    i++
    nextTrial = false
  }
}

// Execute each trial in the sequence
const trial = () => {
  clear()
  if (q > 10) {
    q = 0
  }
  console.log( itiTime[q]  + ' ' + displayTime[q])

  if (i === list.length) {
    playSound()
    setTimeout(() => router.push('/instructions11'), 2000)
  } else {
    setTimeout(() => showFixationCross(), itiTime[q])
    setTimeout(() => showLetters(), itiTime[q] + fixationCrossTime)
    setTimeout(() => trial(), itiTime[q] + fixationCrossTime + displayTime[q])
  }
  q += 1
}

// Show the start message before the experiment begins
const showStartMessage = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = '#f6f8fb'
  context.fillRect(
    canvas.width / 12.5,
    canvas.height / 10,
    canvas.width - canvas.width / 6.25,
    canvas.height - canvas.height / 5
  )
  context.font = `${35 * (canvas.width / 1910)}px serif`
  context.fillStyle = '#000000'

  const message = 'You can start the task when you are ready.'
  const message2 = 'Press Enter to start the task.'

  const textWidth = context.measureText(message).width
  const textWidth2 = context.measureText(message2).width
  context.fillText(message, canvas.width / 2 - textWidth / 2, canvas.height / 2)
  context.font = `bold ${35 * (canvas.width / 1910)}px serif`
  context.fillText(message2, canvas.width / 2 - textWidth2 / 2, canvas.height - 125)
}

// Handle the Enter key press to start the trial
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    // Remove event listener after pressing Enter
    document.removeEventListener('keydown', handleKeyPress)
    
    // Play the sound and start the trial
    playSound()
    setTimeout(() => trial(), 3000)
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  // Show the start message
  showStartMessage()

  // Wait for the Enter key press to start
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
body {
  background: #000;
  margin: 0px;
}

canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
