<template>
  <div class="basic-info">
        <div class="info-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>任务详情</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0" align="center">
                <tbody>
                    <tr>
                        <td width="276">项目名称</td>
                        <td width="1148">{{taskInfo.name}}</td>
                    </tr>
                    <tr>
                        <td>项目状态</td>
                        <td>{{taskInfo.status}}</td>
                    </tr>
                    <tr>
                        <td>产品经理</td>
                        <td>{{taskInfo.product_user_name}}</td>
                    </tr>
                    <tr>
                        <td>截止时间</td>
                        <td>{{taskInfo.end_time | time}}</td>
                    </tr>
                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">项目描述 :</div>
                <div class="d-conter">{{taskInfo.content}}</div>
            </div>
            <div class="add-accessory">
                <div class="add-icon"></div>
                <a :href="taskInfo.enclosure_urls" download="附件"><span>下载附件</span></a>
            </div>
        </div>
        
  </div>
</template>

<script>
export default {
  data () {
    return {
        taskInfo:{},
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
      this.$axios.get('api/task/task/info',{params:{
        'task_id':this.$route.query.id,
        }})
            .then(res=>{
                
                if(res.data.response_data){
                    var Info = res.data.response_data.lists;
                    if(Info.status ==1){
                        Info.status = "未启动"
                    }else if(Info.status == 2){
                        Info.status = "进行中"
                    }else if(Info.status == 3){
                        Info.status = "已完成"
                    };

                    this.taskInfo = Info;
                }
                
        }) 
  }
 
}
</script>
<style scoped>
.info-table {
    width:1426px;
    position:absolute;
    left:108px;
    top:80px;
    font-size:22px;
    background:rgba(0,0,0,0.4);
    margin-bottom:50px;
}
.f-tit{
    overflow:hidden;
    height:63px;
}
.tit-icon{
    float:left; 
    width:25px;
    height:25px;
    margin-top:21px;
    margin-left:26px;
    background:url(../../../../static/images/task01.png);
}
.f-tit span {
    line-height:63px;
    margin-left:19px;
    font-size:28px;
}
.p-table tbody tr td{
    line-height:63px;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
    font-size:22px;
}
.p-table tbody tr td:first-child{
    padding-left:62px;
}
.p-table tbody tr td:last-child{
    border-right:none;
    text-align:left;
    padding-left:80px;
}
.p-describe .d-tit {
    height:63px;
    border-top:1px solid #686572;
    padding-left:62px;
    line-height:63px;
}
.p-describe .d-conter{
    border-top:1px solid #686572;
    padding-left:10px;
    line-height:63px;
    padding:28px 62px;
    line-height:40px;
}
.add-accessory{
    height:50px;
    border-top:1px solid #686572;
    line-height:50px;
    padding-left: 62px ;
    cursor:pointer;
}
.add-icon{
    float:left;
    width:18px;
    height:18px;
    background:url(../../../../static/images/add.png);
    margin:16px 12px 0 0;
}

 
</style>