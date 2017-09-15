<template>
  <div class="client-check">
        <div class="check-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>客户查看</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">客户名称</td>
                        <td width="435"> {{clientInfo.name}}</td>
                        <td width="276">负责人</td>
                        <td width="435">{{clientInfo.nickname}}</td>
                        
                    </tr>
                    
                    <tr>
                        <td>客户账号</td>
                        <td>{{clientInfo.username}}</td>
                        <td>优先级</td>
                        <td>{{clientInfo.priority}}</td>
                    </tr>
                    <tr>
                        <td>联系方式</td>
                        <td>{{clientInfo.mobile}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">公司描述 :</div>
                <div class="d-conter">{{clientInfo.company_district}}</div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        clientInfo:{}
    }
  },
  mounted(){
      this.$axios.get('api/user/customer/info',{params:{
        'user_id':this.$route.query.id,
        }})
            .then(res=>{
                this.clientInfo = res.data.response_data.lists
        }) 
  }
 
}
</script>
<style scoped>
.check-table {
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

</style>