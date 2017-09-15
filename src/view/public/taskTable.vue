<template>
  <div class="project-table">
    <div class="f-tit">
        <div class="tit-icon"></div>
        <span>全部任务</span>
    </div>
    <div class="p-table-wrap">
    <table class="p-table" width="1096"   cellspacing="0" v-if="taskLists.length">
        <thead>
            <th width="159">任务名称</th>
            <th width="179">客户名称</th>
            <th width="159">项目名称</th>
            <th width="159">状态</th>
            <th width="159">对接人</th>
            <th width="200">操作</th>
        </thead>
        <tbody>
            <tr v-for="ele in taskLists">
                <td >{{ele.id}}</td>
                <td >{{ele.customer_user_name}}</td>
                <td >{{ele.name}}</td>
                <td >{{ele.status}}</td>
                <td >{{ele.product_user_name}}</td>
                <td >
                    <span @click="toCheck(ele.id)">查看</span>
                </td>
            </tr>            
        </tbody> 
 
    </table>
    <div class="no-content" v-if="taskLists.length == 0">
        还没有内容
    </div>
    </div>
  </div>
</template>

<script>
var qs = require('qs')
export default {
  data () {
    return {
        taskLists:[]
    }
  },
  methods:{
     toCheck(id){
        this.$router.push({path:'/basic',query:{"id":id}})
    },
    deleteProject(index,id){
        console.log(index);
        
        this.$confirm('确定删除该项目么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.get('api/task/task/delete_project',{params:{
            'project_id':id
        }}).then(res=>{
            if(res.data.response_data){
                 this.projectLists.splice(index,1);  
                    this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            }else{
                  this.$message({
                    type: 'error',
                    message: '删除失败！'
                })
            }
             
         })
        })  
               
        
    }
  },
  filters: {
    time: function (value) {
      if(!value) return
      let d = new Date(parseInt(value) * 1000)
      return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }
  },
  mounted(){
    this.$axios.get('api/task/task/lists',{params:{
        "page":1,
        "num":5
    }}).then(res=>{
        if(res.data.response_data) {
        var lists = res.data.response_data.lists 
        lists.forEach((ele)=>{
            if(ele.status == 1){
                ele.status = "未启动"
            }else if(ele.status == 2){
                ele.status = "进行中"
            }else if(ele.status == 3){
                ele.status = "已完成"
            }
        });
        this.taskLists = lists;
        }
    })
  }
}
</script>
<style scoped>
.project-table {
    width:1096px;
    overflow:hidden;
    position:absolute;
    left:115px;
    top:436px;
    font-size:20px;
    background:rgba(0,0,0,0.4);
    overflow:hidden;
}
.p-table thead th{
    line-height:63px;
    text-align:center;
    border-right:1px solid #686572;
    border-bottom:1px solid #686572
}
.p-table thead th:last-child{
    border-right:0;
}
.p-table tbody tr td{
    line-height:63px;
    text-align:center;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
}
.p-table tbody tr:first-child td{
    border-top:none;
}
.p-table tbody tr td:last-child{
    border-right:none;
}
.p-table tbody tr td i{
    padding:0 10px;
}
.p-table tbody tr td span{
    cursor:pointer;
}
.f-tit{
    overflow:hidden;
    height:63px;
    border-bottom:1px solid #686572;
}
.tit-icon{
    float:left; 
    width:25px;
    height:25px;
    margin-top:21px;
    margin-left:26px;
    background:url(../../../static/images/task01.png);
}
.f-tit span {
    line-height:63px;
    margin-left:19px;
    font-size:24px;
}
.no-content{
    width:100%;
    height:383px;
    color:#fff;
    line-height:383px;
    text-align:center;
    font-size:22px;
}

</style>