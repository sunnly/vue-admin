<template>
  <div class="app-container">
    <el-button @click="showVueBpmn = true">打开bpmn</el-button>
    <Bpmn v-if="showBpmn" />
    <VueBpmn v-if="showVueBpmn" />
  </div>
</template>

<script>
import Bpmn from '@/components/Bpmn'
import VueBpmn from '@/components/VueBpmn'
export default {
  name: 'ActivitiManager',
  components: { Bpmn, VueBpmn },
  data() {
    return {
      showBpmn: false,
      showVueBpmn: false
    }
  }
}
</script>

<style scoped type="less">

</style>
