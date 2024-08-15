<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">
        Important!
      </h1>

      <p>
        <br />
        If you perform well enough on the task, you will have the chance to win {{ rewardAmount }}. <br/><br/>
        At the end of the experiment, 2 participants who have successfully completed the task will be randomly selected and will win the mentioned amount. The participants will be contacted directly by the study coordinator. <br/><br/>
      </p>

      <h3 :class="styles.bottom"> Press Enter to start the task </h3>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const router = useRouter()
const { cookies } = useCookies()

const rewardAmount = ref('USD')

const updateRewardAmount = () => {
  const condition = cookies.get('subject_condition')
  switch (condition) {
    case '1':
      rewardAmount.value = 'USD 1'
      break
    case '2':
      rewardAmount.value = 'USD 0.01'
      break
    default:
      rewardAmount.value = 'USD 1'
      break
  }
}

const keyDownHandler = (e) => {
  if (e.key === 'Enter') {
    document.getElementById('main1').classList.add('blackbg')
    setTimeout(() => {
      router.push('task')
    }, 50)
  }
}

onMounted(() => {
  updateRewardAmount()
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
