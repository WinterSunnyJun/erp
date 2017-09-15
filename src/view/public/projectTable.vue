<template>
  <div class="project-table">
    <div class="f-tit">
        <div class="tit-icon"></div>
        <span>全部项目</span>
    </div>
    <div class="p-table-wrap">
    <table class="p-table" width="1096"   cellspacing="0" align="center" v-if="projectLists.length">
        <thead>
            <th width="129">项目主题</th>
            <th width="220">公司信息</th>
            <th width="129">负责人</th>
            <th width="129">状态</th>
            <th width="129">截止日期</th>
            <th width="229">操作</th>
        </thead>
        <tbody>
            <tr v-for="(ele,index) in projectLists">
                <td>{{ele.name}}</td>
                <td>{{ele.company_district}}</td>
                <td>{{ele.product_user_name}}</td>
                <td>{{ele.status}}</td>
                <td>{{ele.end_time | time}}</td>
                <td >
                    <span @click="toCheck(ele.id)">查看</span>
                    <i>/</i>
                    <span @click="deleteProject(index,ele.id)">删除</span>
                </td>
            </tr>            
        </tbody> 
 
    </table>
    <div class="no-content" v-if="projectLists.length == 0">
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
        projectLists:[],
        userInfo:[],
    }
  },
  methods:{
     toCheck(id){
        this.$router.push({path:'/pcheck',query:{"id":id}})
    },
    deleteProject(index,id){
        if(this.userInfo.department_id == 4){
            this.$alert('没有权限!','提示');
            return
        }
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
    this.$axios.get('api/task/task/project_lists',{params:{
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
        this.projectLists = lists;
        
        }
    });
    this.$axios.post('api/user/user/user_info',{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
        }).then(res=>{
            if(res.data.response_data){
                this.userInfo = res.data.response_data.lists;
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