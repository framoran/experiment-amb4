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
          <label for="letterD" class="mt-3">Write the exact number of letters D you counted (example: 4)</label>
          <input
            class="form-control"
            type="text"
            id="letterD"
            v-model="letterD"
            required
            autocomplete="off"
          />

          <label for="letterE" class="mt-3">Write the exact number of letters E you counted</label>
          <input
            class="form-control"
            type="text"
            id="letterE"
            v-model="letterE"
            required
            autocomplete="off"
          />

          <label for="letterF" class="mt-3">Write the exact number of letters F you counted</label>
          <input
            class="form-control"
            type="text"
            id="letterF"
            v-model="letterF"
            required
            autocomplete="off"
          />

          <label for="letterG" class="mt-3">Write the exact number of letters G you counted</label>
          <input
            class="form-control"
            type="text"
            id="letterG"
            v-model="letterG"
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
const letterD = ref('')
const letterE = ref('')
const letterF = ref('')
const letterG = ref('')

const router = useRouter()

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate form submission delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const response = await fetch('/api/form-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        letterD: letterD.value,
        letterE: letterE.value,
        letterF: letterF.value,
        letterG: letterG.value,
      }),
    });

    if (response.ok) {
      // Redirect or perform any other action after successful submission
      router.push('/instructions13');
    } else {
      // Handle submission errors here
      console.error('Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
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

.box1, .box2, .box3 {
  padding: 25px;
  background-color: grey;
  margin: 15px;
}

.box2 {
  border: 2px solid green;
}

.box3 {
  border: 2px solid red;
}
</style>
