<template>
  <div class="client-check">
        <div class="check-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>包装设计</span>
            </div>
            <table class="p-table" width="1426" cellspacing="0">
                <tbody>
                    <tr>
                        <td width="276">发信人</td>
                        <td width="435"> 赵雷</td>
                        <td width="276">发送时间</td>
                        <td width="435">的adad</td>
                        
                    </tr>
                </tbody> 
            </table>
            <div class="p-describe">
                <div class="d-tit">内容描述 :</div>
                <div class="d-conter">阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来了几千万阿斯达巨大的阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来了几千万阿斯达巨大的阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来了几千万阿斯达巨大的阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来了几千万阿斯达巨大的阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来了几千万阿斯达巨大的了几千万阿斯达巨大的辣的链接库请叫我了去我家去我家接口去我家乐居去我家请问来了几千万</div>
            </div>
            <div class="client-bottom">
                <div class="b-content">
                    <div class="client-del">删除</div>
                    <div class="client-back">返回</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       
    }
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
    background:url(../../../../static/images/task01.png);
}
.f-tit span {
    line-height:100px;
    margin-left:30px;
    font-size:28px;
}
.p-table tbody tr td{
    line-height:63px;
    border-top:1px solid #686572;
    border-right:2px solid #9b9aa1;
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

.client-bottom {
    width:100%;
    padding:20px 0 17px 0;
    overflow:hidden;
}
.b-content {
    width:480px;
    margin:0 auto;
}
.b-content div {
    height:63px;
    background:rgba(0,0,0,0.3);
    margin-right:3px;
    float:left;
    text-align:center;
    line-height:63px;
    cursor:pointer;
    font-size:20px;
}
.client-del {
    width:235px;
}
.client-back {
    width:239px;
}
</style>