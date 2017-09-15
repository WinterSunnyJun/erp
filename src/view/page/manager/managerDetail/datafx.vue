<template>
  <div class="check-client">
        <div class="c-client-table">
            <ul class="p-question">
                <li class="q-timt" v-show="qTime">{{qTime | time}}</li>
                <li class="q-title">项目问题</li>
                <li class="q-content">
                    <textarea v-model="question"  readonly="readonly"></textarea>
                </li>
            </ul>
            <ul class="p-question">
                <li class="q-timt" v-show="qTime">{{qTime}}</li>
                <li class="q-title">项目问题</li>
                <li class="q-content">
                    <textarea v-model="answer"  readonly="readonly"></textarea>
                </li>
                <li>
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
                </li>
            </ul>
            <ul class="p-question">
                <li class="q-title">反馈</li>
                <li class="q-content border-none">
                    <textarea v-model="describe"  ></textarea>
                </li>
            </ul>
        </div>
        <div class="client-bottom">
            <div class="b-content">
                <div class="client-save" @click="onToSubmitFeedback">提交</div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        describe:'',
        taskId:'',
        question:'',
        qTime:'',
        answer:'',
        files:{'name':'未添加'}
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
      onToSubmitFeedback(){
        var formData = new FormData();
        formData.append('task_id', this.taskId);
        formData.append('project_id', this.$route.query.id);
        formData.append('content', this.describe);
        formData.append('enclosure_files', this.files);
        this.$axios.post('api/task/task/feedback_task',formData,{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
            }).then(res=>{
                if(res.data.response_data){
                    this.$alert('提交成功!','提示')
                }
            })
    }
  },
  mounted(){
      this.$axios.get('api/task/task/project_info',{params:{
        'project_id':this.$route.query.id,
        }}).then(res=>{
            if(res.data.response_data){
            var users = res.data.response_data.lists.user;
                users.forEach(ele=>{
                    if(ele.department_id ==2){
                        this.taskId=ele.id
                        this.$axios.get('api/task/task/info',{params:{
                        'task_id':ele.id,
                        }}).then(res=>{
                                if(res.data.response_data){
                                    
                                    var feedbcak = res.data.response_data.lists.record
                                    feedbcak.forEach(ele=>{
                                        if(ele.type ==1){
                                            this.question = ele.content
                                            this.qTime = ele.ctime
                                        }else if(ele.type ==2){
                                            this.answer = ele.content
                                        }
                                    });
                                    
                                }
                        }) 
                    }   
                });
            }
      })
      
  }
 
}
</script>
<style scoped>
.c-client-table {
    width:1426px;
    font-size:22px;
    background:rgba(0,0,0,0.4);
    font-size:24px;
}
.p-question{
    width:100%;
}
.q-timt{
    height:50px;
    line-height:50px;
    background:rgba(0,0,0,0.3);
    padding-left:52px;
    font-size:20px;
}
.q-title{
    height:63px;
    line-height:63px;
    border-bottom:1px solid #686572;
    padding-left:62px;
}
.q-content{
    padding:30px 62px;
    line-height:40px;
    border-bottom:1px solid #686572;
}
.q-content textarea{
    width:1300px;
    height:80px;
    line-height:40px;
    font-size:20px;
    color:#fff;
    background:none;
    border:0;
    outline:0;
}
.add-accessory{
    height:50px;
    line-height:50px;
    padding-left: 62px ;
    cursor:pointer;
    background:rgba(0,0,0,0.3);
    font-size:20px;
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
.border-none{
    border:0;
}
.client-bottom {
    width:1426px;
    margin:80px 0 50px;
}
.b-content {
    width:239px;
    margin:0 auto;
    overflow:hidden;
}
.b-content div {
    width:239px;
    height:63px;
    background:rgba(0,0,0,0.3);
    float:left;
    text-align:center;
    line-height:63px;
    cursor:pointer;
}


</style>