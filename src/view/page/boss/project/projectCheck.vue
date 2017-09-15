<template>
  <div class="project-check">
        <div class="check-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>查看项目</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">项目名称</td>
                        <td width="435"> {{projectCheckData.name}}</td>
                        <td width="276">客户名称</td>
                        <td width="435">{{projectCheckData.customer_user_name}}</td>
                    </tr>
                    <tr>
                        <td>客户负责人</td>
                        <td>{{client}}</td>
                        <td>状态</td>
                        <td>{{projectCheckData.status}}</td>
                        
                    </tr>
                     <tr>
                         <td>产品经理</td>
                        <td>{{projectCheckData.product_user_name}}</td>
                        <td>设计部</td>
                        <td>{{sjb}}</td>
                        
                    </tr>
                    <tr>
                        <td>质检部</td>
                        <td>{{zjb}}</td>
                        <td>数据分析部</td>
                        <td>{{sjfxb}}</td>
                        
                    </tr>
                    <tr>
                        <td>产品供应商</td>
                        <td>{{cpgys}}</td>
                        <td>OEM代加工 </td>
                        <td>{{djg}}</td>
                        
                    </tr>
                    <tr>
                        <td>截至时间</td>
                        <td>{{projectCheckData.end_time | time}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">项目描述 :</div>
                <div class="d-conter">{{projectCheckData.content}}</div>
            </div>
            <div class="add-accessory">
                <div class="add-icon"></div>
                <!--<a :href="projectCheckData.enclosure_urls" download="附件">-->
                    
                <span @click="toDownload">下载附件</span></a>
            </div>
        </div>
  </div>
</template>

<script>
var qs = require('qs')
export default {
  data () {
    return {
       projectCheckData:[],
       client:'',
       sjb:'',
       zjb:'',
       sjfxb:'',
       cpgys:'',
       djg:''
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

  },
  mounted(){
    this.$axios.get('api/task/task/project_info',{params:{
        'project_id':this.$route.query.id,
    }})
        .then(res=>{
        if(res.data.response_data){
           var lists = res.data.response_data.lists;
           var data = res.data.response_data.lists.user;
           
           this.sjb=data[2].nickname;
           this.zjb=data[4].nickname;
           this.sjfxb=data[3].nickname;
           this.cpgys=data[0].nickname;
           this.djg=data[1].nickname;
           this.client=data[5].nickname;

            if(lists.status == 1){
                lists.status = "未启动"
            }else if(lists.status == 2){
                lists.status = "进行中"
            }else if(lists.status == 3){
                lists.status = "已完成"
            }
            this.projectCheckData = lists;

        }
    }) 
  }
 
}
</script>
<style scoped>
.check-table {
    width:1426px;
    margin:86px 0 50px 110px;
    font-size:22px;
    background:rgba(0,0,0,0.4);
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
.p-describe .d-tit {
    height:63px;
    border-top:1px solid #686572;
    padding-left:62px;
    line-height:63px;
}
.p-describe .d-conter{
    border-top:1px solid #686572;
    padding:28px 62px 40px;
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
    background:url(../../../../../static/images/add.png);
    margin:16px 12px 0 0;
}
</style>