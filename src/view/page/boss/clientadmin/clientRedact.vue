<template>
  <div class="client-redact">
        <div class="check-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>客户查看</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">客户名称</td>
                        <td width="435">
                            <input type="text" v-model="name">
                        </td>
                        <td width="276">负责人</td>
                        <td width="435">
                            <input type="text" v-model="nickname">
                        </td>
                        
                    </tr>
                    
                    <tr>
                        <td>客户账号</td>
                        <td>
                            <input type="text" v-model="username" readonly>
                        </td>
                        <td>密码</td>
                        <td>
                            <input type="text" v-model="password">
                        </td>
                    </tr>
                    <tr>
                        <td>联系方式</td>
                        <td>
                            <input type="text" v-model="mobile">
                        </td>
                        <td>优先级</td>
                        <td>
                            <select class="department" v-model="priority">
                                 <option>A</option>
                                 <option>B</option>
                                 <option>C</option>
                                 <option>D</option>
                             </select>
                        </td>
                    </tr>
                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">公司描述 :</div>
                <div class="d-conter">
                    <textarea v-model="district"></textarea>
                </div>
            </div>
        </div>
        <div class="client-bottom">
            <div class="b-content">
                <div class="client-submit" @click="onToSubmit">提交</div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        name:'',
        nickname:'',
        username:'',
        password:'',
        mobile:'',
        district:'',
        priority:''
    }
  },
  methods:{
    onToSubmit(){
         if(this.name =='' ||this.nickname ==''|| this.mobile ==''|| this.district ==''|| this.priority ==''){
                this.$alert('请填写完整','提示')
                return
             }
            var formData = new FormData();
            formData.append('user_id', this.$route.query.id);
            formData.append('name', this.name);
            formData.append('nickname', this.nickname);
            formData.append('mobile', this.mobile);
            formData.append('company_district', this.district);
            formData.append('priority', this.priority);
            formData.append('password', this.password);
          this.$axios.post('api/user/customer/update',formData,{
              headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    this.$alert('修改成功!', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push({path:'/adminclient'})
                        }
                    });
                    
                }else if(res.data.error_msg == 'internal server error'){
                   this.$alert("请添加附件！","提示")
               }else if(res.data.error_msg ){
                   this.$alert("修改失败！","提示")
               }
          })
    }
  },
  mounted(){
      this.$axios.get('api/user/customer/info',{params:{
        'user_id':this.$route.query.id,
        }})
            .then(res=>{
                var clientInfo = res.data.response_data.lists;
                this.name = clientInfo.name;
                this.nickname = clientInfo.nickname;
                this.username = clientInfo.username;
                this.mobile = clientInfo.mobile;
                this.name = clientInfo.name;
                this.district = clientInfo.company_district;
                this.priority = clientInfo.priority
        }) 
  }
 
}
</script>
<style scoped>
.check-table {
    width:1426px;
    margin-left:110px;
    margin-top:86px;
    font-size:22px;
    background:rgba(0,0,0,0.4)
}
.f-tit{
    overflow:hidden;
    height:100px;
}
.tit-icon{
    float:left; 
    width:25px;
    height:25px;
    margin-top:38px;
    margin-left:62px;
    background:url(../../../../../static/images/task01.png);
}
.f-tit span {
    line-height:100px;
    margin-left:30px;
    font-size:28px;
}
.p-table tbody tr td{
    line-height:63px;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
    font-size:22px;
    padding-left:62px;
}
.p-table tbody tr td:nth-child(2){
    padding-left:80px;
    border-right:1px solid #686572;
}
.p-table tbody tr td:last-child{
    border-right:none;
    padding-left:80px;
}
.p-table tbody tr td input{
    height:60px;
    border:0;
    background:none;
    color:#fff;
    font-size:20px;
    outline:0;
}
.p-table tbody tr td .department {
    width:300px;
    height:62px;
    font-size:20px;
    background:transparent;
    border:0;
    color:#fff;
    outline:0;
}
.p-table tbody tr td .department option{
    color:#fff;
    background:rgba(0,0,0,1);
    padding:10px 0;
    border:none;
    outline:none;
}
.p-describe .d-tit {
    height:63px;
    border-top:1px solid #686572;
    padding-left:62px;
    line-height:63px;
}
.p-describe .d-conter{
    border-top:1px solid #686572;
    padding:28px 62px 60px;
    line-height:40px;
}
.d-conter textarea{
    width:1300px;
    height:100px;
    line-height:40px;
    font-size:20px;
    color:#fff;
    background:none;
    border:0;
    outline:0;
}
.client-bottom {
    width:1426px;
    margin:58px 0 50px 110px;
}
.b-content {
    width:239px;
    margin:0 auto;
    overflow:hidden;
}
.b-content div {
    height:63px;
    width:239px;
    background:rgba(0,0,0,0.3);
    margin-right:3px;
    float:left;
    text-align:center;
    line-height:63px;
    cursor:pointer;
}
</style>