<template>
    <div class="wrapper">
        <vHead></vHead>
        <div class="content">
            <v-sidebar></v-sidebar>
            <div class="b-right" >
                <transition name="el-fade-in-linear">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
//v-if="userInfo.type == 1"
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    data(){
        return{
        }
    },
    components:{
         vHead,vSidebar
    },
    methods:{

    },
    mounted(){
    }
}
</script>
<style scoped>
.content{
    width:100%; 
    position:absolute;
    top:64px; 
    bottom:0;
}
.b-right{
    position:relative;
    overflow:auto; 
    height:100%;
}  
</style>