<template>
    <div class="sidebar">
         <div class="s-user">
            <div class="user-pic">
                <img src="../../../static/images/user-pic.png" alt="">
            </div>
            <div class="s-username">
                <span>{{userInfo.department_id}} : </span>
                <span>{{userInfo.nickname}}</span>
            </div>
         </div>
        <div class="side-lists">
            <ul>
                <li v-if="ele.url" v-for="(ele,index) in menuLists" @click="toGoPath(index,ele.url)" :class="{active:active == index}">
                    <i class="item-icon"></i>{{ele.name}}
                </li>
                <li v-if="ele.id" v-for="(ele,index) in menuLists" @click="toGoId(index,ele.id)" :class="{active:active == index}">
                    <i class="item-icon"></i>{{ele.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
var qs = require('qs')
export default {
    data() {
        return {
            userInfo:'',
            menuLists: [],
            active:'888'
        }
    },
    computed:{

    },
    methods:{
        toGoPath(index,url){
            this.active = index
            this.$router.push({'path':url})
        },
        toGoId(index,id){
            this.active = index
            this.$router.push({'path':'/admintask',query:{"id":id}})
            console.log(id)
        }
    },
    mounted(){
         this.$axios.post('api/user/user/user_info',{
              headers:{'Content-type':'application/x-www-form-urlencoded'}
              }).then(res=>{
                  var users = res.data.response_data.lists;
                  if(users.department_id ==1){
                     users.department_id ='设计部'
                  }else if(users.department_id ==2){
                      users.department_id ='数据分析部'
                  }else if(users.department_id ==3){
                      users.department_id ='质检部'
                  }else if(users.department_id ==4){
                      users.department_id ='产品部'
                  }else if(users.department_id ==5){
                      users.department_id ='材料供应商'
                  }else if(users.department_id ==6){
                      users.department_id ='OEM代加工'
                  }else if(users.department_id ==7){
                      users.department_id ='客户'
                  }else if(users.department_id ==8){
                      users.department_id ='超级管理员'
                  }
                this.userInfo = users;
          })
          this.$axios.get('api/user/user/menu_lists')
            .then(res=>{
                if(res.data.response_data){
                    this.menuLists = res.data.response_data.lists
                }
            })
    }
}
</script>

<style scoped>
.sidebar{
    overflow:hidden;
    display: block;
    float:left;
    width: 250px;
    height:100%;
}
.sidebar > ul {
    height:100%;
}
.s-user{
    overflow:hidden;
    color:#fff;
    width:100%;
    height:235px;
    background: url(../../../static/images/user-bg.png) no-repeat;
}
.user-pic {
    width:70px;
    height:70px;
    margin:63px auto 0;
    background:#fff;
    border-radius:50%;
    overflow:hidden;
}
.s-username {
    margin-top:25px;
    text-align:center;
    color:#fff;

}
.side-lists{
    width:100%;
    height:100%;
    background:rgba(37,61,77,0.7);
}
.side-lists ul li{
    color:#fff;
    font-size:16px;
    height:63px;
    line-height: 63px;
    border-bottom:1px solid #4181b3;
    cursor:pointer;
}
.side-lists ul li .item-icon {
    float:left;
    display:inline-block;
    width:13px;
    height:15px;
    background: url(../../../static/images/admin-user.png) ;
    margin:25px 30px 0 60px;
}

.side-lists ul li:hover{
    background: rgba(0,0,0,0.5)
}
.side-lists ul li.active{
    border-right:6px solid #1c7dfa;
    width:244px;
}


</style>