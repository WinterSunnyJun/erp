<template>
  <div class="project-add">
        <div class="add-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>项目编辑</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">项目名称</td>
                        <td width="435">
                            <input type="text" v-model="name">
                        </td>
                        <td width="276">客户名称</td>
                        <td width="435">
                            <input type="text" v-model="clientFzr" readonly="readonly">
                        </td>
                        
                    </tr>
                    <tr>
                        <td>客户负责人</td>
                        <td>
                            <input type="text" v-model="client" readonly="readonly">
                        </td>
                        <td>产品经理</td>
                        <td>
                            <select v-model="cpjl">
                                <option v-for="ele in cpbLists" :value="ele">{{ele.nickname}}</option>
                              </select> 
                        </td>
                        
                    </tr>
                     <tr>
                         <td>设计部</td>
                        <td>
                            <input type="text" v-model="sjb" readonly="readonly">
                        </td>
                        <td>数据分析部</td>
                        <td>
                            <input type="text" v-model="sjfxb" readonly="readonly">
                        </td>
                        
                    </tr>
                    <tr>
                        <td>质检部</td>
                        <td>
                            <input type="text" v-model="zjb" readonly="readonly">
                        </td>
                        <td>产品供应商</td>
                        <td>
                            <input type="text" v-model="cpgys" readonly="readonly">
                        </td>
                        
                    </tr>
                    <tr>
                        <td>OEM代加工 </td>
                        <td>
                            <input type="text" v-model="djg" readonly="readonly">
                        </td>
                        <td>截至时间</td>
                        <td>
                            <el-date-picker
                                v-model="endTime"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0">
                            </el-date-picker>
                        </td>
                    </tr>
                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">项目描述 :</div>
                <div class="d-conter">
                    <textarea v-model="describe"></textarea>
                </div>
            </div>
            <div class="add-accessory">
                <div class="add-icon"></div>
                <div class="add-box">
                    <input @change="handleFileChange" id="inputer" type="file"/>
                    <label for="inputer">
                        添加附件
                    </label>
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
var qs = require('qs')
export default {
  data () {
    return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
       name:'',
       client:'',
       clientFzr:'',
       cpjl:'',
       endTime:'',
       describe:'',
       status:'',
       files:{},
       sjb:'',
       zjb:'',
       sjfxb:'',
       cpgys:'',
       djg:'',
       cpbLists:[]
    }
  },
  methods:{
    handleFileChange($event){
        this.files = $event.target.files[0]
    },
     onToSubmit(){
         this.$router.push({path:'/pcheck'})
             if(this.clientId =='请选择' ||this.cpbId =='请选择'|| this.sjbId =='请选择'|| this.sjfxId =='请选择'|| this.zjbId =='请选择'|| this.gysId =='请选择'|| this.djgId =='请选择'|| this.describe ==''|| this.files =={}){
                this.$alert('请填写完整','提示');
                return
             }
            var endTime = (new Date(this.endTime).getTime())/1000
            var formData = new FormData();
            formData.append('project_id', this.$route.query.id);
            formData.append('name', this.name);
            formData.append('customer_user_id', this.clientId);
            formData.append('product_user_id', this.cpjl.id);
            formData.append('content', this.describe);
            formData.append('end_time', endTime);
            formData.append('enclosure_files', this.files);
          this.$axios.post('api/task/task/update_project',formData,{
              headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    this.$alert('修改成功','提示')
                    
                }else if(res.data.error_msg == 'internal server error'){
                   this.$alert("请添加附件！","提示")
               }else if(res.data.error_msg ){
                   this.$alert("修改失败！","提示")
               }
          })

      }
  },
  mounted(){
    this.$axios.get('api/task/task/project_info',{params:{
        'project_id':this.$route.query.id,
    }})
        .then(res=>{
            if(res.data.response_data){
                var data = res.data.response_data.lists;
                var users = res.data.response_data.lists.user
                var date = new Date(parseInt(data.end_time) * 1000)
                var time = (date.getFullYear()) + '-' + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
                this.name = data.name;
                this.endTime = time;
                this.describe = data.content;
                this.status = data.status;
                this.cpjl = data.product_user_name;
                this.clientFzr = data.customer_user_name;
                this.sjb=users[2].nickname;
                this.zjb=users[4].nickname;
                this.sjfxb=users[3].nickname;
                this.cpgys=users[0].nickname;
                this.djg=users[1].nickname;
                this.client=users[5].nickname;
            }
            
    }) 
    this.$axios.get('api/user/staff/lists',{params:{
        num:999999,
    }}).then(res=>{
        if(res.data.response_data){
            var staffLists = res.data.response_data.lists;
            console.log(staffLists)
            staffLists.forEach((ele,index)=>{
                if(ele.department_id == 4){
                    this.cpbLists.push(ele)
                }
            })
        }
    });
      console.log(this.cpjl)
    
  }
 
}
</script>
<style scoped>
.add-table {
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
.p-table tbody tr td:nth-child(2n){
    border-right:1px solid #686572;
}
.p-table tbody tr td:last-child{
    border-right:none;
}
.p-table tbody tr td:nth-child(2n-1){
    border-right:1px solid #686572;
}


.p-table tbody tr td input{
    height:60px;
    border:0;
    background:none;
    color:#fff;
    font-size:20px;
    outline:0;
}
.p-table tbody tr td select {
    width:350px;
    height:62px;
    font-size:20px;
    background:none;
    border:0;
    color:#fff;
    outline:0;
    margin-bottom:-3px;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
}
.p-table tbody tr td select option{
    color:#fff;
    background-color:black;
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
.add-accessory{
    height:50px;
    border-top:1px solid #686572;
    line-height:50px;
    padding-left: 62px ;
    cursor:pointer;
}
.add-accessory .add-box label{
    cursor:pointer;
}
.add-accessory .add-box input {
    width: 0px; 
    height: 0px; 
    display: none; 
}
.add-icon{
    float:left;
    width:18px;
    height:18px;
    background:url(../../../../../static/images/add.png);
    margin:16px 12px 0 0;
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
.el-date-editor .el-input__inner{
    background-color:none;
}
</style>