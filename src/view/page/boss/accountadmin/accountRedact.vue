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
                            <input type="text" v-model="nickname">
                        </td>
                        <td width="276">账号</td>
                        <td width="435">
                            {{username}}
                        </td>
                    </tr>
                    <tr>
                        <td>密码</td>
                        <td><input type="text" v-model="password"></td>
                        <td>部门</td>
                        <td>
                            <select class="department" v-model="departmentId">
                                <option v-for="ele in dedepartments">{{ele.name}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>联系方式</td>
                        <td><input type="text" v-model="mobile"></td>
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
       nickname:'',
       username:'',
       roleId:'' ,
       departmentId:'',
       mobile:'',
       password:'',
       dedepartments:''
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
        }else if(this.departmentId == '客户'){
            departmentId = 7
        }else if(this.departmentId == '超级管理员'){
            departmentId = 8
        }
        var params = qs.stringify({
        'user_id':this.$route.query.id,
        'password':this.password,
        'nickname':this.nickname,
        'department_id':departmentId,
        'username':this.username,
        'mobile':this.mobile
        })
        if(this.nickname =='' || departmentId =='' ||this.username =='' ||this.mobile==''){
            this.$alert('请填写完整！','提示')
            return;
        }
        this.$axios.post('api/user/staff/update_staff',params,{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    this.$alert('修改成功！！','提示')
                }else{
                      this.$alert('修改失败！！','提示')
                }
        })   
    }
  },
  mounted(){
      var params = qs.stringify({
          'user_id':this.$route.query.id,
      })
      console.log(params)
      this.$axios.post('api/user/staff/user_info',params,{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    console.log(res.data.response_data.lists)
                    var data = res.data.response_data.lists;
                    this.nickname=data.nickname;	
                    this.username=data.username;
                    this.roleId = data.role_id;
                    this.mobile = data.mobile;
                    this.password = data.password;
                    if(data.department_id ==1){
                        this.departmentId ='设计部' 
                    }else if(data.department_id ==2){
                        this.departmentId ='数据分析部'
                    }else if(data.department_id ==3){
                        this.departmentId ='质检部'
                    }else if(data.department_id ==4){
                        this.departmentId ='产品部'
                    }else if(data.department_id ==5){
                        this.departmentId ='材料供应商'
                    }else if(data.department_id ==6){
                        this.departmentId ='OEM代加工'
                    }else if(data.department_id ==7){
                        this.departmentId ='客户'
                    }else if(data.department_id ==8){
                        this.departmentId ='超级管理员'
                    }
                   
                    console.log(this.departmentId)

                }
        }) 
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
    height:100%;
    border:0;
    background:none;
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