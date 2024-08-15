<template>
  <div class="container mt-5">
    <div class="text-center">
      <h1>Experiment AMB4</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="mt-5 w-50" style="margin-left: 25%;">
      <div class="form-group">
        <label for="subject_nb">Subject number</label>
        <input v-model="subjectNb" class="form-control" type="text" id="subject_nb" name="subject_nb" required />
      </div>

      <div class="form-group mt-3">
        <label for="condition">Condition</label>
        <select v-model="condition" class="form-control" id="condition" name="condition">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      <button type="submit" class="btn btn-dark mt-3" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-else class="ml-3">Start</span>
      </button>
    </form>
  </div>
</template>

<script>
definePageMeta({
    layout: 'start'
  })
export default {
  data() {
    return {
      isSubmitting: false,
      subjectNb: '',
      condition: '1',
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        const response = await fetch('/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject_nb: this.subjectNb,
            condition: this.condition,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        this.$router.push('/instructions1');
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
