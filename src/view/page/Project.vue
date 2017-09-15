<template>
    <div id="#boss">
      <vProjectTit></vProjectTit>
      <vProjectFoot></vProjectFoot>
      <vProjecttable></vProjecttable>
    </div>
</template>

<script>
import vProjectFoot from '@/view/public/projectFoot'
import vProjectTit from '@/view/public/projectTit'
import vProjecttable from '@/view/public/projectTable'
export default {
  name: 'boss',
  components:{
      vProjectFoot, 
      vProjectTit,
      vProjecttable,
  }
}
</script>

<style scoped>


</style>