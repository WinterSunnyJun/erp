<template>
    <div id="add-account">   
        <div class="add-account-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>创建账号</span>
            </div>
            <table class="p-table" width="1426"   cellspacing="0" align="center">
                <tbody>
                    <tr>
                        <td width="276">姓名</td>
                        <td width="435">
                            <input type="text" v-model="username">
                        </td>
                        <td width="276">账号</td>
                        <td width="435">
                            <input type="text" v-model="account">
                        </td>
                    </tr>
                    <tr>
                        <td width="276">密码</td>
                        <td width="435">
                            <input type="text" v-model="password">
                        </td>
                        <td>部门</td>
                        <td>
                       
                            <select class="department" v-model="departmentId">
                                <option v-for="ele in dedepartments">{{ele.name}}</option>
                            </select>
                           <!--
                         <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                         -->
                        
                        </td>
                    </tr>
                    <tr>
                        <td>联系方式</td>
                        <td><input type="text" v-model="mobeil"></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody> 
            </table>
            <div class="client-bottom">
                <div class="b-content">
                    <div class="client-submit" @click="onToSubmit">提交</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var qs = require('qs')
export default {
  data () {
    return {
       dedepartments:[],
       username:'',
       account:'',
       password:'',
       roleId:'' ,
       departmentId:'设计部',
       type:'',
       mobeil:'',
      
    }
  },
  methods:{
    toGoBack(){
        this.$router.push({path:'/account'})
    },
    onToSubmit(){
        var departmentId = ''
        if(this.departmentId == '设计部'){
            departmentId = 1
        }else if(this.departmentId == '数据分析部'){
            departmentId = 2
        }else if(this.departmentId == '质检部'){
            departmentId = 3
        }else if(this.departmentId == '产品部'){
            departmentId = 4
        }else if(this.departmentId == '材料供应商'){
            departmentId = 5
        }else if(this.departmentId == 'OEM代加工'){
            departmentId = 6
        }
        var params = qs.stringify({
        'nickname':this.username,
        'password':this.password,
        'username':this.account,
        'role_id':this.roleId,
        'department_id':departmentId,
        'type':this.type,
        'mobile':this.mobeil
        })
        if(this.username=='' || this.password =='' || this.account =='' || this.departmentId =='' ||this.mobeil ==''){
           return this.$alert("请填写完整！",'提示') 
        }

        this.$axios.post('api/user/staff/add_staff',params,{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{

               if(res.data.error_msg == 'param mobile illegal.'){
                   this.$alert("手机号输入不正确！","提示")
               }else if(res.data.error_msg == '用户账号已存在'){
                   this.$alert("用户名已存在！！","提示")
               }else if(res.data.response_data.lists == 1){
                   this.$alert("创建成功","提示")
               }
        })   
    }
  },
  mounted(){
      this.$axios.get('api/user/staff/department_lists')
        .then(res=>{
            if(res.data.response_data){
                this.dedepartments = res.data.response_data.lists
            }
        })
  }
}
</script>
<style scoped>
input .el-input__inner {
    height:50px;
    font-size:20px;
}
.add-account-table {
    width:1426px;
    position:absolute;
    left:111px;
    top:144px;
    font-size:20px;
    background:rgba(0,0,0,0.4)
}
.f-tit{
    overflow:hidden;
    height:100px;
}
.tit-icon{
    float:left; 
    width:28px;
    height:20px;
    margin-top:38px;
    margin-left:62px;
    background:url(../../../../../static/images/msg.png);
}
.f-tit span {
    line-height:100px;
    margin-left:19px;
    font-size:24px;
}
.p-table tbody tr td{
    line-height:63px;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
    font-size:22px;
    padding-left:62px;
}
.p-table tbody tr td input{
    height:60px;
    border:0;
    background:transparent;
    color:#fff;
    outline:0;
    font-size:22px;
}
.p-table tbody tr td:nth-child(2){
    padding-left:80px;
    border-right:1px solid #686572;
}
.p-table tbody tr td:last-child{
    border-right:none;
    padding-left:80px;
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

.client-bottom {
    width:1426px;
    position:absolute;
    left:0;
    top:500px;
}
.b-content {
    width:239px;
    margin:0 auto;
}
.b-content div {
    width:239px;
    height:63px;
    background:rgba(0,0,0,0.3);
    margin-right:3px;
    float:left;
    text-align:center;
    line-height:63px;
    cursor:pointer;
    font-size:20px;
}
</style>