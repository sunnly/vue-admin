<template>
  <div class="app-container">
    <iframe :src="src" />
  </div>
</template>

<script>
export default {
  name: 'Nacos',
  data() {
    return {
      src: 'http://localhost:8848/nacos/'
    }
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: 800px;
  border: none;
}
</style>
