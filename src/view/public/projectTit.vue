<template>
  <div class="project-tit">
    <ul class="p-list">
        <li class="l-item">
            <div class="l-text">
                <span class="p-num">{{num}}</span>
                <span class="p-text">全部项目</span>
            </div>
            <div class="progress-all">
                <div class="now-box n-all"></div>
            </div>
        </li>
        <li class="l-item">
            <div class="l-text">
                <span class="p-num">{{doing}}</span>
                <span class="p-text">进行中的项目</span>
            </div>
            <div class="progress-all">
                <div class="now-box n-nodo" ref="doing"></div>
            </div>
        </li>
        <li class="l-item">
            <div class="l-text">
                <span class="p-num">{{nodo}}</span>
                <span class="p-text">未启动</span>
            </div>
            <div class="progress-all">
                <div class="now-box n-nodid" ref="nodo"></div>
            </div>
        </li>
        <li class="l-item">
            <div class="l-text">
                <span class="p-num">{{did}}</span>
                <span class="p-text">已完成</span>
            </div>
            <div class="progress-all">
                <div class="now-box n-did" ref="did"></div>
            </div>
        </li>
       
    </ul>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
        num:0,
        doing:0,
        nodo:0,
        did:0
    }
  },
  mounted(){
     
      this.$axios.get('api/task/task/project_status_lists')
        .then(res=>{
            if(res.data.response_data){
            var lists = res.data.response_data.lists;
            console.log(res.data.response_data.lists)
            this.num = res.data.response_data.count;
            lists.forEach( (ele,index)=>{
                if(ele.status == 1){
                    this.nodo = ele.count;
                    this.$refs.nodo.style.width = 260*(ele.count/this.num)+'px'
                }
                if(ele.status == 2){
                    this.doing = ele.count;
                    this.$refs.doing.style.width = 260*(ele.count/this.num)+'px'
                }
                if(ele.status == 3){
                    this.did = ele.count;
                    this.$refs.did.style.width = 260*(ele.count/this.num)+'px'
                }
            })
            }
        });
        if(this.doing == 0){this.$refs.doing.style.width=0+'px'}
        if(this.nodo ==0){this.$refs.nodo.style.width=0+'px'}
        if(this.did ==0){this.$refs.did.style.width=0+'px'}
  }
}
</script>
<style scoped>
.project-tit{
    position:absolute;
    left:115px;
    top:79px;
}
.project-tit .p-list{
    overflow:hidden;
    width:1426px;
}   
.l-item{
    position:relative;
    width:356px;
    height:326px;
    float:left;
}
.l-text{
    margin-top:94px;
    overflow:hidden;
}
.p-num {
    display:block;
    float:left;
    font-size:54px;
    width:170px;
    height:60px;
    text-align:center;
    overflow:hidden;
    margin-top:-8px;
}
.p-text {
    font-size:38px;
}
.project-tit .p-list li:nth-child(1){
    background:url(../../../static/images/p-tbg1.png);
}
.project-tit .p-list li:nth-child(2){
    background:url(../../../static/images/p-tbg2.png);
}
.project-tit .p-list li:nth-child(3){
    background:url(../../../static/images/p-tbg3.png);
}
.project-tit .p-list li:nth-child(4){
    background:url(../../../static/images/p-tbg4.png);
}
.progress-all{
    position:absolute;
    bottom:53px;
    left:48px;
    width:260px;
    height:5px;
    background:rgba(0,0,0,0.3);
    border-radius:3px;
}
.progress-all .now-box{
    z-index:2;
    position:absolute;
    left:0;
    top:0;
    border-radius:3px;
    width:100%;
    height:5px;
    background:#fff;
}
.progress-all .n-nodo{
    background:#1c7dfa;
}
.progress-all .n-nodid{
    background:#df3931;
}
.progress-all .n-did{
    background:#52d669;
}
</style>