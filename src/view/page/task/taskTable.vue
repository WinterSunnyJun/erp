<template>
    <div id="task-table">   
        
        <div class="task-table">

            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>任务列表</span>
                <div class="addOEM">添加供应商+</div>
            </div>
            <table class="p-table" width="1428"   cellspacing="0" v-if="taskLists.length">
                <thead>
                    <th width="207">项目名称</th>
                    <th width="144">产品经理</th>
                    <th width="144">项目状态</th>
                    <th width="184">任务状态</th>
                    <th width="174">创建时间</th>
                    <th width="174">截止时间</th>
                    <th width="244">操作</th>
                </thead>
                <tbody>
                    <tr v-for="(ele,index) in taskLists">
                        <td >{{ele.name}}</td>
                        <td >{{ele.product_user_name}}</td>
                        <td >{{ele.project_status}}</td>
                        <td >{{ele.status}}</td>
                        <td >{{ele.project_ctime | time}}</td>
                        <td >{{ele.end_time | time}}</td>
                        <td >
                            <span @click="toCheck(ele.id)">查看</span>
                            <i>/</i>
                            <span @click="toFeedback(ele.id)">反馈</span>
                        </td>
                    </tr>
                </tbody> 
            </table>
            <div class="page-break" v-if="taskLists.length">
                <div class="page-content">
                    <div class="page-btn btn-prev" v-show="current != 1" @click="current-- && goto(current--)" ></div>
                    <div class="page">
                        <span class="page-item"  v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">{{index}}</span>
                        
                    </div>
                    <div class="page-btn btn-next" v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"></div>
                </div>
            </div>

             <div class="no-content" v-if="taskLists.length==0">
                还没有内容
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        taskLists:[],
        current:1,
        showItem:5,
        allpage:5,
        loading:false
    }
  },
  watch:{
    '$route':'getTaskLists'
  },
  computed:{
    pages(){
        var pag = [];
        if( this.current < this.showItem ){ 
            var i = Math.min(this.showItem,this.allpage);
            while(i){
                pag.unshift(i--);
            }
        }else{ 
            var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                i = this.showItem;
            if( middle >  (this.allpage - this.showItem)  ){
                middle = (this.allpage - this.showItem) + 1
            }
            while(i--){
                pag.push( middle++ );
            }
        }
        return pag
    },
  },
  methods:{
    toCheck(id){
        this.$router.push({path:'/basic',query:{'id':id}})
    },
    toFeedback(id){
         this.$router.push({path:'/feedback',query:{'id':id}})
    },
    toGoTaskAdd(){
        this.$router.push({path:'/taskadd'})
    },
    goto(index){
        if(index == this.current) return;
        this.current = index;
        //这里可以发送ajax请求
        this.getTaskLists();
    },
    getTaskLists(){
        this.$axios.get('api/task/task/lists',{params:{
            'page':this.current,
            'num':8,
            'customer_user_id':this.$route.query.id
        }})
        .then(res=>{
            if(res.data.response_data){
            var pages = res.data.response_data.count;
            this.allpage = Math.ceil(pages/8)
            var lists = res.data.response_data.lists;
            lists.forEach(ele=>{
                if(ele.status == 1){
                    ele.status = "未启动"
                }else if(ele.status == 2){
                    ele.status = "进行中"
                }else if(ele.status == 3){
                    ele.status = "已完成"
                };
                if(ele.project_status == 1){
                    ele.project_status = "未启动"
                }else if(ele.project_status == 2){
                    ele.project_status = "进行中"
                }else if(ele.project_status == 3){
                    ele.project_status = "已完成"
                };

            })
            }
            this.taskLists = lists
        })
    }
  },
  
  mounted(){
    this.getTaskLists();
  },
  filters: {
    time: function (value) {
      if(!value) return
      let d = new Date(parseInt(value) * 1000)
      return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }
  }
}
</script>
<style scoped>
.task-table {
    width:1428px;
    position:absolute;
    left:135px;
    top:80px;
    font-size:20px;
    background:rgba(0,0,0,0.4)
}
.f-tit{
    overflow:hidden;
    height:63px;
    border-bottom:1px solid #686572;
    font-size:22px;
    line-height:63px;
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
    margin-left:19px;
}
.f-tit .addOEM {
    float:right;
    margin-right:55px;
    cursor:pointer;
}
.p-table thead th{
    line-height:63px;
    text-align:center;
    border-right:1px solid #686572;
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
.p-table tbody tr td:last-child{
    border-right:none;
}
.p-table tbody tr td i{
    padding:0 10px;
}
.p-table tbody tr td span{
    cursor:pointer;
}
.page-break {
    width:100%;
    height:63px;
    border-top:1px solid #686572;
}
.page-content{
    overflow:hidden;
    margin:0 auto;
    display:flex;
    justify-content:center;
}
.page {
    float:left;
	margin:16px  20px 0;
	text-align: center;
}
.page span {
	font-size: 20px;
	color:#fff;
	padding: 0 21px;
	cursor: pointer;
}
.page .active {
	color:red;
	font-weight: 900;
}
.page-btn {
    float:left;
    width:13px;
    height:22px;
    margin-top:18px;
    cursor: pointer;
}
.btn-prev{
    background:url(../../../../static/images/p-prev.png);
}
.btn-next{
    background:url(../../../../static/images/p-next.png);
}
.no-content{
    width:100%;
    height:500px;
    color:#fff;
    line-height:500px;
    text-align:center;
    font-size:22px;
}

</style>