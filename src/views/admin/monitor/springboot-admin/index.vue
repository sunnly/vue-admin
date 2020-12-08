<template>
  <iframe id="bdIframe" :src="src" width="100%" frameborder="0" />
</template>

<script>
export default {
  name: 'SpringBootAdmin',
  data() {
    return {
      src: 'http://localhost:8764/'
    }
  },
  mounted() {
    const oIframe = document.getElementById('bdIframe')
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.height = (Number(deviceHeight) - 120) + 'px'
  }
}
</script>
