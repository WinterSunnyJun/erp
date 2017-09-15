<template>
    <div id="client-client-detail-check">
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
            <!--<transition name="el-fade-in-linear">
                <router-view></router-view>
            </transition>-->
            <component :is="currentView" ></component>
        </div>
    </div>
</template>

<script>
import Basic from './basic'
import Product from './product' 
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
                  view:'product',
                  tit:'产品部'  
                }
            ]
        }
    },
    components:{
        'basicinfo':Basic,
        'product':Product,

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