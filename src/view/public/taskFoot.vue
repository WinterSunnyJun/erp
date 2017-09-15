<template>
  <div class="project-foot">
    <div class="f-tit">
        <div class="tit-icon"></div>
        <span>项目进度</span>
    </div>
    <div class="f-middle">
        <div id="main" style="width: 314px;height: 287px;"></div>
    </div>
    <div class="f-bottom">
        <ul>
            <li class="f-item">
                <div class="f-pic"></div>
                <div>进行中</div>
                <div>项目</div>
            </li>
            <li class="f-item">
                <div class="f-pic"></div>
                <div>已完成</div>
                <div>项目</div>
            </li>
            <li class="f-item">
                <div class="f-pic"></div>
                <div>未启动</div>
                <div>项目</div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'header',
  data () {
    return {
        charts: '全部任务',
        opinionData:[
            {value:'', name:'进行中项目'},
            {value:'', name:'已完成项目'},
            {value:'', name:'未启动项目'},
        ],
        num:''
    }
  },
  methods:{
      drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/><br/>{b}:{c} ({d}%)'
                 },
                 color:['#1c7dfa','#52d669','#ff3a2f'],
                 
                 graphic:{
                    type:'text',
                    left:'center',
                    top:'center',
                    style:{
                        text: this.num+'\n \n全部任务',
                        textAlign:'center',
                        fill:'#fff',
                        width:30,
                        height:40,
                        fontSize: '18',
                    }
                },
                 series: [
                   {
                     name:'任务状态',
                     type:'pie',
                     radius:['40%','52%',],
                     avoidLabelOverlap: false,
                     label: {
                       normal: {
                         show: false,
                       },
                       emphasis: {
                         show: false,
                       }
                     },
                     labelLine: {
                       normal: {
                            length: 20,
                            length2: 50,
                            show: false
                       }
                     },
                     data:this.opinionData
                   }
                 ]
               })
            }
  },
  mounted(){
      
      this.$axios.get('api/task/task/status_lists')
        .then(res=>{
            if(res.data.response_data){
            var lists = res.data.response_data.lists;
            this.num =  res.data.response_data.count;
            lists.forEach( (ele,index)=>{
                if(ele.status == 1){
                    this.opinionData[2].value = ele.count
                }
                if(ele.status == 2){
                    this.opinionData[0].value = ele.count
                }
                if(ele.status == 3){
                    this.opinionData[1].value = ele.count
                }

                this.$nextTick(function() {
                    this.drawPie('main')
                });
            })
            }
        })
  }
}
</script>
<style scoped>
.project-foot{
    width:314px;
    height:447px;
    background:rgba(0,0,0,0.3);
    position:absolute;
    left:1225px;
    top:436px;
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
.f-middle {
    height:287px;
    border-bottom:1px solid #686572;
}
.f-bottom {
    height:95px;
}
.f-bottom ul {
    overflow:hidden;
}
.f-bottom ul li{
    width:33.3%;
    text-align:center;
    float:left;
    font-size:14px;
}
.f-pic{
    width:20px;
    height:20px;
    margin:19px auto 8px;
    background:#fff;
}
.f-bottom ul li:nth-child(1) .f-pic{
   background:url(../../../static/images/p-did.png);
}
.f-bottom ul li:nth-child(2) .f-pic{
   background:url(../../../static/images/p-doing.png);
}
.f-bottom ul li:nth-child(3) .f-pic{
   background:url(../../../static/images/p-nodid.png);
}

</style>