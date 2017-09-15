<template>
  <div class="feedback">
        <div class="feed-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>产品部基本信息</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <thead>
                    <th width="712">项目名称</th>
                    <th width="712">{{taskInfo.name}}</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>{{userInfo.nickname}} :</div>
                            <div v-show="qTime">{{qTime | time}}</div>
                        </td>
                        <td>
                            <!--<textarea v-model="question " readonly="readonly"></textarea>-->
                            <div class="feed-content">{{question}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>{{taskInfo.product_user_name}}：</div>
                            <div  v-show="aTime">{{aTime | time}}</div>
                        </td>
                        <td>
                            <!--<textarea v-model="answer" readonly="readonly"></textarea>-->
                            <div class="feed-content">{{answer}}</div>
                        </td>
                    </tr>

                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">任务反馈</div>
                <div class="d-conter">
                    <textarea v-model="describe"  ></textarea>
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
                    <div class="client-submit" @click="onToSubmitTask">提交</div>
                </div>
            </div>
  </div>
  
</template>

<script>
var qs = require('qs')
export default {
  data () {
    return {
       describe:'',
       userInfo:[],
       taskInfo:[],
       files:{'name':'未添加'},
       departmentUser:'',
       managerUser:'',
       question:'',
       answer:'',
       qTime:'',
       aTime:''
    }
  },
  filters: {
    time: function (value) {
      if(!value) return
      let d = new Date(parseInt(value) * 1000)
      return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }
  },
  methods:{
    handleFileChange($event){
        this.files = $event.target.files[0]
    },
    onToSubmitTask(){
        var formData = new FormData();
        formData.append('task_id', this.$route.query.id);
        formData.append('project_id', this.taskInfo.project_id);
        formData.append('content', this.describe);
        formData.append('enclosure_files', this.files);
        this.$axios.post('api/task/task/submit_task',formData,{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    this.$alert('提交成功!','提示')
                }
            })
    }
  },
  mounted(){
      this.$axios.post('api/user/user/user_info',{
        headers:{'Content-type':'application/x-www-form-urlencoded'}
        }).then(res=>{
             this.userInfo = res.data.response_data.lists;
      })
      this.$axios.get('api/task/task/info',{params:{
        'task_id':this.$route.query.id,
        }})
            .then(res=>{
                if(res.data.response_data){
                    this.taskInfo = res.data.response_data.lists
                    var feedbcak = res.data.response_data.lists.record
                    feedbcak.forEach(ele=>{
                        if(ele.type ==1){
                            this.question = ele.content
                            this.qTime = ele.ctime
                        }else if(ele.type ==2){
                            this.answer = ele.content
                            this.aTime = ele.mtime
                        }
                    });
                    
                }
        }) 
  }
 
}
</script>
<style scoped>

.feed-table {
    width:1426px;
    margin-left:108px;
    margin-top:80px;
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
    background:url(../../../../static/images/task01.png);
}
.f-tit span {
    line-height:100px;
    margin-left:30px;
    font-size:28px;
}
.p-table thead th{
    line-height:63px;
    text-align:center;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
}
.p-table thead th:last-child{
    border-right:none;
}
.p-table tbody tr td{
    line-height:136px;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
    font-size:22px;
    text-align:center;

}
.p-table tbody td div {
    line-height:42px;
}
.p-table tbody td .feed-content{
    width:100%;
    min-height:150px;
    line-height:30px;
    font-size:20px;
}
.p-table tbody tr td:first-child{
    line-height:63px;
}
.p-table tbody tr td:last-child{
    border-right:none;
    text-align:left;
    padding:10px 30px;
}
.p-describe .d-tit {
    height:63px;
    border-top:1px solid #686572;
    padding-left:62px;
    line-height:63px;
}
.p-describe .d-conter{
    border-top:1px solid #686572;
    line-height:63px;
    padding:28px 62px;
    line-height:40px;
}
.d-conter textarea{
    width:1300px;
    height:100px;
    line-height:30px;
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
.add-box span{
    margin-left:20px;
    font-size:16px;
}
.add-icon{
    float:left;
    width:18px;
    height:18px;
    background:url(../../../../static/images/add.png);
    margin:16px 12px 0 0;
}
.client-bottom {
    width:1426px;
    margin:50px 0 0 100px ;
    height:63px;
}
.b-content {
    width:239px;
    margin:0 auto 80px;
    overflow:hidden;
}
.b-content .client-submit {
    width:239px;
    height:63px;
    background:rgba(0,0,0,0.3);
    float:left;
    text-align:center;
    line-height:63px;
    cursor:pointer;
}

</style>