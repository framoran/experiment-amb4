<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main v-if="showInstruction" id="main1" :class="styles.main">
      <h1 :class="styles.h1">Rest Period</h1>
      <p :class="styles.m1">
        During the next 8 minutes, your resting physiological activity will be measured again.
      </p>
      <p>During this time, you will watch a documentary film.</p>
      <p>Important note: Please try to maintain the same body position.</p>
      <p>Now, relax and keep your arm as still as possible throughout the rest phase.</p>
      <h3 :class="styles.bottom">Press Enter to continue</h3>
    </main>

    <main v-else id="main2" :class="[styles.main, styles.video]">
      <video id="myVideo" width="100%" height="100%" controls>
        <source src="../public/movie3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const router = useRouter()
const showInstruction = ref(true)

const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  m1: 'm1',
  bottom: 'bottom',
  video: 'video',
  hidden: 'hidden',
  visible: 'visible',
  blackbg: 'blackbg'
}

const decreaseSound = (minutes) => {
  const video = document.getElementById('myVideo')
  const duration = 60*minutes

  const endTime_minus20 = duration - 5.2;
  const endTime_minus19 = duration - 4.8;
  const endTime_minus18 = duration - 4.6;
  const endTime_minus17 = duration - 4.4;
  const endTime_minus16 = duration - 4.2;
  const endTime_minus15 = duration - 4.0;
  const endTime_minus14 = duration - 3.8;
  const endTime_minus13 = duration - 3.6;
  const endTime_minus12 = duration - 3.4;
  const endTime_minus11 = duration - 3.2;
  const endTime_minus10 = duration - 3.0;
  const endTime_minus9 = duration - 2.8;
  const endTime_minus8 = duration - 2.6;
  const endTime_minus7 = duration - 2.4;
  const endTime_minus6 = duration - 2.2;
  const endTime_minus5 = duration - 2.0;
  const endTime_minus4 = duration - 1.8;
  const endTime_minus3 = duration - 1.6;
  const endTime_minus2 = duration - 1.4;
  const endTime_minus1 = duration - 1.2;

  const decreaseVolume = () => {
    if (video.currentTime >= endTime_minus1) {
      video.volume = 0.0;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus2) {
      video.volume = 0.05;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus3) {
      video.volume = 0.1;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus4) {
      video.volume = 0.15;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus5) {
      video.volume = 0.2;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus6) {
      video.volume = 0.25;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus7) {
      video.volume = 0.3;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus8) {
      video.volume = 0.35;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus9) {
      video.volume = 0.4;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus10) {
      video.volume = 0.45;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus11) {
      video.volume = 0.5;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus12) {
      video.volume = 0.55;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus13) {
      video.volume = 0.6;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus14) {
      video.volume = 0.65;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus15) {
      video.volume = 0.7;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus16) {
      video.volume = 0.75;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus17) {
      video.volume = 0.8;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus18) {
      video.volume = 0.85;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus19) {
      video.volume = 0.9;
      console.log(video.volume);
    } else if (video.currentTime >= endTime_minus20) {
      video.volume = 0.95;
      console.log(video.volume);
    }
  };

  video.addEventListener('timeupdate', decreaseVolume)

  const cleanup = () => {
    video.removeEventListener('timeupdate', decreaseVolume)
  }

  video.addEventListener('ended', cleanup)
  video.addEventListener('pause', cleanup)
}

onMounted(() => {
  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      // Play sound for 1 second
      const audio = new Audio('/chimes.wav')
      audio.play()
      setTimeout(() => {
        audio.pause()
        audio.currentTime = 0

        // Hide instruction and show video
        showInstruction.value = false

        // Ensure the DOM is updated before playing the video
        nextTick(() => {
          const video = document.getElementById('myVideo')
          video.play()

          // Call decreaseSound with the desired duration (e.g., 2 minutes)
          decreaseSound(1)
        })

        // Redirect user after 8 minutes of movie
        setTimeout(() => {
          const redirectAudio = new Audio('/chimes.wav')
          redirectAudio.play()
          document.getElementById('myVideo').pause()
          showInstruction.value = true

          setTimeout(() => {
            redirectAudio.pause()
            redirectAudio.currentTime = 0
            router.push('instructions14')
          }, 1000)
        }, 480000) // Adjusted to 8 minutes in milliseconds (480000ms)
      }, 1000)
    }
  }

  document.addEventListener('keydown', keyDownHandler)

  onUnmounted(() => {
    document.removeEventListener('keydown', keyDownHandler)
  })
})
</script>

<style module>
.container {
  /* Add your styles here */
}
.main {
  /* Add your styles here */
}
.video {
  /* Add your styles here */
}
.h1 {
  /* Add your styles here */
}
.m1 {
  /* Add your styles here */
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.hidden {
  display: none;
}
.visible {
  display: block;
}
.blackbg {
  background: black;
  color: black;
}
</style>

<style global>
body {
  background: #000;
}
</style>
