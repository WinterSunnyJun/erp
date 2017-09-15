<template>
  <div class="project-add">
        <div class="add-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>新建项目</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">项目名称</td>
                        <td width="435">
                            <input type="text" v-model="projectName">
                        </td>
                        <td width="276">客户名称</td>
                        <td width="435">
                              <select v-model="clientId">
                                <option >请选择</option>
                                <option v-for="ele in clientLists" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                    </tr>
                    <tr>
                        <td>产品经理</td>
                        <td>
                            <select v-model="cpbId">
                                <option >请选择</option>
                                <option v-for="ele in cpb" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                        <td>产品供应商 </td>
                        <td>
                            <select v-model="gysId">
                                <option >请选择</option>
                                <option  v-for="ele in gys" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                    </tr>
                     <tr>
                        <td>设计部</td>
                        <td>
                            <select v-model="sjbId">
                                <option >请选择</option>
                                <option  v-for="ele in sjb" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                        <td>质检部</td>
                        <td>
                            <select v-model="zjbId">
                                <option >请选择</option>
                                <option  v-for="ele in zjb" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                    </tr>
                    <tr>
                        <td>数据分析部</td>
                        <td>
                            <select v-model="sjfxId">
                                <option >请选择</option>
                                <option  v-for="ele in sjfxb" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                        <td>OEM代加工</td>
                        <td>
                            <select v-model="djgId">
                                 <option >请选择</option>
                                <option  v-for="ele in djg" :value="ele">{{ele.nickname}}</option>
                              </select>  
                        </td>
                    </tr>
                    <tr>
                        <td>截至时间</td>
                        <td>
                            <el-date-picker
                                v-model="endTime"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0"
                               >
                            </el-date-picker>
                        </td>
                        <td></td>
                        <td></td>
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
                    <span>{{files.name}}</span>
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
       projectName:'',
       cpjl:'',
       endTime:'',
       describe:'',
       files:{'name':'未添加'},
       clientLists:[],
       clientId:'请选择',
       cpbId:'请选择',
       sjbId:'请选择',
       sjfxId:'请选择',
       zjbId:'请选择',
       gysId:'请选择',
       djgId:'请选择',
       cpb:[],
       sjb:[],
       sjfxb:[],
       zjb:[],
       gys:[],
       djg:[]
    }
  },
  methods:{
    handleFileChange($event){
        this.files = $event.target.files[0]
    },
     onToSubmit(){
            if(this.clientId =='请选择' ||this.cpbId =='请选择'|| this.sjbId =='请选择'|| this.sjfxId =='请选择'|| this.zjbId =='请选择'|| this.gysId =='请选择'|| this.djgId =='请选择'|| this.describe ==''|| this.files =={}){
                this.$alert('请填写完整','提示')
            }
            var userId = this.sjbId.id+','+this.sjfxId.id+','+this.zjbId.id+','+this.gysId.id+','+this.djgId.id
            var endTime = (new Date(this.endTime).getTime())/1000
            var formData = new FormData();
            formData.append('name', this.projectName);
            formData.append('customer_user_id', this.clientId.user_id);
            formData.append('product_user_id', this.cpbId.id);
            formData.append('content', this.describe);
            formData.append('end_time', endTime);
            formData.append('enclosure_files', this.files);
            formData.append('user_ids', userId);
          this.$axios.post('api/task/task/create_project',formData,{
              headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    this.$alert('添加成功','提示')
                }else if(res.data.error_msg == 'internal server error'){
                   this.$alert("请添加附件！","提示")
               }
          })
      },
  },
  mounted(){
    this.$axios.get('api/user/staff/lists',{params:{
        num:999999,
    }}).then(res=>{
        if(res.data.response_data){
            
            var staffLists = res.data.response_data.lists;
            console.log(staffLists)
            staffLists.forEach((ele,index)=>{
                if(ele.department_id == 1){
                    this.sjb.push(ele)
                }else if(ele.department_id == 2){
                    this.sjfxb.push(ele)
                }else if(ele.department_id == 3){
                    this.zjb.push(ele)
                }else if(ele.department_id == 4){
                    this.cpb.push(ele)
                }else if(ele.department_id == 5){
                    this.gys.push(ele)
                }else if(ele.department_id == 6){
                    this.djg.push(ele)
                }
            })
        }
    });
    this.$axios.get('api/user/customer/lists',{params:{
        num:999999,
    }}).then(res => {
        if(res.data.response_data){
            this.clientLists = res.data.response_data.lists
        }
    })
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
.p-table tbody tr td:nth-child(2){
    padding-left:80px;
    border-right:1px solid #686572;
}
.p-table tbody tr td:last-child{
    border-right:none;
    padding-left:80px;
}
.p-table tbody tr td input{
    height:100%;
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
}
.add-accessory .add-box label{
    cursor:pointer;
}
.add-accessory .add-box input {
    width: 0px; 
    height: 0px; 
    display: none; 
}
.add-box span{
    margin-left:20px;
    font-size:16px;
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