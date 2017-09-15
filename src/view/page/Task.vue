<template>
    <div id="#manager">
      <v-tasktit></v-tasktit>
      <v-tasktable></v-tasktable>
      <v-taskfoot></v-taskfoot>
    </div>
</template>

<script>
import vTaskFoot from '@/view/public/taskFoot'
import vTaskTit from '@/view/public/taskTit'
import vTasktable from '@/view/public/taskTable'
export default {
  name: 'manager',
  components:{
      'v-tasktit':vTaskTit, 
      'v-tasktable':vTasktable,
      'v-taskfoot':vTaskFoot,
  }
}
</script>

<style scoped>

</style>