<template>
  <div class="header">
    <div class="h-left">
        <div class="logo" @click="toGoHome"></div>
    </div>
    <div class="h-info">欢迎您使用尼翁咨询后台管理系统</div>
    <div class="h-right">
        <div class="h-phone">
            <div class="phone-ico"></div>
            <span>联系电话：400-8888-8888</span>
        </div>
        <div class="h-message">
            <span class="msg-ico" @click="toGoMessage"></span>
            <router-link to="">
                <span class="msg1-ico"></span>
            </router-link> 
        </div>
        <div class="h-logout" @click="toLogout">
            <div class="logout-ico"></div>
            <span>立即退出</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
        userInfo:''
    }
  },
  methods:{
      toGoMessage(){
          if(this.userInfo.department_id == 8 ){
            return
          }else{
              this.$router.push({'path':'/msg'})
          }
      },
      toGoHome(){
          if(this.userInfo.department_id == 8 || this.userInfo.department_id == 4){
                this.$router.push({path:'/boss'})
        }else{
            this.$router.push({path:'/department'})
        }
      },
      toLogout(){
           this.$confirm('确定退出 么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push({'path':'/'})
        })

      }
  },
  mounted(){
      this.$axios.post('api/user/user/user_info',{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
        }).then(res=>{
            if(res.data.response_data){
                this.userInfo = res.data.response_data.lists;
            }
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    width:100%;
    height:63px;
    border-top:1px solid #3e4f65;
    background:#1f2b44;
}
.h-left{
    float:left;
    overflow:hidden;
    width:196px;
    padding:10px 0 0 28px;
}
.logo{
    width:196px;
    height:42px;
    background:url(../../../static/images/c-bg.png);
    cursor:pointer;
}
.h-info{
    float:left;
    margin:23px 0 0 50px;
    font-size:16px;
}
.h-right {
    float:right;
    width:500px;
}
.h-phone {
    float:left;
}
.phone-ico {
    width:22px;
    height:22px;
    background:url(../../../static/images/phone.png);
    float:left;
    margin-top:20px;
}
.h-phone span{
    float:left;
    margin:20px 0 0 6px;
    font-size:14px;
}
.h-message {
    float:left;
    margin-left:26px;
}
.msg-ico {
    display:block;
    float:left;
    width:28px;
    height:20px;
    background:url(../../../static/images/msg.png);
    margin-top:20px;
}
.msg1-ico {
    display:block;
    float:left;
    width:26px;
    height:30px;
    background:url(../../../static/images/msg01.png);
    margin:16px 0 0 16px;
}
.h-logout {
    float:left;
    margin-left:36px;
    cursor:pointer;
}
.logout-ico {
    float:left;
    width:27px;
    height:24px;
    background:url(../../../static/images/logout.png);
    margin:19px 10px 0 0 ;
}
.h-logout span{
    float:left;
    font-size:18px;
    margin-top:19px;
}
</style>