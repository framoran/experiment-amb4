<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvasRef = ref(null)

import { useHead } from '@vueuse/head'

// Set a default title for all pages
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Experiment` : 'Experiment'
  }
})

const itiTime = [4000, 5000, 3000, 3000, 5000]
const fixationCrossTime = 1000
const feedbackTime = 1500
const list = [' ASDFJH ', '   LB   ', ' AMNEWR ', '  AFD   ', '  DFLP  ']
const displayTime = [1000, 3000, 5000, 1000, 3000]
let i = 0
let responseAllowed = 0

let timeStart = 0
let rts = []
let acc = []

let nextTrial = false

const resizeCanvas = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context.fillStyle = '#000000'
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  context.fillStyle = '#E0E0E0'
  context.fillRect(
    canvas.width / 12.5,
    canvas.height / 10,
    canvas.width - canvas.width / 6.25,
    canvas.height - canvas.height / 5
  )
  context.font = `${50 * (canvas.width / 1910)}px serif`
  context.fillStyle = '#000000'
}

const playSound = () => {
  const audio = new Audio('/sound.mp3')
  audio.play().catch(error => {
    console.error('Error playing sound:', error)
  })
  setTimeout(() => {
    audio.pause()
    audio.currentTime = 0
  }, 1000)
}

const showFixationCross = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.fillStyle = '#000000'
  context.font = `${50 * (canvas.width / 1910)}px serif`
  context.fillText('+', canvas.width / 2 - 17.5, canvas.height / 2 - 17.5)
}

const showLetters = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  responseAllowed = true
  timeStart = new Date()
  context.fillStyle = '#E0E0E0'
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

const clear = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.fillStyle = '#E0E0E0'
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

const trial = () => {
  clear()

  if (i === list.length) {
    setTimeout(() => router.push('/instructions19'), 2000)
  } else {
    setTimeout(() => showFixationCross(), itiTime[i])
    setTimeout(() => showLetters(), itiTime[i] + fixationCrossTime)
    setTimeout(() => trial(), itiTime[i] + fixationCrossTime + displayTime[i])
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  setTimeout(() => trial(), 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
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
