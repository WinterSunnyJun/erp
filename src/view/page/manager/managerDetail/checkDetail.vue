<template>
    <div id="manager-detail-check">
        <div class="check-head">
            <ul>
                <li v-for="(ele,index) in titList">
                    <div :class="{active:active==index}" @click="goListItem(index,ele.view)">
                        <div :class="'check-icon check-icon'+index"></div>
                        <span>{{ele.tit}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="check-content">
            <component :is="currentView" ></component>
        </div>
    </div>
</template>

<script>
import Basic from './basic'
import Client from './client'
import Datafx from './datafx' 
import Design from './design' 
import Supplier from './supplier' 
import Testing from './testing' 
import Oem from './oem' 

export default {
    data(){
        return{
            active:0,
            currentView:'basicinfo',
            titList:[
                {
                  view:'basicinfo',
                  tit:'基本资料'  
                },
                {
                  view:'client',
                  tit:'客户'  
                },
                {
                  view:'datafx',
                  tit:'数据分析部'  
                },
                {
                  view:'design',
                  tit:'设计部'  
                },
                {
                  view:'testing',
                  tit:'质检部'  
                },
                {
                  view:'supplier',
                  tit:'材料供应商'  
                },
                {
                  view:'oem',
                  tit:'OEM代加工'  
                }
            ]
        }
    },
    components:{
        'basicinfo':Basic,
        'client':Client,
        'datafx':Datafx,
        'design':Design,
        'testing':Testing,
        'supplier':Supplier,
        'oem':Oem
    },
    methods:{
        goListItem(index,view){
            this.active = index;
			this.currentView = view;       
        }
    },
}
</script>

<style scoped>
.check-head{
    width:1410px;
    margin:40px 0 0 110px;
} 
.check-head ul{
    overflow:hidden;
}
.check-head ul li{
    float:left;
    margin-right:11px;
}
.check-head ul li div{
    width:190px;
    height:63px;
    background:rgba(0,0,0,0.3);
    cursor:pointer;
}
.check-head ul li .active{
    background:rgba(255,255,255,0.3)
}
.check-head ul li .check-icon{
    float:left;
    width:18px;
    height:18px;
    margin:22px 30px 0 20px;
}
.check-head ul li .check-icon0{
    background:url(../../../../../static/images/task03.png) no-repeat center;
}
.check-head ul li .check-icon1{
    background:url(../../../../../static/images/admin-user.png) no-repeat center;
}
.check-head ul li .check-icon2{
    background:url(../../../../../static/images/c-fxb.png) no-repeat center;
}
.check-head ul li .check-icon3{
    background:url(../../../../../static/images/c-sjb.png) no-repeat center;
}
.check-head ul li .check-icon4{
    background:url(../../../../../static/images/c-zjb.png) no-repeat center;
}
.check-head ul li .check-icon5{
    background:url(../../../../../static/images/c-gys.png) no-repeat center;
}
.check-head ul li .check-icon6{
    background:url(../../../../../static/images/c-djg.png) no-repeat center;
}
.check-head ul li span{
    line-height:63px;
    font-size:18px;
}
.check-content{
    margin:41px 0 0 110px;
    width:1450px;
}
</style>