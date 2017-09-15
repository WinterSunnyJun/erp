<template>
  <div class="check-basic">
        <div class="c-basic-table">
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">系统评分</td>
                        <td width="435"> {{projectInfo.score}}</td>
                        <td width="276">项目名称</td>
                        <td width="435">{{projectInfo.name}}</td>
                        
                    </tr>
                    <tr>
                        <td>项目状态</td>
                        <td>{{projectInfo.status}}</td>
                        <td>客户名称</td>
                        <td>{{projectInfo.customer_user_name}}</td>
                    </tr>
                    <tr>
                        <td>客户</td>
                        <td>{{client}}</td>
                        <td>产品经理</td>
                        <td>{{projectInfo.product_user_name}}</td>
                    </tr>
                     <tr>
                        <td>设计部</td>
                        <td>{{sjb}}</td>
                        <td>质检部</td>
                        <td>{{zjb}}</td>
                    </tr>
                    <tr>
                        <td>数据分析部</td>
                        <td>{{sjfxb}}</td>
                        <td>产品供应商</td>
                        <td>{{cpgys}}</td>
                    </tr>
                    <tr>
                        <td>OEM代加工 </td>
                        <td>{{djg}}</td>
                        <td>截至时间</td>
                        <td>{{projectInfo.end_time | time}}</td>
                    </tr>
                    
                </tbody> 
            </table>
        </div>
        <div class="client-bottom">
            <div class="b-content">
                <div  @click="toStartProject" >启动项目</div>
                <div  @click="toSubmitSuccess">标记完成</div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       projectInfo:[],
       sjb:'',
       zjb:'',
       sjfxb:'',
       cpgys:'',
       djg:'',
       client:''
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
    toStartProject(){
        if(this.projectInfo.status == '未启动'){
            this.$axios.get('api/task/task/start_project',{params:{
                'project_id':this.$route.query.id
            }}).then(res=>{
                if(res.data.response_data){
                    this.$alert("您已成功启动项目!",'提示')
                }else{
                    this.$alert("启动项目失败!",'提示')
                }
            })
         }else if(this.projectInfo.status == '进行中'){
             this.$alert("项目进行中!",'提示')
         }else if(this.projectInfo.status == '已完成'){
             this.$alert("项目已完成!",'提示')
         }
    },
    toSubmitSuccess(){
        this.$axios.get('api/task/task/confirm_project',{params:{
            'task_id':this.$route.query.id,
            'project_id':this.$route.query.id,
            'score':99
        }}).then(res=>{
            if(res.data.response_data){
                this.$alert('标记成功！','提示')
            }else{
                this.$alert('标记失败！','提示')
            }
        })
    },
    
  },
  mounted(){
      this.$axios.get('api/task/task/project_info',{params:{
        'project_id':this.$route.query.id,
        }})
            .then(res=>{
            if(res.data.response_data){
            var projectInfo = res.data.response_data.lists;
                if(projectInfo.status == 1){
                    projectInfo.status = "未启动"
                }else if(projectInfo.status == 2){
                    projectInfo.status = "进行中"
                }else if(projectInfo.status == 3){
                    projectInfo.status = "已完成"
                }
            this.projectInfo =   projectInfo; 
            var data = res.data.response_data.lists.user;
            this.sjb=data[2].nickname;
            this.zjb=data[4].nickname;
            this.sjfxb=data[3].nickname;
            this.cpgys=data[0].nickname;
            this.djg=data[1].nickname;
            this.client = data[5].nickname;
            }
      }) 
  }
 
}
</script>
<style scoped>
.c-basic-table {
    width:1426px;
    font-size:22px;
    background:rgba(0,0,0,0.4)
}
.p-table tbody tr td{
    line-height:63px;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
    font-size:22px;
    padding-left:62px;
}
.p-table tbody tr:nth-child(1) td{
    border-top:0;
}
.p-table tbody tr td:nth-child(2){
    padding-left:80px;
    border-right:1px solid #686572;
}
.p-table tbody tr td:last-child{
    border-right:none;
    padding-left:80px;
}
.client-bottom {
    width:1426px;
    margin:100px 0 50px ;
    height:63px;
}
.b-content {
    width:500px;
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
    margin-right:10px;
}

</style>