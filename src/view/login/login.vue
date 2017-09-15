<template>
  <div class="login">
    <div class="l-text-top"></div>
    <div class="l-text-foot"></div>
    <div class="l-login-input">
        <div class="l-logo"></div>
        <div class="l-input">
            <div class="l-user"> 
                <label for="username" >
                    <span>用户名</span>
                    <input id="username" type="text" v-model="username">
                </label>
            </div>
            <div class="l-user">
                <label for="password" >
                    <span>密码</span>
                    <input id="password" type="text" v-model="password">
                </label>
            </div>
            <div class="verify">
                <div class="v-input"><input type="text" v-model="code" placeholder="验证码"></div>
                <div class="v-pic">
                    <img src="../../../static/images/login/login-yam.png" alt="">
                </div>
            </div>
            <div class="submit">
                <button @click="onToSubmit" >登录</button>
            </div>
        </div>
    </div>
     <div class="l-footer">
        <p>Copyright 2008-2016 前潮网络 版权所有1369-2号 Powered by 前潮网络,all rights reserved 京ICP 备11019951 号-1</p>
     </div>
  </div>
</template>

<script>
var qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
        username:'',
        password:'',
        code:'',
    }
  },
  methods:{
      onToSubmit(){
            var params = qs.stringify({
            'username':this.username,
            'password':this.password,
            'code':this.code
          })
          this.$axios.post('api/user/user/login',params,{
              headers:{'Content-type':'application/x-www-form-urlencoded'}
              }).then(res=>{
                   var loginMsg = res.data;
                  if(res.data.response_data){
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    this.$axios.post('api/user/user/user_info',{
                        headers:{'Content-type':'application/x-www-form-urlencoded'}
                        }).then(res=>{
                            var userInfo = res.data.response_data.lists;
                            if(userInfo.department_id == 8 || userInfo.department_id == 4){
                                  this.$router.push({path:'/boss'})
                            }else{
                                this.$router.push({path:'/department'})
                            }
                    })
                  }else{
                    this.$message.error('账号或密码错误');
                  }
          })
      }
  },
  mounted(){
    
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    position:relative;
    width:100%;
    height:100%;
    background:url(../../../static/images/login/login-bg.png) no-repeat;
    background-size:cover;
}
.l-text-top {
    position:absolute;
    left:100px;
    top:322px;
    width:779px;
    height:73px;
    background:url(../../../static/images/text-t.png) no-repeat;
}
.l-text-foot {
    position:absolute;
    left:90px;
    top:423px;
    width:586px;
    height:55px;
    background:url(../../../static/images/text-f.png) no-repeat;
}
.l-login-input{
    position:absolute;
    right:60px;
    top:166px;
    width:355px;
    height:468px;
    background:url(../../../static/images/l-rbg.png) no-repeat;
}
.l-logo {
    width:100%;
    height:129px;
    background:url(../../../static/images/login/login-logo.png);
}
.l-input {
    width:100%;
    padding:40px 20px 0; 
}
.l-user {
    width:314px;
    height:48px;
    background:url(../../../static/images/login/login-inputbg.png);
    margin-bottom:23px;
}
.l-user span{
    display:block;
    float:left;
    width:70px;
    height:48px;
    line-height:48px;
    padding-left:30px;
    font-size:16px;
}
.l-user input {
    height:48px;
    border:0;
    outline:0;
    background:none;
    color:#fff;
    font-size:16px;
}
.verify {
    overflow:hidden;
    width:314px;
}
.v-input {
    float:left;
    width:180px;
    height:46px;
    border:1px solid #fff;
    border-radius:3px;
}
.v-input input {
    width:100%;
    height:46px;
    border:0;
    outline:0;
    font-size:18px;
    text-align:center;
    background:none;
    color:#fff;
}
.v-pic {
    float:right;
    width:120px;
    height:48px;
    background:#fff;
    text-align:center;
}
.v-pic img {
    margin-top:3px;
}
.submit {
    width:314px;
    height:48px;
    background:url(../../../static/images/login/login-inputbg.png);
    margin-bottom:23px;
    margin-top:40px;
}
.submit button{
    width:100%;
    height:100%;
    border:0;
    outline:0;
    background:none;
    color:#fff;
    font-size:16px;
    cursor:pointer;
}
.l-footer {
    position:absolute;
    bottom:30px;
    width:100%;
}
.l-footer p{
    width:1280px;
    margin:0 auto; 
    font-size:24px;   
}
</style>