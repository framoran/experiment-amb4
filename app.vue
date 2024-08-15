<template>
    <router-view :styles="styles" />

  <NuxtLayout>
  </NuxtLayout>
</template>

<style global>
/* Global styles */
body {
  font-size: 1.5rem;
}

.container {
  padding: 0 2rem;
}

.main {
  align-items: center;
  background-color: #fff;
  margin-left: 5vh;
  margin-right: 5vh;
  margin-top: 10vh;
  padding: 5vh;
  height: 80vh;
  text-align: center;
  position: relative;
}

.h1 {
  margin-bottom: 15px !important;
}

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.box1 {
  display: inline-block;
  padding: 25px;
  background-color: grey;
  margin: 15px;
  width: 200px;
}

.blackbg {
  background: black;
  color: black;
}

.hidden {
  visibility: hidden;
}
</style>
<script setup>
const styles = {
  container: 'container',
  main: 'main',
  h1: 'h1',
  bottom: 'bottom',
  blackbg: 'blackbg'
}
</script>