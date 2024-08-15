<template>
  <div :class="styles.container">
    <Head>
      <title>Experiment</title>
      <meta name="description" content="Experiment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main id="main1" :class="styles.main">
      <h1 :class="styles.h1">Instruction</h1>

      <div class="container">
        <form @submit.prevent="handleSubmit">
          <label for="letterJ">Write the exact number of letters J you counted (example: 4)</label>
          <input
            class="form-control"
            type="text"
            id="letterJ"
            v-model="letterJ"
            required
            autocomplete="off"
          />

          <label for="letterK">Write the exact number of letters K you counted</label>
          <input
            class="form-control"
            type="text"
            id="letterK"
            v-model="letterK"
            required
            autocomplete="off"
          />

          <label for="letterL">Write the exact number of letters L you counted</label>
          <input
            class="form-control"
            type="text"
            id="letterL"
            v-model="letterL"
            required
            autocomplete="off"
          />

          <label for="letterM">Write the exact number of letters M you counted</label>
          <input
            class="form-control"
            type="text"
            id="letterM"
            v-model="letterM"
            required
            autocomplete="off"
          />

          <button
            type="submit"
            class="bottom btn btn-dark mt-3"
            :disabled="isSubmitting"
            style="background-color: transparent; border: none"
          >
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <h3 :class="styles.bottom">
              <span style="color: black">Press Enter to validate your responses</span>
            </h3>
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isSubmitting = ref(false)
const letterJ = ref('')
const letterK = ref('')
const letterL = ref('')
const letterM = ref('')

const router = useRouter()

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate form submission delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const response = await fetch('/api/form-letter2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        letterJ: letterJ.value,
        letterK: letterK.value,
        letterL: letterL.value,
        letterM: letterM.value,
      }),
    })

    if (response.ok) {
      // Redirect or perform any other action after successful submission
      router.push('/instructions23')
    } else {
      // Handle submission errors here
      console.error('Form submission failed')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
}
</script>

<style scoped>
body {
  background: #000;
}

.container {
  padding: 2rem;
  margin: auto;
}

.main {
  margin-top: 2rem;
  padding: 2rem;
  background-color: #fff;
  text-align: center;
  border-radius: 8px;
}

.h1 {
  margin-bottom: 1rem;
}

.bottom {
  position: relative;
  margin-top: 2rem;
}

.form-control {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
